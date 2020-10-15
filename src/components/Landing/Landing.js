import React, { Component } from 'react'
import Notebook from './images/notebook-and-pen.png'
import NewWorkout from './images/new-workout-screenshot.png'
import NewWorkoutInput from './images/new-workout-input-screenshot.png'
import MyWorkoutsCollapsed from './images/myworkouts-collapsed-view-screenshot.png'
import MyWorkoutsExpanded from './images/myworkouts-expanded-view-screenshot.png'
import Continue from './images/continue-button-screenshot.png'
import './Landing.css'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <div className='LandingPageTitle'>
                    <h1 className='Benchmark__title'>benchMark</h1>
                </div>
                <h2 className='Benchmark__tagline'>A sensible way to track your strength-training progress</h2>                
                <section>
                    <h3 className='LandingPage__section-titles'>Ditch your pen and paper</h3>
                    <img src={Notebook} alt='notebook and pen' className='Landing__image' />
                    <div className='Description__container'>
                        <div className='Benchmark__description'>
                            <p>Here at benchmark we are strength-training enthusiasts.  We understand the amount of <em>stuff</em> you carry at the gym as you work to break your limits.  So we're here to help.  benchMark is an easy solution allowing you to leave that pen and paper at home, and quickly log and track your workout progress in the same device that plays those tunes to keep you pumped up.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className='LandingPage__section-titles'>Keep your focus where it belongs</h3>
                    <div className='Description__container'>
                        <div className='Benchmark__description'>
                            <p>We're all about no muss, no fuss.  benchMark keeps it simple, making it easy for you to:</p>
                        </div>
                    </div>
                    <h4 className='Benchmark__functionality'>Create custom workouts</h4>
                    <div className='Landing__image-container'>
                    <img src={NewWorkout} alt='New workout screenshot' className='Landing__image' />
                    <img src={NewWorkoutInput} alt='New workout input screenshot' className='Landing__image' />
                    </div>
                    <div className='Description__container'>
                        <div className='Benchmark__description'>
                            <p>benchMark gives you control over your experience.  Add exercises.  Add sets.  Complete them as you go, or complete them all at once.  Make a mistake?  No worries, you can update as you go.  benchMark is designed to let you focus on the task at hand: breaking your limits.</p>
                        </div>
                    </div>
                    <h4 className="Benchmark__functionality">Quickly review your workout history</h4>
                    <img src={MyWorkoutsCollapsed} alt='myWorkouts collapsed view screenshot' className='Landing__image' />
                    <div className='Description__container'>
                        <div className='Benchmark__description'>
                            <p>benchMark displays a list of all your completed workouts.  Want a more detailed view?  Give it a double-tap to see your benchMark in its full glory.</p>
                        </div>
                    </div>
                    <img src={MyWorkoutsExpanded} alt='myWorkouts expanded view screenshot' className='Landing__image' />
                    <h4 className="Benchmark__functionality">Pick up where you left off</h4>
                    <img src={Continue} alt='myWorkouts continue button screenshot' className='Landing__image' />
                    <div className='Description__container'>
                        <div className='Benchmark__description'>
                            <p>Accidently close the app in the middle of a workout?  We got you.  Navigate over to the myWorkouts page, give your most recent workout a double-tap, and click on that 'Continue' button.  If you submit your set information as you complete it, it'll be saved, making it easy for you to quickly pick up right where you left off.</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}