import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import FormStep1 from '../FormStep1';
import { act } from 'react-dom/test-utils';


describe('FormStep1 testing', () => {

  const mockDataList = {
    data: {
      attributes: {
        title: 'title1',
      },
    },
    included: [
      {
        type: 'paragraph--title_description',
        attributes: {
          field_title: 'title2',
          field_text: {
            value: 'valuexxx',
          },
        },
      },
      {
        type: 'paragraph--title_description',
        attributes: {
          field_title: 'Privacy Policy',
          field_text: {
            value: 'valuexxx',
          },
        },
      },
    ],
  };
  
  const mockProps = {
    dataList: mockDataList,
    isExistingCustomer: 'Yes',
    setIsExistingCustomer: () => {},
    setStepIndex: () => {},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <FormStep1 {...data} />
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
  });
  
  it('Should call setIsExistingCustomer', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{setIsExistingCustomer: mockFunc}});
      jest.runAllTimers();
      wrapper.update();
    })

    wrapper.find('#radio-text-yes').at(0).simulate('change')
    expect(mockFunc).toBeCalledWith('Yes')
    
    wrapper.find('#radio-text-no').at(0).simulate('change')
    expect(mockFunc).toBeCalledWith('No')
  });
});
