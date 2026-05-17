import {

  body,

  validationResult

} from "express-validator";

export const registerValidator = [

  body("name")
    .notEmpty()
    .withMessage("Name required")
];

export const validate = (req,res,next) => {

  const errors =
    validationResult(req);

  if (!errors.isEmpty()) { return res.status(400).json({
 errors: errors.array()
    });
  }

  next();
};