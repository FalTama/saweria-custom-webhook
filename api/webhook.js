const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Saweria webhook server is active! Point the webhook to /saweria");
});

app.post("/saweria", async (req, res) => {
  const { donator_name, message, amount_raw } = req.body;

  if (!donator_name || !amount_raw) {
    return res.status(400).send("Data is not complete.");
  }

  try {
    const channel = await bot.channels.fetch(process.env.NOTIFICATION_CHANNEL_ID);
    const guild = bot.guilds.cache.first(); 
    const members = await guild.members.fetch(); 

    if (channel) {
    const member = members.find(m => m.user.username === donator_name);
    let mentionText = member ? `<@${member.id}>` : donator_name;

      await channel.send({
        content: `Hello! Thank you to **${mentionText}** for the donation! 🎉`,
        embeds: [
          {
            color: 0xffa500,
            title: "🎉 New Donations Received!",
            description: `Thank you **${mentionText}** for making a donation of **Rp${amount_raw.toLocaleString()}**.`,
            fields: [
              { name: "Message", value: message || "There was no message.", inline: false },
            ],
            timestamp: new Date(),
            footer: { text: "Saweria Notifications" },
          },
        ],
      });
      res.status(200).send("Notification sent.");
    } else {
      res.status(500).send("The channel was not found.");
    }
  } catch (error) {
    console.error("Error while sending embed to Discord:", error);
    res.status(500).send("An error occurred while sending the notification.");
  }
});

bot.once("ready", () => {
  console.log(`Bot is ready as ${bot.user.tag}`);
});

bot.login(process.env.BOT_TOKEN);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
