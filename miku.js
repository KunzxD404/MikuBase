/*
BASE ORI BY KUNZXD😐
HANYA SEDIKIT NGAMBIL DI SC IKYY
SILAHKAN DIPAKE KAK:)
TQTQ JAN DIAPUS BTW:)

FITUR MASIH DIKIT SILAHKAN DIRECODE
KAN LU MASTAH🐦
*/


const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WA_MESSAGE_STUB_TYPES, WA_DEFAULT_EPHEMERAL,  ReconnectMode, ProxyAgent, ChatModification, GroupSettingChange, waChatKey, mentionedJid, processTime, Browsers, } = require("@adiwajshing/baileys")
const moment = require("moment-timezone")
const ffmpeg = require('fluent-ffmpeg')
const request = require('request');
const crypto = require('crypto')
const fs = require("fs-extra")
const util = require('util')
const { color, bgcolor } = require('./lib/color')
const { getBuffer, getGroupAdmins, getRandom } = require('./lib/myfunc')

//●●●●●●●●●●●●●●●●●●●●●● SETTING ●●●●●●●●●●●●●●●●●●●●●●                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               //BASE ORI BY KUNZXD🐦        

botName = 'Miku Chan'
ownerName = 'KxD'
ownerNumber = '6287778886786'
faketeks = '𝙺𝚄𝙽𝚉𝙱𝙾𝚃𝚉︎'
mypp = fs.readFileSync('thumbnail.jpg')

//●●●●●●●●●●●●●●●●●●●●●● DATABASE ●●●●●●●●●●●●●●●●●●●●●●

let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

//●●●●●●●●●●●●●●●●●●●●●● END JSON ●●●●●●●●●●●●●●●●●●●●●●

module.exports = kunz = async (kunz, kxd) => {
try {
if (!kxd.hasNewMessage) return
kxd = kxd.messages.all()[0]
if (!kxd.message) return
if (kxd.key && kxd.key.remoteJid == 'status@broadcast') return
if (kxd.key.id.startsWith('3EB0') && kxd.key.id.length === 12) return
const { Functions }= require('./lib/functions.js');
global.ky_ttt
global.blocked
kxd.message = (Object.keys(kxd.message)[0] === 'ephemeralMessage') ? kxd.message.ephemeralMessage.message : kxd.message
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
var ucapanWaktu = 'Malam🌃'
}
if(time2 < "19:00:00"){
var ucapanWaktu = 'Petang🌆'
}
if(time2 < "18:00:00"){
var ucapanWaktu = 'Sore🌅'
}
if(time2 < "15:00:00"){
var ucapanWaktu = 'Siang🏙'
}
if(time2 < "11:00:00"){
var ucapanWaktu = 'Pagi🌁'
}
if(time2 < "05:00:00"){
var ucapanWaktu = 'Malam🌉'
}
const content = JSON.stringify(kxd.message)
const from = kxd.key.remoteJid
const type = Object.keys(kxd.message)[0]     
const typeo = Object.keys(kxd.message)[0]
global.prefix
const cmd = (type === 'conversation' && kxd.message.conversation) ? kxd.message.conversation : (type == 'imageMessage') && kxd.message.imageMessage.caption ? kxd.message.imageMessage.caption : (type == 'videoMessage') && kxd.message.videoMessage.caption ? kxd.message.videoMessage.caption : (type == 'extendedTextMessage') && kxd.message.extendedTextMessage.text ? kxd.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
const prefix = /^[°Z•π÷×¶∆£¢€¥®™=|~#%^&.?/\\©^z+*,;]/.test(cmd) ? cmd.match(/^[°•Zπ÷×¶∆£¢€¥®™=|~#%^&.?/\\©^z+*,;]/gi) : '!'
var body = (typeo === 'conversation') ? kxd.message.conversation : (typeo === 'extendedTextMessage') ? kxd.message.extendedTextMessage.text : ''
var budy = (type === 'conversation') ? kxd.message.conversation : (type === 'extendedTextMessage') ? kxd.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
budy = (type === 'conversation') ? kxd.message.conversation : (type === 'extendedTextMessage') ? kxd.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1)
const arg = body.substring(body.indexOf(' ') + 1)
const isCmd = body.startsWith(prefix) 
const q = args.join(' ')
const botNumber = kunz.user.jid
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? kxd.participant : kxd.key.remoteJid
const senderr = kxd.key.fromMe ? kunz.user.jid : kxd.key.remoteJid.endsWith('@g.us') ? kxd.participant : kxd.key.remoteJid
const totalchat = await kunz.chats.all()
const groupMetadata = isGroup ? await kunz.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const conts = kxd.key.fromMe ? kunz.user.jid : kunz.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = kxd.key.fromMe ? kunz.user.name : conts.notify || conts.vname || conts.name || '-'
const mentionByTag = type == "extendedTextMessage" && kxd.message.extendedTextMessage.contextInfo != null ? kxd.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByreply = type == "extendedTextMessage" && kxd.message.extendedTextMessage.contextInfo != null ? kxd.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByreply) : []
const isOwner = ownerNumber.includes(senderr)
const isAntiLink = isGroup ? antilink.includes(from) : false
const isWelkom = isGroup ? welkom.includes(from) : false

mess = {
wait: '*Tunggu Sebentar*',
success: '*Success Kak*',
error: {
stick: '*Itu Bukan Sticker*',
Iv: 'Error'
},
only: {
group: '*Group only*',
badmin: '*Saya Bukan Admin:v*',
admin: '*Khusus Leluhur Grup:v*'
}
}

selectedButton = (type == 'buttonsResponseMessage') ? kxd.message.buttonsResponseMessage.selectedButtonId : ''
responseButton = (type == 'listResponseMessage') ? kxd.message.listResponseMessage.title : ''
const sendMess = (hehe, teks) => {
kunz.sendMessage(hehe, teks, text)
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? kunz.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('thumbnail.jpg')}, extendedText, { sendEphemeral: true, contextInfo: { "mentionedJid": memberr } }) : kunz.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('thumbnail.jpg')}, extendedText, { sendEphemeral: true, quoted: fstatus, contextInfo: { "mentionedJid": memberr } })
}
const reply = (teks) => { 
kunz.sendMessage(from, teks, text, {quoted:kxd, thumbnail: mypp})
}
const kick = function(from, orangnya){
for (let i of orangnya){
kunz.groupRemove(from, [i])
}
}
const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
kunz.sendMessage(to, media, type, {quoted: fstatus, mimetype: mime, caption: text, thumbnail: Buffer.alloc(0), contextInfo: {"mentionedJid": mids}})
fs.unlinkSync(filename)
});
}
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

//●●●●●●●●●●●●●●●●●●●●●● FAKE ●●●●●●●●●●●●●●●●●●●●●●

const fakestatus = (teks) => { kunz.sendMessage(from, teks, text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "Subscribe My YT KunzxD", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('thumbnail.jpg'), "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==" } }} }) }
const fstatus = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "Subscribe My YT KunzxD", 'jpegThumbnail': fs.readFileSync('thumbnail.jpg')}}}

//●●●●●●●●●●●●●●●●●●●●●● BUTTON ●●●●●●●●●●●●●●●●●●●●●●

const sendButLocation = async (id, text1, desc1, loc1, but = [], options = {}) => {
hehe = loc1
mhan = await zero.prepareMessage(from, hehe, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: "LOCATION"
}
zero.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}

//●●●●●●●●●●●●●●●●●●●●●● MEDIA DETECT ●●●●●●●●●●●●●●●●●●●●●●

colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
const { quotedMsg, isQuotedMsg, isBaileys } = kxd
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isVideo = (type === 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isListMsg = (type == 'listResponseMessage')
const isQuotedemage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
const isQuotediudio = isQuotedMsg ? (quotedMsg.type === 'audioMessage') ? true : false : false
const isQuotedoideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
const isQuotedpticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false

//●●●●●●●●●●●●●●●●●●●●●● GROUP ●●●●●●●●●●●●●●●●●●●●●●

if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
fakestatus(`*「 GROUP LINK TERDETEKSI 」*\n\nSepertinya kamu mengirimkan link nomor, maaf kamu akan di kick:)`)
setTimeout( () => {
kunz.groupRemove(from, [sender])}, 1000)
}
}
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/wa.me)/gi)) {
fakestatus(`*「 NOMOR LINK TERDETEKSI 」*\n\nSepertinya kamu mengirimkan link nomor, maaf kamu akan di kick:)`)
setTimeout( () => {
kunz.groupRemove(from, [sender])}, 1000)
}
}

//●●●●●●●●●●●●●●●●●●●●●● CMD ●●●●●●●●●●●●●●●●●●●●●●

if (isCmd && !isGroup)
console.log(color('[ CMD ]', 'red'), color(time), color(`${command} [${args.length}]`), 'from', color(pushname))
if (isCmd && isGroup)
console.log(color('[ CMD ]', 'red'), color(time), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))

//●●●●●●●●●●●●●●●●●●●●●● CASE/COMMAND ●●●●●●●●●●●●●●●●●●●●●●

switch (command) {
case 'menu':
teks = `Hi Kak ${pushname} Saya ${botName}

┏ *List Menu Bot*
┃
┣${prefix}antilink
┃
┣${prefix}welcome
┃
┣${prefix}promote
┃
┣${prefix}add
┃
┣${prefix}kick
┃
┣${prefix}opengc
┃
┣${prefix}closegc
┃
┣${prefix}hidetag
┃
┣${prefix}owner
┃
┗ *more?tambahin sendiri*
`
sendButlocation(from, teks, `${time}`, {jpegThumbnail:mypp,name:""}, [{buttonId:`.sc`,buttonText:{displayText:'Script'},type:1}], {contextInfo: { mentionedJid: [sender]}})
break
case 'antilink':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (!q) return reply(`Pilih 1 atau 0`)
if (args[0].toLowerCase() === '1'){
if (isAntiLink) return reply(`Udah aktif`)
antilink.push(from)
fs.writeFileSync('antilink.json', JSON.stringify(antilink))
reply('*「ANTILINK AKTIF」*\n\nYang Ngirim Link Group Bakal Ke Kick!')
} else if (args[0].toLowerCase() === '0'){
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('antilink.json', JSON.stringify(antilink))
reply('*「ANTILINK DI NONAKTIFKAN」*')
} else {
reply(`Pilih 1 atau 0`)
}
break
case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('!welcome 1/0')
if ((args[0]) === '1') {
if (isWelkom) return reply('Udah aktif')
welkom.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
} else if ((args[0]) === '0') {
welkom.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
} else {
reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
}
break
case 'promote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (kxd.message.extendedTextMessage === undefined || kxd.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
mentioned = kxd.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah Diterima menambahkan leluhur di grup ini'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
kunz.groupMakeAdmin(from, mentioned)
} else {
mentions(`Selamat @${mentioned[0].split('@')[0]} Kamu Telah Manjadi Leluhur Di Grup Ini`, mentioned, true)
kunz.groupMakeAdmin(from, mentioned)
}
break
case 'demote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (kxd.message.extendedTextMessage === undefined || kxd.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
mentioned = kxd.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah Diterima Menurunkan Jabatan Admin'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
kunz.groupDemoteAdmin(from, mentioned)
} else {
mentions(`Maaf Ya @${mentioned[0].split('@')[0]} Kamu kuturunkan menjadi member:)`, mentioned, true)
kunz.groupDemoteAdmin(from, mentioned)
}
break
case 'add':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Nomer Yg Mau Di Add Mana ?')
if (args[0].startsWith('08')) return reply('Gunakan Kode Negara Gan')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
kunz.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
reply('Gagal menambahkan target')
}
break
case 'kick':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if(!q)return reply(`*Format Error!*\n\n*Example : ${prefix + command} @tag*`)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
y = q.split('@')[1] + '@s.whatsapp.net'
kunz.groupRemove(from, [y])
reply(`Succes kick target😼`)
break
case 'opengc' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
reply(`✓Sukses Membuka Group *${groupMetadata.subject}*`)
kunz.groupSettingChange(from, GroupSettingChange.messageSend, false)
break
case 'closegc' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
reply(`✓Sukses Menutup Group *${groupMetadata.subject}*`)
kunz.groupSettingChange(from, GroupSettingChange.messageSend, true)
break
case 'hidetag':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
ht = body.slice(9)
members_id = []
for (let mem of groupMembers) {
members_id.push(mem.jid)
}
mentions(ht, members_id, false)
break
case 'owner':
let inilist = []
for (let i of ownerNumber) {
let vname = kunz.contacts[i] != undefined ? kunz.contacts[i].vname || kunz.contacts[i].notify : undefined
inilist.push({
"displayName": `${ownerName}`,
"vcard": 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n'
+ `FN:${ownerName}\n`
+ `ORG: Owner ${ownerName} ;\n`
+ `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n`
+ 'END:VCARD'.trim()
})
}
kD = await kunz.sendMessage(from, {
"displayName": `${inilist.length} kontak`,
"contacts": inilist 
}, 'contactsArrayMessage', { quoted: kxd })
break
case 'sc': case 'sourcecode': case 'script':
reply('https://github.com/KunzxD404/MikuBase\n\nPlease Take Star⭐\n\nAnd follow:)')
break

//●●●●●●●●●●●●●●●●●●●●●● END ●●●●●●●●●●●●●●●●●●●●●●

default:
if (/^=?>/.test(budy) && (isOwner || kxd.key.fromMe)){
let parse = /^=>/.test(budy) ? budy.replace(/^=>/,'return') : budy.replace(/^>/,'')
try{
let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
return reply(require('util').format(evaluate))
 } catch(e){
 return reply(require('util').format(e))
}
}
}
if (isGroup && budy != undefined) {
} else {
console.log('[',color('Text','teal'),']',`Pesan : ${budy} Dari`, color(pushname))
}		
} catch (e) {
e = String(e)
if (!e.includes("this.isZero")) {
console.log('Message : %s', color(e, 'cyan'))
}
}
}
// THANKS TO
//
// KUNZXD AND IKYY (CUMA ITU🗿)
// 
//
//
//
