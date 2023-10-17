const webpush = require("web-push");
const { VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } = process.env;

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  "mailto:oluwatobiisaiah0409@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

//function to send the notification to the subscribed device
const sendNotification = async (subscription, dataToSend) => {
  try {
   await webpush.sendNotification(subscription, JSON.stringify(dataToSend)); //string or Node Buffer

  } catch (error) {
    console.log(error); 
    throw new Error(error.message);
  }
};
module.exports = { sendNotification };
