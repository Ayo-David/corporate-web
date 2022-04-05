import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TopBannerSearch from '../index';
import { act } from 'react-dom/test-utils';

jest.mock('react-outside-click-handler', () => {
  const OutsideClickHandler = ({
    children,
    onOutsideClick,
  }: {
    children: React.ReactNode;
    onOutsideClick: () => void;
  }) => {
    setTimeout(() => {
      onOutsideClick();
    }, 0);
    return <div id="test_div">{children}</div>;
  };
  return OutsideClickHandler;
});

describe('TopBannerSearch testing', () => {
  const mockProps = {
    title: 'title',
    dataList: {
      data: [
        {
          attributes: { title: 'title1' },
        },
        {
          attributes: { title: 'title2' },
        },
      ],
    },
    onSearch: (value: string) => {},
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) => mount(<TopBannerSearch {...data} />);

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

    expect(wrapper.find('.title').text()).toContain(mockProps.title);
    expect(wrapper.find('.search-box').exists()).toBeTruthy();
    expect(wrapper.find('.search-results').exists()).toBeTruthy();
  });

  it('Should click search button correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();
    wrapper.find('.btn-search').simulate('click');
    expect(wrapper.find('.title').text()).toContain(mockProps.title);
  });

  it('Should set search faqs and result correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });

    wrapper.update();

    expect(wrapper.find('.box-search-groups.open').exists()).toBeFalsy();
    wrapper
      .find('[placeholder="Search our FAQs"]')
      .simulate('change', { target: { value: mockProps.dataList.data[0].attributes.title } });

    expect(wrapper.find('.box-search-groups.open').exists()).toBeTruthy();
    expect(wrapper.find('[placeholder="Search our FAQs"]').props().value).toContain(
      mockProps.dataList.data[0].attributes.title
    );

    wrapper.find('.value.active').simulate('click');
    expect(wrapper.find('.box-search-groups.open').exists()).toBeFalsy();
  });
});
