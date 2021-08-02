const Yup = require("yup");

module.exports = {
    emailLoginSchema: () => {
        return Yup.object().shape({
            email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        })
    },
    mobileLoginSchema: () => {
        return Yup.object().shape({
            mobile: Yup.string().mobile('Mobile must be a valid mobile number').required('Mobile is required'),
            password: Yup.string().required('Password is required')
        })
    },
    usernameLoginSchema: () => {
        return Yup.object().shape({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        })
    }
};