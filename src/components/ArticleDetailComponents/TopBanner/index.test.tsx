import React from 'react';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import TopBanner from '../TopBanner';
import { act } from "react-dom/test-utils";
import dataSvc from "../../../services/dataSvc";


jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function initMockDataSvc(imageUrl: string) {
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
}

function getMockProps() {
  return {
    dataList: {
      data: {
        relationships: {
          field_media_image: {
            data: {
              id: 'ArticleDetailComponentFieldMediaImageId'
            }
          }
        }
      }
    }
  }
}

describe('ArticleDetails TopBanner Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should load the images properly', async () => {
    const props = getMockProps();
    initMockDataSvc('ArticleDetailsTopBannerImage.jpg')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<TopBanner {...props} />);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0]).toEqual(['ArticleDetailComponentFieldMediaImageId']);
    expect(wrapper!.html()).toContain('https://cms.dev.cynfusion.net/ArticleDetailsTopBannerImage.jpg');
  })
})
