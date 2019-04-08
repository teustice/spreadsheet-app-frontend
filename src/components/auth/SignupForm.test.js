import React from "react";
import {configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {SignupForm} from "./SignupForm";

configure({ adapter: new Adapter() });

describe('<SignupForm />', () => {
  describe('render()', () => {

    test('renders the component', () => {
      expect(toJson(<SignupForm />)).toMatchSnapshot();
    });

  });
});
