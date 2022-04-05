import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import BusinessRelationshipManagerPage from '../BusinessRelationshipManagerPage';
import { act } from "react-dom/test-utils";

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../components/Breadcrumb', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_breadcrumb">{children}</div>)
  }
})
jest.mock('../../components/TopBanner', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner">{children}</div>)
  }
})
jest.mock('../../components/MeetTheTeamComponents/Teams', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_teams">{children}</div>)
  }
})
jest.mock('../../components/MeetTheTeamComponents/CustomerFeedback', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_customer_feedback">{children}</div>)
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

function createProps() {
  return {
    headerMenus: {
      'Business': createHeaderItems('Business', 'businessLink')
    },
    footer: {
      id: 'bcaFooterId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
    businessRelationshipManagerContent: {
      data: {
        attributes: {
          body: {
            value: 'BRM Content Title'
          }
        },
        relationships: {
          field_team_members: {
            data: [{
              id: 'brmId'
            }]
          }
        }
      }
    },
    banner: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
    teams: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
    customerFeedback: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
  }
}

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getBusinessRelationshipManagerContentData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getBusinessRelationshipManagerBannerData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getBusinessRelationshipManagerTeamsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getBusinessRelationshipManagerCustomerFeedbackData.mockResolvedValue({
    data: []
  })
}

describe.only('BusinessRelationshipManager Page', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><BusinessRelationshipManagerPage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_teams`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_customer_feedback`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
  })
})
