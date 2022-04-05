import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import CustomerFeedback from '../index';
import { act } from 'react-dom/test-utils';


describe('CustomerFeedback testing', () => {

  const mockProps = {
    dataList:{},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps)=>mount(
    <CustomerFeedback {...data} />
  )

  let mockGetData: any, mockGetImage: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockImplementationOnce(async()=>{
      return {
        data: {
          relationships: {
            field_customer_feedback: {
              links: {
                related: {
                  href: 'https://www.google.com'
                }
              }
            }
          }
        }
      }
    }).mockImplementationOnce(async()=>{
      return {
      data: [{
        relationships: {field_photo: {data: {id: 'id'}}},
        attributes: {uri: {url:'url'},
          body: {value: '<div></div>'},
          field_name: 'field_name',
          field_designation: 'field_designation'
        }
      },{
        relationships: {field_photo: {data: {id: 'id'}}},
        attributes: {uri: {url:'url'},
          body: {value: '<div></div>'},
          field_name: 'field_name',
          field_designation: 'field_designation'
        }
      }]}})

      mockGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
        data: {
          attributes: {
            uri: {
              url: 'url'
            }}}})
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

  it('Should render specific element', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(wrapper.find('.photo').exists()).toBeTruthy()
    expect(wrapper.find('.txts').at(0).props().dangerouslySetInnerHTML?.__html).toContain('<div></div>')
    expect(wrapper.find('.bold').at(0).text()).toContain('field_name')
    
    expect(mockGetData).toHaveBeenCalledTimes(2)
    expect(mockGetImage).toHaveBeenCalledTimes(2)
  });

  it('Should not render with empty dataList', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper.find('.flex-space').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
    expect(mockGetImage).toHaveBeenCalledTimes(0)
  });
});
