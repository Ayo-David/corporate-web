/* eslint-disable no-loop-func */
import React from 'react';
import * as _ from 'lodash';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../services/dataSvc';
import Paragraph from '../index';

jest.mock('react-bootstrap/esm/Dropdown', () => {
  const Dropdown = ({ children }: {children: React.ReactNode}) => {
    return <div className="test_dropdown_">{children}</div>;
  };

  Dropdown.Menu = ({ children, ...otherProps }: {children: React.ReactNode}) => {
    return <div {...otherProps}>{children}</div>;
  };

  Dropdown.Toggle = ({ children, ...otherProps }: {children: React.ReactNode}) => {
    return <button {...otherProps}>{children}</button>;
  };

  Dropdown.Item = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent) => void;
  }) => {
    const click = (event: React.MouseEvent) => {
      event.preventDefault();
      onClick(event);
    };
    return (
      <a
        href="www.google.com"
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          click(event);
        }}>
        {children}
      </a>
    );
  };

  return Dropdown;
});

describe('Paragraph testing', () => {
  const mockProps = {
    data: {
      attributes: {
        created: '2022-01-10',
        field_text: {
          value: '<div></div>',
        },
      },
      id: 'id',
      links: {
        self: {},
      },
      relationships: {
        field_faq_set: {
          data: { id: 'id' },
        },
        field_media_image: {
          data: {
            id: 'c84d4fa5-2d22-4207-a05d-d31a45f58fcf',
            attributes: {
              field_snippet: {
                value: '<div></div>',
              },
            },
          },
        },
      },
      type: 'type',
    },
    type: 'type',
    templateData: {
      TestTemplate: null,
    },
  };

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps) => mount(<Paragraph {...data} />);

  beforeEach(() => {
    jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        attributes: {
          uri: {
            url: '/jsonapi/media/video/f9eea4c9-1f72-4412-bc2e-4b9158908a3e/field_media_video_file',
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

  it('Should render paragraph title description', async () => {
    const data = _.cloneDeep(mockProps);
    const types = [
      'paragraph--title_description',
      'paragraph--title_description_alias',
      'paragraph--title_description_category',
    ];
    for (let index = 0; index < types.length; index++) {
      data.data.type = types[parseInt(`${index}`)];
      await act(async () => {
        wrapper = createWrapper(data);
      });
      wrapper.update();

      expect(wrapper!.find('.field_text').exists()).toBeTruthy();
    }
  });

  it('Should render paragraph title files list withe TestTemplate', async () => {
    const mockFunc1 = jest.spyOn(dataSvc, 'getTemplatePageFileListItems').mockResolvedValue({
      data: [],
    });

    const mockFunc2 = jest
      .spyOn(dataSvc, 'getTemplatePageAwardAccreditationItems')
      .mockResolvedValue({
        data: [],
      });

    const data: any = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--title_files_list';
    data.templateData.TestTemplate = {
      included: [{ type: 'paragraph--awards_and_accreditations', id: 'id' }],
    };
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(wrapper!.find('.paragraph-subtitle').exists()).toBeTruthy();
    expect(mockFunc1).toHaveBeenCalledTimes(1);
    expect(mockFunc2).toHaveBeenCalledTimes(1);
  });

  it('Should render paragraph title files list', async () => {
    const mockFunc = jest.spyOn(dataSvc, 'getTemplatePageFileListItems').mockResolvedValue({
      data: [
        {
          attributes: { filename: 'filename', uri: { url: 'url' } },
        },
      ],
    });
    const data = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--title_files_list';
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(wrapper!.find('.filename').exists()).toBeTruthy();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('Should render paragraph title members', async () => {
    const mockFunc = jest.spyOn(dataSvc, 'getTemplatePageMemberListItems').mockResolvedValue({
      data: [
        {
          attributes: {
            title: 'title',
            field_position: 'field_position',
            uri: { url: 'url' },
            field_bio: { value: '<div></div>' },
          },
          relationships: { field_photo: { data: {} } },
        },
      ],
    });
    const data = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--title_members';
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();

    expect(wrapper.find('.position').exists()).toBeTruthy();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('Should render paragraph desc cards', async () => {
    const mockFunc = jest.spyOn(dataSvc, 'getTemplatePageCardListItems').mockResolvedValue({
      data: [
        {
          attributes: { field_title: 'field_title', field_text: { value: 'value' } },
        },
      ],
    });
    const data = _.cloneDeep(mockProps);
    const types = [
      'paragraph--title_desc_cards',
      'paragraph--title_desc_cards_with_url',
      'paragraph--title_security_cards',
    ];
    for (let index = 0; index < types.length; index++) {
      data.data.type = types[parseInt(`${index}`)];
      await act(async () => {
        wrapper = createWrapper(data);
      });
      wrapper.update();

      wrapper.find('a').at(0).simulate('click');

      expect(wrapper.find('.field_text').exists()).toBeTruthy();
      expect(mockFunc).toHaveBeenCalledTimes(index + 1);
    }
  });

  it('Should render paragraph awards and accreditations', async () => {
    const mockFunc1 = jest
      .spyOn(dataSvc, 'getTemplatePageAwardAccreditationItems')
      .mockResolvedValue({
        data: [
          {
            id: 'id',
          },
        ],
      });

    const mockFunc2 = jest
      .spyOn(dataSvc, 'getTemplatePageAwardAccreditationData')
      .mockResolvedValue({
        data: { attributes: { field_year: 'field_year' } },
        included: [
          {
            attributes: { field_description1: { value: '<div></div>' } },
            relationships: { field_logo: { data: { id: 'id' } } },
          },
        ],
      });

    const mockFunc3 = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: { attributes: { uri: { url: 'url' } } },
    });

    const data = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--awards_and_accreditations';
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();
    expect(wrapper!.find('.award-list').exists()).toBeTruthy();
    expect(mockFunc1).toHaveBeenCalledTimes(1);
    expect(mockFunc2).toHaveBeenCalledTimes(1);
    expect(mockFunc3).toHaveBeenCalledTimes(1);
  });

  it('Should render paragraph awards and accreditations', async () => {
    const mockFunc1 = jest
      .spyOn(dataSvc, 'getTemplatePageAwardAccreditationItems')
      .mockResolvedValue({
        data: [
          {
            id: 'id',
          },
        ],
      });

    const mockFunc2 = jest
      .spyOn(dataSvc, 'getTemplatePageAwardAccreditationData')
      .mockResolvedValue({
        data: { attributes: { field_year: 'field_year' } },
        included: [
          {
            attributes: { field_description1: { value: '<div></div>' } },
            relationships: { field_logo: { data: null } },
          },
        ],
      });

    jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: { attributes: { uri: { url: 'url' } } },
    });

    const data = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--awards_and_accreditations';
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();
    expect(wrapper!.find('.award-list').exists()).toBeTruthy();
    expect(mockFunc1).toHaveBeenCalledTimes(1);
    expect(mockFunc2).toHaveBeenCalledTimes(1);
  });

  it('Should render paragraph awards and accreditations with TestTemplate', async () => {
    const data: any = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--awards_and_accreditations';
    data.templateData.TestTemplate = {
      included: [{ type: 'paragraph--awards_and_accreditations', id: 'id' }],
    };
    await act(async () => {
      wrapper = createWrapper(data);
    });
    expect(wrapper!.find('.paragraph').exists()).toBeTruthy();
  });

  it('Should render paragraph title faqs url', async () => {
    const mockFunc1 = jest.spyOn(dataSvc, 'getTemplatePageFAQItems').mockResolvedValue({
      data: [
        {
          id: 'id',
          attributes: {
            field_title: 'field_title',
            field_text: { value: 'value' },
          },
        },
      ],
    });

    const data = _.cloneDeep(mockProps);
    data.data.type = 'paragraph--title_faqs_url';
    await act(async () => {
      wrapper = createWrapper(data);
    });
    wrapper.update();
    wrapper.find('a').at(0).simulate('click');

    expect(wrapper!.find('.field_text').exists()).toBeTruthy();
    expect(mockFunc1).toHaveBeenCalledTimes(1);
  });
});
