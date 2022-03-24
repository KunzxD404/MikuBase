const fs = require('fs')
const fetch = require('node-fetch');
const util = require('util');
const cheerio = require('cheerio') ;
const ytSearch = require('yt-search');
const googleSearch = require('google-it')
const FileType = require('file-type');
const spin = require('spinnies');
const axios = require('axios');
const moment = require('moment-timezone');
const chalk = require('chalk');
const ffmpeg = require('fluent-ffmpeg');
const googleImage = require('g-i-s');
const Crypto = require('crypto');
const fakeUa = require('fake-useragent');
const baileys = require('@adiwajshing/baileys');
const { exec, spawn, execSync } = require('child_process');



exports.Functions = class Functions {
constructor(){
this.ffmpeg = ffmpeg;
this.fakeUa = fakeUa;
this.exec = exec;
this.spins = spin;
this.spawn = spawn;
this.baileys = baileys;
this.cheerio = cheerio;
this.moment = moment;
this.util = util;
this.fs = fs;
this.fetch = fetch;
this.axios = axios;
this.util = util;
this.FileType = FileType;
this.ytSearch = ytSearch;
this.chalk = chalk;
this.animate = new spin();
}

pad(num) {
return (num < 10 ? '0' : '') + num;
}

logLoading(teks){
if (!Object.keys(this.animate.spinners).includes("Loading")){
this.animate.add('Loading',{text:teks})
} else {
this.animate.update('Loading',{text:teks})
}
return
}

logColor(text,color){
return this.chalk.keyword(color)(text)
}

createExif(packname, authorname, filename) {
        if (!filename) filename = 'data'
        const json = {
            'sticker-pack-id': 'CreateByAqul-RemasteredByZbin',
            'sticker-pack-name': packname,
            'sticker-pack-publisher': authorname,
        }
        let len = JSON.stringify(json).length
        const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
        const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
        if (len > 256) {
            len = len - 256
            code.unshift(0x01)
        } else {
            code.unshift(0x00)
        }
        const fff = Buffer.from(code)
        const ffff = Buffer.from(JSON.stringify(json))
        if (len < 16) {
            len = len.toString(16)
            len = '0' + len
        } else {
            len = len.toString(16)
        }
        const ff = Buffer.from(len, 'hex')
        const buffer = Buffer.concat([f, ff, fff, ffff])
        if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')
        return fs.writeFileSync(`./tmp/${filename}.exif`, buffer)
    }
  
getTime(format,date) {
if (date){
return moment(date).locale('id').format(format)
} else {
return moment.tz('Asia/Jakarta').locale('id').format(format)
}
}

sizeName(number) {
let SI_POSTFIXES = ["", "K", "M", "G", "T", "P", "E"]
let tier = Math.log10(Math.abs(number)) / 3 | 0
if(tier == 0) return number
let postfix = SI_POSTFIXES[tier]
let scale = Math.pow(10, tier * 3)
let scaled = number / scale
let formatted = scaled.toFixed(1)
if (/\.0$/.test(formatted))
formatted = formatted.substr(0, formatted.length - 2)
return formatted + postfix + 'b'
}

isUrl(url) {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

count(seconds) {
  var hours = this.pad(Math.floor(seconds / (60*60)))
  var minutes = this.pad(Math.floor(seconds % (60*60) / 60))
  var seconds = this.pad(Math.floor(seconds % 60))
return {hours,minutes,seconds}
}

metadataMsg(client,msg) {
let chatMetadata = (pesan) => {
let chatMeta = (mess) => {
mess = JSON.parse(JSON.stringify(mess))
mess.MsgRealType = Object.keys(mess.message)[0]
mess.message = mess.MsgRealType == 'ephemeralMessage'?mess.message.ephemeralMessage.message:mess.message
mess.type = Object.keys(mess.message)[0]
mess.data = typeof mess.message[mess.type]== "object" ? Object.keys(mess.message[mess.type]).includes("contextInfo") ? Object.keys(mess.message[mess.type]).concat(Object.keys(mess.message[mess.type].contextInfo)) : Object.keys(mess.message[mess.type]) : Object.keys(mess.message)
mess.StringMsg = (mess.type === baileys.MessageType.text) ? mess.message.conversation : (mess.data.includes('caption')) ? mess.message[mess.type].caption : (mess.type == baileys.MessageType.extendedText) ? mess.message[mess.type].text : (mess.type == 'buttonsResponseMessage') ? mess.message[mess.type].selectedButtonId : ''
mess.body = mess.message[mess.type]
mess.from = mess.key.remoteJid
mess.isGroup = mess.from.endsWith('g.us')
mess.sender = mess.isGroup ? mess.participant ? mess.participant : client.user.jid : mess.key.remoteJid
mess.mentionedJid = mess.data.includes('contextInfo') && mess.data.includes('mentionedJid')? mess.message[mess.type].contextInfo.mentionedJid : false
mess.isText = mess.type == 'conversation' || mess.type == 'extendedTextMessage'
mess.quotedMsg = mess.data.includes('contextInfo') && mess.data.includes('quotedMessage')?{key:{remoteJid:mess.from,fromMe:mess.message[mess.type].contextInfo.participant == client.user.jid,id:mess.message[mess.type].contextInfo.stanzaId},message:mess.message[mess.type].contextInfo.quotedMessage,participant: mess.message[mess.type].contextInfo.participant}:false
mess.isOwner = botinfo.ownerNumber.includes(mess.sender.split('@')[0]) || mess.key.fromMe
mess.groupData = mess.isGroup ? client.chats.get(mess.from) : false
mess.senderData = client.chats.get(mess.sender)
//function
mess.downloadMsg = async(save) => {
if (mess.isText) throw "Not A Media Message"
let buffer = await client.downloadMediaMessage(mess)
if (save){
fs.writeFileSync(save,buffer)
return {buffer,filename:save}
}
return {buffer}
}
mess.deleteMsg = async(forAll) => {
if (forAll) return await client.deleteMessage(mess.key.remoteJid,mess.key)
return await client.clearMessage(mess.key)
}
mess.loadQuotedMsg = async() => {
if (!mess.quotedMsg) throw 'Not Quoted Message'
return await client.loadMessage(mess.from,mess.quotedMsg.key.id)
}
mess.reloadMsg = async() => {
return await client.loadMessage(mess.from,mess.key.id)
}
mess.resendMsg = async(jid,opt) => {
return await client.sendMessageFromContent(jid,mess.message,opt)
}
return mess
}
let chatData = chatMeta(pesan)
chatData.quotedMsg = chatData.quotedMsg ? chatMeta(chatData.quotedMsg):false
return chatData
}
let chatData = chatMetadata(msg)
let groupMetadata = async()=>{
if(!chatData.isGroup) throw 'From Is Not A Group'
let groupMetadata = await client.groupMetadata(chatData.from)
let groupAdmins = groupMetadata.participants.filter(res => res.isAdmin)
let ClientData = (groupMetadata.participants.find(res => res.jid == client.user.jid))
let isClientAdmin = ClientData.isAdmin||ClientData.isSuperAdmin
let SenderData = (groupMetadata.participants.find(res => res.jid == mess.sender))
let isSenderAdmin = SenderData.isAdmin || SenderData.isSuperAdmin
return {metadata:groupMetadata,groupAdmins,isClientAdmin,ClientData,SenderData,isSenderAdmin}
}
let quotedMsgData = async() => {
if (!chatData.quotedMsg) throw "Not Quoted Any Message"
return chatMetadata(await chatData.loadQuotedMsg())
}
return {...chatData,groupMetadata,quotedMsgData}
}

async searchImage(query) {
return new Promise(async (resolve,reject) => {
res = await googleImage(query,resultImage)
function resultImage(error,result) {
if (error) reject(error)
if (result) resolve(result)
}
})
}

async delay(ms) {
 return new Promise(resolve => setTimeout(resolve, ms))
}

async start (){
console.clear()
let kali = fs.readFileSync('./src/kali.cat').toString()
console.log(this.logColor(kali,'silver'))
console.log(this.logColor(`Starting Running Bot......`,'silver'))
await this.delay(3000)
console.clear()
console.log(this.logColor(` _____   __    _             ____        __ 
/__  /  / /_  (_)___        / __ )____  / /_
  / /  / __ \\/ / __ \\______/ __  / __ \\/ __/
 / /__/ /_/ / / / / /_____/ /_/ / /_/ / /_  
/____/_.___/_/_/ /_/     /_____/\\____/\\__/  
                                            
`,'silver'))
await this.delay(1)
}


async googleSearch(query) {
return googleSearch({query})
}

}
exports.WAConnection = class WAConnection extends baileys.WAConnection {
		 async reply(mess, text, opt) {
		  return await this.sendMessage(mess.key.remoteJid, text, baileys.MessageType.extendedText, { quoted:mess, ...opt})
		  } 
     async downloadM(m, save) { 
      	if (!m) return Buffer.alloc(0) 	
      	if (!m.message) m.message = { m }	 
      	if (!m.message[Object.keys(m.message)[0]].url) await this.updateMediaMessage(m) 	 
      	if (save) return this.downloadAndSaveMediaMessage(m) 	
      	return await this.downloadMediaMessage(m) 	
      }
     async getBuffer(path,save){
       let buffer = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path, { headers: { 'User-Agent': fakeUa()}})).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
       if (save) {
       fs.writeFileSync(save,buffer)
       return {filname: save,buffer}
       } else {
        return buffer
       }
      }
     async sendMessageFromContent(jid,obj,opt={}){
     let prepare = await this.prepareMessageFromContent(jid,obj,opt)
    await this.relayWAMessage(prepare)
    return prepare
     }
     async fakeReply(jid,message,type,opt,fakeJid,participant,fakeMessage){
     return await this.sendMessage(jid,message,type,{
  quoted: { key: {fromMe: jid == this.user.jid, participant,remoteJid: fakeJid },
"message": fakeMessage}, 
...opt
})
     }
     async prepareSticker(path,exifFile){
       let buf = await this.getBuffer(path)
       let { ext } = await FileType.fromBuffer(buf)
       if (!fs.existsSync("./tmp")) fs.mkdirSync('tmp')
       let fileName = `./tmp/${Date.now()}.${ext}`
       let output = fileName.replace(ext,'webp')
       fs.writeFileSync(fileName,buf)
       if (ext == 'webp'){
         if (exifFile){
         return new Promise((resolve,reject) => {
         exec(`webpmux -set exif ${exifFile} ${output} -o ${output}`,(err) => { 
           if (err) throw err 
        let result = fs.readFileSync(output)
       fs.unlinkSync(output)
       resolve(result)
         })
         })
         } else {
       let result = fs.readFileSync(output)
       fs.unlinkSync(output)
       return result
         }
       }
       return new Promise(async(resolve,reject) => {
         await ffmpeg(fileName).input(fileName).on('error', function (err) { 
           fs.unlinkSync(fileName)
           reject(err)
}).on('end', function () {
if (exifFile) {
exec(`webpmux -set exif ${exifFile} ${output} -o ${output}`,(err) => { 
if (err) return err
let result = fs.readFileSync(output)
fs.unlinkSync(fileName)
fs.unlinkSync(output)
resolve(result)
})
} else {
let result = fs.readFileSync(output)
fs.unlinkSync(fileName)
fs.unlinkSync(output)
resolve(result)
}
}).addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(output)
       })
     }
     
     async sendBugGC(jid, ephemeralExpiration, opts) {
            const message = this.prepareMessageFromContent(
                jid,
                this.prepareDisappearingMessageSettingContent(ephemeralExpiration),
                {}
            )
            await this.relayWAMessage(message, opts)
            return message
        }

        fakeThumb = (from, buffer, capt = '', msg = '', fakethumb = fs.readFileSync(setting.pathImg), men = []) => {
            let ai = {
                thumbnail: fakethumb ? fakethumb : fs.readFileSync(setting.pathImg),
                quoted: msg ? msg : '',
                caption: capt ? capt : '',
                contextInfo: {
                    "mentionedJid": men ? men : []
                }
            }
            return this.sendMessage(from, buffer, MessageType.image, {})
        }

        cekInviteCode = (code) => {
            return this.query({json: ["query", "invite", code]})
        }

        async getQuotedMsg (msg) {
            if (!msg.isQuotedMsg) return false
            let qi = await this.loadMessage(msg.key.remoteJid, msg.quotedMsg.id)
            return await exports.serialize(this, qi)
        }
     async sendImage(jid,path,caption,quoted,opt){
     let buff = await this.getBuffer(path)
     return await this.sendMessage(jid,buff,'imageMessage',{quoted,caption,thumbnail: buff,...opt})
     }
     async sendVideo(jid,path,caption,quoted,opt){
     let buff = await this.getBuffer(path)
     return await this.sendMessage(jid,buff,'videoMessage',{quoted,caption,...opt})
     }
     async sendLocation(jid,property,opt){
     return await this.sendMessageFromContent(jid,{locationMessage: property},opt)
     }
     async sendLiveLocation(jid,property,opt){
     return await this.sendMessageFromContent(jid,{liveLocationMessage:property},opt)
     }
     async sendProduct(jid,property,opt){
      return await this.sendMessageFromContent(jid,{productMessage:property},opt)
     }
      async sendSticker(jid,path,opt,exifFile){
       let prepare;
       if (exifFile){
         prepare = await this.prepareSticker(path,exifFile)
       } else {
       prepare = await this.prepareSticker(path)
       }
       return await this.sendMessage(jid,prepare,baileys.MessageType.sticker,opt)
     }
    }
