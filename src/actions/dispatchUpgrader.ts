export const dispatchUpgrader = (creep: Creep) => {
    console.log('upgrader:' + creep.store.energy, 'capacity:' + creep.store.getCapacity(RESOURCE_ENERGY));
    if(creep.store.energy === 0) {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
      }
      else {
          if(creep.room.controller && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }
      }

};
