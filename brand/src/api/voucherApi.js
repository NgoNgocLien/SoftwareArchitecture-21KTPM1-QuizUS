import axios from 'axios';

const getAll = async (id) => {
    try {
      // console.log(id);
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/voucher/search/brand/${id}`;
      const response = await axios.get(url);
      if (response?.data) {
        return response.data
      }
      else 
      return []
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}

const searchCampaign = async (id , keyword) => {
  try {
    let url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/search/${keyword}`;
    if (!keyword || keyword.length === 0)
      url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/brand/${id}`;
    const result = await axios.get(url);

    if (result.status === 200) 
      return result.data;
    else 
      return [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

const getVoucherById = async (id) => {
  try {
    const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/voucher/${id}`;
    const response = await axios.get(url);
    
    if (response?.data)
      return response.data;
    else
      return null;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

const createVoucher = async (data) => {
  try {
    const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/voucher`;
    const response = await axios.post(url, {
      ...data
    });
    
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

export{
  getAll,
  getVoucherById,
  createVoucher 
}