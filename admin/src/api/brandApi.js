import axios from 'axios';

const getAllBrands = async () => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand`;
    const response = await axios.get(url);
    
    if (response?.data)
      return response.data.sort((a, b) => a.id_brand - b.id_brand);
    else
      return [];
  }
  catch (err) {
    console.log(err.message);
    return []
  }
}

const searchBrand = async (keyword) => {
  try {
    let url = `${process.env.REACT_APP_USER_URL}/api/brand/search/${keyword}`;
    if (!keyword || keyword.length === 0)
      url = `${process.env.REACT_APP_USER_URL}/api/brand`;
    const result = await axios.get(url);
    console.log(result);

    if (result.status === 200) 
      return result.data.sort((a, b) => a.id_brand - b.id_brand);
    else 
      return [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

const createBrand = async (brandData) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand/signup`;
    const response = await axios.post(url, brandData);
    
    if (response.status === 200 || response.status === 201) 
      return true;
    else 
      return false;
  }
  catch (err) {
    console.log(err.message);
    return false;
  }
}

const getBrandByID = async (id_brand) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand/${id_brand}`;
    const response = await axios.get(url);
    
    if (response.status === 200 || response.status === 201) 
      return response.data;
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

const updateBrand = async (updatedData) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand`;
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

const deactivateBrand = async (id_brand) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand/deactivate/${id_brand}`;
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

const activateBrand = async (id_brand) => {
  try {
    const url = `${process.env.REACT_APP_USER_URL}/api/brand/activate/${id_brand}`;
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

export {
  getAllBrands,
  searchBrand,
  createBrand,
  getBrandByID,
  uploadImgToCloudinary,
  updateBrand,
  deactivateBrand,
  activateBrand
};