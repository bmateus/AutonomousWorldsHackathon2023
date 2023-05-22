import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { Direction } from "../layers/phaser/constants";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {

  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const spawn = (x: number, y: number) => {
    worldSend("spawn", [x, y]);
  };

  const kill = () => {
    worldSend("kill", []);
  };

  const move = (direction: Direction) => {
      worldSend("move", [direction]);
  };

  const beginTravel = (destX: number, destY: number) => {
      worldSend("beginTravel", [destX, destY]);
  };

  const endTravel = () => {
    worldSend("endTravel", []);
  };

  return {
    increment,
    spawn,
    kill,
    move,
    beginTravel,
    endTravel,
  };
}
