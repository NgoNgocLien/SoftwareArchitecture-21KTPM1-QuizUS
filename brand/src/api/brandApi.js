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

export{
  signup
}
