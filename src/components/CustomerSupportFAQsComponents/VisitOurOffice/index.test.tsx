import React from 'react';
import { AppContainer } from '../../../test/helper';
import { mount } from 'enzyme';
import { VisitOurOffice } from './index';
import { act } from "react-dom/test-utils";

function createProps(listUrl: string, mapAddress: string, mapUri: string, mapTitle: string) {
  return {
    dataList: {
      data: {
        attributes: {
          uri: {
            url: listUrl
          },
        }
      }
    },
    dataMap: {
      data: {
        attributes: {
          field_url: {
            uri: mapUri,
            title: mapTitle
          },
          field_address: {
            value: mapAddress
          }
        }
      }
    }
  }
}

describe('VisitOurOffice Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps("listUrl", "Office Address", "mapUri", "Map Title")
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><VisitOurOffice {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("listUrl");
    expect(wrapper!.html()).toContain("Office Address");
    expect(wrapper!.html()).toContain("mapUri");
    expect(wrapper!.html()).toContain("Map Title");
  })
})
