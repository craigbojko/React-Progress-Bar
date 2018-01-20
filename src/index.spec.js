/*
* @Author: Craig Bojko
* @Date:   2018-01-12 09:42:57
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-15 03:40:47
*/

var init = require('../build/index');

var request = require('request')
var chai = require('chai')
var dirtyChai = require('dirty-chai')
var chaiHttp = require('chai-http')
var chaiDom = require('chai-dom')
var cheerio = require('cheerio')
var assert = require('assert')

var expect = chai.expect
var should = chai.should()

var server = require('../build/index.js').default;
var baseURL = 'http://localhost:8080/';

chai.use(chaiHttp)
chai.use(chaiDom)
chai.use(dirtyChai)

process.env.NODE_ENV = 'test'

describe('Index test frame:', function () {
  describe('Initialise application::', function () {
    it('Should return boolean true.', function (done) {
      (typeof init).should.equals('function', 'init should be a function here.');
      var $ = cheerio.load(init());
      
      expect($).to.equal(true);
      done();
    });
  });

  // describe('GET /', function () {
  //   it('returns status code 200', function (done) {
  //     request.get(baseURL, function (error, response) {
  //       // expect(response.statusCode).toBe(200);
  //       if (error) {
  //         console.log(error);
  //       }
  //       assert.equal(200, response.statusCode);
  //       done();
  //     });
  //   });

  //   it('should return html', function (done) {
  //     chai.request(server)
  //       .get('/')
  //       .end(function (err, res) {
  //         var $ = cheerio.load(res.text);
  //         expect(err, 'err should be null').to.be.not.ok();
  //         expect(res, 'status should be 200').to.have.status(200);
  //         expect(res, 'res should be of html type').to.be.html();
  //         expect($).to.not.be.undefined();
  //         expect($('body main')).to.not.be.undefined();
  //         expect($('body main section').text()).to.have.string('');
  //         done();
  //       })
  //   })
  // })
});
