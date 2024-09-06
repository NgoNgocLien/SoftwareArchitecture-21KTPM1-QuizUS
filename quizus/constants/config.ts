// mọi người thay cái ip thành ip máy của mình -> ip backend 
// rồi mọi ng để config này vô file gitignore

// liên
// const USER_BE = 'http://192.168.1.11:8000/user';
// const GAME_BE = 'http://192.168.1.11:8000/game';
// const CAMPAIGN_BE = 'http://192.168.1.11:8000/campaign';

// ml
const USER_BE = 'http://192.168.2.177:8000/user';
const GAME_BE = 'http://192.168.2.177:8000/game';
const CAMPAIGN_BE = 'http://192.168.2.177:8000/campaign';

const NOTI_BE = '';

const DURATION = 60000;

const QUIZ_SCORE = 100;

const ID_PLAYER = '100006';

import * as SecureStore from 'expo-secure-store';

const saveToSecureStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('Data stored securely ', value);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

const retrieveFromSecureStore = async (key: string, callback: any) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log(value);
    if (value) {
      callback(value);
    }
  } catch (error) {
    console.error('Error retrieving id_player from SecureStore:', error);
  }
};
const removeFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} has been removed from SecureStore`);
  } catch (error) {
    console.error(`Error removing ${key} from SecureStore:`, error);
  }
}

export default {
  USER_BE,
  CAMPAIGN_BE,
  GAME_BE,
  NOTI_BE,

  DURATION,
  QUIZ_SCORE,
  ID_PLAYER,

  saveToSecureStore,
  retrieveFromSecureStore,
  removeFromSecureStore
};
