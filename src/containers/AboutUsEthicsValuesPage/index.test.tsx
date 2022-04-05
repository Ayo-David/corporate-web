import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper';
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import AboutUsEthicsValuesPage from '../AboutUsEthicsValuesPage';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../components/Breadcrumb', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_breadcrumb">{children}</div>;
  };
});
jest.mock('../../components/Footer', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_footer">{children}</div>;
  };
});
jest.mock('../../components/LowestFooter', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_lowest_footer">{children}</div>;
  };
});
jest.mock('../../components/TopBanner', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_top_banner">{children}</div>;
  };
});

function createImageWithLongText() {
  return {
    type: 'paragraph--image_with_long_text',
    attributes: {
      field_titles: 'About Us IWLT Title',
      field_text: {
        value: 'About Us IWLT Content',
      },
    },
    relationships: {
      field_images: {
        data: {
          id: 'aboutUsIWLTImg',
        },
      },
    },
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
    id: Math.random().toString(),
  };
}

function createHeaderItems(headerTitle: string, url: string) {
  return {
    data: [
      {
        attributes: {
          field_url: {
            uri: `${url}1`,
          },
          title: `${headerTitle} 1`,
          field_order: 1,
        },
        id: '1',
        links: { self: '' },
        relationships: {},
        type: 'menu_item',
      },
      {
        attributes: {
          field_url: {
            uri: `${url}2`,
          },
          title: `${headerTitle} 2`,
          field_order: 2,
        },
        id: '2',
        links: { self: '' },
        relationships: {},
        type: 'menu_item',
      },
    ],
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  };
}

function createCustomerPromise() {
  return {
    id: 'OurCustomerPromiseId',
    attributes: {
      field_title: 'testOurCustomerPromiseTitle',
      field_text: {
        value: 'OurCustomerPromiseText',
      },
      field_single_link: {
        uri: 'https://uritestfoo.com/OurCustomerPromiseSingleLinkUri',
        title: 'OurCustomerPromiseLinkTitle',
      },
    },
    relationships: {},
    type: 'paragraph--title_description',
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  };
}

const fieldComponentsData = {
  data: [
    createCustomerPromise(),
    createImageWithLongText(),
    createImageWithLongText(),
    createCustomerPromise(),
    createCustomerPromise(),
    createCustomerPromise(),
    {
      id: Math.random().toString(),
      type: 'other_type',
      included: [],
      attributes: {},
      relationships: {},
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
  ],
  relationships: {},
  included: [],
  jsonapi: {
    version: '',
    meta: null,
  },
  links: {
    self: '',
  },
};

function createProps() {
  return {
    aboutUsEthicsValuesContent: {
      data: [],
      included: [],
    },
    aboutUsBanner: {
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
    aboutUsHeaderLinks: {
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
    aboutUsFieldComponents: fieldComponentsData,
    headerMenus: {
      'About Us': createHeaderItems('About Us', 'aboutUsLink'),
    },
    footer: {
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
  };
}

function initDataSvc() {
  mockedDataSvc.getAboutUsEthicsValuesContentData.mockResolvedValue({
    data: {
      id: 'AboutUsContentDataId',
    },
    included: [],
  });

  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: [],
  });

  mockedDataSvc.getFooterData.mockResolvedValue({
    data: [],
  });

  mockedDataSvc.getAboutUsBannerData.mockResolvedValue({
    data: [],
  });

  mockedDataSvc.getAboutUsFieldComponentsData.mockResolvedValue({
    data: [],
  });

  mockedDataSvc.getImage3.mockResolvedValue({
    data: {
      id: 'imageId',
    },
  });

  mockedDataSvc.getImageWithLongText.mockResolvedValue({
    data: {
      id: 'imageId',
    },
  });

  mockedDataSvc.getImageVideo.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: 'aboutUsvideoUrl',
        },
      },
    },
  });

  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: 'paragraphImg.jpg',
        },
      },
    },
  });
}

describe('AboutUs Ethics Values Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should load properly', async () => {
    const props = createProps();
    initDataSvc();

    let wrapper: any;
    await act(async () => {
      wrapper = await mount(
        <AppContainer>
          <AboutUsEthicsValuesPage {...props} />
        </AppContainer>
      );
    });
    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1);
  });
});
