import axios from 'axios';

const getAllPlayers = async () => {
  try {
    const url = `${process.env.REACT_APP_PLAYER_URL}/api/player`;
    const response = await axios.get(url);
    
    if (response?.data)
      return response.data;
    else
      return [];
  }
  catch (err) {
    console.log(err.message);
    return []
  }
}

const searchPlayer = async (keyword) => {
  try {
    const url = `${process.env.REACT_APP_PLAYER_URL}/api/player/search/${keyword}`;
    const result = await axios.get(url);
    console.log(result);

    if (result.status === 200) 
      return result.data;
    else 
      return [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

export {
  getAllPlayers,
  searchPlayer
};