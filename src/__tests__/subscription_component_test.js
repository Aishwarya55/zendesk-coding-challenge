import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from "enzyme"
import {Subscription} from "../components/views/subscription"
import sinon from "sinon"


configure({adapter: new Adapter()});
let [getPrice, getCurrentSubscription] = new Array(2).fill(jest.fn());
const historyMock = { push: jest.fn() };

function shallowSetup(){
    const props = {
        costPreview: {

            plan: "good",
            name: "Good",
            seats: 5,
            cost: "50"
    
        },
        currentSubscription: {

            plan: "good",
            name: "Good",
            seats: 5,
            cost: "50"
    
        },
        history: historyMock,
        getPrice,
        getCurrentSubscription,
        updateSubscription: jest.fn().mockResolvedValueOnce({})
    }

    const enzymeWrapper = shallow(<Subscription {...props}/>);

    return {
        props,
        enzymeWrapper
    }
}


describe('Shallow rendered subscription details', () => {
    it('should render a card with current subscription details', () => {
        const {enzymeWrapper, props} = shallowSetup()

        expect(enzymeWrapper.find('h2').text()).toBe("Subscription");
        expect(enzymeWrapper.find('.planSelect').props().value).toBe(props.currentSubscription.plan);
        expect(enzymeWrapper.find('input').props().value).toBe(props.currentSubscription.seats);
        expect(enzymeWrapper.find('.costEl').text()).toBe(`$${props.currentSubscription.cost}<Loader />`);

        expect(enzymeWrapper.containsMatchingElement(<button>Update Subscription</button>)).toBe(true)
    })
})

describe('Subscription Form', () => {
    let wrapper, props_;
    beforeEach(() => {
        sinon.spy(Subscription.prototype, "changeSubscription");
        sinon.spy(Subscription.prototype, "validate");
        sinon.spy(Subscription.prototype, "updateNewSubscription");
        const {enzymeWrapper, props} = shallowSetup();
        wrapper = enzymeWrapper
        props_=props

    
    });
    afterEach(()=>{
        Subscription.prototype.changeSubscription.restore()
        Subscription.prototype.validate.restore()
        Subscription.prototype.updateNewSubscription.restore()
    });
    it(('should call change subscription and change isEnabled when input seats is changed'), () => {

        const input = wrapper.find('input').first();
        input.simulate('change', { target: { value: '7' } })

        expect(Subscription.prototype.changeSubscription.calledOnce).toBe(true)
        expect(wrapper.state().subscriptionData.seats).toBe('7');
        expect(wrapper.state().isEnabled).toBe(true);
    });

    it(('should call change subscription and change isEnabled when plan select is changed'), () => {
        const select = wrapper.find('select').first();
        select.simulate('change', { target: { value: 'best' } })

        expect(Subscription.prototype.changeSubscription.calledOnce).toBe(true)
        expect(wrapper.state().subscriptionData.plan).toBe('best');
        expect(wrapper.state().isEnabled).toBe(true);
    })

    it(('seats should not accept text and isEnable must remain to be false'), ()=>{
        const input = wrapper.find('input').first();
        input.simulate('blur', { target: { value: "abc" } })

        expect(Subscription.prototype.validate.calledOnce).toBe(true)
   
        expect(wrapper.state().subscriptionData.seats).toBe(0);
        expect(wrapper.state().isEnabled).toBe(false);
    })

    it(('Update Subscription should call updateSubscription action and change to submission page'), async ()=>{
        const button = wrapper.find('button').first();
        button.simulate('click')

        
        expect(Subscription.prototype.updateNewSubscription.calledOnce).toBe(true)
        expect(props_.updateSubscription).toBeCalledWith({...props_.currentSubscription, ...wrapper.state().subscriptionData})


        await props_.updateSubscription()

        expect(historyMock.push.mock.calls[0]).toEqual(["/home/submission"]);

    })


})