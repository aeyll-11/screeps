import { CreepRoles } from "utils/CreepRoles";
import { Miner } from "utils/archetypes/Miner";

export const generateBuilder = (): Creep[] => {
    let builders: Creep[] = [];

    const BUILDER_WORKER_LIMIT: number = 1;

    for (let i in Game.creeps) {
        if(Game.creeps[i].memory.role === CreepRoles.Builder) {
            builders.push(Game.creeps[i]);
        }
    }

    if (builders.length < BUILDER_WORKER_LIMIT) {
        for(let i = 0; i < BUILDER_WORKER_LIMIT; i++) {
            Game.spawns['Spawn1'].spawnCreep(Miner, 'builder' + i, {
                memory: {
                    role: CreepRoles.Builder,
                    room: 'W43S44',
                    working: true,
                },
                directions: i % 0 ? [RIGHT] : [LEFT]
            });
        }
    }
    return builders;
}


