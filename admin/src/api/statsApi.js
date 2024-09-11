import axios from 'axios';
console.log(process.env.REACT_APP_USER_URL); // Check if the environment variable is printed correctly
console.log(process.env.REACT_APP_CAMPAIGN_URL);

const getStats = async () => {
  try {
    const url1 = `${process.env.REACT_APP_USER_URL}/api/admin/stats`;
    const url2 = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/stats`;

    console.log(url1, url2);

    const response1 = await axios.get(url1);
    const response2 = await axios.get(url2);

      return {
        ...response1.data,
      ...response2.data
      };
  }
  catch (err) {
    console.log(err.message);
    return []
  }
}

const getVoucherStats = async () => {
  try {
    const url = `${process.env.REACT_APP_CAMPAIGN_URL}/api/voucher/stats`;
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


export {
  getStats, getVoucherStats, getPlayerByGameStats, getPlayerStats, getBudgetStats
};