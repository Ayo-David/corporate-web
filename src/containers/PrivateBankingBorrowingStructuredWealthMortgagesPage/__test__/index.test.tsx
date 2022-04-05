import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper';
import { AppContainer } from '../../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import PrivateBankingBorrowingStructuredWealthMortgagesPage from '../index';
import { act } from 'react-dom/test-utils';

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});

jest.mock('../../../components/Breadcrumb', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_breadcrumb">{children}</div>;
  };
});
jest.mock('../../../components/TopBanner', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_topBanner">{children}</div>;
  };
});
jest.mock('../../../components/Footer', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_footer">{children}</div>;
  };
});
jest.mock('../../../components/LowestFooter', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_lowest_footer">{children}</div>;
  };
});

function createProps() {
  return {
    privateBankingBorrowingContent: {
      data: {
        id: 'id',
      },
    },
    banner: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    },
    headerMenus: { 
      'Private Banking': {
        data: [],
        included: [],
        jsonapi: {
          version: '',
          meta: null
        },
        links: {
          self: null
        }
      }
    },
    footer: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    }
  };
}

function initDataSvc() {
  mockedDataSvc.getImage.mockResolvedValue('mock_image');
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    'Private Banking': 'mock_menu',
  });
  mockedDataSvc.getFooterData.mockResolvedValue("mock_footer");
  mockedDataSvc.getPrivateBankingBorrowingContentData.mockResolvedValue({
    data: {
      id: 'id',
    },
  });
  mockedDataSvc.getPrivateBankingBorrowingBannerData.mockResolvedValue('mock_banner');
}

describe('PrivateBankingBorrowingStructuredWealthMortgagesPage component test', () => {
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
          <PrivateBankingBorrowingStructuredWealthMortgagesPage {...props} />
        </AppContainer>
      );
    });
    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`).exists()).toBeTruthy()
    expect(wrapper!.find(`#mock_breadcrumb`).exists()).toBeTruthy()
    expect(wrapper!.find(`#mock_topBanner`).exists()).toBeTruthy()
    expect(wrapper!.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper!.find('#mock_lowest_footer').exists()).toBeTruthy()
  });
});
