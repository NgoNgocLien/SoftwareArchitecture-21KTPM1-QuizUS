import axios from 'axios';

const getAll = async (id) => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/brand/${id}`;
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

const getCampaignById = async (id) => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/${id}`;
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

const updateCampaign = async (updatedData) => {
  try {
    const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign`;
    console.log(updatedData)
    const response = await axios.put(url, {
      ...updatedData
    });
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

const createEvent = async (campaign, quiz) => {
  try {
    const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign`;
    const response = await axios.post(url, {
      campaign, 
      quiz
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
  searchCampaign,
  createEvent,
  getCampaignById,
  updateCampaign,
}