import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import HowToApply from '../HowToApply';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(dataList: any) {
  return {
    dataList
  }
}

function createContent(fieldHeading: string, links: string[]) {
  const attributes: any = {}
  attributes.field_heading = fieldHeading
  const relationships: any = {}
  relationships.field_text_with_link = {
    data: links
  }
  
  return {
    data: {
      id: 'howToApplyContentId',
      attributes,
      relationships
    }
  }
}

function initMockDataSvc(content: any) {
  mockedDataSvc.getData.mockResolvedValue(content)
}

describe('HowToApply Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = getMockProps('hta');
    initMockDataSvc(createContent("testFieldHeading", ["link1", "link2", "link3", "link4"]))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<HowToApply {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('testFieldHeading');
    expect(wrapper!.html()).toContain('Apply Online');
    expect(wrapper!.html()).toContain('Sign and Submit');
    expect(wrapper!.html()).toContain('Receive Funds');
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = getMockProps(null);
    initMockDataSvc(createContent("testFieldHeading", ["link1", "link2", "link3", "link4"]))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<HowToApply {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
