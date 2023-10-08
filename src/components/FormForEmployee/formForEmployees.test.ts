import '@testing-library/jest-dom/extend-expect'

import { convertPhone } from './FormForEmployee'

describe('Form component', () => {
    it('convertPhone function works correctly', () => {
        const initNumber = '+7 (823) 440-3602'
        const expectedNubmer = '8234403602'

        expect(convertPhone(initNumber)).toBe(expectedNubmer)
    })
})
