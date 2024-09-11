import axios from 'axios';

const getAll = async (id) => {
    try {
      console.log(id);
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

export{
  getAll
}