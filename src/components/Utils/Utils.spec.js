import React from 'react'
import { NiceDate, Button, Input, Required, Section } from './Utils'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import './Utils.css'

describe(`Utils Component`, () => {
    const dateProps = {
        date: new Date(),
        format: 'do MMMM yyyy',
    }

    const props = {
        className: 'LimitBreaker',
    }
    
    it (`returns a nice date`, () => {
        const wrapper = 
            shallow (
                <NiceDate {...dateProps} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it (`returns a button`, () => {
        const wrapper = 
            shallow (
                <Button {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it (`returns an input field`, () => {
        const wrapper = 
            shallow (
                <Input {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it (`returns required`, () => {
        const wrapper = 
            shallow (
                <Required {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it (`returns a section`, () => {
        const wrapper = 
            shallow (
                <Section {...props} />
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })  
})