const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = require('chai').expect;

// Configuring chai to use the chai-http plugin for HTTP VERBS Test
chai.use(chaiHttp);

describe('Admin Routes', () => {
  describe('GET /admin', () => {
    it('responds with status 200', done => {
      chai.request(server)
        .get('/admin')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});