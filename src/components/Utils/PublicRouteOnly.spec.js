import React from 'react'
import PublicOnlyRoute from './PublicOnlyRoute'
import RegistrationPage from '../../Routes/RegistrationPage/RegistrationPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`PublicOnlyRoute Component`, () => {
    const props = {
        component: <RegistrationPage />
    }
    
    it (`renders a public only route`, () => {
        const wrapper = 
            shallow (
                <PublicOnlyRoute {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})