import React from 'react'
import Header from './Header'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`Header Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <Header />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})