const { body } = require("express-validator");

export const validateProduct = [
    body("name").isString().isLength({ min: 3, max: 255 }).withMessage("Name must be a string with a minimum length of 3 and a maximum length of 255").
    matches(/^[a-zA-Z0-9 ]+$/).withMessage("Name must contain only letters, numbers and spaces"),

    body("company").isString().isLength({ min: 3, max: 255 }).withMessage("Company must be a string with a minimum length of 3 and a maximum length of 255").
    matches(/^[a-zA-Z0-9 ]+$/).withMessage("Company must contain only letters, numbers and spaces"),

    body("price").isNumeric().withMessage("Price must be a number").isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("stock").isNumeric().withMessage("Stock must be a number").isInt({ min: 0 }).withMessage("Stock must be a positive number")
]