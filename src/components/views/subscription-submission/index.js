import React, { Component } from 'react'
import { getPrice, getCurrentSubscription } from "../../../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "./subscription-submission.css"
import { withRouter } from "react-router-dom"
export class SubscriptionSubmission extends Component {

    goBack() {
        this.props.history.push("/home/subscription")
    }

    componentDidMount(){
        //Redirect page when accessed directly without updating subscription
        if(this.props.currentSubscription.cost.length === 0){
            this.props.history.push("/home/subscription")
        }
    }

    render() {
        return <>

            <div className="subscriptionsubContainer">
                <span className="back-btn" onClick={() => { this.goBack() }}>&lt;&nbsp;&nbsp;Back to Subscription</span>
                <div className="subscriptionSubContainer prev">
                    <h4>Previous Subscription</h4>
                    <div>
                        <span>Plan</span>
                        <span>{this.props.previousSubscription.name}</span>
                    </div>
                    <div>
                        <span>Seats</span>
                        <span>{this.props.previousSubscription.seats}</span>
                    </div>
                    <div>
                        <span>Price</span>
                        <span>${this.props.previousSubscription.cost}</span>
                    </div>

                </div>

                <div className="subscriptionSubContainer curr">
                    <h4>Current Subscription</h4>
                    <div>
                        <span>Plan</span>
                        <span className="currValue">{this.props.currentSubscription.name}</span>
                    </div>
                    <div>
                        <span>Seats</span>
                        <span className="currValue">{this.props.currentSubscription.seats}</span>
                    </div>
                    <div>
                        <span>Price</span>
                        <span className="currValue">${this.props.currentSubscription.cost}</span>
                    </div>

                </div>
            </div>
        </>
    }
}

const mapStateToProps = (state) => {
    return {

        previousSubscription: state.subscriptionReducer.previousSubscription,
        currentSubscription: state.subscriptionReducer.currentSubscription
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPrice,
    getCurrentSubscription
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubscriptionSubmission));