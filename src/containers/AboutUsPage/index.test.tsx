import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper';
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import AboutUsPage from '../AboutUsPage';
import CustomerTestimonials from '../../components/AboutUsComponents/CustomerTestimonials';
import OurCustomerPromise from '../../components/AboutUsComponents/OurCustomerPromise';
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
jest.mock('../../components/CurrentAccountsPremiumComponents/FAQs', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_faqs">{children}</div>;
  };
});
jest.mock('../../components/TopBanner', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_top_banner">{children}</div>;
  };
});

function createCustomerTestimonials() {
  return {
    id: 'foo',
    type: 'paragraph--card_with_image_link',
    attributes: {
      field_title: 'FooFieldTitle',
      field_text: {
        value: 'FooFieldText',
      },
      field_single_link: {
        uri: 'https://uritestfoo.com/FooSingleLinkUri',
        title: 'FooSingleLinkTitle',
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
    relationships: {},
  };
}

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
    createCustomerTestimonials(),
    createImageWithLongText(),
    createImageWithLongText(),
    createCustomerTestimonials(),
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
    aboutUsContent: {
      data: [],
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
    aboutUsFaqs: {
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
  mockedDataSvc.getAboutUsContentData.mockResolvedValue({
    data: {
      id: 'AboutUsContentDataId',
    },
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

  mockedDataSvc.getAboutUsFaqsData.mockResolvedValue({
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

describe('AboutUs Page', () => {
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
          <AboutUsPage {...props} />
        </AppContainer>
      );
    });
    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_breadcrumb`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_faqs`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1);

    expect(wrapper!.find(CustomerTestimonials)).toHaveLength(2);
    expect(wrapper!.find(OurCustomerPromise)).toHaveLength(1);
    expect(wrapper!.find(CustomerTestimonials).at(0).html()).toContain(
      `https://cms.dev.cynfusion.net/aboutUsvideoUrl`
    );
  });
});
