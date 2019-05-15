
const getAllCompanies = (request, server) => {
    return request(server)
        .get('/company')
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
}

const getAllCompaniesLines = (request, server) => {
    return request(server)
        .get('/company/0/lines')
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
}

export { getAllCompanies, getAllCompaniesLines }
