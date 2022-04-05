import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TopBannerPureLabel from '../index';
import { act } from 'react-dom/test-utils';


describe('TopBannerPureLabel testing', () => {

  const mockProps = {
    title: 'title'
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TopBannerPureLabel {...data} />
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.find('.white-big-txt').text()).toContain(mockProps.title)
  });
});
