import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CaseStudies from '../CaseStudies';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

const mockContent = {
  data: {
    relationships: {
      field_case_studies: {
        data: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      }
    },
    attributes: {
      field_heading: "Main Heading",
      field_text: {
        processed: "<b>Main Text</b>"
      }
    }
  }
}

const mockArticles = {
  data: {
    attributes: {
      title: 'Article 1',
      created: '2022-01-15'
    },
    relationships: {
      field_media_image: {
        data: {
          id: "fieldMediaImageId"
        }
      }
    }
  }
}

function getMockProps() {
  return {
    dataList: {
      id: 'foo',
    }
  }
}

function initMockDataSvc(content: any, articles: any, imageId: string, imageUrl: string) {
  mockedDataSvc.getData.mockResolvedValue(content);
  
  mockedDataSvc.getDealSheetContent.mockResolvedValue(articles);
  
  mockedDataSvc.getDealSheetThumbnail.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
}

describe('CaseStudies Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })
  
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });
  
  it('should load the videos from data list', async () => {
    const props = getMockProps();
    initMockDataSvc(mockContent, mockArticles,'mockImageId', 'mockImageUrl')
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CaseStudies {...props} />);
    })
    await wrapper!.update();
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    // await new Promise(process.nextTick);
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Main Text');
    expect(wrapper!.html()).toContain('Main Heading');
  })
  
  it('should gracefully handle no field text', async() => {
    const content = {
      data: {
        relationships: {
          field_case_studies: {
            data: [
              {
                id: 1
              },
              {
                id: 2
              }
            ]
          }
        },
        attributes: {
          field_heading: "Main Heading",
          }
        }
      }
    const props = getMockProps();
    initMockDataSvc(content, mockArticles,'mockImageId', 'mockImageUrl2')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CaseStudies {...props} />);
    })
    await wrapper!.update();
    
  
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('Main Heading');
    expect(wrapper!.html()).not.toContain('Main Text');
  })
})

