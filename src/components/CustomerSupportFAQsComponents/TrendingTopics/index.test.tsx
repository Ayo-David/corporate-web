import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { AppContainer } from '../../../test/helper';
import TrendingTopics from "../TrendingTopics";
import React from "react";

describe('TrendingTopics Component', () => {
  it('should load properly', async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<AppContainer><TrendingTopics /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper).toBeTruthy()
  })
})
