import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper';
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CustomerSupportContactUsPage from './index';
import { act } from 'react-dom/test-utils';
import Header from '../../components/Header';

import { WaysToContactUs } from '../../components/CustomerSupportContactUsComponents/WaysToContactUs';
import { OurRegionalOffices } from '../../components/CustomerSupportContactUsComponents/OurRegionalOffices';
import { TitleDescription } from '../../components/CustomerSupportContactUsComponents/TitleDescription';
import TopBanner from '../../components/TopBanner';

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../components/CustomerSupportContactUsComponents/WaysToContactUs', () => {
  return {
    WaysToContactUs: ({ children }: { children: React.ReactNode }) => {
      return <div id="mock_waysToContactUs">{children}</div>;
    },
  };
});
jest.mock('../../components/CustomerSupportContactUsComponents/VisitOurOffice', () => {
  return {
    VisitOurOffice: ({ children }: { children: React.ReactNode }) => {
      return <div id="mock_visitOurOffice">{children}</div>;
    },
  };
});
jest.mock('../../components/CustomerSupportContactUsComponents/OurRegionalOffices', () => {
  return {
    OurRegionalOffices: ({ children }: { children: React.ReactNode }) => {
      return <div id="mock_ourRegionalOffices">{children}</div>;
    },
  };
});
jest.mock('../../components/CustomerSupportContactUsComponents/TitleDescription', () => {
  return {
    TitleDescription: ({ children }: { children: React.ReactNode }) => {
      return <div id="mock_titleDescription">{children}</div>;
    },
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
    customerSupportContactUsContent: {
      data: {
        id: '',
        attributes: {
          title: '',
        },
      },
      included: [
        {
          type: 'paragraph--map_details',
          relationships: {
            field_map_background_image: {
              data: { id: '' },
            },
          },
        },
        {
          type: 'paragraph--regional_offices',
          id: '',
        },
        {
          type: 'paragraph--title_description',
        },
      ],
    },
    waysToContactUs: null,
    mapImage: null,
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
  mockedDataSvc.getImage.mockResolvedValue({
    data: '',
  });
  mockedDataSvc.getCustomerSupportContactUsContentData.mockResolvedValue({
    data: {
      data: {
        id: '',
        attributes: {
          title: '',
        },
      },
      included: [
        {
          type: 'paragraph--map_details',
          relationships: {
            field_map_background_image: {
              data: { id: '' },
            },
          },
        },
        {
          type: 'paragraph--regional_offices',
          id: '',
        },
        {
          type: 'paragraph--title_description',
        },
      ],
    },
  });
  mockedDataSvc.getHeaderMenuData.mockResolvedValue({
    data: {
      'Customer Support': 'mock_menu',
    },
  });
  mockedDataSvc.getFooterData.mockResolvedValue({
    data: '',
  });
  mockedDataSvc.getCustomerSupportRegionalOffices.mockResolvedValue({
    data: '',
  });
  mockedDataSvc.getCustomerSupportAboutUsBanner.mockResolvedValue({
    data: '',
  });
}
describe('CustomerSupportContactUsPage component test', () => {
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
          <CustomerSupportContactUsPage {...props} />
        </AppContainer>
      );
    });
    await wrapper!.update();

    expect(wrapper!.find(`#mock_header`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_topBanner`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_waysToContactUs`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_ourRegionalOffices`)).toHaveLength(1);
    expect(wrapper!.find(`#mock_titleDescription`)).toHaveLength(1);
    expect(wrapper!.find(Header)).toHaveLength(1);
    expect(wrapper!.find(TopBanner)).toHaveLength(1);
    expect(wrapper!.find(WaysToContactUs)).toHaveLength(1);
    expect(wrapper!.find(OurRegionalOffices)).toHaveLength(1);
    expect(wrapper!.find(TitleDescription)).toHaveLength(1);
  });
});
