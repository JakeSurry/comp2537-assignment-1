import { body, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      success: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters")
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  handleValidation,
];

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .escape(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
];

const validateFavorite = [
  body("pokemonId").isInt({ min: 1 }).withMessage("Invalid Pokemon ID"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Pokemon name is required")
    .isLength({ max: 50 })
    .withMessage("Pokemon name too long")
    .escape(),
  body("image").trim().isURL().withMessage("Invalid image URL"),
  handleValidation,
];

export { validateRegister, validateLogin, validateFavorite };
