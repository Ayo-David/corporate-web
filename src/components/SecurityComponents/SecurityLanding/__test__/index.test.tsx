import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SecurityLanding from '../index';
import { act } from 'react-dom/test-utils';

jest.mock('../../../NewsArticlesComponents/TabsBar', () => {
  const TabsBar = ({
    onClickTab,
    title,
  }: {
    onClickTab: (arg: number) => undefined;
    title: React.ReactNode;
  }) => {
    return (
      <div id="test_div" onClick={onClickTab(0)}>
        {title}
      </div>
    );
  };
  return TabsBar;
});

jest.mock('../../../NewsArticlesComponents/NewsArticlesList', () => {
  const NewsArticlesList = () => {
    return <div></div>;
  };
  return NewsArticlesList;
});

describe('SecurityLanding testing', () => {
  const mockProps = {
    securitiesContent: {
      included: [
        {
          type: '',
          relationships: {
            field_security_category: {
              data: { id: 'id' },
            },
          },
          attributes: {
            field_title: 'field_title',
            created: 'created',
            field_url_alias: 'field_url_alias',
          },
          id: '',
          links: {
            self: '',
          },
        },
        {
          type: '',
          relationships: {
            field_security_category: {
              data: { id: 'id' },
            },
          },
          attributes: {
            field_title: 'field_title',
            created: 'created',
            field_url_alias: 'field_url_alias',
          },
          id: '',
          links: {
            self: '',
          },
        },
      ],
      data: {
        id: '',
        attributes: {},
        links: {
          self: '',
        },
        relationships: {},
        type: '',
      },
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
    securityCategories: {
      data: [
        {
          attributes: { weight: 0 },
          uuid: [
            {
              value: 0,
            },
          ],
          id: '',
          links: {
            self: '',
          },
          relationships: {},
          type: '',
        },
        {
          attributes: { weight: 1 },
          uuid: [
            {
              value: 1,
            },
          ],
          id: '',
          links: {
            self: '',
          },
          relationships: {},
          type: '',
        },
      ],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) => mount(<SecurityLanding {...data} />);

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();
    wrapper.find('#test_div').simulate('click');
    expect(wrapper.find('#test_div').text()).toContain('SECURITY INFORMATION');
  });
});
