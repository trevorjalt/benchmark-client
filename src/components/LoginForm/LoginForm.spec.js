import React from 'react'
import LoginForm from './LoginForm'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`LoginForm Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <LoginForm />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})