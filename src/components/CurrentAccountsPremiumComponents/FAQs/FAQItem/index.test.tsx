import React from 'react';
import { mount } from 'enzyme';
import FAQItem from '../FAQItem';
import { act } from "react-dom/test-utils";

function createProps(title: string, text: string, isSingle: boolean) {
  return {
    dataList: {
      attributes: {
        field_title: title,
        field_text: {
          value: text
        }
      }
    },
    isSignle: isSingle
  }
}

describe('FAQs Item Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the component properly', async () => {
    const props = createProps("FAQItem Title", "FAQItem Text", true)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<FAQItem {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("FAQItem Title");
    expect(wrapper!.html()).toContain("FAQItem Text");
    expect(wrapper!.find(`div`).at(0).is(`.single`)).toBeTruthy();
  })
  
  it('should display the component as not single', async () => {
    const props = createProps("FAQItem Title", "FAQItem Text", false)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<FAQItem {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`div`).at(0).is(`.single`)).toBeFalsy();
  })
  
  it('should expand the component when clicked', async () => {
    const props = createProps("FAQItem Title", "FAQItem Text", false)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<FAQItem {...props} />);
    })
    await wrapper!.update();
    wrapper!.find(`.top-title`).at(0).simulate('click');
    await wrapper!.update();
    expect(wrapper!.find(`div`).at(0).is(`.expanded`)).toBeTruthy();
  })
})
