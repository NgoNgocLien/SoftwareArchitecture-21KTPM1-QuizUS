import axios from 'axios';

const uploadImgToCloudinary = async (image) => {
  const url = `${process.env.REACT_APP_USER_URL}/api/cloudinary`;
  const config = await axios.get(url);

  // console.log(config.data);
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
  uploadImgToCloudinary
};