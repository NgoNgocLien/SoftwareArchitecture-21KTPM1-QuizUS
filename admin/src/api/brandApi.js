import axios from 'axios';

const getAllBrands = async () => {
  try {
    const url = `${process.env.REACT_APP_BRAND_URL}/api/brand`;
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

export {
  getAllBrands
};