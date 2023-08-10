import { randomIndexNumber } from "utils/helper";

export const dispatchFinder = (creep: Creep) => {
    const targets: Tombstone[] | Resource<ResourceConstant>[] = creep.room.find(FIND_TOMBSTONES && FIND_DROPPED_RESOURCES);
    function isTombstone(targets: Tombstone[] | Resource<ResourceConstant>[]): targets is Tombstone[] {
        return (targets as Tombstone[])[0].deathTime !== undefined;
    }
    const availableStructures: Structure[] = creep.room.find(
        FIND_STRUCTURES,
        {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    const randomIndex: number = randomIndexNumber(availableStructures);

    if(targets.length > 1 && !creep.memory.working) {
        creep.say('🔍Found🔍');
        creep.memory.working = true;

        if(isTombstone(targets) && creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
                visualizePathStyle: {
                    stroke: '#OOOOFF',
                    lineStyle: 'solid'
                }
            });
        } else if(creep.pickup(targets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
                visualizePathStyle: {
                    stroke: '#OOOOFF',
                    lineStyle: 'solid'
                }
            });
        }
    }

    if(creep.store.energy >= 150 && availableStructures[randomIndex] && creep.memory.working) {
        if( creep.memory.working
            && creep.transfer(availableStructures[randomIndex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
            ) {
            creep.moveTo(availableStructures[randomIndex]);
        } else {
            creep.say("🥷Ninja🥷")
            creep.memory.working = false;
        }
    }
}
