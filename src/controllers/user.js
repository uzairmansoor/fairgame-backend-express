const { handleError } = require('./error')

const authenticateUser = async (req, res) => {
    try {
        res.status(200).send({ success: 1  })
    } catch (e) {
        handleError(req, res, e)
    }
}

module.exports = {
    authenticateUser
}
