import React, { Component } from 'react'
import Subscription from "./../subscription"
import SubscriptionSubmission from "./../subscription-submission"
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import "./home.css"

class Home extends Component {


    render() {
        return <div className="homeContainer"><Switch>
            <Route exact path="/home">
                <Redirect to="/home/subscription" />
            </Route>
            <Route exact path="/home/subscription" component={Subscription} />
            <Route exact path="/home/submission" component={SubscriptionSubmission}>
                
        </Route>

        </Switch>
    
        </div>
    }
}

export default Home