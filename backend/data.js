import bcrypt from 'bcryptjs'
const data = {
    users:[
        {
            nick:'Karolis',
            password: bcrypt.hashSync('blablka',8),
            email:'karolis@gmail.com',
            admin:true,
        },
        {
            nick: 'KAROLIS',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            admin: true,
          },
        {
            nick:'Karolis',
            password: bcrypt.hashSync('karolis',8),
            email:'karolisas@gmail.com',
            admin:true,
        },
        {
            nick:'Skaisteesasdsadas',
            password: bcrypt.hashSync('ulalal',8),
            email:'skaiste@gmail.com',
            admin:false,
        },
        
    ],
products: [
    {
        name: "Saldainių medis su mdxvxiglės",
        category: "medžiai",
        image: '/images/p1.jpg',
        price: 30,
        type: 'Saldainių medis',
        rating: 4.1,
        numReviews: 52,
        countInStock: 1000,
        description: "skani dovana visiems"
    },
    {
        name: "Saldainių medis su mdxzvcxfdvxiglės",
        category: "medžiai",
        image: '/images/p1.jpg',
        price: 30,
        type: 'Saldainių medis',
        rating: 4.1,
        numReviews: 52,
        countInStock: 0,
        description: "skani dovana visiems"
    },
    {
        name: 'Saldainių medis su snickersais',
        category: 'medžiai',
        image:'/images/p3.jpg',
        price: 45,
        type: 'Saildainių medis',
        rating: 2.1,
        numReviews: 3,
        countInStock: 2,
        description: "skani dovana visiems"
    },
    {
        name: 'Saldainių puokštė',
        category: 'puokštės',
        image: '/images/p2.png',
        price: 20,
        type: 'Saldainių puokštė',
        rating: 5,
        numReviews: 3,
        countInStock: 2,
        description: "skani dovana visiems"
    },
    {
        name: 'Saldainių medis su kregždutsėmis',
        category: 'medžiai',
        image: '/images/p1.jpg',
        price: 45,
        type: 'Saldainių medis',
        rating: 2.1,
        numReviews: 1,
         countInStock: 2,
         description: "skani dovana visiems"

    },
    {
        name: 'Saldainių medis su saulėgrąžomis',
        category: 'medžiai',
        image: '/images/p1.jpg',
        price: 45,
        type: 'Saildainių medis',
        rating: 2.1,
        numReviews: 3,
        countInStock: 2,
        description: "skani dovana visiems"
    },
    {
        name: 'Saldainių medis su kregždutėmis',
        category: 'medžiai',
        image:'/images/p1.jpg',
        price: 45,
        type: 'Saildainių medis',
        rating: 2.1,
        numReviews: 3,
        countInStock: 2,
        description: "skani dovana visiems"
    },
    {
        name: 'aldainių medis su rafaelo',
        category: 'medžiai',
        image:'/images/p1.jpg',
        price: 10,
        type: 'Saildainių medis',
        rating: 3,
        numReviews: 1,
        countInStock: 2,
        description: "skani dovana visiems"
    }
]
}
export default data;