// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../Utils.sol";
import { 
  Position, PositionTableId, PositionData,
  Movement, MovementTableId, MovementData
} from "../codegen/Tables.sol";

import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";
import { Direction } from "../codegen/Types.sol";

contract PlayerSystem is System {

  function spawn(int32 x, int32 y) public {

    require(x != 0 || y != 0, "cannot spawn at 0 coord");

    bytes32 player = addressToEntity(_msgSender());

    PositionData memory playerPosition = Position.get(player);

    require(playerPosition.x == 0 && playerPosition.y == 0, "Player already spawned");

    bytes32[] memory playersAtPosition = getKeysWithValue(PositionTableId, Position.encode(x, y));
    require(playersAtPosition.length == 0, "spawn location occupied");

    Position.set(player, x, y);

  }

  function kill() public {
    bytes32 player = addressToEntity(_msgSender());    
    Position.deleteRecord(player);
    Movement.deleteRecord(player);
  }

  function move(Direction dir) public {
    require(dir != Direction.None, "invalid direction");

    bytes32 player = addressToEntity(_msgSender());
    PositionData memory existingPosition = Position.get(player);

    int32 x = existingPosition.x;
    int32 y = existingPosition.y;

    if (dir == Direction.North) {
      y -= 1;
    } else if (dir == Direction.East) {
      x += 1;
    } else if (dir == Direction.South) {
      y += 1;
    } else if (dir == Direction.West) {
      x -= 1;
    }

    bytes32[] memory playersAtPosition = getKeysWithValue(PositionTableId, Position.encode(x, y));

    if(playersAtPosition.length == 0) {
      Position.set(player, x, y);
    } 
    else
    {
      revert("position occupied");
    }

  }


  function getPlayerSpeed(bytes32) public pure returns (uint32)
  {
    return 4;
  }

  
  function beginTravel(int32 x, int32 y) public {

    bytes32 player = addressToEntity(_msgSender());

    PositionData memory playerPosition = Position.get(player);

    if (playerPosition.x == x && playerPosition.y == y) {
      revert("player is already at destination");
    }

    MovementData memory playerMovement = Movement.get(player);

    if (playerMovement.end > block.number) {
      revert("player is already travelling");
    }

    uint32 distance = uint32((x - playerPosition.x) * (x - playerPosition.x) + (y - playerPosition.y) * (y - playerPosition.y));

    Movement.set(player, x, y, uint32(block.number), uint32(block.number) + distance / getPlayerSpeed(player));

  }

  function endTravel() public {

    bytes32 player = addressToEntity(_msgSender());

    MovementData memory playerMovement = Movement.get(player);

    if (playerMovement.end <= block.number) {
      revert("player is not done travelling");
    }

    //allow cancelling travel for partial movement?

    Position.set(player, playerMovement.destX, playerMovement.destY);

    Movement.deleteRecord(player);

  }

}