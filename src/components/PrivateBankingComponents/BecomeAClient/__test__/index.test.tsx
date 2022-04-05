import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import BecomeAClient from '../index';
import { act } from 'react-dom/test-utils';


describe('BecomeAClient testing', () => {

  const mockProps = {
    dataList:{},
    onClickBecomeAClient: ()=>{}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <BecomeAClient {...data} />
  )

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockImplementationOnce(async()=>{
      return {
        data: {
          attributes: {field_title: 'field_title', field_become_client_link: {title: 'title'}, field_more_link: {uri: 'uri', title: 'title'} },
          relationships: {field_steps: {links: {related: {href: 'https://www.google.com'}}}}
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
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClickBecomeAClient: mockFunc}});
    })
    wrapper.update();

    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.btn.btn-green').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)

    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.col.col-md-4.col-12').exists()).toBeTruthy()
    expect(mockGetData).toHaveBeenCalledTimes(2)
  });

  it('Should not render with empty dataList', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper.find('#client').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
  });
});
