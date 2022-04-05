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

function createProps(id: string, type: string, smallerTxt: boolean) {
  return {
    dataList: {
      id
    },
    type,
    smallerTxt
  }
}

function createTrustedProvider(trustedProviderId: string, title: string, text: string, logos: any) {
  mockedDataSvc.getCurrentAccountsTrustedProviderLogoData.mockResolvedValueOnce({data: logos})
  return {
    data: {
      id: trustedProviderId,
      attributes: {
        title,
        body: {
          value: text
        }
      }
    }
  }
}

function createLogo(imageId: string, imageUrl: string) {
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

function initMockDataSvc(trustedProvider: any) {
  mockedDataSvc.getCurrentAccountsTrustedProviderData.mockResolvedValueOnce(trustedProvider)
}

describe('TrustedProvider Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const logos = [
      createLogo("logoId1", "logoUrl1.jpg"),
      createLogo("logoId2", "logoUrl2.jpg"),
    ]
    
    const trustedProvider = createTrustedProvider("tpId", "TP Title", "TP Text", logos)
    const props = createProps("tpcId", "randomType", true)
    initMockDataSvc(trustedProvider);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><TrustedProvider {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getCurrentAccountsTrustedProviderData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getCurrentAccountsTrustedProviderData.mock.calls[0][0]).toEqual('tpcId');
    expect(mockedDataSvc.getCurrentAccountsTrustedProviderLogoData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getCurrentAccountsTrustedProviderLogoData.mock.calls[0][0]).toEqual('tpId');
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('logoId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('logoId2');
    expect(wrapper!.html()).toContain("TP Title");
    expect(wrapper!.html()).toContain("TP Text");
    expect(wrapper!.html()).toContain("logoUrl1.jpg");
    expect(wrapper!.html()).toContain("logoUrl2.jpg");
    expect(wrapper!.find(`.smaller-txt`)).toHaveLength(1)
  })
  
  it('should support personal type', async () => {
    const logos = [
      createLogo("logoId1", "logoUrl1.jpg"),
      createLogo("logoId2", "logoUrl2.jpg"),
    ]
  
    const trustedProvider = createTrustedProvider("tpId", "TP Title", "TP Text", logos)
    const props = createProps("tpcId", "personal", true)
    initMockDataSvc(trustedProvider);
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><TrustedProvider {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.section-trusted-provider`).at(0).is(`.personal-trusted-provider`)).toBeTruthy();
    expect(wrapper!.find(`.smaller-txt`)).toHaveLength(1)
  })
  
  it('should support private-banking type', async () => {
    const logos = [
      createLogo("logoId1", "logoUrl1.jpg"),
      createLogo("logoId2", "logoUrl2.jpg"),
    ]
    
    const trustedProvider = createTrustedProvider("tpId", "TP Title", "TP Text", logos)
    const props = createProps("tpcId", "private-banking", true)
    initMockDataSvc(trustedProvider);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><TrustedProvider {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.section-trusted-provider`).at(0).is(`.private-banking-trusted-provider`)).toBeTruthy();
    expect(wrapper!.find(`.smaller-txt`)).toHaveLength(1)
  })
  
  it('should support smaller text', async () => {
    const logos = [
      createLogo("logoId1", "logoUrl1.jpg"),
      createLogo("logoId2", "logoUrl2.jpg"),
    ]
    
    const trustedProvider = createTrustedProvider("tpId", "TP Title", "TP Text", logos)
    const props = createProps("tpcId", "random", false)
    initMockDataSvc(trustedProvider);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><TrustedProvider {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.smaller-txt`)).toHaveLength(0)
  })
})
