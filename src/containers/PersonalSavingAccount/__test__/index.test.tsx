import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PersonalSavingAccount from '../index';
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
jest.mock('../../../components/PersonalSAComponents/TabsBar', ()=>{
  const {useState, useEffect} = require('react');
  return ({children, onClickTab}: {children: React.ReactNode, onClickTab: (arg: number) => void})=>{
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
      onClickTab(0)
    }, [scroll, onClickTab]);
    
    return (<div id="mock_tabs_bar" onClick={()=>setScroll(true)}>{children}</div>)
  }
})
jest.mock('../../../components/PersonalSAComponents/SavingsEarnYou', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_savings_earn_you">{children}</div>)
  }
})
jest.mock('../../../components/HomeComponents/WeAreATrustedProvider', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_we_are_a_trusted_provider">{children}</div>)
  }
})
jest.mock('../../../components/PersonalSAComponents/Awareness', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_awareness">{children}</div>)
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


describe('PersonalSavingAccount testing', () => {

  const mockProps = {
    personalSavingAccountContent: {
      data: {
        relationships: {
          field_trusted_provider: {
            data: {
              id:  'id'
            }
          },
          field_banner: {
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
          field_ads_awareness: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
        }
      }
    },
    personalSavingAccountBanner: {},
    personalSACompareAccounts: {},
    homeTrustedProvider: {},
    adsAwareness: {},
    headerMenus: { Personal: {} },
    footer: {}
    }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PersonalSavingAccount {...data} />
    </AppContainer>
  )

  let mockGetData:any,  mockGetNewsCategoriesData: any, mockGetHeaderMenuData: any, mockGetFooterData: any,
  mockGetHomeTrustedProviderData: any;
  beforeEach(() => {
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

    mockGetHomeTrustedProviderData = jest.spyOn(dataSvc, 'getHomeTrustedProviderData').mockResolvedValue({
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

    expect(mockGetData).toHaveBeenCalledTimes(4)
    expect(mockGetNewsCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHomeTrustedProviderData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_tabs_bar').exists()).toBeTruthy()
    expect(wrapper.find('#mock_savings_earn_you').exists()).toBeTruthy()
    expect(wrapper.find('#mock_we_are_a_trusted_provider').exists()).toBeTruthy()
    expect(wrapper.find('#mock_awareness').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
    wrapper.find('#mock_tabs_bar').simulate('click')
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.personalSavingAccountContent = null;
    data.personalSavingAccountBanner = null
    data.personalSACompareAccounts = null
    data.homeTrustedProvider = null
    data.adsAwareness = null
    data.headerMenus = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHomeTrustedProviderData).toHaveBeenCalledTimes(0)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_tabs_bar').exists()).toBeFalsy()
    expect(wrapper.find('#mock_savings_earn_you').exists()).toBeFalsy()
    expect(wrapper.find('#mock_we_are_a_trusted_provider').exists()).toBeFalsy()
    expect(wrapper.find('#mock_awareness').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});