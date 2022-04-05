import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import NotWhatYouAreLookingFor from '../NotWhatYouAreLookingFor';
import { act } from "react-dom/test-utils";

describe('NotWhatYouAreLookingFor Component', () => {
  it('should load properly', async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><NotWhatYouAreLookingFor /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toBeTruthy();
    wrapper!.find(`.btn-search`).simulate('click');
    await wrapper!.update();
  })
})
