import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import EligibilityCriteria from '../EligibilityCriteria';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createContent(id: any, heading: any, criteria: string, link: any, linkTitle: string) {
  const attributes: any = {}
  if (heading) {
    attributes.field_heading = heading
  }
  if (link) {
    attributes.field_single_link = {
      uri: link,
      title: linkTitle
    }
  }
  attributes.field_criteria = {
    value: criteria
  }
  
  return {
    id,
    attributes
  }
}

function createProps(content: any, position: string, isFisrt: boolean, className: string, sectionRef: any = null) {
  return {
    dataList: content,
    position,
    isFisrt,
    className,
    sectionRef
  }
}

function initMockDataSvc(imageId: string, imageUrl: string) {
  mockedDataSvc.getImageEligibilityCriteria.mockResolvedValueOnce({
    data: {
      id: imageId
    }
  })
  
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
}

describe('Eligibility Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const content = createContent("EligibilityCriteriaId", "ECHeading", "EC Criteria",
      "http://eclink", "EC Link Title")
    const props = createProps(content, "left", true, "ecClass")
    initMockDataSvc("ecImageId", "ecImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><EligibilityCriteria {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImageEligibilityCriteria.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImageEligibilityCriteria.mock.calls[0][0]).toEqual('EligibilityCriteriaId');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('ecImageId');
    expect(wrapper!.html()).toContain("ECHeading");
    expect(wrapper!.html()).toContain("EC Criteria");
    expect(wrapper!.html()).toContain("eclink");
    expect(wrapper!.html()).toContain("EC Link Title");
    expect(wrapper!.html()).toContain("ecClass");
    expect(wrapper!.html()).toContain("ecImageUrl");
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
  })
  
  it('should load with right position', async () => {
    const content = createContent("EligibilityCriteriaId", "ECHeading", "EC Criteria",
      "/eclink", "EC Link Title")
    const props = createProps(content, "right", true, "ecClass")
    initMockDataSvc("ecImageId", "ecImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><EligibilityCriteria {...props} /></AppContainer>);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
    
  })
  
  it('should load with not first', async () => {
    const content = createContent("EligibilityCriteriaId", "ECHeading", "EC Criteria",
      "/eclink", "EC Link Title")
    const props = createProps(content, "left", false, "ecClass")
    initMockDataSvc("ecImageId", "ecImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><EligibilityCriteria {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
  
  it('should load with right not first', async () => {
    const content = createContent("EligibilityCriteriaId", "ECHeading", "EC Criteria",
      "/eclink", "EC Link Title")
    const props = createProps(content, "right", false, "ecClass")
    initMockDataSvc("ecImageId", "ecImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><EligibilityCriteria {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
})
