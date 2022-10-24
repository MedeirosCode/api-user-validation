const express = require("express");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// User validation
app.post(
  "/register-user",
  [
    body("email").isEmail().withMessage("The email must be valid!"),
    body("email").custom((value) => {
      if (!value) {
        return Promise.reject("Email is mandatory");
      }
      if (value === "teste@teste.com") {
        return Promise.reject("The email has already been registered");
      }
      return true;
    }),

    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("age").isNumeric().withMessage("Age must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ msg: "User registered successfully" });
  }
);
app.listen(3000, () => {
  console.log("Running in the door: 3000");
});

app.use(bodyParser.json());
