const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "embed",
    desc: "Wysyła podany tekst w formie embeda!",
    perm: ["embed"],
    usage: "<tekst>",
    run: async ({ message, args }) => {
        const str = args.join(" ")
        const res = str.split("|")
        if (!res[0]) return message.channel.send("Podaj autora wiadomości!")
        if (!res[1]) return message.channel.send("Podaj treść wiadomości!")

        const embed = {
            color: '#4B931B',
            title: ``,
            url: '',
            author: {
                name: res[0],
                icon_url: '',
                url: '',
            },
            description: res[1],
            thumbnail: {
                url: " ",
            },
            image: {
                url: '',
            },
            footer: {
                text: ``,
                icon_url: ``
            },
        };
        message.channel.send({ embed: embed })
        message.delete();
    }
}