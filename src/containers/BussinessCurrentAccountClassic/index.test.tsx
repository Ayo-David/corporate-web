import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import BussinessCurrentAccountClassic from '../BussinessCurrentAccountClassic';
import { act } from "react-dom/test-utils";
import ApplyOnline from  '../../components/CurrentAccountsPremiumComponents/ApplyOnline'
import EligibilityCriteria from  '../../components/CurrentAccountsPremiumComponents/EligibilityCriteria'
import FAQs from  '../../components/CurrentAccountsPremiumComponents/FAQs'
import ImageWithLongText from  '../../components/CurrentAccountsPremiumComponents/ImageWithLongText'
import Overdrafts from  '../../components/CurrentAccountsPremiumComponents/Overdrafts'
import TrustedProvider from  '../../components/CurrentAccountsPremiumComponents/TrustedProvider'

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
jest.mock('../../components/LinkIcons', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_link_icons">{children}</div>)
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
jest.mock('../../components/RelatedProductsAndServicesSingle', ()=>{
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
      links: { self: '' }
    },
    currentAccountsContent: {
      data: {
        id: 'cacId'
      }
    },
    currentAccountsBanner: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: { self: '' }
    },
    currentAccountsHeaderLinks: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: { self: '' }
    },
    currentAccountsFieldComponents: {
      data: [
        {
          id: 'iwltId',
          type: 'paragraph--image_with_long_text',
          attributes: {
            field_titles: 'SUMMERY',
            field_text: 'iwltField Text'
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltecId',
          type: 'paragraph--eligibility_criteria',
          attributes: {
            field_criteria: {
              value: 'EC Field Criteria'
            }
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltodId',
          type: 'paragraph--image_description_with_faq',
          attributes: {
            field_title: 'Overdraft Title',
            field_text: {
              value: 'Overdraft field text'
            }
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltRpassId',
          type: 'paragraph--customer_interest_links',
          attributes: {},
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltAoId',
          type: 'paragraph--cards_with_link_text',
          attributes: {
            field_heading: 'Apply Now Heading'
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltFaqId',
          type: 'paragraph--faq_s',
          attributes: {
            title: 'FAQ Title',
            field_heading: 'Apply Now Heading'
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltTpId',
          type: 'paragraph--trusted_providers',
          attributes: {
            title: 'Trusted Provider Title',
            body: {
              value: 'Trusted Provider Text'
            }
          },
          links: { self: '' },
          relationships: {},
        },
        {
          id: 'iwltUnId',
          type: 'paragraph--other_type',
          attributes: {},
          links: { self: '' },
          relationships: {},
        }
      ],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: { self: '' }
    }
    
  }
}

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getImageEligibilityCriteria.mockResolvedValue({
    data: {
      id: 'iwltEcId'
    }
  })
  mockedDataSvc.getImageWithLongText.mockResolvedValue({
    data: {
      id: 'iwltImgId'
    }
  })
  mockedDataSvc.getImageDescriptionWithFaq.mockResolvedValue({
    data: {
      id: 'odImgId',
      attributes: {
        field_title: 'Overdraft faqTitle',
        field_text: {
          value: 'Overdraft faqText'
        }
      }
    }
  })
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: 'bcaImageUrl.jpg'
        }
      }
    }
  })
  mockedDataSvc.getBusinessCurrentAccountsContentData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCurrentAccountsBannerData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCurrentAccountsHeaderLinksData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCurrentAccountsFieldComponentsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCurrentAccountsCardsWithLinkTextData.mockResolvedValue({
    data: [{
      attributes: {
        field_description: 'Apply Online Description',
        field_single_link: {
          uri: 'http://odyssey.com/apply-now',
          title: 'Apply Online Title'
        }
      }
    }]
  })
  mockedDataSvc.getCurrentAccountsCorporateFAQData.mockResolvedValueOnce({
    data: [
      {
        attributes: {
          field_title: 'FAQ Title',
          field_text: {
            value: 'FAQ Text'
          }
        }
      }
    ]
  })
  
  mockedDataSvc.getCurrentAccountsFAQsData.mockResolvedValueOnce({
    data: {
      id: 'corporateFAQId'
    }
  })
  
  mockedDataSvc.getCurrentAccountsTrustedProviderLogoData.mockResolvedValueOnce({
    data: [
      {
        relationships: {
          field_media_logo: {
            data: {
              id: 'tpLogoImgId'
            }
          }
        }
      }
    ]
  })
  
  mockedDataSvc.getCurrentAccountsTrustedProviderData.mockResolvedValueOnce({
    data: {
      id: 'iwltTpId',
      type: 'paragraph--trusted_providers',
      attributes: {
        title: 'Trusted Provider Title',
        body: {
          value: 'Trusted Provider Text'
        }
      }
    }
  })
}
describe('BusinessCurrentAccountClassic Page', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><BussinessCurrentAccountClassic {...props} /></AppContainer>);
    })
    await wrapper!.update();
  
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
  
    expect(wrapper!.find(ApplyOnline)).toHaveLength(1)
    expect(wrapper!.find(EligibilityCriteria)).toHaveLength(1)
    expect(wrapper!.find(FAQs)).toHaveLength(1)
    expect(wrapper!.find(ImageWithLongText)).toHaveLength(1)
    expect(wrapper!.find(Overdrafts)).toHaveLength(1)
    expect(wrapper!.find(TrustedProvider)).toHaveLength(1)
  })
})
