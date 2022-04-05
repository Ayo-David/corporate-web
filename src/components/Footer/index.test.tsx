import React from 'react';
import { AppContainer } from '../../test/helper';
import { mount } from 'enzyme';
import Footer from '../Footer';
import { act } from "react-dom/test-utils";

function createProps(included: any) {
  return {
    dataList: {
      data: [],
      included,
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    }
  }
}


function createIncluded(fieldTitle: any, links: any) {
  const attributes: any = {}
  if (fieldTitle) {
    attributes.field_title = fieldTitle
    attributes.field_links = links
  }
  return {
    id: "iid",
    attributes,
    links: {
      self: null
    },
    relationships: [],
    type: "includedType"
  }
}

function createLink(title: string, uri: string) {
  return {
    title,
    uri
  }
}

describe('Footer Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const links1 = [
      createLink("L Title 1", "luri1"),
      createLink("L Title 2", "luri2")
    ]
    
    const included = [
      createIncluded("F Title 1", links1),
      createIncluded(null, []),
    ]
    
    const props = createProps(included);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Footer {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("F Title 1");
    expect(wrapper!.html()).toContain("L Title 1");
    expect(wrapper!.html()).toContain("L Title 2");
    expect(wrapper!.html()).toContain("luri1");
    expect(wrapper!.html()).toContain("luri2");
    expect(wrapper!.find(`.footer-menu-content`).at(0).is(`.open`)).toBeFalsy();
    wrapper!.find(`.btn-arrow`).at(0).simulate('click');
    await wrapper!.update();
    expect(wrapper!.find(`.footer-menu-content`).at(0).is(`.open`)).toBeTruthy();
    expect(wrapper!.find(`.footer-menu-content`).at(0).is(`.shown-item`)).toBeTruthy();
    expect(wrapper!.find(`.footer-menu-content`).at(1).is(`.hide`)).toBeTruthy();
  })
})
