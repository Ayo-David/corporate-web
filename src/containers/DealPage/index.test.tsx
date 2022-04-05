import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import DealPage from '../DealPage';
import { act } from "react-dom/test-utils";
import ParagraphImageWithLongText from  '../../components/DealPageComponents/ParagraphImageWithLongText'
import ParagraphTitleMultipleTextArea from  '../../components/DealPageComponents/ParagraphTitleMultipleTextArea'
import ParagraphDescription from  '../../components/DealPageComponents/ParagraphDescription'
import ParagraphTitleDescription from  '../../components/DealPageComponents/ParagraphTitleDescription'

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../components/Breadcrumb', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_breadcrumb">{children}</div>)
  }
})
jest.mock('../../components/TopInfo', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_info">{children}</div>)
  }
})
jest.mock('../../components/TopBannerImageCarousel', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner_carousel">{children}</div>)
  }
})
jest.mock('../../components/Footer', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_footer">{children}</div>)
  }
})
jest.mock('../../components/LowestFooter', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_lowest_footer">{children}</div>)
  }
})

function createHeaderItems(headerTitle: string, url: string) {
  return {
    data: [{
      attributes: {
        field_url: {
          uri: `${url}1`,
        },
        title: `${headerTitle} 1`,
        field_order: 1,
      },
      id: '1',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }, {
      attributes: {
        field_url: {
          uri: `${url}2`,
        },
        title: `${headerTitle} 2`,
        field_order: 2,
      },
      id: '2',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }],
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  }
}

function createProps() {
  return {
    pageId: '1',
    headerMenus: {
      'Business': createHeaderItems('Business', 'businessLink')
    },
    footer: {
      id: 'bcaFooterId',
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
    dealBanner: [],
    dealContent: {
      data: {
        attributes: {
          title: 'Deal Content Title',
          field_heading: {
            value: 'Deal Content Heading'
          }
        }
      },
      included: [
        {
          type: 'paragraph--image_with_long_text',
          attributes: {
            field_titles: 'Long Text Title',
            field_text: {
              value: 'Long Text Content'
            }
          },
          relationships: {
            field_images: {
              data: {
                id: 'ltId'
              }
            }
          }
        },
        {
          type: 'paragraph--title_with_multiple_text_area',
          attributes: {
            field_title: 'Title With Multiple Text Area',
            field_descriptions: [
              'Content 1',
              'Content 2'
            ]
          }
        },
        {
          type: 'paragraph--title_description',
          attributes: {
            field_title: 'Description Title',
            field_text: {
              value: 'Title Description Content'
            }
          }
        },
        {
          type: 'paragraph--description',
          attributes: {
            field_text: {
              value: 'Description Content'
            }
          }
        },
        {
          type: 'paragraph--unsupported_type',
          attributes: {
            field_text: {
              value: 'Unsupported Content'
            }
          }
        }
      ]
    }
  }
}

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getDealSheetContent.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getDealSheetBanner.mockResolvedValue({
    data: []
  })
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: 'image.jpg'
        }
      }
    }
  })
}

describe('Deal Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><DealPage {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_top_info`)).toHaveLength(2)
    expect(wrapper!.find(`#mock_top_banner_carousel`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1)
  
    expect(wrapper!.find(ParagraphImageWithLongText)).toHaveLength(1)
    expect(wrapper!.find(ParagraphTitleMultipleTextArea)).toHaveLength(1)
    expect(wrapper!.find(ParagraphDescription)).toHaveLength(1)
    expect(wrapper!.find(ParagraphTitleDescription)).toHaveLength(1)
  })
})
