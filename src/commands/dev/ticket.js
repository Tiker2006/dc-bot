const { MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "ticket",
    perm: ["dev"],
    run: async ({ client, message, args }) => {
        let button = new MessageButton()
            .setStyle('blurple')
            .setEmoji('🎫')
            .setLabel('Otwórz ticket')
            .setID('OPEN_TICKET_WSPÓŁPRACA')
        let embed = new MessageEmbed()
            .setAuthor(`Ticket!`)
            .setColor("RANDOM")
            .setDescription(`Jeśli chcesz porozmawiać z administracją, kliknij w guzik poniżej!`)
        message.channel.send(' ', {
            button: button,
            embed: embed
        })
    }
}