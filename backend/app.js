const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { API_PREFIX } = process.env;
const app = express();
const { models } = require("./config/db");
const { sendNotification } = require("./utils/helper");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.disable("x-powered-by");

app.post(`/${API_PREFIX}save-subscription`, async (req, res) => {

  try {
    const subscription = JSON.stringify(req.body);
    console.log(subscription);
    const sub = await models.subscriptions.create({ subsription:subscription });
    res.status(201).json({ message: "Subscription Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post(`/${API_PREFIX}send-notification`, async (req, res) => {
  try {
    const { id } = req.body;
    const sub = await models.subscriptions.findOne({where:{id}});
    const message = {
      body: "Elon Musk sent you a friend request",
      icon: "https://media.npr.org/assets/img/2022/06/01/ap22146727679490-6b4aeaa7fd9c9b23d41bbdf9711ba54ba1e7b3ae-s800-c85.webp",
      data: {
        requestId: "1234",
        username: "elonmusk"
      },
      actions: [
        {
          action: "accept",
          title: "Accept",
        },
        {
          action: "view_profile",
          title: "View Profile",
        },
      ],
      tag: "friend_request",
    };
    await sendNotification(sub.subsription, message);
    res.json({ message: "message sent" });    
  } catch (error) {
    res.status(500).json({ message: error.message });

  }

});
module.exports = app;
