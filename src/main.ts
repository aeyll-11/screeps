import { dispatchBuilder } from "actions/dispatchBuilder";
import { dispatchFinder } from "actions/dispatchFinder";
import { dispatchMiner } from "actions/dispatchMiner";
import { dispatchUpgrader } from "actions/dispatchUpgrader";
import { generateBuilders } from "units/builder";
import { generateFinders } from "units/finder";
import { generateHarvesters } from "units/harvester";
import { generateUpgraders } from "units/upgrader";
import { ErrorMapper } from "utils/ErrorMapper";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    informations?: Map<string, unknown>;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  let harvesters: Creep[] = generateHarvesters();
  for (let harvester of harvesters) {
    dispatchMiner(harvester);
  }

  let upgraders: Creep[] = generateUpgraders();
  for (let upgrader of upgraders) {
    dispatchUpgrader(upgrader);
  }

  let builders: Creep[] = generateBuilders();
  for (let builder of builders) {
    dispatchBuilder(builder);
  }

  let finders: Creep[] = generateFinders();
  for (let finder of finders) {
    dispatchFinder(finder);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
