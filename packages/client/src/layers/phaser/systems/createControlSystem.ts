import { Coord, pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Direction, TILE_HEIGHT, TILE_WIDTH } from "../constants";
import { PhaserLayer } from "../createPhaserLayer";

export function createControlsSystem(layer: PhaserLayer) {
  const {
    scenes: {
      Main: {
        input,
        objectPool,
        camera,
      },
    },
    networkLayer: {
      systemCalls: {
        move,
      },
      playerEntity,
    },
  } = layer;

  function clientMove(tx : number, ty : number) 
  { 
    if (playerEntity)
      {
        const playerObj = objectPool.get(playerEntity, "Sprite");
        
        console.log("moving...", playerObj);

        playerObj.setComponent({  
          id: "position",
          now: (sprite) => {
            
            const tileCoord = pixelCoordToTileCoord({x: sprite.x, y: sprite.y}, TILE_WIDTH, TILE_HEIGHT);
            const newPos = tileCoordToPixelCoord({x: tileCoord.x + tx, y: tileCoord.y + ty}, TILE_WIDTH, TILE_HEIGHT);

            console.log("moving to", newPos.x, newPos.y);
            sprite.setPosition(newPos.x,newPos.y);
            camera.centerOn(newPos.x, newPos.y);
          }
        });
      }
  }

  input.onKeyPress(
    keys => keys.has("W"),
    () => {
      clientMove(0, -1);
      move(Direction.North);
    });

  input.onKeyPress(
    keys => keys.has("A"),
    () => {
      clientMove(-1, 0);
      move(Direction.West);
    }
  );

  input.onKeyPress(
    keys => keys.has("S"),
    () => {
      clientMove(0, 1);
      move(Direction.South);
    }
  );

  input.onKeyPress(
    keys => keys.has("D"),
    () => {
      clientMove(1, 0);
      move(Direction.East);
    }
  );
}