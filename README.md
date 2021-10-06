# benchMark Client

Strength-training tracking designed with the user in mind.  Create, update, delete and review workouts in real time - with the user remaining in the driver seat for the control of their data.

`benchMark Client` is the frontend for `benchMark`.  To see `benchMark` in action, check out [benchMark](https://benchmark-live.vercel.app/ "benchMark").

The `benchMark` backend can be found at: [benchMark-server](https://github.com/trevorjalt/benchmark-server/ "benchMark Api")

`benchmark` supports the creation of your own user account.  If you'd like to see it in action before signing up, use the demo account details below.

### demo account details

* username: limitbreaker
* password: benchMark1!

## ready to break some limits?

Here at `benchmark` we are strength-training enthusiasts. We understand the amount of stuff you carry at the gym as you work to break your limits. So we're here to help. `benchMark` is an easy solution allowing you to leave that pen and paper at home, and quickly log and track your workout progress in the same device that plays those tunes to keep you pumped up.

`benchMark Client` is designed to seamlessly integrate with your gym routine.  Accidentally close the app?  We've got your back: As long as exercise set information was submitted upon each of their individual completion, you can head over to the myWorkouts page, give the most recent work out a double tap, and tap on that continue button.  Your submitted progress will be reflected, allowing you to pick up right where you left off.  No muss, no fuss.  A sensible way to keep your focus where it belongs: on breaking their limits.

## table of contents.

* [demo account details](#demo-account-details)
* [a quick look at our lewk](#a-quick-look-at-our-lewk)
* [the tech](#the-tech)
  * [frontend](#frontend)
  * [testing](#testing)
  * [production](#production)
* [setup](#setup)
  * [local setup](#local-setup)
* [quick start](#quick-start-scripts)
* [component overview](#component-overview)
  * [LandingPage](#LandingPage)
  * [LoginPage](#LoginPage)
  * [RegistrationPage](#RegistrationPage)
  * [MyWorkoutsPage](#MyWorkoutsPage)
  * [NewWorkoutPage](#NewWorkoutPage)

## a quick look at our lewk.

![benchMark app overview](/images/benchmark-app-full-page-view.png)

## the tech.

### frontend.

* React
  * Create React App
  * React Router
* HTML5
* CSS3

### testing.

* Enzyme

### production.

* Deployed via Vercel

## setup.

### local setup.

Clone this repository to your local machine 

````
git clone https://github.com/trevorjalt/benchmark-client benchmark-client
````

Change directory into the cloned repository

````
cd benchmark-client
````

Make a fresh start of the git history for this project

```` 
rm -rf .git && git init
````

Install the node dependencies 

````
npm install
````

Follow the [setup](https://github.com/trevorjalt/benchmark-server#setup "setup") instructions to get `benchMark Api` up and running.

## quick start scripts.

Run the benchmark tests

````
npm t
````

Start the application

````
npm start
````

## component overview.

### LandingPage

![benchMark LandingPage component structure](/images/benchmark-component-overview-landing.png)

### LoginPage

![benchMark LoginPage component structure](/images/benchmark-component-overview-login.png)

### RegistrationPage

![benchMark RegistrationPage component structure](/images/benchmark-component-overview-registration.png)

### MyWorkoutsPage

![benchMark MyWorkoutsPage component structure](/images/benchmark-component-overview-myworkouts.png)

### NewWorkoutPage 

![benchMark NewWorkoutPage component structure](/images/benchmark-component-overview-newworkout.png)

## set your benchMark.  break your limits. 