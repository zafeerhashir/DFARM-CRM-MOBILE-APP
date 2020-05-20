import {tryStatement} from '@babel/types';

async function executeRequest(method, pathname, body = {}, headers = {}) {
  console.log(body, 'executeRequest');
  console.log(pathname, 'pathname');

  fetchInputObject = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  if (method == 'GET' || method == 'DELETE') {
    delete fetchInputObject.body;
  }

  try
  {
  var response = await fetch(
    `https://dfarm.herokuapp.com/${pathname}`,
    fetchInputObject,
  );


  }
  catch(e)
  {
    return await { error: true, errorMessage: 'Network failed',  }
  }
  console.log(response,'dsdsd')

  const statusCode = response.status;
  const data = method == 'DELETE' ? {} : await response.json();

  if (statusCode == 200) {
    return await {error: false, data: data};
  } else {
    if (statusCode == 409) {
      return await {error: true, errorMessage: 'Animal Tag already added'};
    } else if (statusCode == 401) {
      return await {
        error: true,
        errorMessage: 'Username or password is not correct',
      };
    } else {
      return await {
        error: true,
        errorMessage: 'Were are sorry something is wrong',
      };
    }
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
