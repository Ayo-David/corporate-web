import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import TrustedProvider from '../TrustedProvider';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createImage(imageId: string, imageUrl: string) {
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
    relationships: {
      field_media_logo: {
        data: {
          id: imageId
        }
      }
    }
  }
}

function createProps(description: string, fieldLogoLink: string) {
  return {
    dataList: {
      data: {
        relationships: {
          field_logo_link: {
            links: {
              related: {
                href: fieldLogoLink
              }
            }
          }
        },
        attributes: {
          body: {
            processed: description
          }
        }
      }
    }
  }
}

function initMockDataSvc(images: any) {
  mockedDataSvc.getData.mockResolvedValue({data: images})
}

describe('Trusted Provider Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const images = [
      createImage("tpImageId1", "trustedProviderImage1.jpg"),
      createImage("tpImageId2", "trustedProviderImage2.jpg")
    ]
    initMockDataSvc(images);
    const props = createProps("Trusted Provider Description", "http://trustedProviderBaseLink.com/images")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><TrustedProvider {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getData.mock.calls[0][0]).toEqual('/images');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('tpImageId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('tpImageId2');
    expect(wrapper!.html()).toContain("trustedProviderImage1.jpg");
    expect(wrapper!.html()).toContain("trustedProviderImage2.jpg");
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = {dataList: null}
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<TrustedProvider {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
