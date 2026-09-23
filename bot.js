const mineflayer = require('mineflayer')

const SERVER_HOST = 'seni_oldiraman.aternos.me'
const SERVER_PORT = 35104
const BOT_USERNAME = 'AutoJoinBot'
const VERSION = '1.21.1'
const RECONNECT_DELAY = 10000

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createBot() {
  console.log(`[⏱] ${new Date().toLocaleTimeString()} - Serverga ulanmoqda...`)
  
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    version: VERSION
  })

  bot.on('spawn', () => {
    console.log(`[✓] ${new Date().toLocaleTimeString()} - Serverga kirdi!`)
    
    setInterval(() => {
      try {
        const action = Math.random()
        
        if (action < 0.4) {
          bot.setControlState('jump', true)
          setTimeout(() => bot.setControlState('jump', false), 300)
          console.log('[→] Jump')
        } else if (action < 0.7) {
          bot.look(Math.random() * Math.PI * 2, Math.random() - 0.5)
          console.log('[→] Look around')
        } else {
          const dir = Math.random() > 0.5 ? 'forward' : 'back'
          bot.setControlState(dir, true)
          setTimeout(() => bot.setControlState(dir, false), 1000)
          console.log(`[→] Move ${dir}`)
        }
      } catch (e) {
        console.log('[⚠] Action error:', e.message)
      }
    }, randomDelay(45000, 120000))

    setInterval(() => {
      try {
        const messages = [
          'Hello!',
          'Hi there',
          'Nice server!',
          'Good game',
          ':)'
        ]
        const msg = messages[Math.floor(Math.random() * messages.length)]
        bot.chat(msg)
        console.log(`[💬] Chat: ${msg}`)
      } catch (e) {
        console.log('[⚠] Chat error:', e.message)
      }
    }, randomDelay(600000, 900000))
  })

  bot.on('end', () => {
    console.log(`[×] ${new Date().toLocaleTimeString()} - Ulanish uzildi, qayta ulanmoqda...`)
    setTimeout(createBot, randomDelay(5000, 15000))
  })

  bot.on('kicked', (reason) => {
    console.log(`[KICKED] ${reason}`)
    setTimeout(createBot, randomDelay(10000, 30000))
  })

  bot.on('error', (err) => {
    console.log(`[ERROR] ${err.message}`)
    setTimeout(createBot, randomDelay(8000, 20000))
  })
}

createBot()
console.log('[START] AutoJoin bot ishga tushdi (anti-ban mode)')
