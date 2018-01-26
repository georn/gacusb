const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = require('chai').expect;


// Telling chai to use the chai-http plugin
chai.use(chaiHttp);

describe('Server', () => {
  describe('GET /', () => {
    it('responds with status 200', done => {
      chai.request(server)
        .get('/')
        .end( (err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('GET /login', () => {
    it('responds with status 200', done => {
      chai.request(server)
        .get('/login')
        .end( (err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});