const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`I'm ready.`);
  client.user.setPresence({ game: { name: `r;help`, type: 0 }});
});

const prefix = "r;";

const relStat = [
  "100% - Amazing!", "75% - Not as good, but still strong", "50% - Eh. It has it's upsides and downsides", "35% - Poor", "25% - Really poor", "10% - Bad"
]

client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging... ❤").then(m => {
      m.edit(`Pong! - Time Taken: ${m.createdTimestamp - msg.createdTimestamp}ms`)
    })
  }
  
  if (msg.content.startsWith(prefix + 'help')) {
    msg.author.send(`List of commands:\n
r;ping - Checks if I'm still responding (w/ response time)
r;ship - Ships 2 users. (args required: 1)`)
  }
  
  if (msg.content.startsWith(prefix + 'ship')) {
    msg.channel.send(`❤ **Shipping** ❤\n

\`${message.author.username}\`
\`${message.content}\`

Relationship Status: **${relStat[Math.floor(Math.random() * relStat.length)]}**`)
}
});

client.login(process.env.BOT_TOKEN);
