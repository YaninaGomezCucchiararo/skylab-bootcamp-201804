'use strict';

const { models: { User, Product } } = require('data')

const logic = {
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

                return User.findOne({ email })
                    .then(user => {
                        if (user) throw Error(`user with email ${email} already exists`)

                        return User.create({ username, location, email, password })
                            .then(() => true)
                    })
            })
    },
     
}
module.exports = logic