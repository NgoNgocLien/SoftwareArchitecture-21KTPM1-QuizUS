import axios from 'axios';
import { USER_URL } from "../util/config";

const login = async (admin_login) => {
  try {
    const url = `${USER_URL}/api/loginWeb`;
    const response = await axios.post(url, admin_login);
    return response;
  }
  catch (err) {
    console.log(err.message);
    return []
  }
}

export{
    login
}