import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import NewsArticlesList from '../NewsArticlesList';
import { act } from "react-dom/test-utils";

function createArticle(id: string, title: string, changed: string) {
  return {
    id,
    attributes: {
      title,
      changed
    }
  }
}

function createProps(articles: any) {
  return {
    dataList: {
      data: articles,
      included: [],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    }
  }
}

describe('NewsArticlesList Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const articles = [
      createArticle("aid1", "Article 1", "2022-01-01"),
      createArticle("aid2", "Article 2", "2022-01-02"),
      createArticle("aid3", "Article 3", "2022-01-03"),
      createArticle("aid4", "Article 4", "2022-01-04")
    ]
    const props = createProps(articles)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><NewsArticlesList {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.articles-list`).at(0).is(`.articles-list-grid`)).toBeTruthy();
    expect(wrapper!.html()).toContain("Article 1");
    expect(wrapper!.html()).toContain("Article 2");
    expect(wrapper!.html()).toContain("Article 3");
    expect(wrapper!.html()).toContain("Article 4");
    expect(wrapper!.html()).toContain("aid1");
    expect(wrapper!.html()).toContain("aid2");
    expect(wrapper!.html()).toContain("aid3");
    expect(wrapper!.html()).toContain("aid4");
    expect(wrapper!.html()).toContain("2022-01-01");
    expect(wrapper!.html()).toContain("2022-01-02");
    expect(wrapper!.html()).toContain("2022-01-03");
    expect(wrapper!.html()).toContain("2022-01-04");
  })
  
  it('should use correct div class when article count is different', async () => {
    const articles = [
      createArticle("aid1", "Article 1", "2022-01-01"),
      createArticle("aid2", "Article 2", "2022-01-02")
    ]
    const props = createProps(articles)
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><NewsArticlesList {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.articles-list`).at(0).is(`.articles-list-flex`)).toBeTruthy();
  })
})
