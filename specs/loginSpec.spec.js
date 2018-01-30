const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('expample.com', 3000);

describe('User visits login page', function() {

  const browser = new Browser();

  it('should have a fornm', function() {
    return browser.assert.element('#form');
  });

  it('should have a submit button', function() {
    return browser.assert.element('#submit');
  });

  before(function(done) {
    return browser.visit('/login', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .fill('password', 'password')
        .pressButton('Submit', done);
    });

    // it('should be successful', function() {
    //   browser.assert.success();
    // });
  });

});
