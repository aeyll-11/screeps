import { CreepRoles } from "utils/CreepRoles";
import { Builder } from "utils/archetypes/Builder";

export const generateBuilders = (): Creep[] => {
    let builders: Creep[] = [];

    const BUILDER_WORKER_LIMIT: number = 4;

    for (let i in Game.creeps) {
        if(Game.creeps[i].memory.role === CreepRoles.Builder) {
            builders.push(Game.creeps[i]);
        }
    }

    if (builders.length < BUILDER_WORKER_LIMIT) {
        for(let i = 0; i < BUILDER_WORKER_LIMIT; i++) {
            Game.spawns['Spawn1'].spawnCreep(Builder, 'builder' + i, {
                memory: {
                    role: CreepRoles.Builder,
                    room: 'W43S44',
                    working: true,
                },
                directions: [BOTTOM]
            });
        }
    }
    return builders;
}


