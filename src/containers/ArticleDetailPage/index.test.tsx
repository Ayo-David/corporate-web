import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ArticleDetailPage from '../ArticleDetailPage';
import LeftPanel from  '../../components/ArticleDetailComponents/LeftPanel'
import RightPanel from  '../../components/ArticleDetailComponents/RightPanel'
import TopBanner from '../../components/ArticleDetailComponents/TopBanner'
import { act } from "react-dom/test-utils";

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
jest.mock('../../components/HomeComponents/NewsArticlesList', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_news_article_list">{children}</div>)
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

function createArticle(id: string, title: string, content: string, changed: string, created: string) {
  return {
    data: {
      id,
      attributes: {
        title,
        changed,
        created,
        body: {
          processed: content
        }
      },
      relationships: {
        field_media_image: {
          data: {
            id: 'ArticleDetailComponentFieldMediaImageId'
          }
        }
      }
    }
  }
}

function createNewsCategory(categoryId: string) {
  return [
    {
      uuid: [{
        value: categoryId
      }],
      changed: [],
      default_langcode: [],
      description: [],
      langcode: [],
      name: [],
      parent: [],
      path: [],
      revision_created: [],
      revision_id: [],
      revision_log_message: [],
      revision_translation_affected: [],
      revision_user: [],
      status: [],
      tid: [],
      vid: [],
      weight: [],
    },
  ];
}

function createProps() {
  return {
    headerMenus: {
      'About Us': createHeaderItems('About Us', 'aboutUsLink')
    },
    footer: {
      id: 'adpFooterId',
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
    newsArticlesList: {
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
    articleDetailContent: createArticle('articleId', 'Article Title', 'Article Content',
      '2022-01-25', '2022-01-24'),
    newsCategories: createNewsCategory('newsCategoryId')
  }
}

function initDataSvc() {
  mockedDataSvc.getArticleDetailContentData.mockResolvedValue({
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
  
  mockedDataSvc.getNewsArticlesListData.mockResolvedValue({
    data: []
  })
  
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: "paragraphImg.jpg"
        }
      }
    }
  })
}

describe('ArticleDetail Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ArticleDetailPage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_news_article_list`)).toHaveLength(1)
    
    expect(wrapper!.find(LeftPanel)).toHaveLength(1)
    expect(wrapper!.find(RightPanel)).toHaveLength(1)
    expect(wrapper!.find(TopBanner)).toHaveLength(1)
  })
})

