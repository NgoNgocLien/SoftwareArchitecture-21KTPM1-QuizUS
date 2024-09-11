// mọi người thay cái ip thành ip máy của mình -> ip backend 
// rồi mọi ng để config này vô file gitignore

// liên
const USER_BE = 'http://10.0.0.212:8000/user';
const GAME_BE = 'http://10.0.0.212:8000/game';
const CAMPAIGN_BE = 'http://10.0.0.212:8000/campaign';
const NOTIFICATION_BE = 'http://10.0.0.212:8004';

// ml
// const USER_BE = 'http://10.0.1.35:8000/user';
// const GAME_BE = 'http://10.0.1.35:8000/game';
// const CAMPAIGN_BE = 'http://10.0.1.35:8000/campaign';
// const NOTIFICATION_BE = 'http://10.0.1.35:8000/notification';

// simple
// const USER_BE = 'http://192.168.0.225:8000/user';
// const GAME_BE = 'http://192.168.0.225:8000/game';
// const CAMPAIGN_BE = 'http://192.168.0.225:8000/campaign';

const NOTI_BE = '';

const DURATION = 60000;

const QUIZ_SCORE = 100;

const ID_PLAYER = '100006';

const QUIZ_GAME = 'quizgame';

const ITEM_GAME = 'itemgame';

const ELEVENLABS_API_KEY = 'sk_a2a6129948bb65f5b2461b4d8903094ed17aff082441ec5f';

const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9';

export default {
  USER_BE,
  CAMPAIGN_BE,
  GAME_BE,
  NOTIFICATION_BE,

  DURATION,
  QUIZ_SCORE,
  QUIZ_GAME,

  ITEM_GAME,

  ID_PLAYER,

  ELEVENLABS_API_KEY,
  VOICE_ID,
};
