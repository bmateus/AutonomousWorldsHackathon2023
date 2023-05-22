import { PhaserLayer } from "../createPhaserLayer";
import { createCamera } from "./createCamera";
import { createMapSystem } from "./createMapSystem";
import { createPlayerSystem } from "./createPlayerSystem";
import { createControlsSystem } from "./createControlSystem";
import { createUISystem } from "./createUISystem";
import { createDebugger } from "@latticexyz/phaserx";

export const registerSystems = (layer: PhaserLayer) => {
  createCamera(layer);
  createMapSystem(layer);
  createPlayerSystem(layer);
  createControlsSystem(layer);
  //createDebugger(layer);
  createUISystem(layer);
};
