import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import Title from '../Title';
import { act } from "react-dom/test-utils";

function createProps(content: string) {
  return {
    dataList: {
      value: content
    }
  }
}

describe('Title Component', () => {
  it('should load properly', async () => {
    const props = createProps("Title Content")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Title {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Title Content");
  })
})
