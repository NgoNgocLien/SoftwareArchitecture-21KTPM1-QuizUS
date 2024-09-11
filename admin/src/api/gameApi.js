import axios from 'axios';

const getGameById = async (id) => {
    try {
      const url = `${process.env.REACT_APP_USER_URL}/api/game/${id}`;
      const response = await axios.get(url);
      
      if (response?.data)
        return response.data;
      else
        return null;
    }
    catch (err) {
      console.log(err.message);
      return null;
    }
}

const updateGame = async (updatedData) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/game`;
    const response = await axios.put(url, updatedData);
    
    if (response?.data)
      return response.data;
    else
      return null;
  }
  catch (err) {
    console.log(err.message);
    return null;
  }
}

export {
    getGameById, updateGame
};