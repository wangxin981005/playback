const playerFactory = (x: number, y: number, id: IdFactory) => {
    const player: Player = {
        graphic: playerGraphic, 
        palette: playerPalette, 
        entityType: ENTITY_TYPE_PLAYER, 
        bounds: rectangleCenterBounds(x, y, .6, .8),
        collisionGroup: COLLISION_GROUP_PLAYER, 
        collisionMask: COLLISION_MASK_PLAYER, 
        grabMask: GRAB_MASK, 
        gravityMultiplier: 1, 
        facing: ORIENTATION_RIGHT, 
        orientationStartTime: 0, 
        id: id(),
        mass: 1, 
        velocity: [0, 0], 
        lastCollisions: [0, 0, 0, 0, 0],
        baseVelocity: BASE_VELOCITY, 
        boundsWithVelocity: [0, 0, 0, 0], 
        airTurn: 1, 
        activeInputs: {
            reads: {}, 
            states: {}, 
        }, 
        holding: {},  
        handJointId: PLAYER_GRAPHIC_JOINT_ID_RIGHT_HAND,
        insertionJointId: PLAYER_GRAPHIC_JOINT_ID_TAPE_DECK,
        instructionsHeard: [], 
        toSpeak: [],             
        capabilities: INSTRUCTIONS.map((instruction, i) => i).filter(i => INSTRUCTIONS[i].keyCodes),
    };    
    return [player];
}