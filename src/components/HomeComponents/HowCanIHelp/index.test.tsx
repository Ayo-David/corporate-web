import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import HowCanIHelp from '../HowCanIHelp';
import Dropdown from 'react-bootstrap/Dropdown';
import { act } from "react-dom/test-utils";

function createProps(products: any) {
  return {
    dataList: {
      data: {
        attributes: {
          field_filter_products: products
        }
      }
    },
  }
}

describe('HowCanIHelp Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const items = [
      "Help 1",
      "Help 2",
      "Help 3",
      "Help 4"
    ]
    
    const props = createProps(items)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><HowCanIHelp {...props} /></AppContainer>);
    })
    await wrapper!.update();
    //expect(wrapper!.find(Dropdown.Item)).toHaveLength(4);
    wrapper!.find(`#dropdown-basic`).at(0).simulate('click');
    expect(wrapper!.find(`a.dropdown-item[role="button"]`)).toHaveLength(4);
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).toContain("Help 1")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 2")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 3")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 4")
    wrapper!.find(Dropdown.Item).at(1).simulate('click');
    await wrapper!.update();
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).toContain("Help 2")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 1")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 3")
    expect(wrapper!.find(Dropdown.Toggle).at(0).html()).not.toContain("Help 4")
  })
})
