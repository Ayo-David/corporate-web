import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PersonalCurrentAccountPremium from '../index';
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
  return ({children, onScrollTop}: {children: React.ReactNode, onScrollTop: ({title}: {title: string}) => void})=>{
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
      onScrollTop({title: 'Summery'})
      onScrollTop({title: 'Eligibility Criteria'})
      onScrollTop({title: 'Terms & Conditions'})
      onScrollTop({title: 'FAQs'})
      onScrollTop({title: 'test111'})
    }, [scroll, onScrollTop]);
    
    return (<div id="mock_link_icons" onClick={()=>setScroll(true)}>{children}</div>)
  }
})
jest.mock('../../../components/RelatedProductsAndServicesSingle', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_related_products_and_services_single">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/ImageWithLongText', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_image_with_long_text">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/EligibilityCriteria', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_eligibility_criteria">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/Overdrafts', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_overdrafts">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/ApplyOnline', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_apply_online">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/FAQs', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_faqs">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/TrustedProvider', ()=>{
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


describe('PersonalCurrentAccountPremium testing', () => {

  const mockProps = {
    currentAccountsContent: {
      data: {
        id: 'id'
      }
    },
    currentAccountsBanner: {},
    currentAccountsHeaderLinks: {},
    currentAccountsFieldComponents: {
      data: [{
        type: 'paragraph--image_with_long_text',
        attributes: {field_titles: 'SUMMERY'}
      },{
        type: 'paragraph--image_with_long_text',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--image_with_long_text',
        attributes: {field_titles: 'test111'}
      },{
        type: 'paragraph--eligibility_criteria',
        attributes: {field_titles: 'SUMMERY'}
      },{
        type: 'paragraph--eligibility_criteria',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--image_description_with_faq',
        attributes: {field_titles: 'SUMMERY'}
      },{
        type: 'paragraph--image_description_with_faq',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--customer_interest_links',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--cards_with_link_text',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--faq_s',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'paragraph--trusted_providers',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      },{
        type: 'test111',
        attributes: {field_titles: 'TERMS & CONDITIONS'}
      }]
    },
    headerMenus: { Personal: {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PersonalCurrentAccountPremium {...data} />
    </AppContainer>
  )

  let mockGetPersonalCurrentAccountsContentData:any, mockGetHeaderMenuData: any, mockGetFooterData: any,
  mockGetCurrentAccountsBannerData: any, mockGetCurrentAccountsHeaderLinksData: any, mockGetCurrentAccountsFieldComponentsData:any;
  beforeEach(() => {
    jest.useFakeTimers();
    mockGetPersonalCurrentAccountsContentData = jest.spyOn(dataSvc, 'getPersonalCurrentAccountsContentData').mockResolvedValue({
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

    mockGetCurrentAccountsBannerData = jest.spyOn(dataSvc, 'getCurrentAccountsBannerData').mockResolvedValue({
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

    mockGetCurrentAccountsHeaderLinksData = jest.spyOn(dataSvc, 'getCurrentAccountsHeaderLinksData').mockResolvedValue({
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

    mockGetCurrentAccountsFieldComponentsData = jest.spyOn(dataSvc, 'getCurrentAccountsFieldComponentsData').mockResolvedValue({
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
    jest.useRealTimers();
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

    expect(mockGetPersonalCurrentAccountsContentData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetCurrentAccountsBannerData).toHaveBeenCalledTimes(1)
    expect(mockGetCurrentAccountsHeaderLinksData).toHaveBeenCalledTimes(1)
    expect(mockGetCurrentAccountsFieldComponentsData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_link_icons').exists()).toBeTruthy()
    expect(wrapper.find('#mock_related_products_and_services_single').exists()).toBeTruthy()
    expect(wrapper.find('#mock_image_with_long_text').exists()).toBeTruthy()
    expect(wrapper.find('#mock_eligibility_criteria').exists()).toBeTruthy()
    expect(wrapper.find('#mock_overdrafts').exists()).toBeTruthy()
    expect(wrapper.find('#mock_apply_online').exists()).toBeTruthy()
    expect(wrapper.find('#mock_faqs').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
    wrapper.find('#mock_link_icons').simulate('click')
    jest.runOnlyPendingTimers();
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.currentAccountsContent = null;
    data.currentAccountsBanner = null
    data.currentAccountsHeaderLinks = null
    data.currentAccountsFieldComponents = null
    data.headerMenus = null
    data.personalCABenefits = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetPersonalCurrentAccountsContentData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetCurrentAccountsBannerData).toHaveBeenCalledTimes(0)
    expect(mockGetCurrentAccountsHeaderLinksData).toHaveBeenCalledTimes(0)
    expect(mockGetCurrentAccountsFieldComponentsData).toHaveBeenCalledTimes(0)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_link_icons').exists()).toBeFalsy()
    expect(wrapper.find('#mock_related_products_and_services_single').exists()).toBeFalsy()
    expect(wrapper.find('#mock_image_with_long_text').exists()).toBeFalsy()
    expect(wrapper.find('#mock_eligibility_criteria').exists()).toBeFalsy()
    expect(wrapper.find('#mock_overdrafts').exists()).toBeFalsy()
    expect(wrapper.find('#mock_apply_online').exists()).toBeFalsy()
    expect(wrapper.find('#mock_faqs').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});