
const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)
    message.react(ayarlar.yes)
  }
  })

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Developed by Ferhat" }, status: "dnd" });
  })


client.on("ready", () => {
    console.log(chalk.redBright(`Matthe Register Bot Aktif!`))
})

// orospunun evladi intent ac

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:906555723578765332:907636877140586538>`,
            '1': `<a:901395945672044584:907636472570601602>`,
            '2': `<a:901395916739723324:907636395147944026>`,
            '3': `<a:901395966282833930:907636482095861852>`,
            '4': `<a:901395996473426000:907636490950033439>`, // BOTUN OLDUĞU SUNUCUDA OLMA ŞARTI İLE HARAKETLİ EMOJİDE KOYABİLİRSİNİZ!
            '5': `<a:901396021421146112:907636500924096552>`,
            '6': `<a:901396045878153247:907636584675938344>`,
            '7': `<a:901396064710578186:907636672982810654>`,
            '8': `<a:901396108587180054:907636714116382811>`,
            '9': `<a:901396130833780736:907636730570629210>`}[d];})}
       const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); 
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `<a:no1:903546108729495582>`
  if (kurulus > 1296000000) kontrol = `<a:satuke_ok:903541395699146772>`
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
    kanal.send(`
 <@`+ member + `>-(\`${member.id}\`) **Phive'ye hoşgeldin!**

<a:xieyildizz:903542057216389120> **Seninle beraber `+üyesayısı+` değerli üyeye ulaştık.**

<a:reborn_yildizcik:903543155260030976> **Hesabın __${moment(member.user.createdAt).format("DD MMMM YYYY dddd (hh:mm:ss)")}__ önce oluşturulmuş. `+kontrol+`**

<a:xieyildizz:903542057216389120> **Tagımızı** (✦) alarak bize destek ola bilirsin!

<a:reborn_yildizcik:903543155260030976> Sunucumuzun <#901912168641990667> kanalındaki **kuralları** okumayı unutmayın.

<a:xieyildizz:903542057216389120> Kayıt olmak için sol taraftaki \` V.Confirmed \` ses kanallarından birine girerek (<a:862995474097242122:907636360335220736> **ses teyit**) vermen gerekiyor, <@&901909365362155530> rolündeki yetkililerimiz seninle ilgilenicektir.

Şimdiden iyi eğlenceler! <a:matthe_tada2:903542188863029288>`)});

client.login(process.env.Token)

client.on("guildMemberAdd", member => {
member.setNickname(`• İsim | Yaş`) 
});

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });

//----------------------------------------------------- TAG ROL ------------------------------------------------\\

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = (ayarlar.SunucuID)
    const roleID = (ayarlar.tagRol)
    const tag = (ayarlar.tag)
    const chat = (ayarlar.sohbetKanal)
    const taglog = (ayarlar.tagLog)
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Developed by Beş');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için ondan <@&902620331473264651> rolünü aldım!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**${newUser} Tagımızı alarak ailemize katıldı!** <a:903903593680228383:907637034263412826>`).then(x => x.delete({ timeout: 9000 }))
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için ona <@&902620331473264651> rolünü verdim!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (ayarlar.etikettag) && newUser.discriminator !== (ayarlar.etikettag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== (ayarlar.etikettag) && newUser.discriminator == (ayarlar.etikettag)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })

///////---loglarrrr--/////


client.on('voiceStateUpdate', (oldMember, newMember) => {
    { 
      let giriş = client.channels.cache.get('907644939440099378');
      let çıkış = client.channels.cache.get('907644939440099378');
      let odadeğişme = client.channels.cache.get('907644939440099378');
      let logKanali = client.channels.cache.get('907644939440099378');
      let susturma = client.channels.cache.get('907644939440099378');
      let sağırlaştırma = client.channels.cache.get('907644939440099378');
  
      if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!** <:902635088485949452:907636744621531186>`).catch();
      if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!** <:902635088485949452:907636744621531186>`).catch();
      if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!** <:902635088485949452:907636744621531186>`).catch();
      if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** <:902635088485949452:907636744621531186> (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
      if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!** <:902635088485949452:907636744621531186>`).catch();
      if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!** <:902635088485949452:907636744621531186>`).catch();
      if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!** <:902635088485949452:907636744621531186>`).catch();
      if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!** <:902635088485949452:907636744621531186>`).catch();
    };
  });


//----------------------------------------------------- TAG ROL ------------------------------------------------\\

//dm mesaj \\

client.on("guildMemberAdd", member => {
    member.send('<a:heart11475:903542594544484363> Sunucumuza Hoşgeldin Tag Alarak Veya Boost Basarak Bize Destek Olabilirsin , Ses Teyit Kanallarına Girerek Kayıt Olabilirsin Şimdiden İyi Eğlenceler Dilerim.')
    })


       
// gunaydin //

client.on('message', msg => {
    if (msg.content === 'Günaydın') {
        msg.channel.send('Günaydın , Hayırlı sabahlar <a:strigayildiz3:903542790565277696>'); // tagı yazınız
    } else if (msg.content === 'gunaydin') {
        msg.channel.send('Günaydın , Hayırlı sabahlar <a:strigayildiz3:903542790565277696>');// tagı yazınız
    } else if (msg.content === 'gunaydn') {
        msg.channel.send('Sanada Günaydın <a:strigayildiz3:903542790565277696>');// tagı yazınız
    } 
});

//iyi geceler//

client.on('message', msg => {
    if (msg.content === 'iyi geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar <:902635745796313088:907636814293127258>'); // tagı yazınız
    } else if (msg.content === 'İyi Geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar <:902635745796313088:907636814293127258>');// tagı yazınız
    } else if (msg.content === 'ig') {
        msg.channel.send('İyi Geceler <:902635745796313088:907636814293127258>');// tagı yazınız
    } 
});




// SA AS 2 //

client.on('message', msg => {
    if (msg.content === 'Sa') {
        msg.channel.send('Aleyküm Selam <:856980632135532604:907636341695737876>'); // tagı yazınız
    } else if (msg.content === 'sa') {
        msg.channel.send('Aleyküm Selam , Hoş Geldin <:856980632135532604:907636341695737876>');// tagı yazınız
    } else if (msg.content === 'Selam') {
        msg.channel.send('Selam Hoşgeldin <:856980632135532604:907636341695737876>');// tagı yazınız
    } else if (msg.content === 'selam') {
       msg.channel.send('Selam Hoşgeldin <:856980632135532604:907636341695737876>');
      }
});

//////______//////

/////______//////

  const kiltifat = [
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
    'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
     'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
     'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
     'Etkili gülüş kavramını ben senden öğrendim.',
     'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
     'Gözlerinle baharı getirdin garip gönlüme.',
     'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
     'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
     'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
     'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
     'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
     'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
     'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Biraz Çevrendeki İnsanları Takarmısın ?',
    'Biliyormusun? Beş seni çok seviyor...', 
    'Pastayı Muzla , Seni Tuzla..',
    'Çaya kaç tane şeker atsam , senin kadar tatlı ola bilir ?', 
     'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
     'Onu Bunu Boşver de bize gel 2 bira içelim.',
      'Merhem oldun yaralarıma',
      'Mucizelerden bahsediyordum sen geldin aklıma.',
  ];
  client.on("message", async message => {
    if(message.channel.id !== ('902621383174000670')) return;
    let duckywashere = db.get('chatiltifat');
    await db.add("chatiltifat", 1);
    if(duckywashere >= 35) {
      db.delete("chatiltifat");
      const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
      message.reply(`${(kiltifat)[random]}`);
    };
  });
