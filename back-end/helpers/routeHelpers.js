const Joi = require("joi");

// helper to validate the inputs
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log("LOGIN/SIGNUP: Validating Begin");
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      } else {
        req.value["body"] = result.value;
      }
      console.log("LOGIN/SIGNUP: Validating Done");
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
