import Phaser from "phaser"
import BBCodeTextPlugin from "phaser3-rex-plugins/plugins/bbcodetext";
import './style.css'
//make sure imports are imported after their dependencies!
import StartScene from './scenes/Start';
import GameplayScene from './scenes/Game';

const CONFIG = {
  type: Phaser.CANVAS,
  parent: 'phaser-game',
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    size: Phaser.Scale.FIT,
    zoom: 1
  },
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
    }
  },
  plugins: {
    global: [{
      key: 'rexBBCodeTextPlugin',
      plugin: BBCodeTextPlugin,
      start: true
    },
      // ...
    ]
  },
  zoom: 1,
  scene: [GameplayScene, StartScene]
}

export default CONFIG;

const GAME = new Phaser.Game(CONFIG)
