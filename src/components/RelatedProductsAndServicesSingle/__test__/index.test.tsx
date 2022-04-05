import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import RelatedProductsAndServices from '../index';
import { act } from 'react-dom/test-utils';


describe('RelatedProductsAndServices testing', () => {

  const mockProps = {
    dataList:{
      id: 'id',
      attributes: {field_title: 'field_title'},
    },
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps)=>mount(
    <RelatedProductsAndServices {...data} />
  )


  const mockContentData = [{
    attributes: {
      field_single_link: {
        uri: 'https://www.google.com',
        title: 'title',
      },
      field_icon_class: '',
    }},{
      attributes: {
        field_single_link: {
          uri: 'https://www.google.com',
          title: 'title',
        },
        field_icon_class: 'ATM',
      }},{
        attributes: {
          field_single_link: {
            uri: 'https://www.google.com',
            title: 'title',
          },
          field_icon_class: 'Mobile Phone',
        }},
        {
          attributes: {
            field_single_link: {
              uri: 'https://www.google.com',
              title: 'title',
            },
            field_icon_class: 'cards',
          }},
          {
            attributes: {
              field_single_link: {
                uri: 'https://www.google.com',
                title: 'title',
              },
              field_icon_class: 'Card',
            }},
            {
              attributes: {
                field_single_link: {
                  uri: 'https://www.google.com',
                  title: 'title',
                },
                field_icon_class: 'Wallet',
              }},
              {
                attributes: {
                  field_single_link: {
                    uri: 'https://www.google.com',
                    title: 'title',
                  },
                  field_icon_class: 'Cheque Book',
                }},
              {
          attributes: {
            field_single_link: {
              uri: 'https://www.google.com',
              title: 'title',
            },
            field_icon_class: 'Mail',
          }},{
            attributes: {
              field_single_link: {
                uri: 'https://www.google.com',
                title: 'title',
              },
              field_icon_class: 'Protect',
            }},{
              attributes: {
                field_single_link: {
                  uri: 'https://www.google.com',
                  title: 'title',
                },
                field_icon_class: 'Transactions',
              }},{
                attributes: {
                  field_single_link: {
                    uri: 'https://www.google.com',
                    title: 'title',
                  },
                  field_icon_class: 'Bank',
                }},{
                  attributes: {
                    field_single_link: {
                      uri: 'https://www.google.com',
                      title: 'title',
                    },
                    field_icon_class: 'Payment',
                  }},{
                    attributes: {
                      field_single_link: {
                        uri: 'https://www.google.com',
                        title: 'title',
                      },
                      field_icon_class: 'Tenancy',
                    }}]

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getCurrentAccountsCustomerInterestLinksData').mockResolvedValue({
      data: mockContentData
    })
  })

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(wrapper.find('.title').text()).toContain(mockProps.dataList.attributes.field_title)
    expect(wrapper.find('.item').at(0).props().href).toBe(mockContentData[0].attributes.field_single_link.uri)
    expect(mockGetData).toHaveBeenCalledTimes(1)
  });
});
