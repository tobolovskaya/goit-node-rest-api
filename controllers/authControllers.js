import * as userService from "../services/usersServices.js";
import fs from "fs/promises";
import path from "node:path";

const avatarsDir = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
    try {
        const newUser = await userService.register(req.body);
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            }
        });
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
        console.log(err);
        next(err);
    }
};

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
    } catch (err) {
        console.log(err);
        next(err);
    }
};

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
        await fs.copyFile(tempPath, newFilePath);
        const avatarURL = `/avatars/${newFileName}`;
        const updatedUser = await userService.updateAvatar(user.id, avatarURL);

        res.status(200).json({
            avatarURL: updatedUser.avatarURL
        });
    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        try {
            await fs.unlink(tempPath);
        } catch (unlinkErr) {
            console.log(`Failed to remove temporary file: ${unlinkErr.message}`);
        }
    }
};