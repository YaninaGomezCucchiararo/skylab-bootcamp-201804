require('dotenv').config()

const {mongoose, models: {User, Product}} = require('.')

const { expect } = require('chai')

const { env: { DB_URL } } = process

describe(`models (wedding-app)`, () =>{

    const yaninaUser = {
        username: 'Yanina',
        email: 'y@gmail.com',
        password:'123',
        location: 'Barcelona',
        products: []
    }
 
    const dressProduct = {
        imgUrl: 'image',
        price: 50,
        size: 38,
        color: 'blanco',
        ownerId: ''
    }

    before(()=> mongoose.connect(DB_URL)) //nos conectamos a la base de datos

    beforeEach(()=> Promise.all([
        User.remove(),Product.deleteMany()
    ]))

    describe(`create user`,()=>{
        it('should succeed on correct data', ()=> {
            const user = new User(yaninaUser) 

            return user.save()
            .then(user => {
                expect(user).to.exist
                expect(user._id).to.exist
                expect(user.username).to.equal('Yanina')
                expect(user.email).to.equal('y@gmail.com')
                expect(user.password).to.equal('123')
                expect(user.location).to.equal('Barcelona')
                expect(user.products.length).to.equal(0)
            })
        })
    })

    describe(`create product`,()=>{
        
        it('should succeed on correct data', ()=> {
            User.create(yaninaUser)
        .then(user => {

            dressProduct.ownerId = user._id
            

            const product = new Product(dressProduct)
                return product.save()
                .then(product => {
                    expect(product).to.exist
                    expect(product.imgUrl).to.equal('image')
                    expect(product.price).to.equal(50)
                    expect(product.size).to.equal(38)
                    expect(product.color).to.equal('blanco')
                    expect(product.ownerId).to.equal(user._id)

                    user.products.push(product._id)
                    user.save()
                    console.log(user)
                    .then(user => {
                        expect(user.products.length).to.equal(1)
                        expect(user.products[0]).to.equal(product._id)
                    })

                })
        })
           
        })
    })

    
  
    after(done=>mongoose.connection.db.dropDatabase(()=> mongoose.connection.close(done))) // cerrar la base de datos una vez finalice la bateria de test
})
