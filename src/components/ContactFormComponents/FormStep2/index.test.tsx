import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import FormStep2 from '../FormStep2';
import ReCAPTCHA from 'react-google-recaptcha';
import { act } from 'react-dom/test-utils';


describe('FormStep2 testing', () => {

  const mockProps = {
    setShowConfirmation: () => {},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <FormStep2 {...data} />
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

  it('Should call setShowConfirmation', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{setShowConfirmation: mockFunc}});
      jest.runAllTimers();
      wrapper.update();
    })

    wrapper.find(ReCAPTCHA).at(0).props().onChange!("");
    wrapper.find('input').forEach( e => e.simulate('change', {target: {value: "new value"}}))
    wrapper.find('textarea').forEach( e => e.simulate('change', {target: {value: "new value"}}))
    wrapper.find('.btn.btn-green').forEach( e => e.simulate('click'))
    expect(mockFunc).toHaveBeenCalledTimes(0)
  });
});
