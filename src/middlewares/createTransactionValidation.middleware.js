import { createTransactionSchema } from "../database/schemas.js";

function createTransactionValidation(req, res, next) {
  const { value, description } = req.body;

  const validation = createTransactionSchema.validate(
    { value, description },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }
  next();
}

export { createTransactionValidation };
