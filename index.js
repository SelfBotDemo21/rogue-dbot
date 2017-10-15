const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`I'm ready.`);
  client.user.setPresence({ game: { name: `r;help`, type: 0 }});
});

const prefix = "r;";

client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging... ❤").then(m => {
      m.edit(`Pong! - Time Taken: ${m.createdTimestamp - msg.createdTimestamp}ms`)
    })
  }

  if (msg.content.startsWith(prefix + 'help')) {
    msg.author.send(`List of commands:\n
r;ping - Checks if I'm still responding (w/ response time)`)
  }
});

client.login(process.env.BOT_TOKEN);
