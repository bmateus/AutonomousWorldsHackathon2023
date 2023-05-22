import { Entity, getComponentValueStrict } from "@latticexyz/recs";
import { PhaserLayer } from "./createPhaserLayer";
import { EmbodiedEntity, Sprite } from "@latticexyz/phaserx/src/types";

export const movingObjects : { entity: Entity, obj: EmbodiedEntity<"Sprite"> }[] = [];

export let currentBlockNumber = 0;

export let blockNumberSubscription : any = null;

export const setupBlockNumberSubscription = (layer: PhaserLayer) => {

    const {
        networkLayer: {
            network,
        },
    } = layer;

    blockNumberSubscription = network.blockNumber$.subscribe((blockNumber) => {
        currentBlockNumber = blockNumber;
    });

}

export const updateLoop = (scene: Phaser.Scene) => {

    //console.log("currentBlockNumber:", currentBlockNumber);

    movingObjects.forEach((movingObj) => {

        /*

        //update the player's position
        const playerMovement = getComponentValueStrict(Movement, movingObj.entityid);
        const playerPosition = getComponentValueStrict(Position, movingObj.entityid);

        const t = (playerMovement.end - playerMovement.start) / currentBlockNumber;

        const targetTilePosition = { 
            x: (playerMovement.destX - playerPosition.x) / t,
            y: (playerMovement.destY - playerPosition.y) / t 
        };

        const targetPosition = tileCoordToPixelCoord(targetTilePosition, TILE_WIDTH, TILE_HEIGHT);                
        const currentPos = obj.position;
        //smoothly move the player to the target position
        obj.setPosition(
            currentPos.x + (targetPosition.x - currentPos.x) * 0.1, 
            currentPos.y + (targetPosition.y - currentPos.y) * 0.1
        );

        */

    });

};
