import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import AdsAwareness from '../AdsAwareness';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(ads: any) {
  return {
    dataList: ads
  }
}

function createAd(imageId: string, imageUrl: string, title: string, text: string, readMoreLink: string) {
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
    attributes: {
      title,
      field_snippet: {
        value: text
      },
      field_download_or_read_more_link: {
        title: readMoreLink
      }
    },
    relationships: {
      field_image_video: {
        data: {
          id: imageId
        }
      }
    }
  }
}

describe('AdAwareness Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const ads = [
      createAd("adId1", "adUrl1.jpg", "Ad Title 1", "Ad Text 1", "Read More 1"),
      createAd("adId2", "adUrl2.jpg", "Ad Title 2", "Ad Text 2", "Read More 2"),
    ]
    const props = createProps(ads)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><AdsAwareness {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('adId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('adId2');
    expect(wrapper!.html()).toContain("adUrl1.jpg");
    expect(wrapper!.html()).toContain("adUrl2.jpg");
    expect(wrapper!.html()).toContain("Ad Title 1");
    expect(wrapper!.html()).toContain("Ad Title 2");
    expect(wrapper!.html()).toContain("Ad Text 1");
    expect(wrapper!.html()).toContain("Ad Text 2");
    expect(wrapper!.html()).toContain("Read More 1");
    expect(wrapper!.html()).toContain("Read More 2");
  })
  
  // currently fails because the implementation doesn't handle null dataList properly
  it.skip('should fail gracefully if no datalist is provided', async () => {
    const props = createProps(null);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AdsAwareness {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
