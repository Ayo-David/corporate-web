import React from 'react';
import { mount } from 'enzyme';
import HeaderLinks from '../HeaderLinks';
import { act } from "react-dom/test-utils";

const mockScroll = jest.fn();

function createProps(links: any) {
  return {
    currentAccountsHeaderLinks: {
      data: links
    },
    onScrollTop: mockScroll
  }
}

function createLink(iconClass: string, title: string) {
  return {
    attributes: {
      field_single_link: {
        title
      },
      field_icon_class: iconClass
    }
  }
}

describe('FAQs Item Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the component properly', async () => {
    const links = [
      createLink('linkClass1', 'Link Title 1'),
      createLink('linkClass2', 'Link Title 2'),
    ]
    const props = createProps(links)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<HeaderLinks {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("linkClass1");
    expect(wrapper!.html()).toContain("Link Title 1");
    expect(wrapper!.html()).toContain("linkClass2");
    expect(wrapper!.html()).toContain("Link Title 2");
  })
  
  it('should scroll when the header is clicked', async () => {
    const links = [
      createLink('linkClass1', 'Link Title 1'),
      createLink('linkClass2', 'Link Title 2'),
    ]
    const props = createProps(links)
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<HeaderLinks {...props} />);
    })
    await wrapper!.update();
    expect(mockScroll.mock.calls).toHaveLength(0);
    wrapper!.find(`.header-link`).at(0).simulate('click');
    await wrapper!.update();
    expect(mockScroll.mock.calls).toHaveLength(1);
  })
})
