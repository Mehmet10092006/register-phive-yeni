const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Tag rolü vermek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()


etiketlenenKişi.roles.add(ayarlar.tagRol)

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`Kullanıcıya <@&${ayarlar.tagRol}> rolünü verdim!`)).then(x => x.delete({ timeout: 11000 })) //Youtube Matthe

}
exports.config = {
    name: "tagges",
    guildOnly: true,
    aliases: ["taglı", "taglırol", "tagt"]
}