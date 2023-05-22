import {
  defineSceneConfig,
  AssetType,
  defineScaleConfig,
  defineMapConfig,
  defineCameraConfig,
} from "@latticexyz/phaserx";
import worldTileset from "../../../public/assets/tilesets/tiles.png";
import { TileAnimations, Tileset } from "../../artTypes/tiles";
import { Sprites, Assets, Maps, Scenes, TILE_HEIGHT, TILE_WIDTH, Animations } from "./constants";
import { updateLoop } from "./updateLoop";

import buttonUpImg from "../../../public/assets/images/TextBTN_Medium.png";
import buttonDownImg from "../../../public/assets/images/TextBTN_Medium_Pressed.png";

const ANIMATION_INTERVAL = 200;

const mainMap = defineMapConfig({
  chunkSize: TILE_WIDTH * 64, // tile size * tile amount
  tileWidth: TILE_WIDTH,
  tileHeight: TILE_HEIGHT,
  backgroundTile: [Tileset.Dirt01],
  animationInterval: ANIMATION_INTERVAL,
  tileAnimations: TileAnimations,
  layers: {
    layers: {
      Background: { tilesets: ["Default"] },
      Foreground: { tilesets: ["Default"] },
    },
    defaultLayer: "Background",
  },
});

export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: {
        [Assets.Tileset]: {
          type: AssetType.Image,
          key: Assets.Tileset,
          path: worldTileset,
        },
        [Assets.MainAtlas]: {
          type: AssetType.MultiAtlas,
          key: Assets.MainAtlas,
          // Add a timestamp to the end of the path to prevent caching
          path: `/assets/atlases/atlas.json?timestamp=${Date.now()}`,
          options: {
            imagePath: "/assets/atlases/",
          },
        },
      },
      maps: {
        [Maps.Main]: mainMap,
      },
      sprites: {
        [Sprites.Hero]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/hero/idle/1.png",
        },
        [Sprites.Goblin]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/goblin/idle/1.png",
        },
        [Sprites.Skeleton]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/skeleton/idle/1.png",
        },
        [Sprites.Treasure]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/treasure/idle/1.png",
        },
        [Sprites.Ruby]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/gems/ruby/1.png",
        },
      },
      animations: [
        {
          key: Animations.HeroIdle,
          assetKey: Assets.MainAtlas,
          startFrame: 1,
          endFrame: 4,
          frameRate: 6,
          repeat: -1,
          prefix: "sprites/hero/idle/",
          suffix: ".png",
        },
      ],
      tilesets: {
        Default: {
          assetKey: Assets.Tileset,
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
        },
      },
      update: updateLoop,
    }),
    [Scenes.UI] : defineSceneConfig({
      //active: true,
      //visible: true,
      //key: "UI",
      preload: () => {
        console.log("================ UI preload");
      },
      assets: {
        [Assets.ButtonUp]: {
          type: AssetType.Image,
          key: Assets.ButtonUp,
          path: buttonUpImg,
        },
        [Assets.ButtonDown]: {
          type: AssetType.Image,
          key: Assets.ButtonDown,
          path: buttonDownImg,
        },
      },
      sprites: {},
      tilesets: {},
      maps: {},
      animations: [
        
      ]
    })
  },
  scale: defineScaleConfig({
    parent: "phaser-game",
    zoom: 1,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    pinchSpeed: 0,
    wheelSpeed: 0,
    maxZoom: 3,
    minZoom: 1,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};
