import { tryStatement } from "@babel/types";

async function executeRequest(method, pathname, body = {}, headers = {}) {
  console.log(body, 'executeRequest');

  fetchInputObject = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method !== 'GET') {
    fetchInputObject.body = JSON.stringify(body);
  }
  try
  {
  response = await fetch(
    `https://dfarm.herokuapp.com/${pathname}`,
    fetchInputObject,
  );
  }
  catch(e)
  {
    console.log(e,'sdsd')
  console.log(response, 'executeRequestresponse');
  }

  const statusCode = response.status;
  const data = await response.json();

  console.log(data, 'executeRequestresponse');

  return await data
}

export default {
  async get(pathname) {
    return await executeRequest('GET', pathname);
  },

  async post(pathname, body) {
    return await executeRequest('POST', pathname, body);
  },

  async patch(pathname, body) {
    return await executeRequest('PATCH', pathname, body);
  },

  async delete(pathname) {
    return await executeRequest('DELETE', pathname);
  },
};
