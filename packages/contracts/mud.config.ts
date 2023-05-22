import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    Direction: ["None", "North", "East", "South", "West"],
  },
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Position: {
      schema: {
        x: "int32",
        y: "int32",
        
      },
    },
    Movement: {
      schema: {
        destX: "int32",
        destY: "int32",
        start: "uint32",
        end: "uint32",
      }
    }

  },
  modules: [
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Position")],
    },
  ]
});
