'use strict';

var _server = require('../src/server');

var _server2 = _interopRequireDefault(_server);

var _line = require('./line.test');

var _company = require('./company.test');

var _attendant = require('./attendant.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('supertest');


describe('Colame Tests', function () {

    describe('Line Tests', function () {
        test('should get all the lines', function () {
            return (0, _line.getAllLines)(request, _server2.default);
        });
    });

    describe('Company Tests', function () {
        test('should get all the companies', function () {
            return (0, _company.getAllCompanies)(request, _server2.default);
        });
        test('should get all lines from company', function () {
            return (0, _company.getAllCompanies)(request, _server2.default);
        });
    });

    describe('Attendant Tests', function () {
        test('should get all the Attendants', function () {
            return (0, _attendant.getAllAttendants)(request, _server2.default);
        });
    });

    afterAll(function (done) {
        _server2.default.close();
    });
});