import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Confirmation from '../Confirmation';
import { act } from 'react-dom/test-utils';


describe('Confirmation testing', () => {

  const mockProps = {
    onClose: () => {},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <Confirmation {...data} />
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

  it('Should call onClose', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClose: mockFunc}});
      jest.runAllTimers();
      wrapper.update();
    })

    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.icon-close').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
  });
});
