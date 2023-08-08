import { CreepRoles } from "utils/CreepRoles";
import { Miner } from "utils/archetypes/Miner";

export const generateHarvesters = (): Creep[] => {
    let harvesters: Creep[] = [];

    const HARVESTER_WORKER_LIMIT: number = 2;

    for (let i in Game.creeps) {
        if(Game.creeps[i].memory.role === CreepRoles.Harvester) {
            harvesters.push(Game.creeps[i]);
        }
    }

    if (harvesters.length < HARVESTER_WORKER_LIMIT) {
        for(let i = 0; i < HARVESTER_WORKER_LIMIT; i++) {
            Game.spawns['Spawn1'].spawnCreep(Miner, 'harvester' + i, {
                memory: {
                    role: CreepRoles.Harvester,
                    room: 'W43S44',
                    working: true,
                },
                directions: i % 0 ? [RIGHT] : [LEFT]
            });
        }
    }
    return harvesters;
}


