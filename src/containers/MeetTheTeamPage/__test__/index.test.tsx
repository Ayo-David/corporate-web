import React from 'react';
import * as _ from 'lodash';
import { FunctionComponent, mount, ReactWrapper } from 'enzyme';
import MeetTheTeamPage from '../index';
import { act } from 'react-dom/test-utils';
import Header from '../../../components/Header';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header');
jest.mock('../../../components/TopBanner', () => {
  const TopBanner = ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_top_banner">{children}</div>;
  };
  return TopBanner;
});
jest.mock('../../../components/MeetTheTeamComponents/Teams', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_teams">{children}</div>;
  };
});
jest.mock('../../../components/MeetTheTeamComponents/CustomerFeedback', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_customer_fee_back">{children}</div>;
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

describe('MeetTheTeamPage testing', () => {
  const mockProps = {
    meetTheTeamContent: {
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
        <MeetTheTeamPage {...data} />
      </AppContainer>
    );

  let mockGetMeetTheTeamContentData: any,
    mockGetHeaderMenuData: any,
    mockGetFooterData: any,
    mockGetMeetTheTeamBannerData: any,
    mockGetMeetTheTeamTeamsData: any,
    mockGetMeetTheTeamCustomerFeedbackData: any;
  beforeEach(() => {
    (Header as jest.MockedFunction<FunctionComponent<any>>).mockImplementation(
      ({ children }) => {
        return <div id="mock_header">{children}</div>;
      }
    );

    mockGetMeetTheTeamContentData = jest
      .spyOn(dataSvc, 'getMeetTheTeamContentData')
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

    mockGetMeetTheTeamBannerData = jest
      .spyOn(dataSvc, 'getMeetTheTeamBannerData')
      .mockResolvedValue({
        data: {
          attributes: {
            uri: {
              url: '',
            },
          },
        },
      });

    mockGetMeetTheTeamTeamsData = jest.spyOn(dataSvc, 'getMeetTheTeamTeamsData').mockResolvedValue({
      data: {
        attributes: {
          uri: {
            url: '',
          },
        },
      },
    });

    mockGetMeetTheTeamCustomerFeedbackData = jest
      .spyOn(dataSvc, 'getMeetTheTeamCustomerFeedbackData')
      .mockResolvedValue({
        data: {
          attributes: {
            uri: {
              url: '',
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

    expect(mockGetMeetTheTeamContentData).toHaveBeenCalledTimes(1);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);
    expect(mockGetMeetTheTeamBannerData).toHaveBeenCalledTimes(1);
    expect(mockGetMeetTheTeamTeamsData).toHaveBeenCalledTimes(1);
    expect(mockGetMeetTheTeamCustomerFeedbackData).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy();
    expect(wrapper.find('#mock_teams').exists()).toBeTruthy();
    expect(wrapper.find('#mock_customer_fee_back').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();

    expect((Header as jest.MockedFunction<any>).mock.calls[0][0].activeMenu).toEqual('Private Banking');
    expect((Header as jest.MockedFunction<any>).mock.calls[0][0].dataList).toEqual({});
    expect((Header as jest.MockedFunction<any>).mock.calls[0][0].headers).toEqual(mockProps.headerMenus);
    expect(typeof (Header as jest.MockedFunction<any>).mock.calls[0][0].dataAction.getMeetTheTeamContentData).toEqual('function');
    expect(typeof (Header as jest.MockedFunction<any>).mock.calls[0][0].dataAction.getHeaderMenuData).toEqual('function');
    expect(typeof (Header as jest.MockedFunction<any>).mock.calls[0][0].dataAction.getFooterData).toEqual('function');
  });

  it('Should not render elements', async () => {
    const data: any = _.cloneDeep(mockProps);
    data.meetTheTeamContent = null;
    data.headerMenus = null;
    data.footer = null;
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(mockGetMeetTheTeamContentData).toHaveBeenCalledTimes(1);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);
    expect(mockGetMeetTheTeamBannerData).toHaveBeenCalledTimes(0);
    expect(mockGetMeetTheTeamTeamsData).toHaveBeenCalledTimes(0);
    expect(mockGetMeetTheTeamCustomerFeedbackData).toHaveBeenCalledTimes(0);
    expect(wrapper.find('#mock_header').exists()).toBeFalsy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy();
    expect(wrapper.find('#mock_teams').exists()).toBeFalsy();
    expect(wrapper.find('#mock_customer_fee_back').exists()).toBeFalsy();
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy();
  });
});
