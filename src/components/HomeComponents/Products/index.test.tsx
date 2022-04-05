import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import Products from '../Products';
import { act } from "react-dom/test-utils";

function createProduct(title: string) {
  return {
    data: {
      attributes: {
        title
      }
    }
  }
}

function createProps(products: any) {
  return {
    dataList: products/*{
      data: cards,
      included: [],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    }*/
  }
}

describe('Products Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const products = [
      createProduct("Product Title 1"),
      createProduct("Product Title 2"),
      createProduct("Product Title 3"),
    ]
    const props = createProps(products)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Products {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Product Title 1");
    expect(wrapper!.html()).toContain("Product Title 2");
    expect(wrapper!.html()).toContain("Product Title 3");
  })
})
