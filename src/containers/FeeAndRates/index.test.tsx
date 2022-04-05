import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import FeeAndRates from '../FeeAndRates';
import { act } from "react-dom/test-utils";

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../components/TopBanner', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner">{children}</div>)
  }
})
jest.mock('../../components/Footer', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_footer">{children}</div>)
  }
})
jest.mock('../../components/LowestFooter', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_lowest_footer">{children}</div>)
  }
})

function createHeaderItems(headerTitle: string, url: string) {
  return {
    data: [{
      attributes: {
        field_url: {
          uri: `${url}1`,
        },
        title: `${headerTitle} 1`,
        field_order: 1,
      },
      id: '1',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }, {
      attributes: {
        field_url: {
          uri: `${url}2`,
        },
        title: `${headerTitle} 2`,
        field_order: 2,
      },
      id: '2',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }],
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  }
}

function createRateDropdownItem(rateName: string) {
  return {
    attributes: {
      field_title: rateName
    }
  }
}

function createProps() {
  return {
    headerMenus: {
      'Customer Support': createHeaderItems('Customer Support', 'customerSupportLink')
    },
    footer: {
      id: 'bcaFooterId'
    },
    feeAndRatesContent: {
      data: {
        id: 'feeAndRatesContentId',
        attributes: {
          title: 'Fee and Rates Title'
        }
      },
      included: [{
        attributes: {
          field_title: 'Base Rates',
          field_text: {
            value: 'Base Rates Text'
          }
        }
      }, {
        attributes: {
          field_title: 'Libor Transition',
          field_text: {
            value: 'Libor Transition Text'
          }
        }
      }, {
        attributes: {
          field_title: 'Benchmark Transition',
          field_text: {
            value: 'Benchmark Transition Text'
          }
        }
      }, {
        attributes: {
          field_title: 'Historical Interest Rates',
          field_text: {
            value: 'Historical Interest Text'
          }
        }
      }]
    },
    banner: {}
  }
}

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFeeAndRatesContentData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFeeAndRatesBannerData.mockResolvedValue({
    data: {}
  })
  mockedDataSvc.getFeeAndRatesDropdownData.mockResolvedValue({
    data: [
      createRateDropdownItem('Interest Rates'),
      createRateDropdownItem('Foreign Exchange'),
      createRateDropdownItem('Base Rates'),
      createRateDropdownItem('Libor Transition'),
      createRateDropdownItem('Benchmark Transition'),
      createRateDropdownItem('Historical Interest Rates'),
    ]
  })
  mockedDataSvc.getFeeAndRateRateDetailsData.mockResolvedValue([
    {
      Categoty: 'Category 1',
      Rate_Table: 'Rate Table 1',
      body: 'Rate Table Body'
    }
  ])
  mockedDataSvc.getFeeAndRateForeignExchangeDetailsData.mockResolvedValue([
    {
      Categoty: 'Category 1',
      Rate_Table: 'Rate Table 1',
      body: 'Rate Table Body'
    }
  ])
  mockedDataSvc.getFeeAndRatesRatesTemplateData.mockResolvedValue([
    {
      Categoty: 'Category 1',
      Rate_Table: 'Rate Table 1',
      body: 'Rate Table Body'
    }
  ])
}

describe('Fees And Rates Page', () => {
  let props: any
  beforeEach( () => {
    props = createProps()
    initDataSvc()
    jest.useFakeTimers();
  })
  
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });
  
  it('should load properly', async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FeeAndRates {...props} /></AppContainer>);
    })
    jest.runOnlyPendingTimers();
    await wrapper!.update();
  
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
    wrapper!.find(`#dropdown-basic`).at(0).simulate('click');
    
    await wrapper!.update();
    expect(wrapper!.find(`.select-rates`).find(`a.dropdown-item`)).toHaveLength(6)
    await act(async () => wrapper!.find(`.select-rates`).find(`a.dropdown-item`).at(1).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Rate Table Body')
    await act(async () => wrapper!.find(`.select-rates`).find(`a.dropdown-item`).at(2).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Base Rates Text')
    await act(async () => wrapper!.find(`.select-rates`).find(`a.dropdown-item`).at(3).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Libor Transition Text')
    await act(async () => wrapper!.find(`.select-rates`).find(`a.dropdown-item`).at(4).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Benchmark Transition Text')
    await act(async () => wrapper!.find(`.select-rates`).find(`a.dropdown-item`).at(5).simulate('click'))
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Historical Interest Text')
  })
})
