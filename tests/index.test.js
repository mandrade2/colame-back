const request = require('supertest')
import server from '../src/server'

import { getAllLines } from './line.test'
import { getAllCompanies } from './company.test';
import { getAllAttendants } from './attendant.test';

describe('Colame Tests', () => {

    describe('Line Tests', () => {
        test('should get all the lines', () => {
            return getAllLines(request, server)
        })

    })

    describe('Company Tests', () => {
        test('should get all the companies', () => {
            return getAllCompanies(request, server)
        })
        test('should get all lines from company', () => {
            return getAllCompanies(request, server)
        })
    })

    describe('Attendant Tests', () => {
        test('should get all the Attendants', () => {
            return getAllAttendants(request, server)
        })

    })

    afterAll(done => {
        server.close()
    })
})
