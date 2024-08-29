const auth = async (req, res, next) => {
    try {

        const kioskID = req.header('X-Kiosk-ID')
        req.kioskID = kioskID
        req.firebaseToken = req.header('X-Firebase-Token')
        next()
    } catch (e) {
        console.error(e)
        res.status(401).send({ success: 0 })
    }
}

module.exports = auth
