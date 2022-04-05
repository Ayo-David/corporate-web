import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PrivateBankingBorrowingPage from '../index';
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
jest.mock('../../../components/CardWithImageLink', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_card_with_image_link">{children}</div>)
  }
})
jest.mock('../../../components/PrivateBankingBorrowingComponents/OurClients', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_our_clients">{children}</div>)
  }
})
jest.mock('../../../components/CurrentAccountsPremiumComponents/ImageWithLongText', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_image_with_long_text">{children}</div>)
  }
})
jest.mock('../../../components/BridgingFinanceComponents/CaseStudies', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_case_studies">{children}</div>)
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


describe('PrivateBankingBorrowingPage testing', () => {

  const mockProps = {
    privateBankingBorrowingContent: {
      data: {
        id: 'id',
        relationships: {
          field_components: {
            data: [{
              type: 'paragraph--card_with_image_link',
              id: 'id'
            },{
              type: 'paragraph--our_clients',
              id: 'id1'
            },{
              type: 'paragraph--image_with_long_text',
              id: 'id'
            },{
              type: 'paragraph--image_with_long_text',
              id: 'id1'
            },{
              type: 'paragraph--case_studies',
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
        links: {
          self: {href: 'https://www.google.com'}
        }
      },{
        id: 'id',
        links: {
          self: {href: 'https://www.google.com'}
        }
      },{
        id: 'id',
        links: {
          self: {href: 'https://www.google.com'}
        }
      }]
    },
    banner: {},
    headerMenus: { 'Private Banking': {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PrivateBankingBorrowingPage {...data} />
    </AppContainer>
  )

  let mockGetPrivateBankingBorrowingContentData:any,  mockGetPrivateBankingBorrowingBannerData: any, mockGetHeaderMenuData: any, mockGetFooterData: any;
  beforeEach(() => {
    mockGetPrivateBankingBorrowingContentData = jest.spyOn(dataSvc, 'getPrivateBankingBorrowingContentData').mockResolvedValue({
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

    mockGetPrivateBankingBorrowingBannerData = jest.spyOn(dataSvc, 'getPrivateBankingBorrowingBannerData').mockResolvedValue({
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

    expect(mockGetPrivateBankingBorrowingContentData).toHaveBeenCalledTimes(1)
    expect(mockGetPrivateBankingBorrowingBannerData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy()
    expect(wrapper.find('#mock_our_clients').exists()).toBeTruthy()
    expect(wrapper.find('#mock_image_with_long_text').exists()).toBeTruthy()
    expect(wrapper.find('#mock_case_studies').exists()).toBeTruthy()
    expect(wrapper.find('#mock_trusted_providers').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.privateBankingBorrowingContent = null;
    data.banner = null
    data.headerMenus = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetPrivateBankingBorrowingContentData).toHaveBeenCalledTimes(1)
    expect(mockGetPrivateBankingBorrowingBannerData).toHaveBeenCalledTimes(0)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeFalsy()
    expect(wrapper.find('#mock_our_clients').exists()).toBeFalsy()
    expect(wrapper.find('#mock_image_with_long_text').exists()).toBeFalsy()
    expect(wrapper.find('#mock_case_studies').exists()).toBeFalsy()
    expect(wrapper.find('#mock_trusted_providers').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});