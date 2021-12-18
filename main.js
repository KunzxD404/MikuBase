const { WAConnection, Browsers, MessageType } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { getBuffer, getGroupAdmins, getRandom } = require('./lib/myfunc')
const { uncache, nocache } = require('./lib/loader')
const welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

require('./miku.js')
nocache('../miku.js', module => console.log(color('[WATCH]', 'red'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./main.js')
nocache('../main.js', module => console.log(color('[WATCH]', 'red'), color(`'${module}'`, 'green'), 'File is updated!'))

const starts = async (kunz = new WAConnection()) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               //BASE ORI BY KUNZXD        
kunz.logger.level = 'warn'
kunz.version = [2, 2140, 14]
console.log(color(figlet.textSync('MIKU CHAN', {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'red'))
kunz.browserDescription = ["KXD", "Browser", "3.0.0"];
kunz.on('qr', () => {
console.log(color('[ KxD ]', 'red'), color('Scan me'))
})
fs.existsSync(`./session.json`) && kunz.loadAuthInfo(`./session.json`)
kunz.on('connecting', () => {
console.log(color('[ KxD ]', 'red'), color('Menyambungkan...'))
})
kunz.on('open', () => {
console.log(color('[ KxD ]', 'red'), color('Tersambung'))
})
await kunz.connect({
timeoutMs: 30 * 1000
})
fs.writeFileSync(`./session.json`, JSON.stringify(kunz.base64EncodedAuthInfo(), null, '\t'))
kunz.on('chat-update', async (message) => {
require('./miku.js')(kunz, message)
})
kunz.on("group-participants-update", async (anu) => {
const isWelkom = welkom.includes(anu.jid)
try {
groupMet = await kunz.groupMetadata(anu.jid)
groupMembers = groupMet.participants
mem = anu.participants[0]
console.log(anu)
try {
ppimg = await kunz.getProfilePicture(mem)
} catch (e) {
ppimg = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
}
if (!isWelkom) return
if (anu.action == 'add' && !mem.includes(kunz.user.jid)) {
num = anu.participants[0]
ini_user = kunz.contacts[num]
mdata = await kunz.groupMetadata(anu.jid)
try {
ppimg = await kunz.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `*Hi @${num.split('@')[0]}*\n*selamat datamg di grup*`
let buffer = await getBuffer(ppimg)
kunz.sendMessage(mdata.id, buffer, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
} else if (anu.action == 'remove') {
num = anu.participants[0]
ini_user = kunz.contacts[num]
namaewa = ini_user.notify
mdata = await kunz.groupMetadata(anu.jid)
try {
ppimg = await kunz.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `*babay* *@${num.split('@')[0]}👋*`
let buffer = await getBuffer(ppimg)
kunz.sendMessage(mdata.id, buffer, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
}
} catch (e) {
console.log("Error : %s", color(e, "red"))
}
})
}
starts()
