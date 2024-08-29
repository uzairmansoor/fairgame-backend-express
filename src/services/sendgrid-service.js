const sgMail = require('@sendgrid/mail')

const sendEmail = async (templateId, subject, toEmail, data) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            from: process.env.SENDGRID_FROM_EMAIL,
            to: [ toEmail ],
            template_id: templateId,
            personalizations: [
                {
                    to: [ { email: toEmail } ],
                    dynamic_template_data: data
                }
            ]
            
        }
        const res = await sgMail.send(msg)
        console.log('email service response - ', res)
    } catch (error) {
        console.error(error)
        if (error.response) {
            console.error(error.response.body)
        }
    }
}

module.exports = {
    sendEmail
}
