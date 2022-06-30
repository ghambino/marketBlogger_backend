const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest')
const Bloglist = require('../models/blogpost');

const api = supertest(app)
// console.log(`server running on port ${PORT}`)

const initialBloglist = [
    {
        "title": "the universal truth of masculinity",
        "author": "abdulwahab abbas",
        "url": "www.universaltruth.com/74993",
        "likes": 204,
        "id": "602437e733b54f19586f9362"
    },
    {
        "title": "the backend development isnt funny",
        "author": "abdulwahab abbas",
        "url": "www.universaltruth.com/993",
        "likes": 200,
        "id": "602439680355c01f08b1bdf9"
    }
];


beforeEach(async () =>{
 await Bloglist.deleteMany({})
 let newObject = new Bloglist(initialBloglist[0])
 await newObject.save()
 newObject = new Bloglist(initialBloglist[1])
 await newObject.save()
})

describe('check the DB', () =>{
   test('return correct format', async () => {
       await api.get('/api/blogs')
       .expect(200)
       .expect('Content-Type', /application\/json/)
   }) 
   test('return correct number', async () => {
       const response = await api.get('/api/blogs')
       expect(response.body).toHaveLength(initialBloglist.length)
   })

    test('using id to get the blog', async () =>{
        const blogAtStart = await Bloglist.find({})
        
        const noteToView = blogAtStart[0];

        
        // await api.get(`/api/blogs/${noteToView.id}`)
        // .expect(200)
        // .expect('Content-Type', /application\/json/)

        expect(noteToView.id).toBeDefined()
    })
})
describe('creatung a new blogPost', () => {
    test('verifying new post created', async () => {
        
        const blog3 = {
        "title": "Government agenda on the female genital mutilation",
        "author": "adetunji miise",
        "url": "www.universaltruth.com/74648363",
        "likes": 4000,
        }

        await api.post('/api/blogs')
        .send(blog3)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const notesAtEnd = await Bloglist.find({})
        expect(notesAtEnd).toHaveLength(initialBloglist.length + 1)
    })

    test('missing likes property, default to zero', async () => {
        const newBlog = {
            title: "miscellaneous expenses in marriage affairs",
            author: "AbdulRasheed Nuriyat",
            url: "www.nurglobalfoundation.com/278"
        }
            await api.post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await Bloglist.find({})
        const noteToView = notesAtEnd[2];
        expect(noteToView.likes).toBeDefined()
    })
    test('incomplete request body', async () => {
        const newBlog = {
            author: "adekunle soladoye",
            likes: 55
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(404)

    })
})
describe('removing functionality', () => {
    test('removing a specific blog', async () => {
        const begin = await Bloglist.find({})
        console.log(begin)
        const noteDeleted = begin[0]
    
        await api
        .delete(`/api/blogs/${noteDeleted.id}`)
        .expect(204)
    
        const ending = await Bloglist.find({})
        console.log(ending)
        expect(ending).toHaveLength(initialBloglist.length -1)
    
    })
})



afterAll(() => {
    mongoose.connection.close()
})