import React from 'react'
import RegistrationForm from './RegistrationForm'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`RegistrationForm Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <RegistrationForm />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})