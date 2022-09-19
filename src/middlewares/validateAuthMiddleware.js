import joi from "joi"

const validateSignUp = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    const registerSchema = joi.object({
        name: joi.string().required().min(1).empty(),
        email: joi.string().required().email().empty(),
        password: joi.string().required().min(8).empty(),
        confirmPassword: joi.ref("password")
    })

    const validation = registerSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })

    if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
    }

    next();
}

const validateSignIn = (req, res, next) => {
    const { email, password } = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(8)
    })

    const validation = userSchema.validate({ email, password }, { abortEarly: false });

    if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
    }

    next();
}

export { validateSignUp, validateSignIn }