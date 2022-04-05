import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import Benefits from '../Benefits';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(data: any) {
  return {
    data: {
      data
    }
  }
}

function createImageParagraph(imageId: string, imageUrl: string, fieldTitles: string, fieldText: string) {
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
  
  const attributes = {
    field_titles: fieldTitles,
    field_text: {
      processed: fieldText
    }
  }
  
  return {
    type: 'paragraph--image_with_long_text',
    attributes,
    relationships: {
      field_images: {
        data: {
          id: imageId
        }
      }
    }
  }
}

function createCardsParagraph(cardLink: string, fieldHeading: string, readyToJoin: any[]) {
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: readyToJoin
  })
  
  return {
    type: 'paragraph--cards_with_link_text',
    attributes: {
      field_heading: fieldHeading
    },
    relationships: {
      field_text_with_link: {
        links: {
          related: {
            href: cardLink
          }
        }
      }
    }
  }
}

function createReadyToJoin(description: string, title: string) {
  return {
    attributes: {
      field_description: description,
      field_single_link: {
        title
      }
    }
  }
}

describe('Benefits Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const readyToJoin = [
      createReadyToJoin("Ready to Join Desc D1R1", "RTJ Title D1R1"),
      createReadyToJoin("Ready to Join Desc D1R2", "RTJ Title D1R2"),
    ]
    const data = [
      createCardsParagraph("http://cardlink.com/D1R1", "Card Heading 1", readyToJoin)
    ]
    const props = getMockProps(data);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Benefits {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('/D1R1');
    expect(wrapper!.html()).toContain("Card Heading 1");
    expect(wrapper!.html()).toContain("Ready to Join Desc D1R1");
    expect(wrapper!.html()).toContain("RTJ Title D1R1");
    expect(wrapper!.html()).toContain("Ready to Join Desc D1R2");
    expect(wrapper!.html()).toContain("RTJ Title D1R2");
  })
  
  it('should load image paragraph properly', async () => {
    const data = [
      createImageParagraph("imagePar1", "imageBenefits1.jpg", "Image Title 1", "Image Text 1")
    ]
    const props = getMockProps(data);
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Benefits {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('imagePar1');
    expect(wrapper!.html()).toContain("imageBenefits1.jpg");
    expect(wrapper!.html()).toContain("Image Title 1");
    expect(wrapper!.html()).toContain("Image Text 1");
  })
  
  it('should load mixed content properly', async () => {
    const readyToJoin = [
      createReadyToJoin("Ready to Join Desc D1R1", "RTJ Title D1R1"),
      createReadyToJoin("Ready to Join Desc D1R2", "RTJ Title D1R2"),
    ]
    const data = [
      createCardsParagraph("http://cardlink.com/D1R1", "Card Heading 1", readyToJoin),
      createImageParagraph("imagePar1", "imageBenefits1.jpg", "Image Title 1", "Image Text 1"),
      createImageParagraph("imagePar2", "imageBenefits2.jpg", "Image Title 2", "Image Text 2"),
    ]
    const props = getMockProps(data);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Benefits {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('imagePar1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('imagePar2');
    expect(wrapper!.html()).toContain("imageBenefits1.jpg");
    expect(wrapper!.html()).toContain("Image Title 1");
    expect(wrapper!.html()).toContain("Image Text 1");
    expect(wrapper!.html()).toContain("imageBenefits2.jpg");
    expect(wrapper!.html()).toContain("Image Title 2");
    expect(wrapper!.html()).toContain("Image Text 2");
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('/D1R1');
    expect(wrapper!.html()).toContain("Card Heading 1");
    expect(wrapper!.html()).toContain("Ready to Join Desc D1R1");
    expect(wrapper!.html()).toContain("RTJ Title D1R1");
    expect(wrapper!.html()).toContain("Ready to Join Desc D1R2");
    expect(wrapper!.html()).toContain("RTJ Title D1R2");
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = {data: null}
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<Benefits {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
