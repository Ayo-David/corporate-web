import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PropertyFinanceLoanCompletion from '../index';
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
jest.mock('../../../components/LoanCompletionComponents/ParagraphTitleDescription', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_paragraph_title_description">{children}</div>)
  }
})
jest.mock('../../../components/LoanCompletionComponents/DealListRow', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_deal_list_row">{children}</div>)
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

describe('PropertyFinanceLoanCompletion testing', () => {

  const mockProps = {
    loanCompletionContent: {
      data: {id: 'id'},
      included: [{
        type: 'paragraph--title_description'
      },{
        type: 'test111'
      }]
    },
    dealSheetData: {
      data: [{

      }]
    },
    loanCompletionBanner: {},
    headerMenus: { 'Business': {} },
    footer: {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PropertyFinanceLoanCompletion {...data} />
    </AppContainer>
  )

  let mockGetLoanCompletionContentData:any,  mockGetDealSheetListData: any, mockGetHeaderMenuData: any, mockGetFooterData: any,
  mockGetLoanCompletionBannerData: any;
  beforeEach(() => {
    mockGetLoanCompletionContentData = jest.spyOn(dataSvc, 'getLoanCompletionContentData').mockResolvedValue({
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

    mockGetDealSheetListData = jest.spyOn(dataSvc, 'getDealSheetListData').mockResolvedValue({
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

    mockGetLoanCompletionBannerData = jest.spyOn(dataSvc, 'getLoanCompletionBannerData').mockResolvedValue({
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

    expect(mockGetLoanCompletionContentData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetDealSheetListData).toHaveBeenCalledTimes(1)
    expect(mockGetLoanCompletionBannerData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_paragraph_title_description').exists()).toBeTruthy()
    expect(wrapper.find('#mock_deal_list_row').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()

    wrapper.find('.green-btn').simulate('click')
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.loanCompletionContent = null;
    data.dealSheetData = null;
    data.loanCompletionBanner = null;
    data.headerMenus = null;
    data.footer = null

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetLoanCompletionContentData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetDealSheetListData).toHaveBeenCalledTimes(1)
    expect(mockGetLoanCompletionBannerData).toHaveBeenCalledTimes(0)
    
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_paragraph_title_description').exists()).toBeFalsy()
    expect(wrapper.find('#mock_deal_list_row').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
    expect(wrapper.find('.green-btn').exists()).toBeTruthy()
  });
});