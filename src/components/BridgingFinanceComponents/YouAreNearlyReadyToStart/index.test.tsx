import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import YouAreNearlyReadyToStart from '../YouAreNearlyReadyToStart';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(dataList: any) {
  return {
    dataList
  }
}

function createContent(fieldText: string, backgroundColor: string, fieldLinkUri: any = null, fieldLinkTitle: any = null) {
  const attributes: any = {}
  attributes.field_background_color = backgroundColor
  attributes.field_text = {
    processed: fieldText
  }
  if (fieldLinkUri && fieldLinkTitle) {
    attributes.field_link = {
      uri: fieldLinkUri,
      title: fieldLinkTitle
    }
  }
  return {
    data: {
      id: 'youAreNearlyReadyToStartContentId',
      attributes,
    }
  }
}

function initMockDataSvc(content: any) {
  mockedDataSvc.getData.mockResolvedValue(content)
}
describe('YouAreNearlyReadyToStart Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = getMockProps('yanrts');
    initMockDataSvc(createContent("<b>Field Text</b>", "magenta"))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<YouAreNearlyReadyToStart {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('yanrts');
    expect(wrapper!.html()).toContain("Field Text");
    expect(wrapper!.html()).toContain("magenta");
  })
  
  it('should load properly with a field image', async () => {
    const props = getMockProps('yanrts');
    initMockDataSvc(createContent("<b>Field Text</b>", "magenta", "fieldlinkuri.com", "YANRTS Field Link Title"))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<YouAreNearlyReadyToStart {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Field Text");
    expect(wrapper!.html()).toContain("magenta");
    expect(wrapper!.html()).toContain("fieldlinkuri.com");
    expect(wrapper!.html()).toContain("YANRTS Field Link Title");
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = getMockProps(null);
    initMockDataSvc(createContent("<b>Field Text</b>", "magenta"))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<YouAreNearlyReadyToStart {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
