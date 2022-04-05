import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import QuickLinks from '../QuickLinks';
import { act } from "react-dom/test-utils";

function createProps(quickLinks: any) {
  return {
    homeFieldQuickLinks: {
      data: quickLinks
    }
  }
}

function createQuickLink(title: string, link: string, iconClass: string) {
  return {
    attributes: {
      field_single_link: {
        uri: link,
        title
      },
      field_icon_class: iconClass,
    },
  }
}

describe('QuickLinks Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const quickLinks = [
      createQuickLink("QL Title 1", "qllink1", "Bank"),
      createQuickLink("QL Title 2", "qllink2", "Investment"),
      createQuickLink("QL Title 3", "qllink3", "Loans"),
      createQuickLink("QL Title 4", "qllink4", "Card"),
      createQuickLink("QL Title 5", "qllink5", "Others"),
    ]
    const props = createProps(quickLinks)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><QuickLinks {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.col`).at(0).html()).toContain('QL Title 1');
    // expect(wrapper!.find(`.col`).at(0).html()).toContain('qllink1');
    expect(wrapper!.find(`i`).at(0).is(`.icon-bank`)).toBeTruthy();
  })
})
