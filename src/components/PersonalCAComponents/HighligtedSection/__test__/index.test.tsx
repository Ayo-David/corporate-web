import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import HighlightedSection from '../index';
import { act } from 'react-dom/test-utils';

describe('HighlightedSection testing', () => {
  const mockProps = {
    info: {
      data: {
        attributes: { field_title: 'field_title', field_text: { processed: '<div></div>' } },
      },
    },
    cards: {
      data: [
        {
          attributes: {
            field_icon_class: 'field_icon_class',
            field_text: { processed: '<div></div>' },
          },
        },
      ],
    },
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) => mount(<HighlightedSection {...data} />);

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render cards', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper.find('.section-card').exists()).toBeTruthy();
    expect(wrapper.find('.icons').exists()).toBeTruthy();
    expect(wrapper.find('.txt').exists()).toBeTruthy();
  });

  it('Should not render cards', async () => {
    await act(async () => {
      wrapper = createWrapper({
        info: {
          data: { attributes: { field_title: '', field_text: { processed: '' } } },
        },
        cards: {
          data: [],
        },
      });
    });
    expect(wrapper.find('.section-card').exists()).toBeFalsy();
    expect(wrapper.find('.icons').exists()).toBeFalsy();
    expect(wrapper.find('.txt').exists()).toBeFalsy();
  });
});
