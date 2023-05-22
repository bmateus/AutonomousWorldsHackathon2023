import { Has, defineEnterSystem, defineExitSystem, defineSystem, getComponentValueStrict, hasComponent } from "@latticexyz/recs";
import { PhaserLayer } from "../createPhaserLayer";
import { Animations, TILE_HEIGHT, TILE_WIDTH } from "../constants";
import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
//import { createBlockNumberStream } from "@latticexyz/network";
import { setupBlockNumberSubscription, movingObjects } from "../updateLoop";

export function createPlayerSystem(layer: PhaserLayer) {

    console.log("Creating Player System");

    const {
        world,
        networkLayer: {
            network,
            components: {
                Position,
                Movement,
            },
            systemCalls: {
                beginTravel,
                endTravel,
            },
            playerEntity,
        },
        scenes: {  
            Main : {    
                objectPool,
                input,
                camera,
                maps: {
                    Main : {
                        putTileAt,
                        tiles
                    }
                },
                phaserScene,
            },
        },
        
    } = layer;

    setupBlockNumberSubscription(layer);
    
    phaserScene.input.on('pointerdown', (pointer : Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {

        const x = pointer.worldX;
        const y = pointer.worldY;
        const tileCoord = pixelCoordToTileCoord({x, y}, TILE_WIDTH, TILE_HEIGHT);

        console.log("Click", x, y, tileCoord, playerEntity, objectsClicked);

        if (playerEntity && hasComponent(Position, playerEntity) && !hasComponent(Movement, playerEntity))
        {
            beginTravel(tileCoord.x, tileCoord.y);
        }
                
    });
           
    defineEnterSystem(world, [Has(Position)], ({entity}) => {
        const playerObj = objectPool.get(entity, "Sprite");

        playerObj.setComponent({
            id: "animation",
            once: (sprite) => {
                sprite.play(Animations.HeroIdle);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    console.log("Clicked");
                    if (hasComponent(Movement, entity)) {
                        endTravel();
                    }
                })
            }
        });
    });

    defineExitSystem(world, [Has(Position)], ({entity}) => {
        objectPool.remove(entity);
    });

    defineEnterSystem(world, [Has(Movement)], ({entity}) => {
        const playerMovement = getComponentValueStrict(Movement, entity);
        console.log("Entity started moving!", entity, playerMovement);
        //movingObjects.push(entity);
    });

    defineExitSystem(world, [Has(Movement)], ({entity}) => {
        const playerMovement = getComponentValueStrict(Movement, entity);
        console.log("Entity stopped moving!", entity, playerMovement);
        //movingObjects.remove(entity);
    });

    defineSystem(world, [Has(Position)], ({entity}) => {

        const position = getComponentValueStrict(Position, entity);
        const { x, y } = tileCoordToPixelCoord(position, TILE_WIDTH, TILE_HEIGHT);
        const playerObj = objectPool.get(entity, "Sprite");

        playerObj.setComponent({
            id: "position",
            once: (sprite) => {
                sprite.setPosition(x, y);

                const isPlayer = entity === playerEntity;
                if (isPlayer) {
                    camera.centerOn(x, y);
                }
            }
        });

    });

}