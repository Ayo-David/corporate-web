import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import ParagraphTitleDescription from '../ParagraphTitleDescription';
import { act } from "react-dom/test-utils";

function createProps(className: string, title: string, content: string) {
  return {
    dataList: {
      type: className,
      attributes: {
        field_title: title,
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
    const props = createProps("paragrapht-class-name", "Paragrapht Title", "ParagraphT Content")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ParagraphTitleDescription {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("paragrapht-class-name");
    expect(wrapper!.html()).toContain("Paragrapht Title");
    expect(wrapper!.html()).toContain("ParagraphT Content");
  })
})
