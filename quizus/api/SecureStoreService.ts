import * as SecureStore from 'expo-secure-store';

export const saveToSecureStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('Data stored securely ', value);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export const retrieveFromSecureStore = async (key: string, callback: any) => {
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

export const removeFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} has been removed from SecureStore`);
  } catch (error) {
    console.error(`Error removing ${key} from SecureStore:`, error);
  }
}
