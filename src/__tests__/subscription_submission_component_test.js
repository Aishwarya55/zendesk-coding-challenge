import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from "enzyme"
import {SubscriptionSubmission} from "../components/views/subscription-submission"
import sinon from "sinon"

configure({adapter: new Adapter()});
let [getPrice, getCurrentSubscription] = new Array(2).fill(jest.fn());
const historyMock = { push: jest.fn() };
function shallowSetup(){
    const props = {
        previousSubscription: {
            plan: "good",
            name: "Good",
            seats: "5",
            cost: "50"
        },
        currentSubscription: {
            plan: "best",
            name: "Best",
            seats: "5",
            cost: "5000"
        },
        history: historyMock
    }

    const enzymeWrapper = shallow(<SubscriptionSubmission {...props}/>)

    return {
        props,
        enzymeWrapper
    }
}

describe('Shallow rendered subscription details', () => {
    it('should render a card with current and previous subscription details', () => {
        const {enzymeWrapper, props} = shallowSetup()

        expect(enzymeWrapper.find('.curr').exists()).toBe(true)

        const currContainer = enzymeWrapper.find('.curr')

        expect(currContainer.find('h4').text()).toBe('Current Subscription')

        expect(currContainer.find('.currValue')).toHaveLength(3)


        expect(currContainer.find('.currValue').at(0).text()).toBe(props.currentSubscription.name)

        expect(currContainer.find('.currValue').at(1).text()).toBe(props.currentSubscription.seats)

        expect(currContainer.find('.currValue').at(2).text()).toBe("$"+props.currentSubscription.cost)


        expect(enzymeWrapper.find('.prev').exists()).toBe(true)

        const prevContainer = enzymeWrapper.find('.prev')
        
        expect(prevContainer.find('h4').text()).toBe('Previous Subscription')

        expect(prevContainer.find('span')).toHaveLength(6)


        expect(prevContainer.find('span').at(1).text()).toBe(props.previousSubscription.name)

        expect(prevContainer.find('span').at(3).text()).toBe(props.previousSubscription.seats)

        expect(prevContainer.find('span').at(5).text()).toBe("$"+props.previousSubscription.cost)
    })

 
})

describe('Back Button Function', () => {
    let wrapper, props_;
    beforeEach(() => {
        sinon.spy(SubscriptionSubmission.prototype, "goBack");

        const {enzymeWrapper, props} = shallowSetup();
        wrapper = enzymeWrapper
        props_=props

    });
    afterEach(()=>{
        SubscriptionSubmission.prototype.goBack.restore()
     
    });
    it('go back to previus page', () => {
       

        expect(wrapper.find('.back-btn').exists()).toBe(true)

        const backButton = wrapper.find('.back-btn')

        backButton.simulate("click")
        expect(SubscriptionSubmission.prototype.goBack.calledOnce).toBe(true)

        expect(historyMock.push.mock.calls[0]).toEqual(["/home/subscription"]);

    })
})