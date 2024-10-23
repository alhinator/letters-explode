import './style.css'
import Phaser from "phaser"

const CONFIG = {
  type: Phaser.CANVAS,
  parent: 'phaser-game',
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    size: Phaser.Scale.FIT,
    zoom: 0.75
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
    }
  },
  zoom: 1,
  scene: [/*StartScene, GameplayScene*/]
}

export default CONFIG;

const GAME = new Phaser.Game(CONFIG)
