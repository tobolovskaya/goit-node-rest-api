import * as userService from "../services/usersServices.js";
import sendEmail from "../services/emailService.js";
import fs from "fs/promises";
import path from "node:path";

const avatarsDir = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
    try {
        const newUser = await userService.register(req.body);
        await sendVerificationEmail(req, newUser.email, newUser.verificationToken);
        res.status(201).json({
            "user": {
                "email": newUser.email,
                "subscription": newUser.subscription,
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const signedUser = await userService.login(req.body);
        res.status(200).json({
            token: signedUser.token,
            user: {
                email: signedUser.email,
                subscription: signedUser.subscription
            },
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || !user.id) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
        await userService.logout(user.id);
        res.status(204).json();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

export const current = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || !user.id) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
        res.status(200).json({
            email: user.email,
            subscription: user.subscription
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

export const updateAvatar = async (req, res, next) => {
    const { path: tempPath, originalname } = req.file;
    const user = req.user;


    if (!user || !user.id) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
    }

    const newFileName = `${Date.now()}_${user.id}_${originalname}`;
    const newFilePath = path.join(avatarsDir, newFileName);

    try {

        const { path: tempPath, originalname } = req.file;
        const newFileName = `${Date.now()}_${user.id}_${originalname}`;
        const newFilePath = path.join(avatarsDir, newFileName);

        await fs.copyFile(tempPath, newFilePath);
        const avatarURL = `/avatars/${newFileName}`;
        const updatedUser = await userService.updateAvatar(user.id, avatarURL);

        res.status(200).json({
            avatarURL: updatedUser.avatarURL
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    } finally {
        try {
            await fs.unlink(tempPath);
        } catch (unlinkErr) {
            console.log(`Failed to remove temporary file: ${unlinkErr.message}`);
        }
    }
}

export const verifyUser = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userService.verifyUser(verificationToken);

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ message: "Verification successful" });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const resendVerificationEmail = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const user = await userService.findUserByEmail(userEmail);
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        if (user.verify) {
            const error = new Error("Verification has already been passed");
            error.status = 400;
            throw error;
        }
        const verificationToken = await userService.getOrCreateVerificationToken(user);
        await sendVerificationEmail(req, userEmail, verificationToken);
        res.status(200).json({ message: "Verification email sent" });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function sendVerificationEmail(req, email, verificationToken) {
    try {
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
        await sendEmail({
            to: email,
            subject: "Verification email",
            text: `Please verify your email: ${verificationUrl}`,
            html: `<p>Please verify your email <a href="${verificationUrl}" target="_blank">${verificationUrl}</a></p>`,
        });
    }
    catch (err) {
        console.log("Error sending verification email: %s", err);
        throw err;
    }

}