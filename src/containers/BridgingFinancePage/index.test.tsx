import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import BridgingFinancePage from '../BridgingFinancePage';
import CaseStudies from  '../../components/BridgingFinanceComponents/CaseStudies'
import EligibilityCriteria from  '../../components/BridgingFinanceComponents/EligibilityCriteria'
import TrustedProviders from '../../components/BridgingFinanceComponents/TrustedProviders'
import YouAreNearlyReadyToStart from '../../components/BridgingFinanceComponents/YouAreNearlyReadyToStart'
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
jest.mock('../../components/CardWithImageLink', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_card_with_image_lnk">{children}</div>)
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

function createBridgingFinanceContentData() {
  return {
    data: {
      id: 'bfcId',
      relationships: {
        field_components: {
          data: [
            {
              type: 'paragraph--eligibility_criteria',
              id: 'fcComponentId1'
            },
            {
              type: 'paragraph--card_with_image_link',
              id: 'fcComponentId2'
            },
            {
              type: 'paragraph--link_text_background',
              id: 'fcComponentId3'
            },
            {
              type: 'paragraph--case_studies',
              id: 'fcComponentId4'
            },
            {
              type: 'paragraph--trusted_providers',
              id: 'fcComponentId5'
            },
            {
              type: 'paragraph--cards_with_link_text',
              id: 'fcComponentId6'
            },
            {
              type: 'paragraph--novel_paragraph_type',
              id: 'fcComponentId7'
            },
          ]
        }
      }
    },
    included: [
      {
        id: 'fcComponentId1',
        links: {
          self: {
            href: 'fcComponentUrl1'
          }
        }
      },
      {
        id: 'fcComponentId3',
        links: {
          self: {
            href: 'fcComponentUrl3'
          }
        }
      },
      {
        id: 'fcComponentId4',
        links: {
          self: {
            href: 'fcComponentUrl4'
          }
        }
      },
      {
        id: 'fcComponentId5',
        links: {
          self: {
            href: 'fcComponentUrl5'
          }
        }
      },
    ]
  }
}

function initDataSvc() {
  mockedDataSvc.getBridgingFinanceContentData.mockResolvedValue(createBridgingFinanceContentData())
  mockedDataSvc.getBridgingFinanceBannerData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getBridgingFinanceLinkIconsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: 'bfcImageUrl.jpg'
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    id: 'eccId',
    data: {
      attributes: {
        field_criteria: {
          processed: "<b>Field Criteria Text</b>"
        }
      },
      relationships: {
        field_image2: {
          data: {
            id: 'ecImage.jpg'
          }
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      id: 'yanrtsId',
      attributes: {
        field_background_color: '#ffffff',
        field_text: {
          processed: 'ynarts field text'
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      relationships: {
        field_case_studies: {
          data: [
            {
              id: 1
            },
            {
              id: 2
            }
          ]
        }
      },
      attributes: {
        field_heading: "Main Heading",
        field_text: {
          processed: "<b>Main Text</b>"
        }
      }
    }
  })
  mockedDataSvc.getArticleDetailContentData.mockResolvedValue(
    {
      data: {
        attributes: {
          title: 'Article 1',
          created: '2022-01-15'
        },
        relationships: {
          field_media_image: {
            data: {
              id: "fieldMediaImageId"
            }
          }
        }
      }
    }
  )
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      relationships: {
        field_trusted_provider: {
          links: {
            related: {
              href: 'trustedProviderUrl'
            }
          }
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      id: 'trustedProvidersContentId',
      attributes: {
        title: 'tpTitle'
      },
      relationships: {
        field_logo_link: {
          links: {
            related: {
              href: "http://fieldLogoLinkUrl.com"
            }
          }
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: [{
      attributes: {
        field_text: {
          value: 'itemText'
        }
      },
      relationships: {
        field_media_logo: {
          data: {
            id: 'itemId'
          }
        }
      }
    }]
  })
}

function createProps() {
  return {
    headerMenus: {
      'Business': createHeaderItems('Business', 'businessLink')
    },
    footer: {
      id: 'bfpFooterId',
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
    linkIcons: {
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
    bridgingFinanceContent: createBridgingFinanceContentData(),
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
    }
  }
}

describe('BridgingFinance Page', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })
  
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><BridgingFinancePage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_link_icons`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
    
    
    expect(wrapper!.find(EligibilityCriteria)).toHaveLength(1)
    expect(wrapper!.find(YouAreNearlyReadyToStart)).toHaveLength(1)
    expect(wrapper!.find(CaseStudies)).toHaveLength(1)
    expect(wrapper!.find(TrustedProviders)).toHaveLength(1)
  })
})
