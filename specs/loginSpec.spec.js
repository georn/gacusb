const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
var browser = new Browser({ site: 'http://localhost:3000' });

describe('User visits login page', function() {

  before( done => {
    browser.visit('/login', done)
  });

  it('have a form', () => {
    return browser.assert.element('#form');
  });

  it('have a submit button', () => {
    return browser.assert.element('#submit');
  });

  describe('submits form', () => {

    before( done => {
      browser
        .fill('password', 'password')
        .pressButton('Submit', done);
    });

    it('is successful', () => {
      browser.assert.success();
    });
  });

});
