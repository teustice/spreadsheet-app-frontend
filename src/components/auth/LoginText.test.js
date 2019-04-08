import React from "react";
import {configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {LoginText} from "./LoginText";

configure({ adapter: new Adapter() });

describe('<LoginText />', () => {
  describe('render()', () => {

    test('renders the component', () => {
      expect(toJson(<LoginText />)).toMatchSnapshot();
    });

    test('renders text when a user is logged in', () => {
      const wrapper = shallow(<LoginText currentUser={{email: 'test@test.com'}} />);
      expect(wrapper.find('p').text()).toEqual(`Hello, test@test.com`);
    });


    test('It displays nothing without a logged in user', () => {
      const wrapper = shallow(<LoginText />);
      expect(wrapper.find('p').exists()).toEqual(false);
    });
  });
});
