import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CustomerSupportFAQsPage from '../CustomerSupportFAQsPage';
import { act } from "react-dom/test-utils";
import AdsAwareness from  '../../components/CustomerSupportFAQsComponents/AdsAwareness'
import ServiceStatus from  '../../components/CustomerSupportFAQsComponents/ServiceStatus'
import { WaysToContactUs } from  '../../components/CustomerSupportFAQsComponents/WaysToContactUs'
import { VisitOurOffice } from  '../../components/CustomerSupportFAQsComponents/VisitOurOffice'
import { SocialMedia } from  '../../components/CustomerSupportFAQsComponents/SocialMedia'

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
jest.mock('../../components/TopBannerSearch', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner_search">{children}</div>)
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
      'Customer Support': createHeaderItems('Customer Support', 'supportLink')
    },
    footer: {
      id: 'csfFooterId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    customerSupportFAQsContent: {
      data: {
        id: 'csfContentId',
        attributes: {
          title: 'csfTitle',
          field_address: {
            value: 'mapAddress'
          },
          field_url: {
            uri: {
              url: 'mapUri'
            },
            title: 'mapTitle'
          }
        }
      }
    },
    faqSet: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    adsAwareness: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    serviceStatus: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    waysToContactUs: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    mapImage: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
    },
    socialMedia: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      }
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
  mockedDataSvc.getCustomerSupportFAQsContentData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCustomerSupportFAQsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCustomerSupportFAQsSetData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCustomerSupportFAQsAdsAwarenessData.mockResolvedValue({
    data: [{
      attributes: {
        title: 'AdsAwareness Title',
        field_snippet: {
          value: 'Ads Awareness text'
        },
        field_download_or_read_more_link: {
          title: 'http://odyssey.com/readMoreLink'
        }
      },
      relationships: {
        field_image_video: {
          data: {
            id: 'adsAwarenessImgId'
          }
        }
      }
    }]
  })
  mockedDataSvc.getCustomerSupportFAQsServiceStatusData.mockResolvedValue({
    data: {
      id: 'ssId',
      attributes: {
        field_heading: 'Service Status Heading'
      }
    }
  })
  mockedDataSvc.getCustomerSupportFAQsFieldServiceStatusData.mockResolvedValueOnce({
    data: [
      {
        attributes: {
          field_availability_status: 'Service Status',
          field_service_name: 'Service Name'
        }
      }
    ]
  })
  mockedDataSvc.getCustomerSupportFAQsWaysToContactUsData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getCustomerSupportFAQsMapImageData.mockResolvedValue({
    data: {
      attributes: {
        field_url: {
          uri: {
            url: 'mapUri'
          },
          title: 'mapTitle'
        },
        uri: {
          url: 'mapUrl'
        }
      }
    }
  })
  
  mockedDataSvc.getCustomerSupportFAQsSocialMediaData.mockResolvedValue({
    data: {
      attributes: {
        field_facebook: {
          uri: "facebookLink"
        },
        field_linkedin: {
          uri: "linkedInLink"
        },
        field_twitter: {
          uri: "twitterLink"
        },
        field_instagram: {
          uri: "instagramLink"
        }
      }
    }
  })
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: 'bfcImageUrl.jpg'
      }
    }
  })
}

describe('CustomerSupportFAQs Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CustomerSupportFAQsPage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner_search`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
  
    expect(wrapper!.find(AdsAwareness)).toHaveLength(1)
    expect(wrapper!.find(ServiceStatus)).toHaveLength(1)
    expect(wrapper!.find(WaysToContactUs)).toHaveLength(1)
    expect(wrapper!.find(VisitOurOffice)).toHaveLength(1)
    expect(wrapper!.find(SocialMedia)).toHaveLength(1)
  })
})
