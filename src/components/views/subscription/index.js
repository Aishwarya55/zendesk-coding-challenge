import React, { Component } from 'react'
import { getPrice, getCurrentSubscription, updateSubscription } from "../../../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom"
import "./subscription.css"
import Loader from "./../../loader/index"
export class Subscription extends Component {



    state = {
        subscriptionData: {
            plan: "basic",
            seats: 0
        },
        isEnabled: false
    }

    componentDidMount() {

        this.props.getCurrentSubscription()
    }


    changeSubscription(type, event, subscriptionData) {



        if (type === "seats") {
            let num = event.target.value.match(/^\d+$/);
            if (num === null) {

                event.target.value = "";
            }

            if (event.target.value === "0") {
                event.target.value = "1";
            }
        }


        let newSubcriptionData = {
            ...subscriptionData,
            [type]: event.target.value
        }
        let fieldDirty = false


        Object.keys(newSubcriptionData).forEach(key => {

            if (newSubcriptionData[key] !== this.props.currentSubscription[key])
                fieldDirty = true

        })

        this.setState({
            ...this.state,
            subscriptionData: {
                ...subscriptionData,
                [type]: event.target.value
            },
            isEnabled: fieldDirty
        })


        if (event.target.value.length !== 0)
            this.props.getPrice({
                ...newSubcriptionData
            })

    }

    validate(e, subscriptionData) {
        if (e.target.value.trim().length === 0) {
            e.target.value = this.props.currentSubscription.seats
            this.changeSubscription("seats", e, subscriptionData)
        }
    }

    componentDidUpdate(prevProp, prevState) {



    }

    updateNewSubscription() {
        this.props.updateSubscription({
            ...this.props.currentSubscription,
            ...this.state.subscriptionData
        }).then(success => {
            this.props.history.push("/home/submission")
        })
    }




    render() {

        const subscriptionData = !this.state.isEnabled ? this.props.currentSubscription : this.state.subscriptionData

        const costPreview = !this.state.isEnabled ? this.props.currentSubscription : this.props.costPreview
        return <>
            <div class="card">
                <h2>
                    Subscription
        </h2>
                <div className="outerContainer">

                    <div className="subscriptionContainer">
                        <div className="formElement">
                            <label htmlFor="plan" className="label">
                                Plan
            </label>
                            <select name="plan" className="planSelect formComp" value={subscriptionData.plan} onChange={(e) => { this.changeSubscription("plan", e, subscriptionData) }}>
                                <option value="basic">Basic</option>
                                <option value="good">Good</option>
                                <option value="better">Better</option>
                                <option value="best">Best</option>
                            </select>

                        </div>


                        <div className="formElement">
                            <label htmlFor="seat" className="label">
                                Seats
            </label>
                            <input className="seatInput formComp" type="number" name="seat" min="1" value={subscriptionData.seats} onChange={(e) => { this.changeSubscription("seats", e, subscriptionData) }} onBlur={(e) => { this.validate(e, subscriptionData) }} />

                        </div>

                        <div className="formElement">

                            <div className="formComp price">
                                Price
            </div>
                            <div className="formComp costEl">
                                {!this.props.loading && `$${costPreview.cost}`}
                                <Loader showLoader={this.props.loading} />
                            </div>
                        </div>



                    </div>
                    <div className="buttonContainer">
                        <button disabled={!this.state.isEnabled || this.props.loading} onClick={() => this.updateNewSubscription()} >Update Subscription</button>
                    </div>
                </div>
            </div>
        </>
    }

}

const mapStateToProps = (state) => {
    return {
        costPreview: state.subscriptionReducer.costPreview,
        currentSubscription: state.subscriptionReducer.currentSubscription,
        loading: state.subscriptionReducer.loading
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPrice,
    getCurrentSubscription,
    updateSubscription
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subscription));