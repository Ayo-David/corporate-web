import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import MobileBanking from '../MobileBanking';
import { act } from "react-dom/test-utils";

describe('MobileBanking Component', () => {
  it('should load properly', async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><MobileBanking /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toBeTruthy();
  })
})
