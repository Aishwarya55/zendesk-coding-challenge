import React from "react"
import toJson from "enzyme-to-json"
import {shallow, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';
import {Subscription} from "../../src/components/views/subscription"

configure({adapter: new Adapter()});
it('Renders correctly', () => {
let [getPrice, getCurrentSubscription, updateSubscription] = new Array(3).fill(jest.fn());
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
        getPrice,
        getCurrentSubscription,
        updateSubscription
    }
    const wrapper = shallow(
      <Subscription
       {...props}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
})