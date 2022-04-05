import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import FeesAndRatesPageBody from '../FeesAndRatesPageBody';
import { act } from "react-dom/test-utils";

const mockSetPageTemplate = jest.fn();
const mockSetSelectedCategory = jest.fn();
const mockSetSelectedRatesTable = jest.fn();
const mockSetSelectedForeignExchange = jest.fn();

function createProps(preText: string, postText: string, selectedRate: string, categories: any, rateTables: any,
                     selectedCategory: string, selectedRatesTable: string, pageTemplate: string, lastUpdatedPage: string,
                     foreignExchangeData: any, selectedForeignExchange: string) {
  return {
    preText: { value: preText},
    postText: { value: postText },
    selectedRate,
    categories,
    rateTables,
    selectedCategory,
    setSelectedCategory: mockSetSelectedCategory,
    selectedRatesTable,
    setSelectedRatesTable: mockSetSelectedRatesTable,
    pageTemplate,
    setPageTemplate: mockSetPageTemplate,
    lastUpdatedPage,
    foreignExchangeData,
    selectedForeignExchange,
    setSelectedForeignExchange: mockSetSelectedForeignExchange
  }
}

function createRateTable(category: string, rateTable: string, text: string) {
  return {
    Categoty: category,
    Rate_Table: rateTable,
    body: text
  }
}

const categories = [
  'RT Category 1',
  'RT Category 2'
]

const rateTables = [
  createRateTable('RT Category 1','RT1', 'RT Text 1'),
  createRateTable('RT Category 1','RT2', 'RT Text 2'),
  createRateTable('RT Category 1','RT3', 'RT Text 3'),
  createRateTable('RT Category 1','RT4', 'RT Text 4')
]

const foreignExchangeData = [
  createRateTable('RT Category 1','FED1',  'FED Text 2'),
  createRateTable('RT Category 1','FED2',  'FED Text 2'),
  createRateTable('RT Category 1','FED3',  'FED Text 3'),
  createRateTable('RT Category 2','FED4',  'FED Text 4'),
  createRateTable('RT Category 2','FED5',  'FED Text 5'),
  createRateTable('RT Category 2','FED6',  'FED Text 6')
]

describe('RatesDropdown Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load Interest Rates properly', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Interest Rates", categories, rateTables,
      "RT Category 1", "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.categories`).find(`.dropdown-toggle`).at(0).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.find(`.categories`).find(`a.dropdown-item`)).toHaveLength(2)
    await act(async () => wrapper!.find(`.categories`).find(`a.dropdown-item`).at(0).simulate('click'))
    await wrapper!.update();
    expect(mockSetSelectedCategory.mock.calls).toHaveLength(1)
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(1)
    await act(async () => wrapper!.find(`.categories`).find(`a.dropdown-item`).at(1).simulate('click'))
    await wrapper!.update();
    expect(mockSetSelectedCategory.mock.calls).toHaveLength(2)
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(2)
    await wrapper!.update();
    
  
    await act(async () => wrapper!.find(`.rates`).find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`.rates`).find(`a.dropdown-item`)).toHaveLength(5)
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(2)
    expect(wrapper!.find(`.rates`).find(`a.dropdown-item`).at(0).html()).toContain("All Rates")
    await act(async () => wrapper!.find(`.rates`).find(`a.dropdown-item`).at(0).simulate('click'));
    await wrapper!.update();
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(3)
    await act(async () => wrapper!.find(`.rates`).find(`a.dropdown-item`).at(1).simulate('click'));
    await wrapper!.update();
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(4)
    await act(async () => wrapper!.find(`.rates`).find(`a.dropdown-item`).at(2).simulate('click'));
    await wrapper!.update();
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(5)
    expect(wrapper!.html()).toContain("FARPB Page Template")
    
  })
  
  it('should load Interest Rates properly with no selected category', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Interest Rates", categories, rateTables,
      '', "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.rates`).find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`.rates`).find(`a.dropdown-item`)).toHaveLength(1)
    await act(async () => wrapper!.find(`.rates`).find(`a.dropdown-item`).at(0).simulate('click'));
    expect(mockSetSelectedRatesTable.mock.calls).toHaveLength(1)
    await wrapper!.update();
  })
  
  it('should load Interest Rates with no selected rates table ', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Interest Rates", categories, rateTables,
      'RT Category 1', '', "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.categories`).find(`.dropdown-toggle`).at(0).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.find(`.categories`).find(`a.dropdown-item`)).toHaveLength(2)
    await act(async () => wrapper!.find(`.categories`).find(`a.dropdown-item`).at(0).simulate('click'))
    await wrapper!.update();
    expect(mockSetSelectedCategory.mock.calls).toHaveLength(1)
  })
  
  it('should load Interest Rates properly with no selected rates table and category', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Interest Rates", categories, rateTables,
      '', '', "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.categories`).find(`.dropdown-toggle`).at(0).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.find(`.categories`).find(`a.dropdown-item`)).toHaveLength(2)
    await act(async () => wrapper!.find(`.categories`).find(`a.dropdown-item`).at(0).simulate('click'))
    await wrapper!.update();
    expect(mockSetSelectedCategory.mock.calls).toHaveLength(1)
  })
  
  it('should load Foreign Exchange properly', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Foreign Exchange", categories, rateTables,
      "RT Category 1", "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`a.dropdown-item`)).toHaveLength(7)
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(0)
    await act(async () => wrapper!.find(`a.dropdown-item`).at(0).simulate('click'));
    await wrapper!.update();
    await act(async () => wrapper!.find(`a.dropdown-item`).at(1).simulate('click'));
    await wrapper!.update();
    await act(async () => wrapper!.find(`a.dropdown-item`).at(2).simulate('click'));
    await wrapper!.update();
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(3)
  })
  
  it('should load Foreign Rates properly with no selected foreign exchange', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Foreign Exchange", categories, rateTables,
      'RT Category 2', '', "FARPB Page Template", "FARPB Last",
      foreignExchangeData, '')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`a.dropdown-item`)).toHaveLength(7)
    await act(async () => wrapper!.find(`a.dropdown-item`).at(0).simulate('click'));
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(1)
  })
  
  it('should load Foreign Rates properly with no selected category', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Foreign Exchange", categories, rateTables,
      '', "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`a.dropdown-item`)).toHaveLength(7)
    await act(async () => wrapper!.find(`a.dropdown-item`).at(0).simulate('click'));
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(1)
  })
  
  it('should load Foreign Rates properly with no selected foreign exchange and category', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Foreign Exchange", categories, rateTables,
      '', "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, '')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => wrapper!.find(`.dropdown-toggle`).at(0).simulate('click'));
    await wrapper!.update();
    expect(wrapper!.find(`a.dropdown-item`)).toHaveLength(7)
    await act(async () => wrapper!.find(`a.dropdown-item`).at(0).simulate('click'));
    expect(mockSetSelectedForeignExchange.mock.calls).toHaveLength(1)
  })
  
  it('should load Other Base Rate properly', async () => {
    const props = createProps("FARPB Pretext", "FARPB Postext", "Base Rates", categories, rateTables,
      "RT Category 1", "RT1", "FARPB Page Template", "FARPB Last",
      foreignExchangeData, "FED2")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeesAndRatesPageBody {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("FARPB Pretext")
    expect(wrapper!.html()).toContain("FARPB Postext")
  })
  
})
