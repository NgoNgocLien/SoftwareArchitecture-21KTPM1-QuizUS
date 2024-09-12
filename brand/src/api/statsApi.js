import axios from 'axios';

const getStats = async (id_brand) => {
    try {
        const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/brandStats/${id_brand}`;
        const response = await axios.get(url);
  
        return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}
const getVoucherStats = async (id_brand) => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/voucher/brandStats/${id_brand}`;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
  }
  
const getPlayerByGameStats = async () => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/game/playerByGame`;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}
  
const getPlayerStats = async () => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/player`;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}
  
const getBudgetStats = async () => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/budget`;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}
  
const getEventStats = async () => {
    try {
      const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/event`;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    }
    catch (err) {
      console.log(err.message);
      return []
    }
}
  
  
export {
    getStats, getVoucherStats, getPlayerByGameStats, getPlayerStats, getBudgetStats, getEventStats
};