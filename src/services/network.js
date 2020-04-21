

 async function executeRequest(method, pathname, body = {}, headers = {}) {

  console.log(body,'executeRequest')

   response  = await fetch(`https://dfarm.herokuapp.com/${pathname}`, {
        method: method,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
        },
        body: JSON.stringify(body)
    });

    console.log(response,'executeRequestresponse')


    return await response.json();


}

export default {
  async get(pathname) {
    return  await executeRequest('GET', pathname, )
  },

  async post(pathname, body) {
    return await executeRequest('POST', pathname, body)
  },

  async patch(pathname, body) {
    return await executeRequest('PATCH', pathname, body)
  },

  async delete(pathname) {
    return await executeRequest('DELETE', pathname,)
  },

 }