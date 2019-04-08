import React from "react";
import {configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {LoginForm} from "./LoginForm";

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  describe('render()', () => {

    test('renders the component', () => {
      expect(toJson(<LoginForm />)).toMatchSnapshot();
    });

  });
});
