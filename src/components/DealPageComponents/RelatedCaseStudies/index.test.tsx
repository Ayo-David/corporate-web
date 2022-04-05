import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import RelatedCaseStudies from '../RelatedCaseStudies';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createCaseStudy(id: string, heading: string, imageId: string, imageUrl: string) {
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
  
  return {
    id,
    attributes: {
      field_heading: {
        value: heading
      }
    },
    relationships: {
      field_banner_image: {
        data: {
          id: imageId
        }
      }
    }
  }
}

describe('RelatedCaseStudies Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    
    const studies = [
      createCaseStudy("caseId1", "Case Heading 1", "cimageId1", "cimage1.jpg"),
      createCaseStudy("caseId2", "Case Heading 2", "cimageId2", "cimage2.jpg"),
      createCaseStudy("caseId3", "Case Heading 3", "cimageId3", "cimage3.jpg"),
      createCaseStudy("caseId4", "Case Heading 4", "cimageId4", "cimage4.jpg"),
    ]
    
    const props = {
      dataList: studies
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><RelatedCaseStudies {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(4);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('cimageId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('cimageId2');
    expect(mockedDataSvc.getImage.mock.calls[2][0]).toEqual('cimageId3');
    expect(mockedDataSvc.getImage.mock.calls[3][0]).toEqual('cimageId4');
    
    expect(wrapper!.html()).toContain("/deal-sheets/caseId1")
    expect(wrapper!.html()).toContain("/deal-sheets/caseId2")
    expect(wrapper!.html()).toContain("/deal-sheets/caseId3")
    expect(wrapper!.html()).toContain("/deal-sheets/caseId4")
    expect(wrapper!.html()).toContain("Case Heading 1")
    expect(wrapper!.html()).toContain("Case Heading 2")
    expect(wrapper!.html()).toContain("Case Heading 3")
    expect(wrapper!.html()).toContain("Case Heading 4")
    expect(wrapper!.html()).toContain("cimage1.jpg")
    expect(wrapper!.html()).toContain("cimage2.jpg")
    expect(wrapper!.html()).toContain("cimage3.jpg")
    expect(wrapper!.html()).toContain("cimage4.jpg")
    expect(wrapper!.find(`.deal-title`).at(0).is(`.even`)).toBeTruthy()
    expect(wrapper!.find(`.deal-title`).at(1).is(`.odd`)).toBeTruthy()
    expect(wrapper!.find(`.deal-title`).at(2).is(`.even`)).toBeTruthy()
    expect(wrapper!.find(`.deal-title`).at(3).is(`.odd`)).toBeTruthy()
  })
})
