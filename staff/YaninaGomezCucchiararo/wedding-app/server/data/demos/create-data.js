'use strict'

require('dotenv').config()

const { mongoose, models: { User, Product } } = require('../')

const { env: { DB_URL } } = process

mongoose.connect(DB_URL)
    .then(() => {
        return Promise.all([User.remove(), Product.deleteMany()])
            .then(() => {
                const yaninaUser = {
                    username: 'Yanina',
                    email: 'y@gmail.com',
                    password: '123',
                    location: 'Barcelona'
                }

                return User.create(yaninaUser)
                    .then(({ _doc: { _id } }) => {
                        console.log(`inserted user ${_id.toString()}`)

                        return Promise.all([
                            Product.create({ image: 'http://images.com/1234', price: 100, size: 42, color: 'white', owner: _id }),
                            Product.create({ image: 'http://images.com/12345', price: 120, size: 38, color: 'cream', owner: _id }),
                            Product.create({ image: 'http://images.com/123456', price: 140, size: 40, color: 'black', owner: _id })
                        ])
                            .then(res => {
                                res.forEach(item => console.log(`inserted dress ${item._doc._id}`))
                            })
                    })
            })
    })
    .then(() => mongoose.connection.close(() => console.log('done')))
    .catch(console.error)