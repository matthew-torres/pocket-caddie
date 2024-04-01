import React from "react";
import renderer from 'react-test-renderer';
import MyBag from '../MyBag/MyBag';


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