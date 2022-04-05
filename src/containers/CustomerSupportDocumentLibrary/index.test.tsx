import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper';
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CustomerSupportDocumentLibrary from './index';
import { act } from 'react-dom/test-utils';
import Header from '../../components/Header';

import Filters from '../../components/CustomerSupportDocumentLibraryDocuments/Filters';
import Results from '../../components/CustomerSupportDocumentLibraryDocuments/Results';

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../components/CustomerSupportDocumentLibraryDocuments/Filters', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_filters">{children}</div>;
  };
});
jest.mock('../../components/CustomerSupportDocumentLibraryDocuments/Results', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_results">{children}</div>;
  };
});

jest.mock('../../components/Breadcrumb', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_breadcrumb">{children}</div>;
  };
});
jest.mock('../../components/TopBanner', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_topBanner">{children}</div>;
  };
});
jest.mock('../../components/Footer', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_footer">{children}</div>;
  };
});
jest.mock('../../components/LowestFooter', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_lowestFooter">{children}</div>;
  };
});

function createProps() {
  return {
    documentLibraryContent: {
      links: {
        self: '',
      },
      data: {
        id: 'id',
        attributes: {
          title: 'title',
          body: 'body',
        },
      },
      included: [
        {
          type: 'paragraph--banner',
          attributes: null,
          id: '',
          links: '',
          relationships: null
        }
      ],
    },
    headerMenus: {
      'Customer Support': 'mock_menu',
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
  } as any;
}

function initDataSvc() {
  mockedDataSvc.getImage.mockResolvedValue('mock_image');
  mockedDataSvc.getCustomerSupportDocumentLibraryBanner.mockResolvedValue('mock_content');
  mockedDataSvc.getCustomerSupportDocumentLibraryContentData.mockResolvedValue({
    links: {
      self: '',
    },
    data: {
      id: 'id',
      attributes: {
        title: 'title',
        body: 'body',
      },
    },
    included: [
      {
        type: 'paragraph--banner',
        attributes: null,
        id: '',
        links: '',
        relationships: null
      },
    ],
  });
  mockedDataSvc.getData.mockResolvedValue({
    data: [
      {
        relationships: {
          field_doc_product: {
            data: [
              {
                id: 'pId',
              },
            ],
          },
        },
      },
      {
        relationships: {
          field_doc_category: {
            data: {
              id: 'cId',
            },
          },
          field_doc_product: {
            data: [],
          },
        },
      },
    ],
  });
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    'Customer Support': 'mock_menu',
  });
  mockedDataSvc.getFooterData.mockResolvedValue('mock_footer');
  mockedDataSvc.getDocumentLibraryProductsBusinessData.mockResolvedValue(['c', 'F']);
  mockedDataSvc.getDocumentLibraryProductsPersonalData.mockResolvedValue(['c', 'F']);
  mockedDataSvc.getDocumentLibraryCategoryData.mockResolvedValue(['c', 'F']);
  mockedDataSvc.getDocumentLibraryResultsData.mockResolvedValue({
    data: [
      {
        relationships: {
          field_doc_product: {
            data: [
              {
                id: 'id',
              },
            ],
          },
        },
      },
      {
        relationships: {
          field_doc_category: {
            data: {
              id: 'id',
            },
          },
          field_doc_product: {
            data: [],
          },
        },
      },
    ],
    included: [
      {
        type: 'taxonomy_term--cynergy_term',
        id: 'id',
        attributes: {
          name: 'id',
        },
      },
      {
        type: 'taxonomy_term--categories',
        id: 'id',
        attributes: {
          name: 'id',
        },
      },
    ],
  });
}
describe('CustomerSupportDocumentLibrary component test', () => {
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
          <CustomerSupportDocumentLibrary {...props} />
        </AppContainer>
      );
    });
    await wrapper!.update();
    
    await act(async () => {
      wrapper.find('.document-type .txt').at(0).simulate('click');
    })
    await wrapper!.update();
    
    await act(async () => {
      wrapper.find('.document-type .txt').at(1).simulate('click');
    })
    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_filters`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_results`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_topBanner`)).toHaveLength(1);
    expect(wrapper!.find(Header)).toHaveLength(1);
    expect(wrapper!.find(Results)).toHaveLength(1);
    expect(wrapper!.find(Filters)).toHaveLength(1);    
  });
});
