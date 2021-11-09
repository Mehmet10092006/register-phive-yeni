const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
exports.run= async (client, message, args) => {       

let Tag = (ayarlar.tag)
let Etiket = (ayarlar.etikettag) 

   let TotalMember = message.guild.memberCount
          let Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          let Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(Etiket)).size;
          let toplamTag = Etiketiniz + Taglı
          let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          let Boost = message.guild.premiumSubscriptionCount;


message.channel.send(new Discord.MessageEmbed().setDescription(`
<a:yildiz:903542394325200896> Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.

<a:yildiz:903542394325200896> Şu an **${Online}** **online** kullanıcı bulunmaktadır.

<a:yildiz:903542394325200896> **Tagımızda** **${Taglı}** kullanıcı bulunuyor.

<a:yildiz:903542394325200896> **Ses kanallarında** **${Voice}** kullanıcı bulunmaktadır.

<a:yildiz:903542394325200896> Sunucumuzda **${Boost}** adet **booster** bulunmaktadır.
`))

message.react(ayarlar.yes)

}
exports.config = {
    name: "say",
    guildOnly: true,
    aliases: ["say"]
}