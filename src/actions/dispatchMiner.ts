export const dispatchMiner = (creep: Creep) => {
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        const sources = creep.room.find(FIND_SOURCES);

        /** Generate a random number to dispatch worker on random sources in the room */
        const randomIndex: number =  Math.floor(Math.random() * (sources.length - 0) + 0);

        if(creep.harvest(sources[randomIndex]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[randomIndex], {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        }
    } else if (Game.spawns['Spawn1'].store.energy < Game.spawns['Spawn1'].energyCapacity) {
        if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
}
