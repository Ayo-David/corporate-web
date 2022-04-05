import React from 'react';
import dataSvc from '../../services/dataSvc';
import { AppContainer } from '../../test/helper';
import '../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CardWithImageLink from '../CardWithImageLink';
import { act } from "react-dom/test-utils";

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(dataId: any, classContainer: string, showRightImage: boolean) {
  return {
    dataList: dataId,
    classNameContainer: classContainer,
    isShowRightImage: showRightImage
  }
}

function initDataSvc(imageUrl: string, content: any) {
  const imageValue = {
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  }
  mockedDataSvc.getImage.mockResolvedValue(imageValue)
  mockedDataSvc.getImage3.mockResolvedValue(imageValue)
  mockedDataSvc.getData.mockResolvedValue(content)
}

function createContent(imageId: string, useFieldImage3: boolean, fieldTitle: any, fieldText: string, linkValue: string, linkTitle: string,
                       useFieldTitles: boolean = false) {
  const attributes: any = {}
  if (fieldTitle) {
    if (useFieldTitles) {
      attributes.field_titles = fieldTitle
    } else {
      attributes.field_title = fieldTitle
    }
  }
  
  attributes.field_text = {
    processed: fieldText
  }
  attributes.field_single_link = {
    uri: linkValue,
    title: linkTitle
  }
  const relationships: any = {}
  
  const imageData = {
    data: {
      id: imageId
    }
  }
  if (useFieldImage3) {
    relationships.field_image3 = imageData
  } else {
    relationships.field_images = imageData
  }
  return {
    data: {
      attributes,
      relationships
    }
  }
}

describe('Card With Image Link Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const content = createContent("imageId1", false, "CardWImage Field Title", "CardWImage Field Text",
      "/CWIlink", "CWITitle")
    initDataSvc("cardWithImage.jpg", content);
    const props = createProps("cardWithImagePropId", "ciw-container-class", false)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CardWithImageLink {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('cardWithImagePropId');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('imageId1');
    expect(wrapper!.html()).toContain("CardWImage Field Title");
    expect(wrapper!.html()).toContain("CardWImage Field Text");
    expect(wrapper!.html()).toContain("ciw-container-class");
    expect(wrapper!.find(`.card-img`).is(`.left-img`)).toBeTruthy();
  })
  
  it('should load field image3 properly', async () => {
    const content = createContent("imageId2", true, "CardWImage Field Title", "CardWImage Field Text",
      "/CWIlink", "CWITitle")
    initDataSvc("cardWithImage2.jpg", content);
    const props = createProps("cardWithImagePropId2", "ciw-container-class", false)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CardWithImageLink {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('cardWithImagePropId2');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('imageId2');
  })
  
  it('should use showRightImage props', async () => {
    const content = createContent("imageId1", false, "CardWImage Field Title", "CardWImage Field Text",
      "/CWIlink", "CWITitle")
    initDataSvc("cardWithImage.jpg", content);
    const props = createProps("cardWithImagePropId", "ciw-container-class", true)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CardWithImageLink {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.card-img`).is(`.right-img`)).toBeTruthy();
  })
  
  it('should use show field titles', async () => {
    const content = createContent("imageId1", false, "CardWImage Field Title", "CardWImage Field Text",
      "/CWIlink", "CWITitle", true)
    initDataSvc("cardWithImage.jpg", content);
    const props = createProps("cardWithImagePropId", "ciw-container-class", false)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CardWithImageLink {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("CardWImage Field Title");
    expect(wrapper!.html()).toContain("CardWImage Field Text");
    expect(wrapper!.html()).toContain("ciw-container-class");
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const content = createContent("imageId1", false, "CardWImage Field Title", "CardWImage Field Text",
      "/CWIlink", "CWITitle")
    initDataSvc("cardWithImage.jpg", content);
    const props = createProps(null, "ciw-container-class", false)
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CardWithImageLink {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
