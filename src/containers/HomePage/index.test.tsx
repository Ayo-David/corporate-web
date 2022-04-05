import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper';
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import HomePage from '../HomePage';
import { act } from 'react-dom/test-utils';
import QuickLinks from '../../components/HomeComponents/QuickLinks';
import HowCanIHelp from '../../components/HomeComponents/HowCanIHelp';
import Products from '../../components/HomeComponents/Products';
import OurCustomerPromises from '../../components/HomeComponents/OurCustomerPromises';
import NewsArticlesList from '../../components/HomeComponents/NewsArticlesList';
import MobileBanking from '../../components/HomeComponents/MobileBanking';
import Awareness from '../../components/HomeComponents/Awareness';
import WeAreATrustedProvider from '../../components/HomeComponents/WeAreATrustedProvider';

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../components/TopBanner', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_top_banner">{children}</div>;
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
const fieldQuickLinks = {
  data: [
    {
      attributes: {
        field_single_link: {
          uri: 'linkUri',
          title: 'Title Quick Link',
        },
        field_icon_class: 'Bank',
      },
      id: '',
      links: {
        self: '',
      },
      relationships: {},
      type: '',
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

const ourCustomerPromises = {
  data: [
    {
      attributes: {
        field_title: 'Promise Card 1',
        field_description: 'Promise Description 1',
      },
      id: '',
      links: { self: '' },
      relationships: {},
      type: '',
    },
  ],
  included: [],
  jsonapi: {
    version: '',
    meta: null,
  },
  links: {
    self: null,
  },
};

const trustedProvider = {
  data: [
    {
      relationships: {
        field_media_logo: {
          data: {
            id: 'trustedProviderDataImgId',
          },
        },
      },
      attributes: {},
      id: '',
      links: { self: '' },
      type: '',
    },
  ],
  included: [],
  jsonapi: {
    version: '',
    meta: null,
  },
  links: { self: '' },
};

const newsArticles = {
  data: [
    {
      id: 'newsId',
      attributes: {
        title: 'newsTitle',
        changed: '2022-01-31',
      },
      links: { self: '' },
      relationships: {},
      type: '',
    },
  ],
  included: [],
  jsonapi: {
    version: '',
    meta: null,
  },
  links: {
    self: null,
  },
};

function createProps() {
  return {
    headerMenus: {
      Business: createHeaderItems('Business', 'businessLink'),
    },
    footer: {
      id: 'bcaFooterId',
      attributes: {},
      relationships: {},
      links: {
        self: 'footerSelf',
      },
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      data: [],
    },
    homeContent: {
      data: {
        id: 'homeContentId',
        relationships: {
          field_customer_interest_links: {
            data: 'QuickLinksDataId',
          },
          field_products: {
            data: [
              {
                type: 'node--product',
                id: 'fieldProductId',
              },
              {
                type: 'node--finance_pages',
                id: 'financePageId',
              },
            ],
          },
          field_ads_awareness: {
            data: [
              {
                id: 'adsAwarenessId1',
              },
            ],
          },
          field_trusted_provider: {
            data: {
              id: 'trustedProviderId',
            },
          },
        },
        attributes: {
          field_filter_products: ['Help 1', 'Help 2', 'Help 3', 'Help 4'],
        },
      },
    },
    homeBanner: {
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
    homeOurCustomerPromises: ourCustomerPromises,
    homeFieldQuickLinks: fieldQuickLinks,
    homeTrustedProvider: trustedProvider,
    newsArticlesList: newsArticles,
    newsCategories: [
      {
        uuid: [
          {
            value: 'newsCategoryUuid',
          },
        ],
        changed: [],
        default_langcode: [],
        description: [],
        langcode: [],
        name: [],
        parent: [],
        path: [],
        revision_created: [],
        revision_id: [],
        revision_log_message: [],
        revision_translation_affected: [],
        revision_user: [],
        status: [],
        tid: [],
        vid: [],
        weight: [],
      },
    ],
    homeAdsAwareness: {
      data: [
        {
          attributes: {
            field_title: 'Awareness Title',
            field_description: 'Awareness Description',
            field_image: {
              alt: 'Awareness Image Alt',
              title: 'Awareness Image Title',
              url: 'Awareness Image Url',
            },
          },
          id: '',
          links: {
            self: '',
          },
          relationships: {},
          type: '',
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
    },
    homeProduct: {
      data: [
        {
          attributes: {
            title: 'Product Title',
            body: 'Product Body',
            field_image: {
              alt: 'Product Image Alt',
              title: 'Product Image Title',
              url: 'Product Image Url',
            },
          },
          id: '',
          links: { self: '' },
          relationships: {},
          type: '',
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
    },
  };
}

function initDataSvc() {
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: [],
  });
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: [],
  });
  mockedDataSvc.getHomeContentData.mockResolvedValue({
    data: [],
  });
  mockedDataSvc.getNewsCategoriesData.mockResolvedValue({
    data: [],
  });
  mockedDataSvc.getHomeBannerData.mockResolvedValue({
    data: {},
  });
  mockedDataSvc.getHomeFieldQuickLinksData.mockResolvedValue(fieldQuickLinks);
  mockedDataSvc.getHomeProductData.mockResolvedValue({
    data: {
      attributes: {
        title: 'Home Product 1',
      },
    },
  });
  mockedDataSvc.getHomeFinanceData.mockResolvedValue({
    data: {
      attributes: {
        title: 'Finance Product 1',
      },
    },
  });
  mockedDataSvc.getHomeOurCustomerPromisesData.mockResolvedValue(ourCustomerPromises);
  mockedDataSvc.getHomeAdsAwarenessData.mockResolvedValue({
    data: {
      attributes: {
        title: 'Ads Awareness Title',
        field_snippet: {
          value: 'Ads Awareness Content',
        },
      },
      relationships: {
        field_image_video: {
          data: {
            id: 'adsAwarenessImgId',
          },
        },
      },
    },
  });
  mockedDataSvc.getHomeTrustedProviderData.mockResolvedValue(trustedProvider);
  mockedDataSvc.getImage.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: 'imgUrl.jpg',
        },
      },
    },
  });
  mockedDataSvc.getNewsArticlesListData.mockResolvedValue(newsArticles);
}

describe('Home Page', () => {
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
          <HomePage {...props} />
        </AppContainer>
      );
    });

    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_top_banner`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_footer`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_lowest_footer`)).toHaveLength(1);

    expect(wrapper!.find(QuickLinks)).toHaveLength(1);
    expect(wrapper!.find(HowCanIHelp)).toHaveLength(1);
    expect(wrapper!.find(Products)).toHaveLength(1);
    expect(wrapper!.find(OurCustomerPromises)).toHaveLength(1);
    expect(wrapper!.find(NewsArticlesList)).toHaveLength(1);
    expect(wrapper!.find(Awareness)).toHaveLength(1);
    expect(wrapper!.find(WeAreATrustedProvider)).toHaveLength(1);
    expect(wrapper!.find(MobileBanking)).toHaveLength(1);
  });
});
