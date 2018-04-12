const request = require('request');
const serverUrl = 'http://127.0.0.1:7777';


describe('Server', () => {


  test('Should be able to handle GET request', () => {
    
    request({
      url: `${serverUrl}/booking`,
      method: 'GET',
    }, (error, response, body)=>{
      expect(response.statusCode).toBe(200);
    });
  });

  test('Should be able to handle POST request', () => {
    
    request({
      url: `${serverUrl}/booking`,
      method: 'POST',
    }, (error, response, body) => {
      expect(response.statusCode).toBe(200);
    });

  });

  test('Should 404 when asked for a nonexistent file', ()=> {

    request({
      url: `${serverUrl}/fantasyhub`,
      method: 'GET',
    }, (error, response, body)=>{
      expect(response.statusCode).toBe(404);
    });

  });

});