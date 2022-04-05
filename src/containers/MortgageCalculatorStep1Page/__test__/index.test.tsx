import React from 'react';
import * as _ from 'lodash';
import { mount, ReactWrapper } from 'enzyme';
import MortgageCalculatorStep1Page from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header', () => {
  return ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../../components/MortgageCalculatorComponents/MortgageCalculatorStep1Box', () => {
  const TopBanner = ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_mortgage_calculator_step1_box">{children}</div>;
  };
  return TopBanner;
});
jest.mock('../../../components/CardWithImageLink', () => {
  return ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_card_with_image_link">{children}</div>;
  };
});
jest.mock('../../../components/CurrentAccountsPremiumComponents/TrustedProvider', () => {
  return ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_trusted_provider">{children}</div>;
  };
});
jest.mock('../../../components/Footer', () => {
  return ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_footer">{children}</div>;
  };
});
jest.mock('../../../components/LowestFooter', () => {
  return ({ children }: {children: React.ReactNode}) => {
    return <div id="mock_lowest_footer">{children}</div>;
  };
});

describe('MortgageCalculatorStep1Page testing', () => {
  const mockProps = {
    mortgageCalculatorContent: {
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value',
          },
        },
        relationships: {
          field_components: {
            data: [
              {
                type: 'paragraph--card_with_image_link',
                id: 'id',
              },
              {
                type: 'paragraph--trusted_providers',
                id: 'id',
              },
              {
                type: '',
                id: 'id',
              },
            ],
          },
          field_team_members: {
            data: {
              id: 'id',
            },
          },
        },
      },
      included: [
        {
          id: 'id',
          links: { self: { href: 'href' } },
        },
        {
          id: 'id1',
          links: { self: { href: 'href' } },
        },
      ],
    },
    headerMenus: {
      'Private Banking': {},
    },
    footer: {},
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: any) =>
    mount(
      <AppContainer>
        <MortgageCalculatorStep1Page {...data} />
      </AppContainer>
    );

  let mockGetMortgageCalculatorContentData: any, mockGetHeaderMenuData: any, mockGetFooterData: any;
  beforeEach(() => {
    mockGetMortgageCalculatorContentData = jest
      .spyOn(dataSvc, 'getMortgageCalculatorContentData')
      .mockResolvedValue({
        data: {
          id: 'id',
          attributes: {
            body: {
              value: 'value',
            },
          },
          relationships: {
            field_team_members: {
              data: {
                id: 'id',
              },
            },
          },
        },
      });

    mockGetHeaderMenuData = jest.spyOn(dataSvc, 'getHeaderMenuData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value',
          },
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id',
            },
          },
        },
      },
    });

    mockGetFooterData = jest.spyOn(dataSvc, 'getFooterData').mockResolvedValue({
      data: {
        id: 'id',
        attributes: {
          body: {
            value: 'value',
          },
        },
        relationships: {
          field_team_members: {
            data: {
              id: 'id',
            },
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render elements correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(mockGetMortgageCalculatorContentData).toHaveBeenCalledTimes(1);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_mortgage_calculator_step1_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();
  });

  it('Should not render elements', async () => {
    const data: any = _.cloneDeep(mockProps);
    data.headerMenus = null;
    data.footer = null;
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(mockGetMortgageCalculatorContentData).toHaveBeenCalledTimes(1);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#mock_header').exists()).toBeFalsy();
    expect(wrapper.find('#mock_mortgage_calculator_step1_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy();
  });
});
