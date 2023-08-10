export const dispatchUpgrader = (creep: Creep) => {
    if(
        creep.store.energy < creep.store.getCapacity(RESOURCE_ENERGY)
        && creep.store.energy !== 0
        && creep.room.controller
        && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
    ) {
        creep.moveTo(creep.room.controller);

    } else {
        const sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
};
