import React from 'react'
import Landing from './Landing'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`Landing Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <Landing />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})