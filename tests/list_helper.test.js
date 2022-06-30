const listHelper = require('../utils/list_helper')

describe('testing Dummy', () => {
    test('dummy returns 1', () => {
        const blogs = [];

        expect(listHelper.dummy(blogs)).toBe(1);
    })
})

describe('total likes functionality testing', () => {
    const listWithOneBlog = [
        {
          id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5
        }
      ]
      const listWithMoreBlog = [
        {
          id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
          }
      ]
    test('when list has only one blog equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('when list has more than one blog equals aggregate', () => {
        const result = listHelper.totalLikes(listWithMoreBlog);

        expect(result).toBe(10)
    })
})

describe('testing the favoriteBlogs functionality', () => {
  const blogWithOne = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },

  ];
  const blogWithMore = [
    
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        id: '5a422aa71b54a676234d638',
        title: 'the negotiation power of the Dollar',
        author: 'Abdulwahab Abbas',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/negotiation_power/8272',
        likes: 30
      }
  ];

  test('likes with one blog', () => {
    const result = listHelper.favoriteBlog(blogWithOne)
    expect(result).toEqual({
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    })
  })
  test('likes with many blogs', () => {
    const result = listHelper.favoriteBlog(blogWithMore);
    expect(result).toEqual({
      id: '5a422aa71b54a676234d638',
      title: 'the negotiation power of the Dollar',
      author: 'Abdulwahab Abbas',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/negotiation_power/8272',
      likes: 30
    })
  })
})