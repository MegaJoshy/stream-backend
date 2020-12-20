const express = require('express')
const fetch = require('node-fetch')
const { Canvas, resolveImage } = require('canvas-constructor')
const { registerFont } = require('canvas')
const Vibrant = require('node-vibrant')

const router = express.Router();

router.get('/', async (req, res) => {
  const { data } = await fetch('https://api.livida.net/api/radio/').then(res => res.json())
  const colours = await Vibrant.from(data.song.art).maxColorCount(2).getPalette()

  registerFont(`${process.cwd()}/assets/OpenSans-Bold.ttf`, { family: 'OpenSans Bold' })
  registerFont(`${process.cwd()}/assets/OpenSans-Regular.ttf`, { family: 'OpenSans' })

  const nowplaying = new Canvas(1920, 1080)
    .stroke()
    .printLinearColorGradient(960, 0, 960, 1080, [{ position: 0, color: colours.LightVibrant.getHex() }, { position: 100, color: colours.Vibrant.getHex() }])
    .fill()
    .toBuffer()
  res.setHeader('Content-Type', 'image/png')
  res.end(nowplaying);
});

module.exports = router;
