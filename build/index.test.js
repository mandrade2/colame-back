'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _line = require('./line.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('supertest');


describe('Colame Tests', function () {

    describe('Line Tests', function () {
        test('should get all the lines', function () {
            return (0, _line.getAllLines)(request, _server2.default);
        });
    });

    afterAll(function (done) {
        _server2.default.close();
    });
});