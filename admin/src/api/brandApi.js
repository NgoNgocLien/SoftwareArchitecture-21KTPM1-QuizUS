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

export {
  getAllBrands,
  searchBrand,
  createBrand
};