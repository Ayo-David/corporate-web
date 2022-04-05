import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TopInfo from '../index';
import { act } from 'react-dom/test-utils';


describe('TopInfo testing', () => {

  let wrapper: ReactWrapper;
  const createWrapper = ()=>mount(
    <TopInfo />
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper();
    })
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper();
    })
    wrapper.update();

    expect(wrapper.find('.line-txt').length).toBe(2)

  });

  it('Should not render elements', async() => {
    await act(async()=>{
      wrapper = createWrapper();
    })
    wrapper.update();

    expect(wrapper.find('.red-bar').exists()).toBeTruthy();
    wrapper.find('.btn-close').at(0).simulate('click')
    expect(wrapper.find('.red-bar').exists()).toBeFalsy();

    expect(wrapper.find('.blue-bar').exists()).toBeTruthy();
    wrapper.find('.btn-close').at(0).simulate('click')
    expect(wrapper.find('.blue-bar').exists()).toBeFalsy();

  });
});
