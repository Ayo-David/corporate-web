import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { TitleDescription } from '../TitleDescription';
import { act } from 'react-dom/test-utils';


describe('OurRegionalOffices testing', () => {

  const mockDataList = [
    {
      attributes: {
        field_title: 'title1',
        field_text: {
          value: 'valueText1'
        },
      },
      id: '',
      type: 'paragraph--title_description'
    },
    {
      attributes: {
        field_title: 'title2',
        field_text: {
          value: 'valueText2'
        },
      },
      id: '',
      type: 'paragraph--title_description'
    }
  ];
  
  const mockProps = {
    showTitle: false,
    dataList: mockDataList,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TitleDescription {...data} />
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
    expect(wrapper.html()).toContain('title1');
    expect(wrapper.html()).toContain('title2');
  });
  
  it('Should set result details', async () => {
    const wrapper = createWrapper(mockProps);

    expect(wrapper.html().includes('valueText1')).toBe(true);
    expect(wrapper.html().includes('valueText2')).toBe(false);

    wrapper.find('.txt').at(1).simulate('click');

    expect(wrapper.html().includes('valueText1')).toBe(false);
    expect(wrapper.html().includes('valueText2')).toBe(true);
  });
});
