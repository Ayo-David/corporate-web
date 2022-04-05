import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import { WaysToContactUs } from './index';
import { act } from "react-dom/test-utils";

function createProps(contactMethods: any) {
  return {
    dataList: contactMethods
  }
}

function createContactMethod(content: string, iconClass: string) {
  return {
    attributes: {
      field_icon_class: iconClass,
      field_text: {
        value: content
      }
    },
  }
}

describe('WaysToContactUs Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const contactMethods = [
      createContactMethod("Contact Method 1", "Phone"),
      createContactMethod("Contact Method 2", "Protect"),
      createContactMethod("Contact Method 3", "Mail"),
      createContactMethod("Contact Method 4", "Other"),
    ]
    const props = createProps(contactMethods)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><WaysToContactUs {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.general-content`).at(0).html()).toContain('Contact Method 1');
    expect(wrapper!.find(`.icon`).at(0).is(`.icon-phone`)).toBeTruthy();
    expect(wrapper!.find(`.general-content`).at(1).html()).toContain('Contact Method 2');
    expect(wrapper!.find(`.icon`).at(1).is(`.icon-protect`)).toBeTruthy();
    expect(wrapper!.find(`.general-content`).at(2).html()).toContain('Contact Method 3');
    expect(wrapper!.find(`.icon`).at(2).is(`.icon-mail`)).toBeTruthy();
    expect(wrapper!.find(`.general-content`).at(3).html()).toContain('Contact Method 4');
    expect(wrapper!.find(`.icon`).at(3).is(`.icon-phone`)).toBeFalsy();
    expect(wrapper!.find(`.icon`).at(3).is(`.icon-protect`)).toBeFalsy();
    expect(wrapper!.find(`.icon`).at(3).is(`.icon-mail`)).toBeFalsy();
  })
})
