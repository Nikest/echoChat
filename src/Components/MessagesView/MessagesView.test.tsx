import * as React from 'react';
import { mount, configure } from 'enzyme';

const Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

import { MessagesView } from './MessagesView';


describe('Testing of rendering user data', () => {
    it('Component must include correct data', () => {
        const wrapper = mount(<MessagesView/>);
        wrapper.setState({
            messages: [{
                userName: 'Test',
                message: 'test msg',
                self: true,
                hash: 'hash'
            }]
        });
        console.log(wrapper.html());
    })
});