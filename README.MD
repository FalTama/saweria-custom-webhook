# Custom HTTP Webhook for Saweria Notifications on Discord

Welcome to the **Custom HTTP Webhook for Saweria Notifications on Discord** repository! 🚀  
This repository allows you to receive **real-time notifications** directly on your Discord server when a user makes a donation via Saweria. It sends customized messages to your specified Discord channel, making it perfect for streamers, content creators, and anyone who wants to engage their audience with instant donation alerts! 💸

## 🔧 Features

- **Real-time notifications**: Instantly send donation alerts to your Discord server when a donation is made on Saweria.
- **Customizable notifications**: The webhook can be easily adjusted to match your server’s theme with personalized messages.
- **Bot integration**: Directly mention the donator by username if they are part of the Discord server.
- **Error handling**: Graceful error messages and status codes in case of issues with the webhook.

## ⚡️ Quick Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/FalTama/saweria-custom-webhook.git
cd saweria-custom-webhook
```

### 2. Install dependencies

Make sure you have **Node.js** and **npm** installed. Then run:

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env` file in the root directory of the project and add the following:

```plaintext
BOT_TOKEN=<your_discord_bot_token>
NOTIFICATION_CHANNEL_ID=<your_discord_channel_id>
PORT=3000
```

- Replace `<your_discord_bot_token>` with your bot’s token.
- Replace `<your_discord_channel_id>` with the Discord channel ID where the donation notifications will be sent.

### 4. Start the webhook server

Run the following command to start the server and listen for donation notifications:

```bash
npm start
```

Your server will now be running on port 3000 by default, ready to receive POST requests from Saweria!

### 5. Configure Saweria Webhook

In the Saweria dashboard, configure the webhook URL to point to the following:

```
http://your-server-url/saweria
```

Replace `your-server-url` with the URL where your server is running. This is the endpoint that Saweria will use to send donation data to your server.

## 🧑‍💻 Webhook Behavior

When a donation is made, the server will:

1. Parse the data sent by Saweria.
2. Check if the `donator_name` and `amount_raw` are present. If not, it will return a `400` status with an error message.
3. Attempt to fetch the Discord channel specified by the `NOTIFICATION_CHANNEL_ID`.
4. If the donator is a member of your Discord server, they will be mentioned in the notification.
5. The donation notification will include:
   - The donator's username (mentioned if they're a server member).
   - The donation amount in IDR.
   - The donor's message (if provided).
6. An embed message with the donation details will be sent to your Discord channel.

Here’s an example of the notification format:

```json
{
  "content": "Halo! Terima kasih kepada **JohnDoe** atas donasinya! 🎉",
  "embeds": [
    {
      "color": 16753920,
      "title": "🎉 Donasi Baru Diterima!",
      "description": "Terima kasih **JohnDoe** telah memberikan donasi sebesar **Rp100,000**.",
      "fields": [
        {
          "name": "Pesan",
          "value": "Tidak ada pesan.",
          "inline": false
        }
      ],
      "timestamp": "2025-01-08T00:00:00Z",
      "footer": {
        "text": "Saweria Notifications"
      }
    }
  ]
}
```

## 🤖 Customize the Webhook

You can easily modify the format of the notification in the `webhook.js` file, particularly in the `app.post("/saweria", ...)` section. Change how the message is structured, the colors of the embed, or add additional fields to enrich the notification.

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the **Custom HTTP Webhook for Saweria Notifications on Discord** repository. Happy streaming and donating! 🚀💖
