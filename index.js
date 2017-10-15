const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`I'm ready.`);
  client.user.setPresence({ game: { name: `r!help`, type: 0 }});
});

const prefix = "r!";

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
r!ping - Checks if I'm still responding (w/ response time).
r!ship - Ships you with someone/something.
r!ban - Bans the first user that's mentioned. (Moderator command)`)
  }
  
  if (msg.content.startsWith(prefix + 'ship')) {
    let args = msg.content.split(' ').slice(1).join(' ')
    if (!args) {
      return msg.channel.send(`Please provide arguments, ${msg.author.username}`)
    }
    msg.channel.send(`❤ **Shipping** ❤\n
${msg.author.username} x ${args}\n
Relationship Status: **${relStat[Math.floor(Math.random() * relStat.length)]}**`)
  }
  
  if (msg.content.startsWith(prefix + 'ban')) {
    let userToBan = msg.members.users.first()
    let reason = msg.content.split(' ').slice(2).join(' ')
    
    if (!msg.member.permissions.has("BAN_MEMBERS")) {
      return msg.reply("You do not have the required permissions to use this command!")
    } else if (!msg.member(client.user).permissions.has("BAN_MEMBERS")) {
      return msg.reply("I do not have the required permissions to use this command. Please give me the required permissions and try again.")
    }
    
    if (msg.mentions.users.size === 0) {
      return msg.reply("You haven't given me anyone to ban!")
    }
    
    if (userToBan.id === client.user.id) {
      return msg.reply("I can't ban myself!")
    }
    
    if (!userToBan.bannable) {
      return msg.reply("I cannot ban this user.")
    }
    
    if (userToBan.id === msg.author.id) {
      return msg.reply("You can't ban yourself!")
    }
    
    userToBan.ban()
    msg.channel.send(`${userToBan.username} was banned successfully. (Reason: ${reason})`)
  }
});

client.login(process.env.BOT_TOKEN);
