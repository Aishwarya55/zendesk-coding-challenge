import React from "react"
import toJson from "enzyme-to-json"
import {shallow, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';
import {SubscriptionSubmission} from "../../src/components/views/subscription-submission"

configure({adapter: new Adapter()});
it('Renders correctly', () => {
let [getPrice, getCurrentSubscription] = new Array(2).fill(jest.fn());
const historyMock = { push: jest.fn() };
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
    const wrapper = shallow(
      <SubscriptionSubmission
       {...props}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
})