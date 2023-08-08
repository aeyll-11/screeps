import { CreepRoles } from "utils/CreepRoles";
import { Miner } from "utils/archetypes/Miner";
import { Upgrader } from "utils/archetypes/Upgrader";

export const generateUpgraders = (): Creep[] => {
    let upgrader: Creep[] = [];

    const UPGRADER_WORKER_LIMIT: number = 2;

    for (let i in Game.creeps) {
        if(Game.creeps[i].memory.role === CreepRoles.Upgrader) {
            upgrader.push(Game.creeps[i]);
        }
    }

    if (upgrader.length < UPGRADER_WORKER_LIMIT) {
        for(let i = 0; i < UPGRADER_WORKER_LIMIT; i++) {
            Game.spawns['Spawn1'].spawnCreep(Upgrader, 'upgrader' + i, {
                memory: {
                    role: CreepRoles.Upgrader,
                    room: 'W43S44',
                    working: true,
                },
                directions: i % 0 ? [RIGHT] : [LEFT]
            });
        }
    }
    return upgrader;
}


