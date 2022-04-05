import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ImageWithLongText from '../ImageWithLongText';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(content: any, position: string, isFisrt: boolean, className: string,
                     imgType: string, sectionRef: any = null) {
  return {
    dataList: content,
    position,
    isFisrt,
    className,
    type: imgType,
    sectionRef
  }
}

function createContent(contentId: string, title: any, text: string, linkUri: any, linkTitle: string) {
  const attributes: any = {}
  if (title) {
    attributes.field_titles = title
  }
  attributes.field_text = {
    value: text
  }
  if (linkUri) {
    attributes.field_single_link = {
      uri: linkUri,
      title: linkTitle
    }
  }
  return {
    id: contentId,
    attributes
  }
}

function initMockDataSvc(imageId: string, imageUrl: string) {
  mockedDataSvc.getImageWithLongText.mockResolvedValueOnce({
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

describe('ImageWithLongText Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const content = createContent("IWLTId", "IWLT Title", "IWLT Text",
      "http:/iwltlink", "IWLT Link Title")
    const props = createProps(content, "left", true, "iwltClass", "notAboutUs")
    initMockDataSvc("iwltImageId", "iwltImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ImageWithLongText {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImageWithLongText.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImageWithLongText.mock.calls[0][0]).toEqual('IWLTId');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('iwltImageId');
    expect(wrapper!.html()).toContain("IWLT Title")
    expect(wrapper!.html()).toContain("IWLT Text")
    expect(wrapper!.html()).toContain("iwltClass")
    expect(wrapper!.html()).toContain("iwltlink")
    expect(wrapper!.html()).toContain("IWLT Link Title")
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
  })
  
  it('should support right position', async () => {
    const content = createContent("IWLTId", "IWLT Title", "IWLT Text",
      "http:/iwltlink", "IWLT Link Title")
    const props = createProps(content, "right", true, "iwltClass", "notAboutUs")
    initMockDataSvc("iwltImageId", "iwltImageUrl");
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ImageWithLongText {...props} /></AppContainer>);
    })
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
  })
  
  it('should support not isFirst', async () => {
    const content = createContent("IWLTId", "IWLT Title", "IWLT Text",
      "http:/iwltlink", "IWLT Link Title")
    const props = createProps(content, "left", false, "iwltClass", "notAboutUs")
    initMockDataSvc("iwltImageId", "iwltImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ImageWithLongText {...props} /></AppContainer>);
    })
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
  
  it('should support right position and not isFirst', async () => {
    const content = createContent("IWLTId", "IWLT Title", "IWLT Text",
      "http:/iwltlink", "IWLT Link Title")
    const props = createProps(content, "right", false, "iwltClass", "notAboutUs")
    initMockDataSvc("iwltImageId", "iwltImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ImageWithLongText {...props} /></AppContainer>);
    })
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
  
  it('should support aboutUs', async () => {
    const content = createContent("IWLTId", "IWLT Title", "IWLT Text",
      "http:/iwltlink", "IWLT Link Title")
    const props = createProps(content, "right", true, "iwltClass", "aboutUs")
    initMockDataSvc("iwltImageId", "iwltImageUrl");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ImageWithLongText {...props} /></AppContainer>);
    })
    expect(wrapper!.find(`.section-image-with-long-text`).at(0).is(`.about-us-products`)).toBeTruthy();
  })
})
