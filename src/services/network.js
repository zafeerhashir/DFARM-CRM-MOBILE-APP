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
    body: JSON.stringify(body)
  };

  if(method == 'GET' || method == 'DELETE')
  {
    delete fetchInputObject.body;
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
    return await { error: true, errorMessage: 'Network failed',  }    
  }

  const statusCode = response.status;
  const data = await response.json();

  if(statusCode == 200)
  {
    return await { error: false , data: data }    
  }
  else
  {
    return await { error: true, errorMessage: 'Were are sorry something is wrong', }    

  }
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
