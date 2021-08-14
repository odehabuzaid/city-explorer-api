'use strict';
const axios = require('axios');
let cache = require('../Data/Cache');

function theShotGUN(requestQuery,senderKey) {
    let key;
    (senderKey==='Weather')
        ? key =`${senderKey}Cache- ${requestQuery.params.lat}`
        : key =`${senderKey}Cache- ${requestQuery.params.region}`
    if (cache[key] && Date.now() - cache[key].timestamp < 720000) {
        return  Promise.resolve(cache[key])
    } else {
        return axios.get(requestQuery.apiURL, requestQuery)
            .then(response => {
                cache[key] = {};
                cache[key].timestamp = Date.now();
                cache[key].data = response.data
                return cache[key]
            })
            .catch(error => error)
    }
}

function clearCache() {
    cache = {}
    console.log(`Cache Cleared on : ${new Date(Date.now())}`)
   }

//setInterval(clearCache, 1.8e+6);
setInterval(clearCache, 1800000);
module.exports = { theShotGUN };
// 12/11/2021
















// axios
// .get(query.apiURL,query )
// .then((axiosResponse) => {
//       // console.log(axiosResponse)
//       return axiosResponse
//       })
// let response;
// try {
//       response = await axios.get(requestQuery.apiURL,requestQuery )
// } catch (e) {
//       throw new Error(e.message)
// }
// return response? response.data  : null
// .catch((error) => { return error })
// try {
//       apiResponse.responseData =  axios.get(
//             requestQuery.apiURL,
//             requestQuery
//       );
//       axios.send(responseData)
// } catch (error) {
//       apiResponse.responseError = error;
// }