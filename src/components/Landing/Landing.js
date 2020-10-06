import React, { Component } from 'react'
import goku from './styles/images/goku.png'
import goku2 from './styles/images/goku2.png'
import goku3 from './styles/images/goku3.png'
import './styles/Landing.css'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <h1>benchmark</h1>
                <h2>A sensible way to track your strength-training progress.</h2>
                <section>
                    <h3>Ditch your pen and paper</h3>
                    <img src={goku} alt='goku' />
                    <p>Here at benchmark we are strength-training enthusiasts.  We understand the amount of <em>stuff</em> you carry at the gym as you work to break your limits.  So we're here to help.  benchMark is an easy solution allowing you to leave that pen and paper at home, and quickly log and track your workout progress in the same device that plays those tunes to keep you pumped up.</p>
                </section>
                <section>
                    <h3>Keep your focus where it belongs</h3>
                    <p>We're all about no muss, no fuss.  benchMark keeps it simple, making it easy for you to:</p>
                    <img src={goku2} alt='goku' />
                    <p>Create custom workouts</p>
                    <img src={goku3} alt='goku' />
                    <p>Quickly analyze your progress.  You input numbers, you receive numbers.  No graphs to interpret.  Sensible.</p>
                </section>
            </div>
        )
    }
}