const sendgrid = require("@sendgrid/mail");
//const helper = sendgrid.mail;
const keys = require("../config/keys");

sendgrid.setApiKey(keys.sendGridKey);

module.exports = (survey, content) => {
  const { subject, recipients } = survey;
  const msg = {
    to: recipients.map(({ email }) => {
      return email;
    }),
    from: keys.emailFrom,
    subject: subject,
    content: [
      {
        type: "text/html",
        value: content,
      },
    ],
    mailSettings: {},
    trackingSettings: {
      clickTracking: {
        enable: true,
      },
    },
  };

  sendgrid.send(msg);
};

// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super();

//     this.sgApi = sendgrid(keys.sendGridKey);
//     this.from_email = new helper.Email("zcarol.530@gmail.com");
//     this.subject = subject;
//     this.body = new helper.Content("text/html", content);
//     this.recipients = this.formatAddresses(recipients);

//     this.addContent(this.body);
//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     return recipients.map(({ email }) => {
//       return new helper.Email(email);
//     });
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();
//     this.recipients.forEach((recipient) => {
//       personalize.addTo(recipient);
//     });
//     this.addPersonalization(personalize);
//   }

//   async send() {
//     const request = this.sgApi.emptyRequest({
//       method: "POST",
//       path: "/v3/mail/send",
//       body: this.toJSON(),
//     });
//     const response = await this.sgApi.API(request);
//     return response;
//   }
// }

// module.exports = Mailer;