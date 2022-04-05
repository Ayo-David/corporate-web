import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import SectionTitle from '../SectionTitle';
import { act } from "react-dom/test-utils";

describe('SectionTitle Component', () => {
  it('should load properly', async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><SectionTitle /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toBeTruthy();
  })
})
