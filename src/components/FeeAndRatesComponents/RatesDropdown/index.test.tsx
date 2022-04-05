import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import RatesDropdown from '../RatesDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { act } from "react-dom/test-utils";

const mockSetSelectedRate = jest.fn();
const mockSetPageTemplate = jest.fn();
const mockSetSelectedCategory = jest.fn();
const mockSetSelectedRatesTable = jest.fn();
const mockSetSelectedForeignExchange = jest.fn();

function createProps(dataItems: any, selectedRate: string) {
  return {
    dataList: dataItems,
    selectedRate,
    setSelectedRate: mockSetSelectedRate,
    setPageTemplate: mockSetPageTemplate,
    setSelectedCategory: mockSetSelectedCategory,
    setSelectedRatesTable: mockSetSelectedRatesTable,
    setSelectedForeignExchange: mockSetSelectedForeignExchange
  }
}

describe('RatesDropdown Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const items = [
      "Rate 1",
      "Rate 2",
      "Rate 3",
      "Rate 4"
    ]
    
    const props = createProps(items, "Rate 1")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><RatesDropdown {...props} /></AppContainer>);
    })
    await wrapper!.update();
    wrapper!.find(`#dropdown-basic`).at(0).simulate('click');
    expect(wrapper!.find(`a.dropdown-item`)).toHaveLength(4);
    expect(wrapper!.find(`a.dropdown-item[role="button"]`)).toHaveLength(4);
    wrapper!.find(Dropdown.Item).at(1).simulate('click');
    await wrapper!.update();
    expect(mockSetPageTemplate.mock.calls).toHaveLength(1)
    expect(mockSetSelectedCategory.mock.calls).toHaveLength(1)
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(1)
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(1)
  })
})
