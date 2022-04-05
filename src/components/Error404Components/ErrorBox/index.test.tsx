import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import ErrorBox from '../ErrorBox';
import { act } from "react-dom/test-utils";

function createProps(content: string, link: any = null, linkTitle: any = null) {
  const result: any = {}
  result.body =  {
    processed: content
  }
  if (link) {
    result.field_url = {
      title: linkTitle,
      uri: link
    }
  }
  
  return {
    dataList: result
  }
}

describe('ErrorBox Component', () => {
  it('should load properly', async () => {
    const props = createProps("Errorbox Content", "/errorlink", "Error Link Title")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ErrorBox {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Errorbox Content");
    expect(wrapper!.html()).toContain("/errorlink");
    expect(wrapper!.html()).toContain("Error Link Title");
  })
  
  it('should handle no link properly', async () => {
    const props = createProps("Errorbox Content")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ErrorBox {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Errorbox Content");
  })
})
