import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import RelatedFAQ from '../RelatedFAQ';
import { act } from "react-dom/test-utils";

function createFAQ(title: string) {
  return {
    attributes: {
      title
    }
  }
}

describe('RelatedFAQ Component', () => {
  it('should load properly', async () => {
    const faqs = [
      createFAQ("FAQ 1"),
      createFAQ("FAQ 2"),
    ]
    const props = {
      dataList: {
        data: faqs
      }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><RelatedFAQ {...props}/></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('FAQ 1');
    expect(wrapper!.html()).toContain('FAQ 2');
    expect(wrapper!.find(`li`).at(0).is(`.active`)).toBeTruthy();
    expect(wrapper!.find(`li`).at(1).is(`.active`)).toBeFalsy();
    wrapper!.find(`a`).at(1).simulate('click');
    await wrapper!.update();
    // Nothing to assert after click for now
  })
})
