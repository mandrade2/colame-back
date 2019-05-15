'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var getAllLines = function getAllLines(request, server) {
    return request(server).get('/line')
    // .then(response => {
    //     expect(response.body.data).toMatchObject({

    //     })
    //     return response
    // })
    .then(function (response) {
        expect(response.statusCode).toBe(200);
    });
};

exports.getAllLines = getAllLines;