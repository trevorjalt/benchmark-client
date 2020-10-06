import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { WorkoutProvider } from './contexts/WorkoutContext'
import App from './components/App/App';

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <WorkoutProvider>
            <App />
        </WorkoutProvider> 
    </BrowserRouter>,
    document.getElementById('root')
)


// serviceWorker.unregister();
