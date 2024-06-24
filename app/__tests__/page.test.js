import React from 'react'
import { render } from '@testing-library/react'
import Page from '../page'

describe('Page', () => {
    it('should render without crashing', () => {
        render(<Page />)
        expect(true).toBe(true)
    })
})
