import React from "react";
import {configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {ForgotPasswordForm} from "./ForgotPasswordForm";

configure({ adapter: new Adapter() });

describe('<ForgotPasswordForm />', () => {
  describe('render()', () => {

    test('renders the component', () => {
      expect(toJson(<ForgotPasswordForm />)).toMatchSnapshot();
    });

  });
});
