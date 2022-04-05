import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import WeAreATrustedProvider from '../WeAreATrustedProvider';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(providers: any) {
  return {
    dataList: {
      data: providers
    }
  }
}

function createProvider(imgId: string, imgUrl: string) {
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: imgUrl
        }
      }
    }
  })
  
  return {
    relationships: {
      field_media_logo: {
        data: {
          id: imgId
        }
      }
    }
  }
}

describe('WeAreATrustedProvider Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const providers = [
      createProvider("providerImgId1", "providerUrl1.jpg"),
      createProvider("providerImgId2", "providerUrl2.jpg")
    ]
    const props = getMockProps(providers);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<WeAreATrustedProvider {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('providerImgId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('providerImgId2');
    expect(wrapper!.html()).toContain("providerUrl1.jpg");
    expect(wrapper!.html()).toContain("providerUrl2.jpg");
  })
})
