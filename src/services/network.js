import { tryStatement } from '@babel/types';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = 'https://dfarm.herokuapp.com/';

async function getHeaders() {
  const userToken = await AsyncStorage.getItem('userToken');
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (userToken) {
    header.Authorization = `Bearer ${userToken}`;
  }
  return header;
}

// if i change this params later
// i have to break all api call

async function executeRequest(
  method,
  pathname,
  body = {},
  headers = {},
) {
  ;
  ;


  fetchInputObject = {
    method: method,
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  ;


  if (method == 'GET' || method == 'DELETE') {
    delete fetchInputObject.body;
  }

  try {

    var response = await fetch(`${baseURL}${pathname}`, fetchInputObject);
  } catch (e) {
    return await { error: true, errorMessage: 'Network failed' };
  }


  const statusCode = response.status;
  const data = method == 'DELETE' ? {} : await response.json();

  if (statusCode == 200) {
    return await { error: false, data: data };
  } else {
    if (statusCode == 409) {
      return await { error: true, errorMessage: data.errorMessage };
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
