

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')

const sesClient = new SESClient()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      const candidateName = streamedItem.dynamodb.NewImage.name.S
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S
      const candidateMessage = streamedItem.dynamodb.NewImage.message.S
      const candidateEnquireType = streamedItem.dynamodb.NewImage.enquiretype.S

      const params = {
        Destination: {
          ToAddresses: [process.env.SES_EMAIL],
        },
        Source: process.env.SES_EMAIL,
        Message: {
          Subject: { Data: `Moxel [Contact Form] - ${candidateEnquireType}` },
          Body: {
            Text: { Data: `Name: ${candidateName}
            Email: ${candidateEmail}.
            ${candidateMessage}
            ` },
          },
        },
      }

      await sesClient.send(new SendEmailCommand(params))
    }
  }
  return { status: 'done' }
}