'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var getAllAttendants = function getAllAttendants(request, server) {
    return request(server).get('/attendant').then(function (response) {
        expect(response.statusCode).toBe(200);
    });
};

exports.getAllAttendants = getAllAttendants;