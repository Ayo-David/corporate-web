import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import ParagraphTitleMultipleTextArea from '../ParagraphTitleMultipleTextArea';
import { act } from "react-dom/test-utils";

function createProps(className: string, title: string, content: string[]) {
  return {
    dataList: {
      type: className,
      attributes: {
        field_title: title,
        field_descriptions: content
      }
    },
    key: "keyvalue"
  }
}

describe('ParagraphTitleDescription Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const content = [
      "Content 1",
      "Content 2",
      "Content 3",
      "Content 4"
    ]
    const props = createProps("paragraphmta-class-name", "Paragraphmta Title", content)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ParagraphTitleMultipleTextArea {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("paragraphmta-class-name");
    expect(wrapper!.html()).toContain("Paragraphmta Title");
    expect(wrapper!.find(`.text-area`).at(0).is(`.even`)).toBeTruthy()
    expect(wrapper!.find(`.text-area`).at(1).is(`.odd`)).toBeTruthy()
    expect(wrapper!.find(`.text-area`).at(2).is(`.even`)).toBeTruthy()
    expect(wrapper!.find(`.text-area`).at(3).is(`.odd`)).toBeTruthy()
    
  })
})
