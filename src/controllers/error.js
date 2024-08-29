const handleError = (req, res, errorObj) => {
    console.error(errorObj)
    if (errorObj.name === 'ValidationError') {
        let errors = {};

        Object.keys(errorObj.errors).forEach((key) => {
            errors[key] = errorObj.errors[key].message
        });

        return res.status(400).send({ success: 0, errors })
    }
    res.status(400).send(errorObj)
}

module.exports = {
    handleError
}
