import React from 'react';
import { mount } from 'enzyme';
import { AppContainer } from '../../../test/helper';
import HighligtedSection from '../HighligtedSection';
import { act } from "react-dom/test-utils";

function createProps(title: string, text: string, cards: any) {
  return {
    info: {
      data: {
        attributes: {
          field_title: title,
          field_text: {
            processed: text
          }
        }
      }
    },
    cards
  }
}

function createCard(iconClass: string, text: string) {
  return {
    attributes: {
      field_icon_class: iconClass,
      field_text: {
        processed: text
      }
    }
  }
}

describe('HighlightedSection Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the component properly', async () => {
    const cards = [
      createCard("cardClass1", "card text 1"),
      createCard("cardClass2", "card text 2"),
    ]
    
    const props = createProps("Highlighted Section Title", "Highlighted Section Text", {data: cards})
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><HighligtedSection {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("cardClass1");
    expect(wrapper!.html()).toContain("card text 1");
    expect(wrapper!.html()).toContain("cardClass2");
    expect(wrapper!.html()).toContain("card text 2");
  })
})
