import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(detail => detail.message);
      next(HttpError(400, messages.join(", ")));
    }
    next();
  };

  return func;
};

export default validateBody;
