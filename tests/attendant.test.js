
const getAllAttendants = (request, server) => {
    return request(server)
        .get('/attendant')
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
}


export { getAllAttendants }
