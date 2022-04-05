import React from 'react';
import { mount } from 'enzyme';
import { Filters } from '../Filters';
import Dropdown from 'react-bootstrap/esm/Dropdown';

describe('Filters testing', () => {
  const mockSetIsProductsOpen = jest.fn();
  const mockSetSelectedProduct = jest.fn();
  const mockSetIsCategoryOpen = jest.fn();
  const mockSelectedCategory = jest.fn();
  
  const createWrapper = (isCategoryOpen: boolean, isProductsOpen: boolean)=>mount(
    <Filters 
      productOptions={['ccc', 'ddd']}
      categoryOptions={['aaa', 'bbb']}
      isProductsOpen={isProductsOpen}
      setIsProductsOpen={mockSetIsProductsOpen}
      selectedProduct={'ccc'}
      setSelectedProduct={mockSetSelectedProduct}
      isCategoryOpen={isCategoryOpen}
      setIsCategoryOpen={mockSetIsCategoryOpen}
      selectedCategory={'aaa'}
      setSelectedCategory={mockSelectedCategory}/>
  )

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async() => {
    const wrapper = createWrapper(true, true);
    
    expect(wrapper!).not.toEqual(undefined);
    expect(wrapper.html()).toContain('Choose your category here');
  });
  
  it('Should close category dropdown', async () => {
    const wrapper = createWrapper(false, false);

    expect(wrapper.html()).toContain('aaa');
    expect(wrapper.html()).toContain('ccc');
  });
  
  it('Should call setting function when open category', async () => {
    const wrapper = createWrapper(false, false);

    // @ts-ignore
    wrapper.find(Dropdown).forEach(d => d.props().onToggle!())
    expect(mockSetIsCategoryOpen).toHaveBeenCalledWith(true)
    expect(mockSetIsProductsOpen).toHaveBeenCalledWith(true)
  });
});
