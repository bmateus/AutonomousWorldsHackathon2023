import { Tileset } from "../../../artTypes/tiles";
import { PhaserLayer } from "../createPhaserLayer";
import { createNoise2D } from "simplex-noise";

export function createMapSystem(layer: PhaserLayer) {
  const {
    scenes: {
      Main: {
        maps: {
          Main: { putTileAt },
        },
      },
    },
  } = layer;

  const noise = createNoise2D();

  for (let x = -100; x < 100; x++) {
    for (let y = -100; y < 100; y++) {
      const coord = { x, y };
      const seed = noise(x, y);

      putTileAt(coord, Tileset.Dirt01, "Background");
      
      if (seed >= 0.75) {
        putTileAt(coord, Tileset.Dirt02, "Background");
      } else if (seed < -0.75) {
        putTileAt(coord, Tileset.Dirt03, "Background");
      }
    }
  }
}
