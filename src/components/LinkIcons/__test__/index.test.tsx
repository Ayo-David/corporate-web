import React from 'react';
import { mount } from 'enzyme';
import LinkIcons from '../index';


describe('Link Icons testing', () => {

  const mockDataList = { data: [{
    attributes: {
      field_single_link: {
        uri: 'fake uri',
        title: 'atm'
      },
      field_icon_class: 'ATM'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Business'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Pencil'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Community'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Insights'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Accounts'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'Accounts'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'summary'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'checkmark'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'itens'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: 'question'
    }
  },{
    attributes: {
      field_single_link: {
        uri: '',
        title: ''
      },
      field_icon_class: ''
    }
  }]}
  const mockOnScrollTop = jest.fn(()=>{})

  const createWrapper = (dataList: any)=>mount(
      <LinkIcons dataList={dataList} onScrollTop={mockOnScrollTop} />
    )

  it('Should render correctly without crashing', async() => {
    const wrapper = createWrapper(mockDataList);
    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.find('.txt').at(0).text()).toEqual(mockDataList.data[0].attributes.field_single_link.title)
  });

  it('col element should not exists when data is empty', async() => {
    const wrapper = createWrapper({data: []});
    expect(wrapper.exists('.col')).toBeFalsy();
  });

  it('Should simulate click correctly', async() => {
    const wrapper = createWrapper(mockDataList);
    wrapper.find('.items').at(0).simulate('click')
    expect(mockOnScrollTop).toBeCalledTimes(1)
    expect(mockOnScrollTop).toBeCalledWith(mockDataList.data[0].attributes.field_single_link);
  });
});