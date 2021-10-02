module.exports = {
    name: 'ping',
    run: async ({ client, message, args, MessageEmbed }) => {
        message.channel.send(`Pingowanie`).then(m => {
            let pingembed = new MessageEmbed()
                .setAuthor(`Ping!`)
                .setColor("RANDOM")
                .setDescription(`Ping bota wynosi ${m.createdTimestamp - message.createdTimestamp} ms`)
                .setFooter(`Wykonano przez ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            return m.edit(pingembed)
        })
    }
}