import axios from 'axios';
import { USER_URL } from "../util/config";

const signup = async (brand_signup) => {
    try {
      const url = `${USER_URL}/api/brand/signup`;
      const response = await axios.post(url, brand_signup);
      return response;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
  }

const getInfo = async (id) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand/${id}`;
    const response = await axios.get(url);
    if (response?.data) {
      return response.data;
    }
    else 
    return {};
  }
  catch (err) {
    console.log(err.message);
    return [];
  }
}

export{
  signup,
  getInfo
}
