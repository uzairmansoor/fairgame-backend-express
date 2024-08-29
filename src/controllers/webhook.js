const { handleError } = require('./error')
const { sendEmail } = require('../services/sendgrid-service')

const sevenRoomsBookingCreatedHandler = async function (req, res) {
    try {
        if (!req.body.leadbooker_email) {
            throw { success: 0, msg: 'Leadbooker email is not provided!' }
        }

        const {
            firstname, reservation_id, reservation_date, arrival_time, gameStart_time, game_tokens, food_tokens,
            drink_tokens, apple_wallet, google_wallet, paymentDetails_games, paymentDetails_FoodAndDrink,
            paymentDetails_total, paymentDetails_CardNumber, paymentDetails_CardType, paymentDetails_ReceiptLink, QRcode_link
        } = req.body

        const data = {
            firstname, reservation_id, reservation_date, arrival_time, gameStart_time, game_tokens, food_tokens,
            drink_tokens, apple_wallet, google_wallet, paymentDetails_games, paymentDetails_FoodAndDrink,
            paymentDetails_total, paymentDetails_CardNumber, paymentDetails_CardType, paymentDetails_ReceiptLink, QRcode_link
        }
        
        const templateId = req.body.templateId || process.env.SENDGRID_SUCCESSFULL_RESERVATION_TEMPLATE_ID
        const userEmail = req.body.leadbooker_email
        if (true) {
            const emailSubject = `You are going to Fairgame! Reservation ID: ${reservation_id}`
            await sendEmail(templateId, emailSubject, userEmail, data)
        }
        
        res.status(200).send({ success: 1, msg: 'Email sent successfully!' })
    } catch (e) {
        handleError(req, res, e)
    }
}

module.exports = {  
    sevenRoomsBookingCreatedHandler
}
