import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import Awareness from '../index';
import { act } from 'react-dom/test-utils';


describe('Awareness testing', () => {

  const mockProps = {
    dataList: {
      data: [{
        relationships: {field_image_video: {data: {id: 'id'}}},
        attributes: {
          title: 'title',
          field_snippet: {value: '<div></div>'},
          field_download_or_read_more_link: {
            uri: 'https://www.google.com'
          }
        }
      },{
        relationships: {field_image_video: {data: {id: 'id'}}},
        attributes: {
          title: 'title',
          field_snippet: {value: '<div></div>'},
          field_download_or_read_more_link: {
            uri: 'https://www.google.com'
          }
        }
      }]
    }
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <Awareness {...data} />
  )

  let mockGetImage: any;
  beforeEach(() => {
    mockGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        attributes: {
          uri: {
            url:'url'
          }
        }
      }});
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

  it('Should render specific div', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(wrapper.find('.col.col-md-12').exists()).toBeTruthy();
    expect(wrapper.find('.col.col-md-6.col-sm-12').exists()).toBeTruthy();
    expect(mockGetImage).toHaveBeenCalledTimes(2)
  });

  it('Should not render specific div', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper!.find('.col.col-md-12').exists()).toBeFalsy();
    expect(wrapper!.find('.col.col-md-6.col-sm-12').exists()).toBeFalsy();
    expect(mockGetImage).toHaveBeenCalledTimes(0)
  });
});