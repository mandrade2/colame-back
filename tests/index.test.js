const request = require('supertest')
import server from '../src/server'

import { getAllLines } from './line.test'

describe('Colame Tests', () => {

    describe('Line Tests', () => {
        test('should get all the lines', () => {
            return getAllLines(request, server)
        })

    })

    afterAll(done => {
        server.close()
    })
})
