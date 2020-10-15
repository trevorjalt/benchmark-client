import React from 'react'
import PrivateRoute from './PrivateRoute'
import MyWorkoutsPage from '../../Routes/MyWorkoutsPage/MyWorkoutsPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`PrivateRoute Component`, () => {
    const props = {
        component: <MyWorkoutsPage />
    }
    
    it (`renders private route`, () => {
        const wrapper = 
            shallow (
                <PrivateRoute {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})