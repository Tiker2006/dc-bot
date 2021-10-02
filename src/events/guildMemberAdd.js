const { MessageEmbed } = require('discord.js')

module.exports = async (client, member) => {
    member.guild.channels.cache.get('8888890954382196766')
    member.roles.add('785645131612029008')
        .send(new MessageEmbed()
            .setAuthor(`Nowy użytkownik!`)
            .setColor("RANDOM")
            .setDescription(`Witaj <@${member.user.id}> \n\nŻyczymy mile spędzonego czasu na naszym serwerze! \n\n> TOPHC.EU ma teraz: **${client.users.cache.size}** użytkowników!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true })))
        .catch(e => console.log(e))
}