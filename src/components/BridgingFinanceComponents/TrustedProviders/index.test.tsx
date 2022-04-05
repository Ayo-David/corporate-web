import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import TrustedProviders from '../TrustedProviders';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(dataList: any, propType: string = '', noMarginBottom: boolean = false) {
  return {
    dataList,
    type: propType,
    noMarginBottom
  }
}

function initMockDataSvc(contentUrl: string, content: any, providerItems: any) {
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: {
      relationships: {
        field_trusted_provider: {
          links: {
            related: {
              href: contentUrl
            }
          }
        }
      }
    }
  })
  mockedDataSvc.getData.mockResolvedValueOnce(content)
  mockedDataSvc.getData.mockResolvedValueOnce({
    data: providerItems
  })
}

function createContent(title: string) {
  const attributes: any = {}
  attributes.title = title
  
  const relationships: any = {}
  relationships.field_logo_link = {
    links: {
      related: {
        href: "http://fieldLogoLinkUrl.com"
      }
    }
  }
  
  return {
    data: {
      id: 'trustedProvidersContentId',
      attributes,
      relationships
    }
  }
}

function createItem(itemId: string, itemText: string, itemUrl: string) {
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: itemUrl
        }
      }
    }
  })
  return {
    attributes: {
      field_text: {
        value: itemText
      }
    },
    relationships: {
      field_media_logo: {
        data: {
          id: itemId
        }
      }
    }
  }
}

describe('HowToApply Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = getMockProps('tp');
    const providers = [
      createItem('item1', 'item text 1','providerImage1.jpg'),
      createItem('item2', 'item text 2','providerImage2.jpg'),
      createItem('item3', 'item text 3','providerImage3.jpg')
    ]
    
    initMockDataSvc("http://test.content.url",
      createContent("Trusted Providers Title"),
      providers)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<TrustedProviders {...props} />);
    })
    await new Promise(process.nextTick)
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Trusted Providers Title");
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(3);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('tp');
    expect(mockedDataSvc.getData.mock.calls[1][0]).toEqual('http://test.content.url');
    expect(mockedDataSvc.getData.mock.calls[2][0]).toEqual('http://fieldLogoLinkUrl.com');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(3);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('item1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('item2');
    expect(mockedDataSvc.getImage.mock.calls[2][0]).toEqual('item3');
    expect(wrapper!.html()).toContain("item text 1");
    expect(wrapper!.html()).toContain("item text 2");
    expect(wrapper!.html()).toContain("item text 3");
    expect(wrapper!.html()).toContain("providerImage1.jpg");
    expect(wrapper!.html()).toContain("providerImage2.jpg");
    expect(wrapper!.html()).toContain("providerImage3.jpg");
    // expect(wrapper!.html()).toContain('testFieldHeading');
  })
  
  it('should load properly if no margin is provided', async () => {
    const props = getMockProps('tp', 'trusted-providers-style', true);
    const providers = [
      createItem('item1', 'item text 1','providerImage1.jpg'),
      createItem('item2', 'item text 2','providerImage2.jpg'),
      createItem('item3', 'item text 3','providerImage3.jpg')
    ]
    
    initMockDataSvc("http://test.content.url",
      createContent("Trusted Providers Title"),
      providers)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<TrustedProviders {...props} />);
    })
    await new Promise(process.nextTick)
    await wrapper!.update();
    expect(wrapper!.html()).toContain('trusted-providers-style');
    expect(wrapper!.html()).toContain('no-margin-bottom');
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = getMockProps(null);
  
    initMockDataSvc("http://test.content.url",
      createContent("Trusted Providers Title"),
      [])
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<TrustedProviders {...props} />);
    })
    
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
