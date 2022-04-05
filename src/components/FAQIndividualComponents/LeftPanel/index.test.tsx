import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import LeftPanel from '../LeftPanel';
import { act } from "react-dom/test-utils";

function createPanelItem(title: string, text: any = null) {
  const attributes: any = {}
  attributes.field_title =  title
  if (text) {
    attributes.field_text = {
      processed: text
    }
  }
  
  return { attributes }
}

describe('LeftPanel Component', () => {
  it('should load properly', async () => {
    const data = [
      createPanelItem("Panel Title 1", "Panel Text 1"),
      createPanelItem("Panel Title 2"),
    ]
    const props = {
      dataList: { data }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><LeftPanel {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Panel Title 1");
    expect(wrapper!.html()).toContain("Panel Text 1");
    expect(wrapper!.html()).toContain("Panel Title 2");
  })
})
