const dummy = blogs => {
    return 1
}

const totalLikes = (blogs) => {
    const likeArray = blogs.map(blog => blog.likes)
    const reduceMapped = likeArray.reduce((sum,item) => {
        return sum + item;
    }, 0)
    return reduceMapped
}

const favoriteBlog = (blogs) => {
    const likeArray = blogs.map(blog => blog.likes);
    const mostLiked = blogs.filter((blog) => {
        return blog.likes === Math.max(...likeArray)
    })
        console.log(mostLiked);
        return mostLiked[0];
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}