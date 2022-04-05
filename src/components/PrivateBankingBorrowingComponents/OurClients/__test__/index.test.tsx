import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import OurClients from '../index';
import { act } from 'react-dom/test-utils';


describe('OurClients testing', () => {

  const mockProps = {
    dataList:{},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps)=>mount(
    <OurClients {...data} />
  )

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockImplementationOnce(async()=>{
      return {
        data: {
          attributes: {field_background_color: 'red', field_heading: 'field_heading', field_more_link: {uri: 'uri', title: 'title'} },
          relationships: {field_title_description: {links: {related: {href: 'https://www.google.com'}}}}
        }
      }
    }).mockImplementationOnce(async()=>{
      return {
      data: [{
        attributes: {field_title: 'field_title', field_text: {processed: '<div></div>'},
        field_links: [{
          uri: 'https://www.google.com',
          title: 'title'
        }]}
      },{
        attributes: {field_title: 'field_title', field_text: {processed: '<div></div>'},
        field_links: [{
          uri: 'https://www.google.com',
          title: 'title'
        }]}
      }]}})
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

    wrapper.find('.tab-items.current').simulate('click')
    wrapper.find('.btn-expand').at(0).simulate('click')
    wrapper.find('.btn-expand').at(1).simulate('click')

    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.tab-items.current').exists()).toBeTruthy()
    expect(wrapper.find('.tab-content.hide').exists()).toBeTruthy()
    expect(wrapper.find('.btn-expand').exists()).toBeTruthy()
    expect(wrapper.find('.btn.btn-green-border').exists()).toBeTruthy()
    

    expect(mockGetData).toHaveBeenCalledTimes(2)
  });

  it('Should not render with empty dataList', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper.find('.container').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
  });
});