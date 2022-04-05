import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import TopBannerImageCarousel from '../index';
import { act } from 'react-dom/test-utils';

jest.mock('react-bootstrap/Carousel', () => {
  const Carousel = ({
    children,
    activeIndex,
    onSelect,
  }: {
    children: React.ReactNode;
    activeIndex: number;
    onSelect: (arg: number) => void;
  }) => {
    setTimeout(() => {
      onSelect(activeIndex);
    }, 0);
    return <div id="test_carousel">{children}</div>;
  };

  Carousel.Item = ({ children }: { children: React.ReactNode }) => {
    return (
      <div key={'0'} className="test_carousel_item">
        {children}
      </div>
    );
  };

  return Carousel;
});

describe('TopBannerImageCarousel testing', () => {
  const mockProps = {
    dataList: {
      data: {
        id: 'id',
        relationships: {
          field_media_image: {},
        },
      },
    },
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) => mount(<TopBannerImageCarousel {...data} />);

  let mockGetImage: any;
  beforeEach(() => {
    jest.useFakeTimers();
    mockGetImage = jest.spyOn(dataSvc, 'getImage').mockImplementationOnce(async () => {
      return {
        data: {
          attributes: { uri: { url: 'https://www.google.com' } },
          relationships: {
            field_steps: { links: { related: { href: 'https://www.google.com' } } },
          },
        },
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
    });
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeTruthy();
    expect(wrapper.find('#test_carousel').exists()).toBeTruthy();
    expect(wrapper.find('.test_carousel_item').exists()).toBeTruthy();

    expect(mockGetImage).toHaveBeenCalledTimes(1);
  });

  it('Should set banner mode correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeTruthy();
    expect(wrapper.find('#test_carousel').exists()).toBeTruthy();
    expect(wrapper.find('.test_carousel_item').exists()).toBeTruthy();

    expect(wrapper.find('.thumbnail.active').exists()).toBeFalsy();
    wrapper.find('.switch-carousel').simulate('click');
    expect(wrapper.find('.thumbnail.active').exists()).toBeTruthy();
    wrapper.find('.thumbnail.active').simulate('click');
    expect(mockGetImage).toHaveBeenCalledTimes(1);

    wrapper.find('.switch-carousel').simulate('click');
  });

  it('Should set banner mode correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeTruthy();
    expect(wrapper.find('#test_carousel').exists()).toBeTruthy();
    expect(wrapper.find('.test_carousel_item').exists()).toBeTruthy();

    expect(wrapper.find('.thumbnail.active').exists()).toBeFalsy();
    wrapper.find('.switch-carousel').simulate('click');
    expect(wrapper.find('.thumbnail.active').exists()).toBeTruthy();
    wrapper.find('.thumbnail.active').simulate('click');
    expect(mockGetImage).toHaveBeenCalledTimes(1);

    wrapper.find('.switch-carousel').simulate('click');
  });

  it('Should render elements correctly', async () => {
    const data = {
      dataList: {
        data: {
          id: 'id',
          relationships: {
            field_media_image: [
              {
                relationships: {
                  field_media_logo: {
                    data: { id: 'id' },
                  },
                },
              },
            ],
          },
        },
      },
    };
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeTruthy();
    expect(wrapper.find('#test_carousel').exists()).toBeTruthy();
    expect(wrapper.find('.test_carousel_item').exists()).toBeTruthy();
    expect(mockGetImage).toHaveBeenCalledTimes(1);
  });

  it('Should not render elements', async () => {
    const data = {
      dataList: {
        data: {
          id: 'id',
          relationships: {
            field_media_image: 1,
          },
        },
      },
    };
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeFalsy();
    expect(mockGetImage).toHaveBeenCalledTimes(0);
  });

  it('Should not render with empty dataList', async () => {
    await act(async () => {
      // @ts-ignore
      wrapper = createWrapper({});
    });
    wrapper.update();

    expect(wrapper.find('.deal-banner').exists()).toBeFalsy();
    expect(mockGetImage).toHaveBeenCalledTimes(0);
  });
});
