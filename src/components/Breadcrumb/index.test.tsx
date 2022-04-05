import React from 'react';
import { mount } from 'enzyme';
import Breadcrumb from '../Breadcrumb';
import { AppContainer } from '../../test/helper';
import { act } from "react-dom/test-utils";

function getMockProps(className: string) {
  return {
    itemArray: [{
      label: 'label1',
      url: '/url1.html'
    }, {
      label: 'label2',
      url: '/url2.html'
    }, {
      label: 'label3',
      url: '/url3.html'
    }],
    className
  }
}

function validateBreadcrumbItem(wrapper: any, listIndex: number, isLast: boolean = false) {
  expect(wrapper.html()).toContain(`label${listIndex + 1}`);
  expect(wrapper.html()).toContain(`/url${listIndex + 1}.html`);
  if (!isLast) {
    expect(wrapper.html()).toContain('&gt');
  }
}

describe('Breadcrumb Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the item list properly', async () => {
    const props = getMockProps('breadcrumbClassName');
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Breadcrumb {...props} /></AppContainer>);
    })
    expect(wrapper!.find('ul')).toHaveLength(1);
    expect(wrapper!.find('ul').find('li')).toHaveLength(3);
    validateBreadcrumbItem(wrapper!.find('ul').find('li').at(0), 0, false);
    validateBreadcrumbItem(wrapper!.find('ul').find('li').at(1), 1, false);
    validateBreadcrumbItem(wrapper!.find('ul').find('li').at(2), 2, true);
  })
})
