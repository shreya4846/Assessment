const Joi = require('joi');

const registrationValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().error(new Error('Passwords do not match')),
        email: Joi.string().email().required(),
        dob: Joi.date().iso().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        next();
    }
};


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        next();
    }
};

module.exports = {registrationValidation, loginValidation}