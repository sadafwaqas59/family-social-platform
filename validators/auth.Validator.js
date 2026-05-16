import {

  body,

  validationResult

} from "express-validator";
// import validator tools



// ================= REGISTER VALIDATION =================
export const registerValidator = [

  body("name")
    .notEmpty()
    .withMessage("Name required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters")
];
// validation rules
//VALIDATION RESULT 
export const validate = (req,res,next) => {

  const errors =
    validationResult(req);

  // check errors
  if (!errors.isEmpty()) {

    return res.status(400).json({

      errors: errors.array()
    });
  }
  next();
};