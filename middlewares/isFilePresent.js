import HttpError from "../helpers/HttpError.js";

const isFilePresent = (req, res, next) => {
    if (!req.file) {
        return next(HttpError(400, "File is required"));
    }
    next();
};

export default isFilePresent;