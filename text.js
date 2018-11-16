
const { iam_apikey, url } = require('./key.json')
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs')
const textToSpeech = new TextToSpeechV1({
    iam_apikey,
    url
  })

const synthesizeParams = {
  text: "Austin the Insectoid Stalker came back and crushed Forest!",
  accept: 'audio/mp3',
  voice: 'en-GB_KateVoice'
}

// Pipe the synthesized text to a file.

const asleep = (sleepTime) => new Promise(function(resolve, reject) {
    setTimeout(() => {resolve(true)}, sleepTime)
  })

const getAudio = text => new Promise(async(resolve, reject) => {
  console.log('get audio called',text)
  const synthesizeParams = {
    text: text + "!",
    accept: 'audio/mp3',
    voice: 'en-GB_KateVoice'
  }
  let synthFunction = textToSpeech.synthesize(synthesizeParams)
  while (!synthFunction) {
    await asleep(1000) 
    synthFunction = textToSpeech.synthesize(synthesizeParams)
  }
  synthFunction.on('error', function(error) {
    console.log(error)
  }).pipe(fs.createWriteStream(`${text}.mp3`)).on('finish', () => {
    console.log('should be resolving')
    resolve(`${text}.mp3`)
  })
})

module.exports = getAudio
