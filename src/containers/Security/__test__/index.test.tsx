import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import Security from '../index';
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
jest.mock('../../../components/SecurityComponents/SecurityLanding', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_security_landing">{children}</div>)
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

describe('Security testing', () => {

  const mockProps = {
    securitiesContent: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner'
      }],
    },
    securityCategories: {},
    headerMenus: { 'About Us': {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <Security {...data} />
    </AppContainer>
  )

  let mockGetSecuritiesContentData:any,  mockGetSecurityCategoriesData: any, mockGetHeaderMenuData: any, mockGetFooterData: any;
  beforeEach(() => {
    mockGetSecuritiesContentData = jest.spyOn(dataSvc, 'getSecuritiesContentData').mockResolvedValue({
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

    mockGetSecurityCategoriesData = jest.spyOn(dataSvc, 'getSecurityCategoriesData').mockResolvedValue({
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

    expect(mockGetSecuritiesContentData).toHaveBeenCalledTimes(1)
    expect(mockGetSecurityCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_security_landing').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.securitiesContent = null;
    data.securityCategories = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetSecuritiesContentData).toHaveBeenCalledTimes(1)
    expect(mockGetSecurityCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_security_landing').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});