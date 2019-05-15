'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var getAllCompanies = function getAllCompanies(request, server) {
    return request(server).get('/company').then(function (response) {
        expect(response.statusCode).toBe(200);
    });
};

var getAllCompaniesLines = function getAllCompaniesLines(request, server) {
    return request(server).get('/company/0/lines').then(function (response) {
        expect(response.statusCode).toBe(200);
    });
};

exports.getAllCompanies = getAllCompanies;
exports.getAllCompaniesLines = getAllCompaniesLines;