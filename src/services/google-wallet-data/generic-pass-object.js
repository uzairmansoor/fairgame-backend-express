const getGenericPassObject = (classId, objectId, bookingId, bookingDate, arrivalTime, leadBooker) => {

    const qrContent = Buffer.from(JSON.stringify({ id: bookingId, ts: bookingDate })).toString('base64')
        
    let genericObject = {
        "id": `${objectId}`,
        "classId": classId,
        "logo": {
          "sourceUri": {
            "uri": "http://ec2-54-75-165-115.eu-west-1.compute.amazonaws.com:3000/assets/images/fg-duck-logo.png"
          },
          "contentDescription": {
            "defaultValue": {
              "language": "en-US",
              "value": "FAIRGAME"
            }
          }
        },
        "cardTitle": {
          "defaultValue": {
            "language": "en-US",
            "value": "FAIRGAME CANARY WHARF"
          }
        },
        "subheader": {
          "defaultValue": {
            "language": "en-US",
            "value": "NAME"
          }
        },
        "header": {
          "defaultValue": {
            "language": "en-US",
            "value": leadBooker.toString()
          }
        },
        "textModulesData": [
          {
            "id": "date",
            "header": "DATE",
            "body": bookingDate.toString()
          },
          {
            "id": "arrival_time",
            "header": "ARRIVAL TIME",
            "body": arrivalTime.toString()
          },
          {
            "id": "booking_id",
            "header": "BOOKING ID",
            "body": bookingId.toString()
          }
        ],
        "barcode": {
          "type": "QR_CODE",
          "value": qrContent.toString(),
          "alternateText": ""
        },
        "hexBackgroundColor": "#000000",
        "heroImage": {
          "sourceUri": {
            "uri": "http://ec2-54-75-165-115.eu-west-1.compute.amazonaws.com:3000/assets/images/google-footer-image.png"
          },
          "contentDescription": {
            "defaultValue": {
              "language": "en-US",
              "value": "HERO_IMAGE_DESCRIPTION"
            }
          }
        }
      }
    return genericObject
}

module.exports = {
    getGenericPassObject
}
