import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import OurCustomerPromises from '../OurCustomerPromises';
import { act } from "react-dom/test-utils";

function createCard(title: string, description: string) {
  return {
    attributes: {
      field_title: title,
      field_description: description
    }
  }
}

function createProps(cards: any) {
  return {
    dataList: {
      data: cards,
      included: [],
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

describe('OurCustomerPromises Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const cards = [
      createCard("Title 1", "Desc 1"),
      createCard("Title 2", "Desc 2"),
      createCard("Title 3", "Desc 3"),
      createCard("Title 4", "Desc 4"),
    ]
    const props = createProps(cards)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><OurCustomerPromises {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Title 1");
    expect(wrapper!.html()).toContain("Title 2");
    expect(wrapper!.html()).toContain("Title 3");
    expect(wrapper!.html()).toContain("Title 4");
    expect(wrapper!.html()).toContain("Desc 1");
    expect(wrapper!.html()).toContain("Desc 2");
    expect(wrapper!.html()).toContain("Desc 3");
    expect(wrapper!.html()).toContain("Desc 4");
    expect(wrapper!.find(`i.icons`).at(0).is(`.icon-one`)).toBeTruthy();
    expect(wrapper!.find(`i.icons`).at(1).is(`.icon-two`)).toBeTruthy();
    expect(wrapper!.find(`i.icons`).at(2).is(`.icon-three`)).toBeTruthy();
    expect(wrapper!.find(`i.icons`).at(3).is(`.icon-one`)).toBeFalsy();
    expect(wrapper!.find(`i.icons`).at(3).is(`.icon-two`)).toBeFalsy();
    expect(wrapper!.find(`i.icons`).at(3).is(`.icon-three`)).toBeFalsy();
  })
})
