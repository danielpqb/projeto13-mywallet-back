import { loginUserSchema } from "../database/schemas.js";

function loginUserValidation(req, res, next) {
  const { email, password } = req.body;

  const validation = loginUserSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }
  next();
}

export { loginUserValidation };
