import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PersonalCurrentAccount from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../../components/TopBanner', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner">{children}</div>)
  }
})
jest.mock('../../../components/PersonalCAComponents/HighligtedSection', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_highligted_section">{children}</div>)
  }
})
jest.mock('../../../components/PersonalCAComponents/CompareAccounts', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_compare_accounts">{children}</div>)
  }
})
jest.mock('../../../components/PersonalCAComponents/Benefits', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_benefits">{children}</div>)
  }
})
jest.mock('../../../components/PersonalCAComponents/TrustedProvider', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_trusted_provider">{children}</div>)
  }
})
jest.mock('../../../components/Footer', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_footer">{children}</div>)
  }
})
jest.mock('../../../components/LowestFooter', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_lowest_footer">{children}</div>)
  }
})


describe('PersonalCurrentAccount testing', () => {

  const mockProps = {
    personalCurrentAccountContent: {
      data: {
        relationships: {
          field_banner: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
          field_highlighted_section: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
          field_compare_accounts: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
          field_components: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
          field_trusted_provider: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          }
        }
      }
    },
    personalCurrentAccountBanner: {
      
    },
    personalCurrentAccountHighlightedData: {
      data: {
        relationships: {
          field_cards: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          }
        }
      }
    },
    personalCurrentAccountHighlightedCards: {},
    personalCACompareAccounts: {},
    personalCABenefits: {},
    personalCATrustedProvider: {},
    headerMenus: { Personal: {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PersonalCurrentAccount {...data} />
    </AppContainer>
  )

  let mockGetPersonalCurrentAccountContentData:any, mockGetNewsCategoriesData: any, mockGetHeaderMenuData: any, mockGetFooterData: any,
    mockGetData: any;
  beforeEach(() => {
    mockGetPersonalCurrentAccountContentData = jest.spyOn(dataSvc, 'getPersonalCurrentAccountContentData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value'
          }
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id'
            }
          }
        }
      }
    })

    mockGetNewsCategoriesData = jest.spyOn(dataSvc, 'getNewsCategoriesData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value'
          }
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id'
            }
          }
        }
      }
    })

    mockGetHeaderMenuData = jest.spyOn(dataSvc, 'getHeaderMenuData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value'
          }
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id'
            }
          }
        }
      }
    })

    mockGetFooterData = jest.spyOn(dataSvc, 'getFooterData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value'
          }
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id'
            }
          }
        }
      }
    })

    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value'
          }
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id'
            }
          }
        }
      }
    })

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(mockGetPersonalCurrentAccountContentData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetData).toHaveBeenCalledTimes(6)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_highligted_section').exists()).toBeTruthy()
    expect(wrapper.find('#mock_compare_accounts').exists()).toBeTruthy()
    expect(wrapper.find('#mock_benefits').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.personalCurrentAccountContent = null;
    data.personalCurrentAccountBanner = null
    data.personalCurrentAccountHighlightedData = null
    data.personalCurrentAccountHighlightedCards = null
    data.personalCACompareAccounts = null
    data.personalCABenefits = null

    data.personalCATrustedProvider = null
    data.headerMenus = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetPersonalCurrentAccountContentData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetData).toHaveBeenCalledTimes(0)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_highligted_section').exists()).toBeFalsy()
    expect(wrapper.find('#mock_compare_accounts').exists()).toBeFalsy()
    expect(wrapper.find('#mock_benefits').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});