
const getAllLines = (request, server) => {
    return request(server)
        .get('/line')
        // .then(response => {
        //     expect(response.body.data).toMatchObject({

        //     })
        //     return response
        // })
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
}


export { getAllLines }
