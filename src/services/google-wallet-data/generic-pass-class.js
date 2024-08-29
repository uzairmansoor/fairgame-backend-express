const getGenericPassClass = (classId) => {
    let genericClass = {
        "id": `${classId}`,
        "classTemplateInfo": {
          "cardTemplateOverride": {
            "cardRowTemplateInfos": [
              {
                "twoItems": {
                  "startItem": {
                    "firstValue": {
                      "fields": [
                        {
                          "fieldPath": "object.textModulesData['date']"
                        }
                      ]
                    }
                  },
                  "endItem": {
                    "firstValue": {
                      "fields": [
                        {
                          "fieldPath": "object.textModulesData['arrival_time']"
                        }
                      ]
                    }
                  }
                }
              },
              {
                "oneItem": {
                  "item": {
                    "firstValue": {
                      "fields": [
                        {
                          "fieldPath": "object.textModulesData['booking_id']"
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      }
    return genericClass
}

module.exports = {
    getGenericPassClass
}
