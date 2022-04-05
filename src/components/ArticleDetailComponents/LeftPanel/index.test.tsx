import React from 'react'
import { mount } from 'enzyme';
import LeftPanel from '../LeftPanel';
import { act } from "react-dom/test-utils";



describe('ArticleDetail LeftPanel Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the date properly', async () => {
    const props = {
      dateLabel: '2021-12-30'
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<LeftPanel {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('12-30');
  })
  
  it('should use the LinkedIn share properly', async() => {
    const props = {
      dateLabel: '2021-12-30'
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<LeftPanel {...props} />);
    })
    await wrapper!.update();
    wrapper!.find(`.icon-in`).simulate('click');
    // nothing to assert for now
  })
  
  it('should use the Twitter share properly', async() => {
    const props = {
      dateLabel: '2021-12-30'
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<LeftPanel {...props} />);
    })
    await wrapper!.update();
    wrapper!.find(`.icon-twitter`).simulate('click');
    // nothing to assert for now
  })
  
  it('should use the Instagram share properly', async() => {
    const props = {
      dateLabel: '2021-12-30'
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<LeftPanel {...props} />);
    })
    await wrapper!.update();
    wrapper!.find(`.icon-camera`).simulate('click');
    // nothing to assert for now
  })
})
