import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import NewsArticlesPage from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../../components/NewsArticlesComponents/TopBanner', ()=>{
  const {useState, useEffect} = require('react');
  return ({children, onReadArticleClick}: {children: React.ReactNode, onReadArticleClick: () => void})=>{
    const [click, setClick] = useState(false);
    useEffect(() => {
      if(click){
        onReadArticleClick()
      }
    }, [click, onReadArticleClick]);
    return (<div id="mock_top_banner" onClick={()=>{setClick(true)}}>{children}</div>)
  }
})
jest.mock('../../../components/NewsArticlesComponents/TabsBar', ()=>{
  const {useState, useEffect} = require('react');
  return ({children, onClickTab}: {children: React.ReactNode, onClickTab: (arg: number) => void})=>{
    const [clickTab, setClickTab] = useState(false);
    useEffect(() => {
      if(clickTab){
        onClickTab(0)
      }
    }, [clickTab, onClickTab]);
    
    return (<div id="mock_tabs_bar" onClick={()=>{setClickTab(true)}}>{children}</div>)
  }
})
jest.mock('../../../components/NewsArticlesComponents/NewsArticlesList', ()=>{
  const {useState, useEffect} = require('react');
  const MortgageCalculatorStep2Box = ({children, onClickGetInTouch}: {children: React.ReactNode, onClickGetInTouch: () => void})=>{
    const [click, setClick] = useState(false);
    useEffect(() => {
      if(click){
        onClickGetInTouch();
      }
    }, [click, onClickGetInTouch]);

    return (<div id="mock_news_articles_list" onClick={()=>{setClick(true)}}>{children}</div>)
  }
  return MortgageCalculatorStep2Box
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


describe('NewsArticlesPage testing', () => {

  const mockProps = {
    newsArticlesContent: {
      data: [{
        relationships: {
          field_media_image: {
            data: {
              id: 'id'
            }
          }}
      },{
        relationships: {
          field_media_image: {
            data: {
              id: 'missing'
            }
          }}
      },{
        relationships: {
          field_media_image: {
            data: {
              id: 'missing1'
            }
          }}
      }]
    },
    newsArticlesBanner: {},
    newsCategories: [{uuid:[{value: 'value'}], weight:[{value: 0}]}, {uuid:[{value: 'value'}], weight:[{value: 0}]}],
    newsArticlesList: {},
    headerMenus: {
      "About Us": {}
    },
    footer: {
    }
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <NewsArticlesPage {...data} />
    </AppContainer>
  )

  let mockGetNewsArticlesContentData:any, mockGetNewsCategoriesData: any, mockGetHeaderMenuData: any, mockGetFooterData: any,
    mockGetNewsArticlesBannerData: any, mockGetNewsArticlesListData: any;
  beforeEach(() => {
    jest.useFakeTimers();
    mockGetNewsArticlesContentData = jest.spyOn(dataSvc, 'getNewsArticlesContentData').mockResolvedValue({
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

    mockGetNewsArticlesBannerData = jest.spyOn(dataSvc, 'getNewsArticlesBannerData').mockResolvedValue({
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

    mockGetNewsArticlesListData = jest.spyOn(dataSvc, 'getNewsArticlesListData').mockResolvedValue({
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
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(mockGetNewsArticlesContentData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsCategoriesData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsArticlesBannerData).toHaveBeenCalledTimes(1)
    expect(mockGetNewsArticlesListData).toHaveBeenCalledTimes(1)
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_tabs_bar').exists()).toBeTruthy()
    expect(wrapper.find('#mock_news_articles_list').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()

    wrapper.find('#mock_tabs_bar').simulate('click')
    wrapper.find('#mock_top_banner').simulate('click')
    jest.runOnlyPendingTimers();
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.newsArticlesContent = null;
    data.newsArticlesBanner = null
    data.newsCategories = null
    data.newsArticlesList = null
    data.headerMenus = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetNewsArticlesContentData).toHaveBeenCalledTimes(1)
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(mockGetFooterData).toHaveBeenCalledTimes(1)
    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_tabs_bar').exists()).toBeFalsy()
    expect(wrapper.find('#mock_news_articles_list').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});