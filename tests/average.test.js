const average = require('../testing').average

describe('average functionality testting', () =>{
    test('testing average of 1', () =>{
        expect(average([1])).toBe(1)
    })

    test('testing average of several number', () => {
        expect(average([2,3,4,5,5,6])).toBe(4.166666666666667)
    })
    test('average of empty array', () => {
        expect(average([])).toBe(0)
    })
})