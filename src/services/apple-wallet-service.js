const moment = require('moment')
const fs = require('fs')
const { Template, constants } = require('@walletpass/pass-js')

const createPass = async (bookingId, bookingDateTime, bookingPerson) => {
    try {
        const template = await Template.load('assets/apple-wallet-pass/template')

        template.barcodes = [
            {
                "message": bookingId.toString(),
                "format": "PKBarcodeFormatQR",
                "messageEncoding": "iso-8859-1"
            }
        ]

        await template.loadCertificate(
            'assets/apple-wallet-pass/FG-Pass-Cert.pem',
            '1234' // Key passphrase
        )

        const pass = template.createPass({
            serialNumber: bookingId.toString(),
        })
        pass.primaryFields.add({
            key: 'checkin_time',
            label: 'Check-in Time',
            value: moment.utc(bookingDateTime).toDate(),
            dateStyle: constants.dateTimeFormat.MEDIUM,
            timeStyle: constants.dateTimeFormat.SHORT
        })
        if (bookingPerson){
            pass.primaryFields.add({
                key: 'leadbooker',
                label: 'Person',
                value: bookingPerson
            })
        }
        pass.relevantDate = moment.utc(bookingDateTime).toDate()

        const buf = await pass.asBuffer()
        // const fileCreated = await fs.writeFileSync(`uploads/fg-event-${bookingId}.pkpass`, buf)
        // console.log(fileCreated)
        return { passBuffer: buf, mimeType: constants.PASS_MIME_TYPE }
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    createPass
}
