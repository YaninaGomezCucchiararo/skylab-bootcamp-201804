'use strict'

require('dotenv').config()

const { mongoose, models: { User, Product } } = require('data')
const { expect } = require('chai')
const weddingApi = require('.')
const _ = require('lodash')
// const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

weddingApi.url = API_URL

describe('weddingApi wedding-app', () => {
    const userData = { username: 'yanina', location: 'Barcelona', email: 'y@mail.com', password: '123' }
    const otherUserData = { username: 'vanesa', location: 'Madrid', email: 'vanesa@mail.com', password: '456' }
    const productData = { image: 'image', price: 200, size: 42, color: 'white' }

    const dummyUserId = '123456781234567812345678'
    const dummyNoteId = '123456781234567812345678'

    const indexes = []

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return Promise.all([User.remove(), Product.deleteMany()])
    })

    describe('resgister user', () => {
        it('should succeed on correct data', () => {
            weddingApi.registerUser('yanina', 'Barcelona', 'y@gmail.com', '123')
                .then(res => expect(res).to.be.true)
        })

        it('should fail on already registered user', () => {
            User.create(userData)
                .then(() => {
                    const { username, location, email, password } = userData

                    return weddingApi.registerUser(username, location, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${userData.email} already exists`)
                })
        })

        it('should fail on no username', () =>
            weddingApi.registerUser()
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        )

        it('should fail on empty user location', () =>
            weddingApi.registerUser(userData.username, '')
                .catch(({ message }) => expect(message).to.equal('user location is empty or blank'))
        )

        it('should fail on blank user location', () =>
            weddingApi.registerUser(userData.username, '     ')
                .catch(({ message }) => expect(message).to.equal('user location is empty or blank'))
        )

        it('should fail on no user email', () =>
            weddingApi.registerUser(userData.username, userData.location)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            weddingApi.registerUser(userData.username, userData.location, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            weddingApi.registerUser(userData.username, userData.location, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            weddingApi.registerUser(userData.username, userData.location, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            weddingApi.registerUser(userData.username, userData.location, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            weddingApi.registerUser(userData.username, userData.location, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    weddingApi.authenticateUser('y@mail.com', '123')
                        .then(id => expect(id).to.exist)
                )
        )

        it('should fail on no user email', () =>
            weddingApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            weddingApi.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            weddingApi.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            weddingApi.authenticateUser(userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            weddingApi.authenticateUser(userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            weddingApi.authenticateUser(userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return weddingApi.retrieveUser(id)
                    //crear producto
                })
                .then(user => {
                    expect(user).to.exist

                    const { username, location, email, _id, password, products } = user

                    expect(username).to.equal('yanina')
                    expect(location).to.equal('Barcelona')
                    expect(email).to.equal('y@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(products).to.be.an('array')
                })
        )

        it('should fail on no user id', () =>
            weddingApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            weddingApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            weddingApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })
    //===================Update===================//
    false&&describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return weddingApi.updateUser(id, 'vanesa', 'Madrid', 'y@mail.com', '123', 'vanesa@mail.com', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { username, location, email, password } = user

                            expect(user.id).to.equal(id)
                            expect(username).to.equal('vanesa')
                            expect(location).to.equal('Madrid')
                            expect(email).to.equal('vanesa@mail.com')
                            expect(password).to.equal('456')
                        })
                })
        )

        it('should fail on changing email to an already existing user\'s email', () =>
            Promise.all([
                User.create(userData),
                User.create(otherUserData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const { username, location, email, password } = userData

                    return weddingApi.updateUser(id1, username, location, email, password, otherUserData.email)
                })
                .catch(({ message }) => expect(message).to.equal(`user with email ${otherUserData.email} already exists`))
        )

        it('should fail on no user id', () =>
            weddingApi.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            weddingApi.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            weddingApi.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no username', () =>
            weddingApi.updateUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user username is not a string'))
        )

        it('should fail on empty username', () =>
            weddingApi.updateUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
        )

        it('should fail on blank username', () =>
            weddingApi.updateUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user username is empty or blank'))
        )

        it('should fail on no user location', () =>
            weddingApi.updateUser(dummyUserId, userData.username)
                .catch(({ message }) => expect(message).to.equal('user location is not a string'))
        )

        it('should fail on empty user location', () =>
            weddingApi.updateUser(dummyUserId, userData.username, '')
                .catch(({ message }) => expect(message).to.equal('user location is empty or blank'))
        )

        it('should fail on blank user location', () =>
            weddingApi.updateUser(dummyUserId, userData.username, '     ')
                .catch(({ message }) => expect(message).to.equal('user location is empty or blank'))
        )

        it('should fail on no user email', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            weddingApi.updateUser(dummyUserId, userData.username, userData.location, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    //==================Unregister====================//
    false && describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return weddingApi.unregisterUser(id, 'y@mail.com', '123')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )

        it('should fail on no user id', () =>
            weddingApi.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            weddingApi.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            weddingApi.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            weddingApi.unregisterUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            weddingApi.unregisterUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            weddingApi.unregisterUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            weddingApi.unregisterUser(dummyUserId, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            weddingApi.unregisterUser(dummyUserId, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            weddingApi.unregisterUser(dummyUserId, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    //==================== Add Product =====================//
   false&& describe('add product', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id: userId }) => {
                    const { image, price, size, color } = productData

                    return weddingApi.addProductToUser(userId, image, price, size, color)
                        .then(productId => {
                            expect(productId).to.exist
                            expect(productId).to.be.a('string')

                            return User.findById(userId)
                                .then(user => {
                                    expect(user).to.exist

                                    expect(user.products).to.exist
                                    expect(user.products.length).to.equal(1)

                                    const { products: [product] } = user

                                    expect(product._id).to.exist
                                    expect(product._id.toString()).to.equal(productId)
                                })
                        })
                })
        )
    })

   false&& describe('list products', () => {
        const product = { owner: '123456781234567812345678', image: 'image', price: 200, size: 42, color: 'white' }

        it('should succeed on correct data', () => {
            return Promise.all([
                new Product(product).save()
            ])
                .then(([product]) => {
                    return weddingApi.listProducts()
                        .then(res => {
                            console.log(res)
                            expect(res.length).to.be.equal(1)
                            expect(res[0]._id).to.be.exist
                            expect(res[0].owner).to.be.exist
                            expect(res[0].image).to.be.equal('image')
                            expect(res[0].price).to.be.exist
                            expect(res[0].price).to.be.equal(200)
                        })
                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done))) // cerrar la base de datos una vez finalice la bateria de test
})