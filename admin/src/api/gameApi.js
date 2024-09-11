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

export {
    getGameById
};