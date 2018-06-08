'use strict';

const axios = require('axios')

const weddingApi = {

    url: 'NO-URL',

    token: 'NO-TOKEN',

    /**
      * 
      * @param {string} username 
      * @param {string} location
      * @param {string} email 
      * @param {string} password 
      * 
      * @returns {Promise<boolean>}
      */

    registerUser(username, location, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof username !== 'string') throw Error('username is not a string')

                if (!(username = username.trim()).length) throw Error('user username is empty or blank')

                if (typeof location !== 'string') throw Error('user location is not a string')

                if ((location = location.trim()).length === 0) throw Error('user location is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/users`, { username, location, email, password })
                .then(({ status, data }) => {
                    if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return true
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
        })
    },

//     /**
//      * 
//      * @param {string} email 
//      * @param {string} password 
//      * 
//      * @returns {Promise<string>}
//      */
//     authenticateUser(email, password) {
//         return Promise.resolve()
//             .then(() => {
//                 if (typeof email !== 'string') throw Error('user email is not a string')

//                 if (!(email = email.trim()).length) throw Error('user email is empty or blank')

//                 if (typeof password !== 'string') throw Error('user password is not a string')

//                 if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

//                 return axios.post(`${this.url}/auth`, { email, password })
//                     .then(({ status, data }) => {
//                         if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

//                         const { data: { id, token } } = data

//                         this.token = token

//                         return id
//                     })
//                     .catch(err => {
//                         if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

//                         if (err.response) {
//                             const { response: { data: { error: message } } } = err

//                             throw Error(message)
//                         } else throw err
//                     })
//             })
//     },

//     /**
//      * 
//      * @param {string} id
//      * 
//      * @returns {Promise<User>} 
//      */
//     retrieveUser(id) {
//         return Promise.resolve()
//             .then(() => {
//                 if (typeof id !== 'string') throw Error('user id is not a string')

//                 if (!(id = id.trim()).length) throw Error('user id is empty or blank')

//                 return axios.get(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token}` } })
//                     .then(({ status, data }) => {
//                         if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

//                         return data.data
//                     })
//                     .catch(err => {
//                         if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

//                         if (err.response) {
//                             const { response: { data: { error: message } } } = err

//                             throw Error(message)
//                         } else throw err
//                     })
//             })
//     },

}
module.exports = weddingApi