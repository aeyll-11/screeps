export const dispatchMiner = (creep: Creep) => {
    console.log(creep.store.getFreeCapacity(RESOURCE_ENERGY));
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        const sources = creep.room.find(FIND_SOURCES);

        /** Generate a random number to dispatch worker on random sources in the room */
        const randomIndex: number =  Math.floor(Math.random() * (sources.length - 0) + 0);

        if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        }
    } else {
        const targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
