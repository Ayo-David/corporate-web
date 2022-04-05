import React from 'react';
import { mount } from 'enzyme';
import OurCustomerPromise from '../OurCustomerPromise';
import { act } from "react-dom/test-utils";

function getMockProps() {
  return {
    dataList: {
      id: 'OurCustomerPromiseId',
      attributes: {
        field_title: 'testOurCustomerPromiseTitle',
        field_text: {
          value: 'OurCustomerPromiseText'
        },
        field_single_link: {
          uri: 'https://uritestfoo.com/OurCustomerPromiseSingleLinkUri',
          title: 'OurCustomerPromiseLinkTitle'
        }
      }
    },
  }
}

describe('OurCustomerPromise Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the attribute values properly', async () => {
    const props = getMockProps();
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<OurCustomerPromise {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.contains('testOurCustomerPromiseTitle')).toEqual(true);
    expect(wrapper!.html()).toContain('OurCustomerPromiseText');
  })
})
