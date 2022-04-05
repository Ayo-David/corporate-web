import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import FAQIndividualPage from "../FAQIndividualPage";
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import LeftPanel from '../../components/FAQIndividualComponents/LeftPanel';
import RelatedFAQ from '../../components/FAQIndividualComponents/RelatedFAQ';
import NotWhatYouAreLookingFor from '../../components/FAQIndividualComponents/NotWhatYouAreLookingFor';

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
jest.mock('../../components/TopBannerPureLabel', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner_pure_label">{children}</div>)
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
jest.mock('../../components/RelatedProductsAndServices', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_related_products">{children}</div>)
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

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFAQIndividualContentData.mockResolvedValue({
    data: [{
      attributes: {
        title: 'FAQ Page Title'
      }
    }]
  })
  mockedDataSvc.getFAQIndividualFAQListData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFAQIndividualRelatedFAQsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFAQIndividualRelatedItemsData.mockResolvedValue({
    data: []
  })
}

function createProps() {
  return {
    headerMenus: {
      'Customer Support': createHeaderItems('Customer Support', 'customerSupportLink')
    },
    footer: {
      id: 'faqFooterId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {self: ''}
    },
    faqIndividualContent: {
      data: [{
        attributes: {
          title: 'FAQ Page Title'
        }
      }]
    },
    faqList: {
      id: 'faqListId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {self: ''}
    },
    relatedFAQs: {
      id: 'relatedFAQsId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {self: ''}
    },
    relatedItems: {
      id: 'relatedItemsId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {self: ''}
    },
  }
}

describe('FAQIndividual Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(
        <AppContainer
        initialEntries={['/faqs?faq=testFaq']}
        path={'/faqs'}><FAQIndividualPage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner_pure_label`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_related_products`)).toHaveLength(1)
    expect(wrapper!.find(LeftPanel)).toHaveLength(1)
    expect(wrapper!.find(RelatedFAQ)).toHaveLength(1)
    expect(wrapper!.find(NotWhatYouAreLookingFor)).toHaveLength(1)
  })
})
