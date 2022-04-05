import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import RelatedProductsAndServices from '../index';
import { act } from 'react-dom/test-utils';

describe('RelatedProductsAndServices testing', () => {
  const mockProps = {
    dataList: {
      data: [
        {
          relationships: {
            field_quick_links: {
              links: {
                related: {
                  href: 'https://www.google.com',
                },
              },
            },
          },
          attributes: { field_title: 'field_title' },
        },
      ],
    },
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps) =>
    mount(<RelatedProductsAndServices {...data} />);

  const mockContentData = [
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: '',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Alert',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Mobile Phone',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Tenancy',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Protect',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Insights',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Community',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Loans',
      },
    },
    {
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'Transactions',
      },
    },
  ];

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue({
      data: mockContentData,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render elements correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(wrapper.find('.title').text()).toContain(
      mockProps.dataList.data[0].attributes.field_title
    );
    expect(wrapper.find('.item').at(0).props().href).toBe(
      mockContentData[0].attributes.field_single_link.uri
    );
    expect(mockGetData).toHaveBeenCalledTimes(1);
  });

  it('Should not render with empty dataList', async () => {
    await act(async () => {
      wrapper = createWrapper({
        dataList: {
          data: [],
        },
      });
    });
    wrapper.update();

    expect(wrapper.find('.container').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0);
  });
});
