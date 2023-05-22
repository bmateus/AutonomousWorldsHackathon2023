How to:

Adding an enum:

- Add the enum to 'packages/contracts/mud.config.ts'
    - e.g.:   
        export default mudConfig({
            enums: {
                Direction: ["None", "North", "East", "South", "West"],
            },
            ...
        })
- Import into system contract using enum:
    - e.g.:
        import { Direction } from "../codegen/Types.sol";

- Add enum to Phaser:
    - add to "packages/client/src/layers/phaser/constants.ts"
        - e.g.:
            export enum Direction {
                None = 0,
                North = 1,
                East = 2,
                South = 3,
                West = 4,
            }

- auto-generate



