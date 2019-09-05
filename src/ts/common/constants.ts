const MAX_TILES_ACROSS = 18;
const MAX_TILES_DOWN = 13;
const MAX_TILES_ACROSS_MINUS_1 = 17;
const MAX_TILES_DOWN_MINUS_1 = 12;
const DEFAULT_GRAVITY: Vector = [0, .00007];
const BASE_VELOCITY = .006;
const JUMP_VELOCITY = .014;
const CLIMB_VELOCITY = .011;
const MAX_VELOCITY = .015;
const MAX_JUMP_AGE = 100;
const TURN_DURATION = 150;
const SCALING_JUMP = 1;
const ACTIVE_ROOM_SPREAD_HORIZONTAL = 0;
const ACTIVE_ROOM_SPREAD_VERTICAL = 0;
const EDGE_HIDE_PROPORTION = 0.2;
const GRAB_DIMENSION = .15;
const GRAB_DIMENSION_X_2 = .3;
const GRAB_VELOCITY_SCALE = .9;
const MAX_DELTA = Math.floor(GRAB_DIMENSION_X_2/MAX_VELOCITY) - 1; // 19 ms
const MIN_DELTA = 5;
const MAX_ROUNDING_ERROR_SIZE = .0000001;
const MAX_COLLISION_COUNT = 2;
const AUTOMATIC_ANIMATION_DELAY = 40;
const GRAB_OFFSET = .01;
const THROW_POWER = .02;
const EJECT_POWER = .0003;  
const INSTRUCTION_DURATION = .3;
const DTMF_FREQUENCIES_1 = [1209, 1336, 1477];
const DTMF_FREQUENCIES_2 = [697, 770, 852, 941];
const PLAYBACK_INTERVAL = 1000;
const REWIND_INTERVAL = 200;
const SPEECH_FADE_INTERVAL = 3000;
const SPEECH_TEXT_HEIGHT = .5;
const SPEECH_TEXT_PADDING = .2;
const SPEECH_CALLOUT_HEIGHT = .2;
const SPEECH_CALLOUT_WIDTH = .2;
const MAX_VISIBLE_INSTRUCTIONS = 1;
const MESSAGE_DISPLAY_TIME = 3000;