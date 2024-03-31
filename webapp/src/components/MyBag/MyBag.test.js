import React from "react";
import renderer from 'react-test-renderer';
import { Renderer } from "@testing-library/react-hooks";
import MyBag from '../MyBag/MyBag';
import MockAdapter from 'axios-mock-adapter';
import instance from "../../axios_instance";
import { render, waitFor } from "@testing-library/react";


jest.mock('../../retrieveBagData', () => {
    return jest.fn(() => [
      { clid: 1, type: 'Type1', brand: 'Brand1', name: 'Name1' },
      { clid: 2, type: 'Type2', brand: 'Brand2', name: 'Name2' }
    ]);
  });
  
  describe('MyBag component', () => {
    it('renders MyBag correctly', async () => {

    const component = renderer.create(<MyBag />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
  });