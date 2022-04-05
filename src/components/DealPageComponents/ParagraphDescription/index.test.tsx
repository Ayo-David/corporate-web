import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import ParagraphDescription from '../ParagraphDescription';
import { act } from "react-dom/test-utils";

function createProps(className: string, content: string) {
  return {
    dataList: {
      type: className,
      attributes: {
        field_text: {
          value: content
        }
      }
    },
    key: "keyValue"
  }
}

describe('ParagraphDescription Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps("paragraph-class-name", "Paragraph Content")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ParagraphDescription {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("paragraph-class-name");
    expect(wrapper!.html()).toContain("Paragraph Content");
  })
})
