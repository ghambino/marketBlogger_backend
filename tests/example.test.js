const palindrome = require('../testing').palindrome
const average = require('../testing').average

describe('palindrome testing', () => {
    test('palindrome of a', () => {
        const result = palindrome('a')
        expect(result).toBe('a')
    })

    test('palindrome of abbas', () => {
        const result = palindrome('abbas')
        expect(result).toBe('sabba')
    })

    test('palindrome of mistura', () => {
        const result = palindrome('misturah')
        expect(result).toBe('harutsim')
    })
})

// describe
// afterall(() =>{
//     mongoose.connection.close()
// })