import nock from 'nock';
import request from '../request';

window.fetch = sinon.stub();

describe('request', () => {
  beforeEach(() => {
    window.fetch.reset();
  });

  describe('stubbing successful response', () => {
    it('should format the response correctly', () => {
      const json = { hello: 'world' };
      nock('http://api.hackoregon.org')
        .get('/housing')
        .reply(200, json);

      window.fetch.returns(Promise.resolve(json));

      return request('http://api.hackoregon.org/housing').should.become(json);
    });
  });

  describe('stubbing error response', () => {
    it('should catch errors', () => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });
      nock('http://api.hackoregon.org')
        .get('/housing')
        .reply(404, res);
      window.fetch.returns(Promise.reject(res));
      return request('http://api.hackoregon.org/housing').should.be.rejectedWith('Not Found');
    });
  });
});
