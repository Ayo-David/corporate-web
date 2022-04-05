import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import EligibilityCriteria from '../EligibilityCriteria';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(dataList: any, isShowRightImage: boolean = false) {
  return {
    isShowRightImage,
    dataList
  }
}

function createContent(fieldImage: number, useFieldCriteria: number, useFieldHeading: boolean, useSingleLink: boolean = false) {
  const attributes: any = {}
  if (useFieldCriteria === 1) {
    attributes.field_criteria = {
      processed: "<b>Field Criteria Text</b>"
    }
  } else if (useFieldCriteria === 0) {
    attributes.field_text = {
      processed: "<b>Field Text</b>"
    }
  }
  
  if (useFieldHeading) {
    attributes.field_heading = "Field Heading"
  } else {
    attributes.field_title = "Field Title"
  }
  const imageData: any = {
    data: {
      id: `mockFieldImageId${fieldImage}`
    }
  }
  
  if (useSingleLink) {
    attributes.field_single_link = {
      uri: "fieldsinglelinkuri",
      title: "fieldsinglelinktitle"
    }
  }
  const relationships: any = {}
  if (fieldImage === 2) {
    relationships.field_image2 = imageData
  } else if (fieldImage === 3) {
    relationships.field_image3 = imageData
  }
  
  return {
    data: {
      id: 'eligibilityCriteriaContentId',
      attributes,
      relationships
    }
  }
}

function initMockDataSvc(content: any) {
  mockedDataSvc.getData.mockResolvedValue(content)
  
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: "mockImage.jpg"
        }
      }
    }
  })
}

describe('EligibilityCriteria Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load field image 2 properly', async () => {
    const props = getMockProps('fa2');
    initMockDataSvc(createContent(2, 0, false))
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toBe('mockFieldImageId2')
    expect(wrapper!.html()).toContain('https://cms.dev.cynfusion.net/mockImage.jpg');
  })
  
  it('should load field image 3 properly', async() => {
    const props = getMockProps('fa3');
    initMockDataSvc(createContent(3, 0, false))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toBe('mockFieldImageId3')
    expect(wrapper!.html()).toContain('https://cms.dev.cynfusion.net/mockImage.jpg');
    // expect(wrapper!.html()).toMatchSnapshot();
  })
  
  it('should load field text properly', async() => {
    const props = getMockProps('fieldText');
    initMockDataSvc(createContent(2, 0, false))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Field Text');
  })
  
  it('should load field criteria properly', async() => {
    const props = getMockProps('fieldCrit');
    initMockDataSvc(createContent(3, 1, false))
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Field Criteria Text');
  })
  
  it('should load field heading properly', async() => {
    const props = getMockProps('fieldHeading');
    initMockDataSvc(createContent(3, 1, true))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Field Heading');
  })
  
  it('should load field title properly', async() => {
    const props = getMockProps('fieldTitle');
    initMockDataSvc(createContent(3, 1, false))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Field Title');
  })
  
  it('should support showing the right image', async() => {
    const props = getMockProps('rightImage', true);
    initMockDataSvc(createContent(3, 1, false))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('right-img');
    expect(wrapper!.html()).toContain('https://cms.dev.cynfusion.net/mockImage.jpg');
  })
  
  it('should show the single link properly', async() => {
    const props = getMockProps('singleLink');
    initMockDataSvc(createContent(3, 1, false, true))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("fieldsinglelinkuri")
    expect(wrapper!.html()).toContain("fieldsinglelinktitle")
  })
  
  it('should handle no field criteria or text gracefully', async() => {
    const props = getMockProps('noFieldCritOrText');
    initMockDataSvc(createContent(3, 2, false, true))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = getMockProps(null);
    initMockDataSvc(createContent(3, 2, false, true))
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<EligibilityCriteria {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
