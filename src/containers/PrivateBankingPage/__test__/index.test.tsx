import React from 'react';
import * as _ from 'lodash';
import { mount, ReactWrapper } from 'enzyme';
import PrivateBankingPage from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_header">{children}</div>;
  };
});
jest.mock('../../../components/PrivateBankingComponents/BecomeAClientModal', () => {
  const { useState, useEffect } = require('react');
  return ({
    children,
    onClose,
    onNext,
  }: {
    children: React.ReactNode;
    onClose: () => void;
    onNext: () => void;
  }) => {
    const [close, setClose] = useState(false);
    const [next, setNext] = useState(false);
    useEffect(() => {
      if (next) {
        onNext();
      }
      if (close) {
        onClose();
      }
    }, [next, onNext, close, onClose]);

    return (
      <div id="mock_become_a_client_modal">
        <div id="mock_become_a_client_modal_next" onClick={() => setNext(true)}></div>
        <div id="mock_become_a_client_modal_close" onClick={() => setClose(true)}></div>
        <div>{children}</div>
      </div>
    );
  };
});
jest.mock('../../../components/PrivateBankingComponents/PrivateBankingEnquiryFormModal', () => {
  const { useState, useEffect } = require('react');
  return ({
    children,
    onClose,
    onRestart,
    onSubmit,
  }: {
    children: React.ReactNode;
    onClose: () => void;
    onRestart: () => void;
    onSubmit: () => void;
  }) => {
    const [submit, setSubmit] = useState(false);
    const [restart, setRestart] = useState(false);
    const [close, setClose] = useState(false);
    useEffect(() => {
      if (submit) onSubmit();
      if (restart) onRestart();
      if (close) onClose();
    }, [submit, restart, close, onSubmit, onRestart, onClose]);

    return (
      <div id="mock_private_banking_enquiry_form_modal">
        <div
          id="mock_private_banking_enquiry_form_modal_submit"
          onClick={() => setSubmit(true)}></div>
        <div
          id="mock_private_banking_enquiry_form_modal_restart"
          onClick={() => setRestart(true)}></div>
        <div
          id="mock_private_banking_enquiry_form_modal_close"
          onClick={() => setClose(true)}></div>
        <div>{children}</div>
      </div>
    );
  };
});
jest.mock('../../../components/PrivateBankingComponents/ThankYouForReachingUsModal', () => {
  const { useState, useEffect } = require('react');
  return ({ children, onClose }: { children: React.ReactNode; onClose: () => {} }) => {
    const [click, setClick] = useState(false);
    useEffect(() => {
      onClose();
    }, [click, onClose]);

    return (
      <div id="mock_thank_you_for_reaching_us_modal" onClick={() => setClick(true)}>
        {children}
      </div>
    );
  };
});
jest.mock('../../../components/TopBanner', () => {
  const { useState, useEffect } = require('react');
  return ({
    children,
    onClickButton,
  }: {
    children: React.ReactNode;
    onClickButton: () => void;
  }) => {
    const [click, setClick] = useState(false);
    useEffect(() => {
      if (click) {
        onClickButton();
      }
    }, [click, onClickButton]);

    return (
      <div id="mock_top_banner" onClick={() => setClick(true)}>
        {children}
      </div>
    );
  };
});
jest.mock('../../../components/PrivateBankingComponents/TitleBox', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_title_box">{children}</div>;
  };
});
jest.mock('../../../components/HomeComponents/OurCustomerPromises', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_our_customer_promises">{children}</div>;
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
jest.mock('../../../components/CardWithImageLink', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_card_with_image_link">{children}</div>;
  };
});
jest.mock('../../../components/PrivateBankingComponents/BecomeAClient', () => {
  const { useState, useEffect } = require('react');
  return ({
    children,
    onClickBecomeAClient,
  }: {
    children: React.ReactNode;
    onClickBecomeAClient: () => void;
  }) => {
    const [click, setClick] = useState(false);
    useEffect(() => {
      if (click) {
        onClickBecomeAClient();
      }
    }, [click, onClickBecomeAClient]);

    return (
      <div id="mock_become_a_client" onClick={() => setClick(true)}>
        {children}
      </div>
    );
  };
});
jest.mock('../../../components/CurrentAccountsPremiumComponents/TrustedProvider', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_trusted_provider">{children}</div>;
  };
});
jest.mock('../../../components/PrivateBankingComponents/CustomerFeedback', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div id="mock_customer_feedback">{children}</div>;
  };
});

describe('PrivateBankingPage testing', () => {
  const mockProps = {
    privateBankingContent: {
      data: {
        id: 'id',
        attributes: {
          body: {
            processed: '<div></div>',
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
                type: 'paragraph--become_a_client',
                id: 'id',
              },
              {
                type: 'paragraph--trusted_providers',
                id: 'id',
              },
              {
                type: 'paragraph--client_feedback',
                id: 'id',
              },
              {
                type: 'test111',
                id: 'id',
              },
            ],
          },
          field_customer_promises: {
            links: {
              related: {
                href: 'https://www.google.com',
              },
            },
          },
        },
      },
      included: [
        {
          id: 'id',
          links: {
            self: {
              href: 'https://www.google.com',
            },
          },
        },
        {
          id: 'test_id',
          links: {
            self: {
              href: 'https://www.google.com',
            },
          },
        },
      ],
    },
    privateBankingBecomeAClient: {
      data: {
        attributes: {},
        relationships: {
          field_components: {
            data: [
              {
                type: 'paragraph--card_with_image_link',
                id: 'id',
              },
              {
                type: 'paragraph--become_a_client',
                id: 'id',
              },
            ],
          },
          field_question_options: {
            links: {
              related: {
                href: 'https://www.google.com',
              },
            },
          },
        },
      },
    },
    privateBankingThanksNote: {},
    banner: {},
    headerMenus: { 'Private Banking': {} },
    footer: {},
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: any) =>
    mount(
      <AppContainer>
        <PrivateBankingPage {...data} />
      </AppContainer>
    );

  let mockGetPrivateBankingContentData: any,
    mockGetPrivateBankingBecomeAClientData: any,
    mockGetPrivateBankingThanksNoteData: any,
    mockGetHeaderMenuData: any,
    mockGetFooterData: any,
    mockGetPrivateBankingBannerData: any,
    mockGetData: any;
  beforeEach(() => {
    jest.useFakeTimers();
    mockGetPrivateBankingContentData = jest
      .spyOn(dataSvc, 'getPrivateBankingContentData')
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

    mockGetPrivateBankingBecomeAClientData = jest
      .spyOn(dataSvc, 'getPrivateBankingBecomeAClientData')
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

    mockGetPrivateBankingThanksNoteData = jest
      .spyOn(dataSvc, 'getPrivateBankingThanksNoteData')
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

    mockGetPrivateBankingBannerData = jest
      .spyOn(dataSvc, 'getPrivateBankingBannerData')
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

    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue({
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
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(mockGetPrivateBankingContentData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBecomeAClientData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingThanksNoteData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBannerData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledTimes(2);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);

    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeFalsy();
    expect(wrapper.find('mock_thank_you_for_reaching_us_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_title_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_our_customer_promises').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_customer_feedback').exists()).toBeTruthy();
  });

  it('Should simulate event correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(mockGetPrivateBankingContentData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBecomeAClientData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingThanksNoteData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBannerData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledTimes(2);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);

    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeFalsy();
    expect(wrapper.find('mock_thank_you_for_reaching_us_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_title_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_our_customer_promises').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_customer_feedback').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client').simulate('click');
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client_modal_next').simulate('click');
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeTruthy();
    wrapper.find('#mock_private_banking_enquiry_form_modal_submit').simulate('click');
    // jest.runOnlyPendingTimers();
  });

  it('Should simulate event correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(mockGetPrivateBankingContentData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBecomeAClientData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingThanksNoteData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBannerData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledTimes(2);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);

    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeFalsy();
    expect(wrapper.find('mock_thank_you_for_reaching_us_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_title_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_our_customer_promises').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_customer_feedback').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client').simulate('click');
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client_modal_next').simulate('click');

    wrapper.find('#mock_private_banking_enquiry_form_modal_restart').simulate('click');
    wrapper.find('#mock_top_banner').simulate('click');
  });

  it('Should simulate event correctly', async () => {
    await act(async () => {
      wrapper = createWrapper(mockProps);
    });
    wrapper.update();

    expect(mockGetPrivateBankingContentData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBecomeAClientData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingThanksNoteData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBannerData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledTimes(2);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);

    expect(wrapper.find('#mock_header').exists()).toBeTruthy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeFalsy();
    expect(wrapper.find('mock_thank_you_for_reaching_us_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_title_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_our_customer_promises').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeTruthy();
    expect(wrapper.find('#mock_become_a_client').exists()).toBeTruthy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeTruthy();
    expect(wrapper.find('#mock_customer_feedback').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client').simulate('click');
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeTruthy();

    wrapper.find('#mock_become_a_client_modal_next').simulate('click');

    wrapper.find('#mock_private_banking_enquiry_form_modal_close').simulate('click');
    wrapper.find('#mock_become_a_client_modal_close').simulate('click');
  });

  it('Should not render elements', async () => {
    const data: any = _.cloneDeep(mockProps);
    data.privateBankingContent = null;
    data.privateBankingBecomeAClient = null;
    data.privateBankingThanksNote = null;
    data.banner = null;
    data.headerMenus = null;
    data.footer = null;
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(mockGetPrivateBankingContentData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBecomeAClientData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingThanksNoteData).toHaveBeenCalledTimes(1);
    expect(mockGetPrivateBankingBannerData).toHaveBeenCalledTimes(0);
    expect(mockGetData).toHaveBeenCalledTimes(0);
    expect(mockGetHeaderMenuData).toHaveBeenCalledTimes(1);
    expect(mockGetFooterData).toHaveBeenCalledTimes(1);

    expect(wrapper.find('#mock_header').exists()).toBeFalsy();
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy();
    expect(wrapper.find('#mock_become_a_client_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_private_banking_enquiry_form_modal').exists()).toBeFalsy();
    expect(wrapper.find('mock_thank_you_for_reaching_us_modal').exists()).toBeFalsy();
    expect(wrapper.find('#mock_title_box').exists()).toBeTruthy();
    expect(wrapper.find('#mock_our_customer_promises').exists()).toBeTruthy();
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy();
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy();
    expect(wrapper.find('#mock_card_with_image_link').exists()).toBeFalsy();
    expect(wrapper.find('#mock_become_a_client').exists()).toBeFalsy();
    expect(wrapper.find('#mock_trusted_provider').exists()).toBeFalsy();
    expect(wrapper.find('#mock_customer_feedback').exists()).toBeFalsy();
  });
});
