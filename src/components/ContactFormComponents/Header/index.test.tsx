import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Header from '../Header';
import { act } from 'react-dom/test-utils';


describe('Header testing', () => {

  const mockProps = {
    stepIndex: 0,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <Header {...data} />
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
});
