const { MessageEmbed } = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = async (client, button) => {
    await button.reply.defer()
    let buttonClicker = button.clicker.member;
    let guild = button.guild;

    if (button.id === 'OPEN_TICKET_WSPÓŁPRACA') {
        let alreadyOpenedTicket = client.channels.cache.filter(m => m.type == "text" && m.name.includes("ticket-")).map(m => m.name.split("ticket-")[1]);
        let współpraca = alreadyOpenedTicket.some(v => buttonClicker.user.username == v)
        console.log(współpraca)
        if (współpraca === true) {
            return await buttonClicker.user.send(new MessageEmbed().setAuthor(`Błąd!`).setColor("RED").setDescription(`Posiadasz już utworzony ticket!`))
        }
        let ticketChannel = await guild.channels.create(`ticket-${buttonClicker.user.username}`, {
            type: "text",
            parent: '889956259699240981',
            permissionOverwrites: [
                {
                    id: buttonClicker.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES"]
                },
                {
                    id: guild.roles.everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES"]
                },
            ]
        })
        let openedTicket = new MessageEmbed()
            .setAuthor(`Nowy ticket!`)
            .setColor("#4B931B")
            .setThumbnail(buttonClicker.user.displayAvatarURL({ dynamic: true }))
            .setDescription('Siemka, opisz nam powód stworzenia tego ticketa a za chwilę ktoś postara się odpisać')
        let supportButton = new MessageButton()
            .setLabel("Zamknij ticket")
            .setEmoji("🔒")
            .setStyle("blurple")
            .setID("TICKET_CLOSE_WSPÓŁPRACA")
        ticketChannel.send(`${buttonClicker.user}`, {
            embed: openedTicket,
            components: new MessageActionRow()
                .addComponent(supportButton)
        })
    }
    if (button.id === `TICKET_CLOSE_WSPÓŁPRACA`) {
        let ticketChannel = button.channel;

        let deletingTicket = new MessageEmbed()
            .setAuthor(`Ticket został zamknięty`)
            .setColor("RED")
            .setDescription(`Zostanie on usunięty za (**5**) sekund!`)
        ticketChannel.send(deletingTicket)
        setTimeout(() => { ticketChannel.delete() }, 5000);

    }

    if (button.id === 'WERYFIKACJA') {
        let buttonClicker = button.clicker.member;
        let kanalverify = button.channel;
        button.clicker.member.roles.add('888889457544155146')
        kanalverify.send(new MessageEmbed()
            .setAuthor(`Sukces!`)
            .setDescription(`> ${buttonClicker} Twoja weryfikacja została zakończona poprawnie!`)
            .setColor("GREEN"))
            .then(message => {
                message.delete({ timeout: 7000 })
            })
    }
}