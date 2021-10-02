const { MessageEmbed } = require("discord.js");
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = client.config.settings.prefix;

  let user = message.author;
  let avatar = user.displayAvatarURL({ size: 1024 });

  const embed = {
    color: 'RANDOM',
    title: ``,
    url: '',
    author: {
      name: "T!K3R!",
      icon_url: '',
      url: '',
    },
    description: "Bot został wykonany przez: \n> <@729459433779888230>",
    thumbnail: {
      url: `https://cdn.discordapp.com/attachments/860486832785063966/860486877958504468/1.png`,
    },
    image: {
      url: '',
    },
    timestamp: new Date(),
    footer: {
      text: `Wykonano dla: ${message.author.username}`,
      icon_url: `${avatar}`,
    },
  };

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.delete();
    return message.author.send({ embed: embed })
  }

  //propozycje
  try {
    if (message.channel.id === '888891664280739841') {
      message.delete()
      const embed = new MessageEmbed()
        .setAuthor(`Nowa propozycja!`)
        .setDescription(`${message.content}`)
        .setColor("#4B931B")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      if (message.attachments.map(a => a.url)[0]) embed.setImage(message.attachments.map(a => a.url)[0])
      message.channel.send(embed).then(m => {
        m.react('👍')
        m.react('👎')
      })
    }
  } catch (e) {
    null
    console.log(e)
  }


  if (!prefix || !message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd) return;
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  if (!message.guild.me.hasPermission("EMBED_LINKS"))
    return message.reply("Bot nie posiada permisji wysyłania wiadomosci embed!");
  if (command.perm && !client.config.dev.includes(message.author.id)) {
    let index = false;
    command.perm.forEach(async perm => {
      if (perm == "dev" && !client.config.dev.includes(message.author.id)) {
        const errPerms = new MessageEmbed()
          .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription('Ta komenda jest przeznaczona dla administracji')
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        index = true;
        return message.reply(errPerms);
      } else if (perm != "dev" && !message.member.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
          .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription(`Nie posiadasz permisji [${perm}](${message.url}), aby użyć tej komendy!`)
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        index = true;
        return message.reply(errPerms);
      }
    });
    if (index) return;
  }

  if (command.botperm) {
    let index = false;
    command.botperm.forEach(async perm => {
      if (perm != "dev" && !message.guild.me.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
          .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription(`Bot nie posiada permisji [${perm}](${message.url})`)
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        return message.reply(errPerms);
        index = true;
      }
    });
    if (index) return;
  }




  command.run({ client, message, args, prefix, command, MessageEmbed }).catch(err => {
    return console.error(err);
  });
};