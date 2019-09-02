type World = {
    rooms: Room[][];
    currentRoom: Vector;
    size: Vector;
    nextId: number;
    age: number;
    previousFrames?: string[];
    player: Player;
    instructionSounds: {[_:number]: Sound};
};

const createWorld = (audioContext: AudioContext, w: number, h: number, roomFactory: RoomFactory, player: Player, startX: number, startY: number) => {
    let nextId = 0;
    const idFactory = () => nextId++;
    const rooms = array2DCreate(w, h, (x, y) => roomFactory(x, y, idFactory));
    roomAddEntity(rooms[startX][startY], player);
    const instructionSounds: {[_:number]: Sound} = {
        //[SOUND_ID_JUMP]: vibratoSoundFactory(audioContext, .5, .1, 1, .2, 'square', 440, 220),  
        //[SOUND_ID_JUMP]: vibratoSoundFactory(audioContext, .2, 0, .1, .05, 'triangle', 500, 2e3, 599),  
        //[SOUND_ID_JUMP]: vibratoSoundFactory(audioContext, .3, 0, .1, .05, 'triangle', 400, 700, 900, 'sine', 60),  
        //[SOUND_ID_THROW]: vibratoSoundFactory(audioContext, .3, 0, .3, .4, 'square', 440, 660, 500),  
        //[SOUND_ID_THROW]: dtmfSoundFactory(audioContext, 697, 1209, .1),  
        [INSTRUCTION_ID_JUMP]: vibratoSoundFactory(audioContext, .3, 0, .2, .05, 'triangle', 500, 700, 400, 'sine', 60),  
        [INSTRUCTION_ID_THROW]: vibratoSoundFactory(audioContext, .2, 0, .2, .05, 'triangle', 500, 2e3, 599),  
        [INSTRUCTION_ID_DO_NOTHING]: dtmfSoundFactory(audioContext, 350, 440, INSTRUCTION_DURATION), 
        [INSTRUCTION_ID_REWIND]: vibratoSoundFactory(audioContext, .2, 0, .1, .05, 'sine', 1440, 2999, 999, 'sawtooth', 200),
        [INSTRUCTION_ID_FAST_FORWARD]: vibratoSoundFactory(audioContext, .2, 0, .1, .05, 'sine', 2999, 1440, 2000, 'triangle', 200),
        [INSTRUCTION_ID_LEFT]: boomSoundFactory(audioContext, .05, .01, 2e3, .1, .05), 
        [INSTRUCTION_ID_RIGHT]: boomSoundFactory(audioContext, .05, .01, 1e3, .1, .05), 
        [INSTRUCTION_ID_EJECT]: vibratoSoundFactory(audioContext, .2, 0, .2, .05, 'triangle', 300, 2e3, 599),  
        [INSTRUCTION_ID_DROP]: vibratoSoundFactory(audioContext, .2, 0, .2, .05, 'triangle', 200, 2e3, 599),  
        [INSTRUCTION_ID_PICK_UP]: vibratoSoundFactory(audioContext, .2, 0, .2, .05, 'triangle', 700, 2e3, 599),  
        [INSTRUCTION_ID_INSERT]: vibratoSoundFactory(audioContext, .2, 0, .2, .05, 'triangle', 400, 2e3, 599),  
        [INSTRUCTION_ID_DOWN]: vibratoSoundFactory(audioContext, .4, 0, .1, .05, 'triangle', 999, 300),  
    };
    for (let instruction = 0; instruction < 10; instruction++) {
        // numeric, use DTMF
        instructionSounds[instruction] = dtmfSoundFactory(
            audioContext, 
            DTMF_FREQUENCIES_1[instruction % DTMF_FREQUENCIES_1.length], 
            DTMF_FREQUENCIES_2[(instruction / DTMF_FREQUENCIES_1.length | 0) % DTMF_FREQUENCIES_2.length], 
            INSTRUCTION_DURATION, 
        );
    }
    initInstructions(audioContext, instructionSounds);
    
    const world: World = {
        currentRoom: [startX, startY], 
        size: [w, h], 
        rooms, 
        nextId, 
        age: 0, 
        player, 
        instructionSounds, 
    };
    return world;
}

const worldGetActiveRoomBounds = (world: World): Rectangle => {    
    const [cx, cy] = world.currentRoom;
    const [w, h] = world.size;
    const minX = cx - ACTIVE_ROOM_SPREAD_HORIZONTAL;
    const minY = cy - ACTIVE_ROOM_SPREAD_VERTICAL; 
    return [
        Math.max(minX, 0), 
        Math.max(minY, 0), 
        Math.min(cx + ACTIVE_ROOM_SPREAD_HORIZONTAL, w - 1) - minX, 
        Math.min(cy + ACTIVE_ROOM_SPREAD_VERTICAL, h - 1) - minY, 
    ];
}

