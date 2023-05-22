import { Assets, Scenes } from "../constants";
import { PhaserLayer } from "../createPhaserLayer";


export function createUISystem(layer: PhaserLayer) {

    const {
        networkLayer : {
            network,
            systemCalls: {
                spawn,
                kill,
            },
        },
        scenes: {
            UI: {
                phaserScene,
                input
            }
        },
    
    } = layer;

    function createButton(px : number, py : number, label: string, onClick: () => void) {

        //const button = phaserScene.add.rectangle(px + pw - 128 - 8, py + ph - 64 - 8, 128, 64, 0x00FF00, 1)
        const button = phaserScene.add.sprite(px, py, Assets.ButtonUp)
        .setScale(0.5,0.5)
        .setInteractive()
        .on('pointerover', () => {
            
        })
        .on('pointerout', () => {
            
        })
        
        const buttonText = phaserScene.add.text(0, button.getCenter().y - 8, label, {
            fontFamily: 'PixelMix',
            align: "center",
            fontSize: "16px",
            maxLines: 1,            
        });

        buttonText.x = button.getCenter().x - buttonText.displayWidth / 2;

        button.on('pointerdown', () => {
            button.setTexture(Assets.ButtonDown);
            buttonText.y = button.getCenter().y - 2;
        });

        button.on('pointerup', () => {
            button.setTexture(Assets.ButtonUp);
            buttonText.y = button.getCenter().y - 8;
            onClick();
        });

        button.on('pointerout', () => {
            button.setTexture(Assets.ButtonUp);
            buttonText.y = button.getCenter().y - 8;
        })
    }

    function createPopup(px : number, py : number, pw : number, ph: number, text: string) {

        phaserScene.add.rectangle(px, py, pw, ph, 0x000000, 0.5).setOrigin(0,0).setStrokeStyle(1, 0xffffff, 1);
        phaserScene.add.rectangle(px+1, py+1, pw-2, 32, 0xff0000, 0.5).setOrigin(0,0);
    
        const titleLabel = phaserScene.add.text(px + 8, py + 10, text, {
            fontFamily: 'PixelMix',
            maxLines: 1,
            fixedHeight: 16,
            fixedWidth: pw - 16,
            
        });

        const blockNumberSubscription = network.blockNumber$.subscribe((blockNumber) => {
            titleLabel.setText(text + " " + blockNumber);
        });

        titleLabel.on('destroy', () => {
            blockNumberSubscription.unsubscribe();
        });

        createButton(px + 72, py + 64, "SPAWN", () => {
            spawn(1,1);
        });

        createButton(px + 72, py + 128, "KILL", () => {
            kill();
        });
    }

    phaserScene.scene.start(Scenes.UI);

    createPopup(10, 10, 400, 300, "TEST CONSOLE");    



}