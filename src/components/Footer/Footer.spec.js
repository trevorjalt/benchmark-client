import React from 'react'
import Footer from './Footer'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`Footer Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <Footer />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})