import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SavingsEarnYou from '../index';
import { act } from 'react-dom/test-utils';


describe('SavingsEarnYou testing', () => {

  let wrapper: ReactWrapper;
  const createWrapper = ()=>mount(
    <SavingsEarnYou />
  )


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper();
    })
    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.find('.col.first-col').exists()).toBeTruthy()
    expect(wrapper.find('.row.box-row.h-100').exists()).toBeTruthy()
  });
});