import React from "react";
import {configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {LogoutButton} from "./LogoutButton";

configure({ adapter: new Adapter() });

describe('<LogoutButton />', () => {

  describe('render()', () => {

    test('renders the component', () => {
      expect(toJson(<LogoutButton />)).toMatchSnapshot();
    });

    test('renders button when a user is logged in', () => {
      const wrapper = shallow(<LogoutButton currentUser={{email: 'test@test.com'}} />);
      expect(wrapper.find('button').text()).toEqual(`Log Out`);
    });


    test('It displays nothing without a logged in user', () => {
      const wrapper = shallow(<LogoutButton />);
      expect(wrapper.find('p').exists()).toEqual(false);
    });
  });

  describe('resetCurrentUser()', () => {

    test('It sets currentUser to null', () => {
      let user = 'some user';
      let history = [];
      let testSetCurrentUser = (value) => {
        user = value;
      }
      const wrapper = shallow(<LogoutButton history={history} setCurrentUser={testSetCurrentUser}/>);
      const instance = wrapper.instance();
      instance.resetCurrentUser()
      expect(user).toEqual(null);
    });


    test('It redirects to /signin', () => {
      let user = 'some user';
      let history = [];
      let testSetCurrentUser = (value) => {
        user = value;
      }
      const wrapper = shallow(<LogoutButton history={history} setCurrentUser={testSetCurrentUser}/>);
      const instance = wrapper.instance();
      instance.resetCurrentUser()
      expect(history[0]).toEqual('/signin');
    });

  });

});
