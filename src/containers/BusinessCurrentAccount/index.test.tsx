import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import BusinessCurrentAccount from '../BusinessCurrentAccount';
import { act } from "react-dom/test-utils";
import Benefits from  '../../components/BusinessCAComponents/Benefits'
import CompareAccounts from  '../../components/BusinessCAComponents/CompareAccounts'
import HighligtedSection from  '../../components/BusinessCAComponents/HighligtedSection'
import TrustedProvider from  '../../components/BusinessCAComponents/TrustedProvider'

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

const highlightedCardsData = {
  attributes: {
    field_icon_class: 'cardIconClass',
    field_text: {
      processed: 'cardText'
    }
  }
}
const compareAccountsData = {
  attributes: {
    field_title: "CAtitle",
    field_subtitle: "CASubtitle",
    field_next_gen_product: 'included',
    field_chaps_swift: 'included',
    field_foreign_currency: 'included',
    field_add_ons: {
      processed: "addOns"
    },
    field_single_link: {
      uri: "linkValue",
      title: "linkTitle"
    }
  }
}

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
    businessCurrentAccountContent: {
      data: {
        relationships: {
          field_banner: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldBannerLink'
              }
            }
          },
          field_highlighted_section: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldHighlightedSection'
              }
            }
          },
          field_compare_accounts: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldCompareAccounts'
              }
            }
          },
          field_components: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldComponents'
              }
            }
          },
          field_trusted_provider: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldTrustedProvider'
              }
            }
          },
        }
      }
    },
    businessCurrentAccountBanner: {
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
    businessCurrentAccountHighlightedData: {
      info: {
        data: {
          attributes: {
            field_title: 'bcahdTitle',
            field_text: {
              processed: 'bcahdText'
            }
          }
        }
      },
      data: {
        attributes: {
          field_icon_class: 'cardIconClass',
          field_text: {
            processed: 'cardText'
          }
        },
        relationships: {
          field_cards: {
            links: {
              related: {
                href: 'http://odyssey.com/fieldCards'
              }
            }
          }
        }
      }
    },
    businessCurrentAccountHighlightedCards: {
      data: [ highlightedCardsData ]
    },
    businessCACompareAccounts: {
      data: [ compareAccountsData ]
    },
    businessCABenefits: {
      data: [{
        type: 'paragraph--image_with_long_text',
        attributes: {
          field_heading: 'benefitsHeading',
          field_text: {
            processed: 'benefitsText'
          }
        },
        relationships: {
          field_text_with_link: {
            links: {
              related: {
                href: 'http://odyssey.com/benefitsLink'
              }
            }
          },
          field_images: {
            data: 'imageId'
          }
        }
      }]
    },
    businessCATrustedProvider: {
      data: {
        relationships: {
          field_logo_link: {
            links: {
              related: {
                href: "http://odyssey.com/trustedProviderLink"
              }
            }
          }
        },
        attributes: {
          body: {
            processed: "Trusted Provider description"
          }
        }
      }
    }
  }
}

function initDataSvc() {
  mockedDataSvc.getBusinessCurrentAccountContentData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getNewsCategoriesData.mockResolvedValue({
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
  //BusinessCABanner
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {}
  })
  // FieldCards
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: highlightedCardsData
  })
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {}
  })
  //BusinessCACompareData
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {}
  })
  //BusinessCABenefits
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {}
  })
  //Ready to Join
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      attributes: {
        field_description: 'readyToJoin Description',
        field_single_link: {
          title: 'ready to join title'
        }
      }
    }
  })
  //BusinessCATrustedProvider
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {}
  })
}

describe('BusinessCurrentAccount Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><BusinessCurrentAccount {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
  
    expect(wrapper!.find(Benefits)).toHaveLength(1)
    expect(wrapper!.find(CompareAccounts)).toHaveLength(1)
    expect(wrapper!.find(HighligtedSection)).toHaveLength(1)
    expect(wrapper!.find(TrustedProvider)).toHaveLength(1)
  })
})
