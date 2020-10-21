import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import App from './App'
import { shallow } from 'enzyme'

describe(`App Component`, () => {
    it('renders without crashing', () => {
        shallow (
            <BrowserRouter>
                <WorkoutProvider>
                    <App />
                </WorkoutProvider> 
            </BrowserRouter>           
        )
    })
})