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

const getPlayerById = async (id) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/player/${id}`;
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

const updatePlayer = async (updatedData) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/player`;
    const response = await axios.put(url, updatedData);
    
    if (response.status === 200) 
      return true;
    else 
      return false;
  }
  catch (err) {
    console.log(err.message);
    return false;
  }
}

const deactivatePlayer = async (id_player) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/player/deactivate/${id_player}`;
    const response = await axios.put(url);
    
    if (response.status === 200) 
      return true;
    else 
      return false;
  }
  catch (err) {
    console.log(err.message);
    return false;
  }
}

const activatePlayer = async (id_player) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/player/activate/${id_player}`;
    const response = await axios.put(url);
    
    if (response.status === 200) 
      return true;
    else 
      return false;
  }
  catch (err) {
    console.log(err.message);
    return false;
  }
}

const uploadImgToCloudinary = async (image) => {
  const url = `${process.env.REACT_APP_USER_URL}/api/cloudinary`;
  const config = await axios.get(url);

  console.log(config.data);
  if (config.data) {
    const url = "https://api.cloudinary.com/v1_1/" + config.data.cloudname + "/auto/upload";

    const cloudinaryData = new FormData();
    cloudinaryData.append("file", image);
    cloudinaryData.append("api_key", config.data.apikey);
    cloudinaryData.append("timestamp", config.data.timestamp);
    cloudinaryData.append("signature", config.data.signature);
    cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
    cloudinaryData.append("folder", "quizus");
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: cloudinaryData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.text();
      return JSON.parse(data).secure_url;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  } 
  return null
}

export {
  getAllPlayers,
  searchPlayer,
  getPlayerById,
  updatePlayer,
  deactivatePlayer,
  activatePlayer,
  uploadImgToCloudinary
};