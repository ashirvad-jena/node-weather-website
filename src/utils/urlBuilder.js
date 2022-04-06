const getUrl = (baseUrl, queryParam, endPoint) => {
  let queryString = '';
  for (const key in queryParam) {
    if (Object.prototype.hasOwnProperty.call(queryParam, key)) {
      queryString += key + '=' + queryParam[key] + '&';
    }
  }
  const fullUrl = baseUrl + endPoint + queryString;
  return fullUrl.slice(0, -1);
};

module.exports = getUrl
