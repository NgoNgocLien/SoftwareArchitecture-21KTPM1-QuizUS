import axios from 'axios';
//import { USER_URL } from "../util/config";

const getAllPlayers = async () => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/player`;
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
    let url = `${process.env.REACT_APP_USER_URL}/api/player/search/${keyword}`;
    if (!keyword || keyword.length === 0)
      url = `${process.env.REACT_APP_USER_URL}/api/player`;
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