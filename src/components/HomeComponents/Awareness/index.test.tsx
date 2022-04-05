import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import Awareness from '../Awareness';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(dataList: any) {
  return {
    dataList
  }
}

function createItem(title: string, content: string, imgId: string, imgUrl: string) {
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
    data: {
      attributes: {
        title,
        field_snippet: {
          value: content
        },
        field_download_or_read_more_link: {
          uri: 'https://www.google.com:8080'
        }
      },
      relationships: {
        field_image_video: {
          data: {
            id: imgId
          }
        }
      }
    }
  }
}

describe('Awareness Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const items = [
      createItem("Awareness Title 1", "Awareness Content 1", "aimgId1", "aimgId1.jpg"),
      createItem("Awareness Title 2", "Awareness Content 2", "aimgId2", "aimgId2.jpg")
    ]
    const props = getMockProps(items);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<Awareness {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('aimgId1');
    expect(mockedDataSvc.getImage.mock.calls[1][0]).toEqual('aimgId2');
    expect(wrapper!.html()).toContain("Awareness Title 1");
    expect(wrapper!.html()).toContain("Awareness Title 2");
    expect(wrapper!.html()).toContain("Awareness Content 1");
    expect(wrapper!.html()).toContain("Awareness Content 2");
    expect(wrapper!.html()).toContain("aimgId1.jpg");
    expect(wrapper!.html()).toContain("aimgId2.jpg");
  })
  
  it.skip('should fail gracefully if no datalist is provided', async () => {
    const props = getMockProps(null);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<Awareness {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
