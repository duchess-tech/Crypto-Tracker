import axios from "axios";
const httpAuth = axios.create({
  baseURL: `https://api.coingecko.com`,
  headers: {
    "Content-Type": "application/json",
    'Authorization':"Bearer CG-R5K36ThDStuPBsLdxc8YhwXJ",

  },
});
export default httpAuth;