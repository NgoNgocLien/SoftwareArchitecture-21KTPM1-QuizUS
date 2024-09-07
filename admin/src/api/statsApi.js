import axios from 'axios';

const getStats = async () => {
  try {
    const url1 = `${process.env.REACT_APP_USER_URL}/api/admin/stats`;
    const url2 = `${process.env.REACT_APP_CAMPAIGN_URL}/api/campaign/stats`;
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


export {
  getStats
};