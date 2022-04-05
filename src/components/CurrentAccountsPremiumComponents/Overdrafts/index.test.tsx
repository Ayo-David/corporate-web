import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import Overdrafts from '../Overdrafts';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(content: any, position: string, isFisrt: boolean, className: string) {
  return {
    dataList: content,
    position,
    isFisrt,
    className
  }
}

function createContent(contentId: string, title: any, text: string, linkUri: any, linkTitle: string) {
  const attributes: any = {}
  if (title) {
    attributes.field_title = title
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

function initMockDataSvc(id: string, imageUrl: string, faqTitle: string, faqText: string) {
  mockedDataSvc.getImageDescriptionWithFaq.mockResolvedValue({
    data: {
      id,
      attributes: {
        field_title: faqTitle,
        field_text: {
          value: faqText
        }
      }
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

describe('Overdrafts Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const content = createContent("odContentId", "Overdraft Title", "Overdraft Text",
      "http:/odlink", "Overdraft Link Title")
    const props = createProps(content, "left", true,"notAboutUs")
    initMockDataSvc("odDataId", "odImageUrl", "Overdraft FAQ Title", "Overdraft FAQ Text");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Overdrafts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImageDescriptionWithFaq.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImageDescriptionWithFaq.mock.calls[0][0]).toEqual('odContentId');
    expect(mockedDataSvc.getImageDescriptionWithFaq.mock.calls[1][0]).toEqual('odContentId');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('odDataId');
    expect(wrapper!.html()).toContain("Overdraft Title")
    expect(wrapper!.html()).toContain("Overdraft Text")
    expect(wrapper!.html()).toContain("notAboutUs")
    expect(wrapper!.html()).toContain("odImageUrl")
    expect(wrapper!.html()).toContain("odlink")
    expect(wrapper!.html()).toContain("Overdraft Link Title")
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
  })
  
  it('should support right position', async () => {
    const content = createContent("odContentId", "Overdraft Title", "Overdraft Text",
      "http:/odlink", "Overdraft Link Title")
    const props = createProps(content, "right", true, "notAboutUs")
    initMockDataSvc("odDataId", "odImageUrl", "Overdraft FAQ Title", "Overdraft FAQ Text");
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Overdrafts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeTruthy();
  })
  
  it('should support not is first', async () => {
    const content = createContent("odContentId", "Overdraft Title", "Overdraft Text",
      "http:/odlink", "Overdraft Link Title")
    const props = createProps(content, "left", false, "notAboutUs")
    initMockDataSvc("odDataId", "odImageUrl", "Overdraft FAQ Title", "Overdraft FAQ Text");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Overdrafts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).children(`div`).at(0).is(`.lefts`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
  
  it('should support right position and not is first', async () => {
    const content = createContent("odContentId", "Overdraft Title", "Overdraft Text",
      "http:/odlink", "Overdraft Link Title")
    const props = createProps(content, "right", false, "notAboutUs")
    initMockDataSvc("odDataId", "odImageUrl", "Overdraft FAQ Title", "Overdraft FAQ Text");
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Overdrafts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-left`)).toBeFalsy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-right`)).toBeTruthy();
    expect(wrapper!.find(`main`).at(0).children(`div`).at(0).is(`.is-first`)).toBeFalsy();
  })
})
