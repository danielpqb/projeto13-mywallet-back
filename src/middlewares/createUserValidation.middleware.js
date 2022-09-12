import { createUserSchema } from "../database/schemas.js";

function createUserValidation(req, res, next) {
  const { name, email, password } = req.body;

  const validation = createUserSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }
  next();
}

export { createUserValidation };
