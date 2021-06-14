const LINE_MESSAGING_API  = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer <Channel access token>',
};
const request = require('request-promise');
const commaNumber = require('comma-number');

const replyMessage = async (req, res, next) => {
  if (req.body.events[0].message.type !== 'text') {
    return;
  }
  request
  ('https://covid19.th-stat.com/json/covid19v2/getTodayCases.json')
  .then(function (htmlString) {
    const dataCovid = JSON.parse(htmlString);
    reply(req.body,dataCovid);

  })
  .catch(function (err) {
  });


};
const reply = (bodyResponse,dataCovid) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: 'flex',
          altText: 'รายงานสถานการณ์ โควิด-19',
          contents: {
            type: 'carousel',
            contents: [
              {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": "รายงานสถานการณ์ โควิด-19",
                      "weight": "bold",
                      "size": "lg",
                      "gravity": "center",
                      "wrap": true,
                      "contents": []
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "margin": "lg",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "ติดเชื้อสะสม: ",
                              "size": "sm",
                              "color": "#AAAAAA",
                              "flex": 3,
                              "contents": []
                            },
                            {
                              "type": "text",
                              "text": `${commaNumber(dataCovid.Confirmed)} (+ ${commaNumber(dataCovid.NewConfirmed)})`,
                              "size": "sm",
                              "flex": 4,
                              "contents": []
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "หายแล้ว",
                              "size": "sm",
                              "color": "#AAAAAA",
                              "flex": 3,
                              "contents": []
                            },
                            {
                              "type": "text",
                              "text": `${commaNumber(dataCovid.Recovered)} (+ ${commaNumber(dataCovid.NewRecovered)})`,
                              "size": "sm",
                              "color": "#666666",
                              "flex": 4,
                              "contents": []
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "รักษาอยู่ในรพ.: ",
                              "size": "sm",
                              "color": "#AAAAAA",
                              "flex": 3,
                              "contents": []
                            },
                            {
                              "type": "text",
                              "text": `${commaNumber(dataCovid.Hospitalized)}`,
                              "size": "sm",
                              "color": "#666666",
                              "flex": 4,
                              "wrap": true,
                              "contents": []
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "เสียชีวิต:",
                              "size": "sm",
                              "color": "#AAAAAA",
                              "flex": 3,
                              "contents": []
                            },
                            {
                              "type": "text",
                              "text": `${commaNumber(dataCovid.Deaths)} (+ ${commaNumber(dataCovid.NewDeaths)})`,
                              "size": "sm",
                              "color": "#666666",
                              "flex": 4,
                              "contents": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "separator",
                      "margin": "md",
                      "color": "#C1BCBCFF"
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "horizontal",
                  "flex": 1,
                  "contents": [
                    {
                      "type": "text",
                      "text": "อัพเดทข้อมูลล่าสุด : 14/06/2021 11:35",
                      "weight": "bold",
                      "align": "center",
                      "contents": []
                    }
                  ]
                }
              }
            ],
          },
        }
	  ]
    })
  });
};
module.exports = {
  replyMessage,
};