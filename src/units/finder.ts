import { CreepRoles } from "utils/CreepRoles";
import { Finder } from "utils/archetypes/Finder";

export const generateFinders = (): Creep[] => {
    let finders: Creep[] = [];

    const FINDER_WORKER_LIMIT: number = 1;

    for (let i in Game.creeps) {
        if(Game.creeps[i].memory.role === CreepRoles.Finder) {
            finders.push(Game.creeps[i]);
        }
    }

    if (finders.length < FINDER_WORKER_LIMIT) {
        for(let i = 0; i < FINDER_WORKER_LIMIT; i++) {
            Game.spawns['Spawn1'].spawnCreep(Finder, 'finder' + i, {
                memory: {
                    role: CreepRoles.Finder,
                    room: 'W43S44',
                    working: false,
                },
                directions: [TOP],
            });
        }
    }
    console.log(finders);
    return finders;
}


