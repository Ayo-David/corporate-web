import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TemplatePageSidebar from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../test/helper';

jest.mock('react-bootstrap/Dropdown', () => {
  const Dropdown = ({ children }: {children: React.ReactNode}) => {
    return <div id="test_dropdown">{children}</div>;
  };

  Dropdown.Toggle = ({ children, ...otherProps }: {children: React.ReactNode}) => {
    return <div>{children}</div>;
  };

  Dropdown.Menu = ({ children, ...otherProps }: {children: React.ReactNode}) => {
    return <div>{children}</div>;
  };

  Dropdown.Item = ({ children, onClick }: {children: React.ReactNode, onClick: () => void}) => {
    setTimeout(() => {
      onClick();
    }, 0);

    return (
      <div key={'0'} className="test_dropdown_item">
        {children}
      </div>
    );
  };

  return Dropdown;
});

describe('TemplatePageSidebar testing', () => {
  const mockProps = {
    paragraphs: [
      {
        id: 'paragraphId',
        attributes: {
          field_url_alias: '/url',
        },
        links: {
          self: '/url',
        },
        relationships: [],
        type: '',
      },
      {
        id: 'id',
        attributes: {
          field_url_alias: '/url',
        },
        links: {
          self: '/url',
        },
        relationships: [],
        type: '',
      },
    ],
    paragraphId: 'paragraphId',
    onSelectItem: (id: string) => {},
    enableRouting: true,
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) =>
    mount(
      <AppContainer>
        <TemplatePageSidebar {...data} />
      </AppContainer>
    );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
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
      jest.runAllTimers();
    });
    wrapper.update();

    expect(wrapper.find('.label-btn').exists()).toBeTruthy();
    expect(wrapper.find('#test_dropdown').exists()).toBeTruthy();
    expect(wrapper.find('.test_dropdown_item').exists()).toBeTruthy();
  });

  it('Should render elements correctly with emtpy paragraphId', async () => {
    const data = {
      paragraphs: [
        {
          id: 'id',
          attributes: {
            field_url_alias: '',
          },
          links: { self: '' },
          type: '',
          relationships: [],
        },
      ],
      paragraphId: 'paragraphId',
      onSelectItem: (id: string) => {},
      enableRouting: true,
    };

    await act(async () => {
      wrapper = createWrapper(data);
      jest.runAllTimers();
    });
    wrapper.update();

    expect(wrapper.find('.label-btn').exists()).toBeTruthy();
    expect(wrapper.find('#test_dropdown').exists()).toBeTruthy();
    expect(wrapper.find('.test_dropdown_item').exists()).toBeTruthy();
  });

  it('Should render elements correctly without field_url_alias', async () => {
    const data = {
      paragraphs: [
        {
          id: 'id',
          attributes: {
            field_url_alias: '',
          },
          links: {
            self: '',
          },
          type: '',
          relationships: [],
        },
      ],
      paragraphId: '',
      onSelectItem: (id: string) => {},
      enableRouting: true,
    };

    await act(async () => {
      wrapper = createWrapper(data);
      jest.runAllTimers();
    });
    wrapper.update();

    expect(wrapper.find('.label-btn').exists()).toBeTruthy();
    expect(wrapper.find('#test_dropdown').exists()).toBeTruthy();
    expect(wrapper.find('.test_dropdown_item').exists()).toBeTruthy();
  });

  it('Should call callback', async () => {
    const mockFunc = jest.fn();
    const data = {
      paragraphs: [
        {
          id: 'id',
          attributes: {
            field_url_alias: '/url',
          },
          links: { self: '' },
          type: '',
          relationships: [],
        },
      ],
      paragraphId: 'paragraphId',
      onSelectItem: mockFunc,
      enableRouting: false,
    };

    await act(async () => {
      wrapper = createWrapper(data);
      jest.runAllTimers();
    });
    wrapper.update();

    expect(wrapper.find('.label-btn').exists()).toBeTruthy();
    expect(wrapper.find('#test_dropdown').exists()).toBeTruthy();
    expect(wrapper.find('.test_dropdown_item').exists()).toBeTruthy();
    wrapper.find('a[href="#javascript"]').simulate('click');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
