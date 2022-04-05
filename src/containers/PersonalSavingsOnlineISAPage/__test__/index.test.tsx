import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PersonalSavingsOnlineISAPage from '../index';
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
jest.mock('../../../components/LinkIcons', ()=>{
  const {useState, useEffect} = require('react');
  return ({children, onScrollTop}: {children: React.ReactNode, onScrollTop: () => void})=>{
    const [click, setClick] = useState(false);
    useEffect(() => {
      if(click){
        onScrollTop();
      }
    }, [click, onScrollTop]);
    
    return (<div id="mock_link_icons" onClick={()=>setClick(true)}>{children}</div>)
  }
})
jest.mock('../../../components/CardWithImageLink', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_card_with_image_link">{children}</div>)
  }
})
jest.mock('../../../components/BridgingFinanceComponents/EligibilityCriteria', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_eligibility_criteria">{children}</div>)
  }
})
jest.mock('../../../components/PersonalSavingsOnlineISAComponents/SummaryBox', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_summary_box">{children}</div>)
  }
})
jest.mock('../../../components/PersonalSavingsOnlineISAComponents/YouAreNearlyReadyToStart', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_you_are_nearly_ready_to_start">{children}</div>)
  }
})
jest.mock('../../../components/BridgingFinanceComponents/TrustedProviders', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_trusted_providers">{children}</div>)
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


describe('PersonalSavingsOnlineISAPage testing', () => {

  const mockProps = {
    personalSavingsOnlineISAContent: {
      data: {
        id: 'id',
        relationships: {
          field_components: {
            data: [{
              type: 'paragraph--image_with_long_text',
              id: 'id'
            },{
              type: 'paragraph--card_with_image_link',
              id: 'id1'
            },{
              type: 'paragraph--summery_box',
              id: 'id1'
            },{
              type: 'paragraph--cards_with_link_text',
              id: 'id1'
            },{
              type: 'paragraph--trusted_providers',
              id: 'id1'
            },{
              type: 'test111',
              id: 'id1'
            }]
          }
        }
      },
      included: [{
        id: 'id',
        links: {self: {href: 'https://www.google.com'}},
      }]
    },
    banner: {},
    linkIcons: {},
    headerMenus: { Business: {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PersonalSavingsOnlineISAPage {...data} />
    </AppContainer>
  )

  let mockGetPersonalSavingsOnlineISAContentData:any,  mockGetPersonalSavingsOnlineISABannerData: any, mockGetHeaderMenuData: any, mockGetFooterData: any,
  mockGetPersonalSavingsOnlineISALinkIconsData: any;
  beforeEach(() => {
    mockGetPersonalSavingsOnlineISAContentData = jest.spyOn(dataSvc, 'getPersonalSavingsOnlineISAContentData').mockResolvedValue({
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

    mockGetPersonalSavingsOnlineISABannerData = jest.spyOn(dataSvc, 'getPersonalSavingsOnlineISABannerData').mockResolvedValue({
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

    mockGetPersonalSavingsOnlineISALinkIconsData = jest.spyOn(dataSvc, 'getPersonalSavingsOnlineISALinkIconsData').mockResolvedValue({
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

    expect(mockGetPersonalSavingsOnlineISAContentData).toHaveBeenCalledTimes(1)
    expect(mockGetPersonalSavingsOnlineISABannerData).toHaveBeenCalledTimes(1)
    expect(mockGetPersonalSavingsOnlineISALinkIconsData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_link_icons').exists()).toBeTruthy()
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy()
    expect(wrapper.find('#mock_eligibility_criteria').exists()).toBeTruthy()
    expect(wrapper.find('#mock_summary_box').exists()).toBeTruthy()
    expect(wrapper.find('#mock_you_are_nearly_ready_to_start').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_providers').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
    wrapper.find('#mock_link_icons').simulate('click')
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.personalSavingsOnlineISAContent = null;
    data.banner = null
    data.personalSACompareAccounts = null
    data.homeTrustedProvider = null
    data.adsAwareness = null
    data.headerMenus = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetPersonalSavingsOnlineISAContentData).toHaveBeenCalledTimes(1)
    expect(mockGetPersonalSavingsOnlineISABannerData).toHaveBeenCalledTimes(0)
    expect(mockGetPersonalSavingsOnlineISALinkIconsData).toHaveBeenCalledTimes(0)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_link_icons').exists()).toBeFalsy()
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeFalsy()
    expect(wrapper.find('#mock_eligibility_criteria').exists()).toBeFalsy()
    expect(wrapper.find('#mock_summary_box').exists()).toBeFalsy()
    expect(wrapper.find('#mock_you_are_nearly_ready_to_start').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_providers').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});