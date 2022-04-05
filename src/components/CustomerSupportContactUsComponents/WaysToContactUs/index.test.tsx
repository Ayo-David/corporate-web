import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { WaysToContactUs } from '../WaysToContactUs';
import { act } from 'react-dom/test-utils';


describe('OurRegionalOffices testing', () => {

  const mockDataList = [
    {
      type: 'paragraph--title_description',
      attributes: {
        field_icon_class: 'Phone',
        field_text: {
          value: 'valueText'
        },
      },
    },
  ];
  
  const mockProps = {
    dataList: mockDataList,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <WaysToContactUs {...data} />
  )

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(wrapper.html()).toContain('icon-phone');
    expect(wrapper.html()).toContain('valueText');
  });
  
  it('Should render protect icon class', async () => {
    const wrapper = createWrapper({dataList:
      [
        {
          type: 'paragraph--title_description',
          attributes: {
            field_icon_class: 'Protect',
            field_text: { value: 'ValueText' },
          },
        },
      ]
    });
    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.html()).toContain('icon-protect');
  });
  
  it('Should render protect icon class', async () => {
    const wrapper = createWrapper({
      dataList: [
        {
          type: 'paragraph--title_description',
          attributes: {
            field_icon_class: 'Mail',
            field_text: { value: 'ValueText' },
          },
        },
      ]
    });
    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.html()).toContain('icon-mail');
  });  
});
