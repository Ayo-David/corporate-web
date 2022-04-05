import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import YouAreNearlyReadyToStart from '../index';
import { act } from 'react-dom/test-utils';


describe('YouAreNearlyReadyToStart testing', () => {

  const mockProps = {
    dataList:{},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps)=>mount(
    <YouAreNearlyReadyToStart {...data} />
  )

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockImplementationOnce(async()=>{
      return {
        data: {
          attributes: {field_background_color: 'red' },
          relationships: {field_text_with_link: {links: {related: {href: 'https://www.google.com'}}}}
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

    expect(wrapper.find('.subtitle').exists()).toBeTruthy();
    expect(wrapper.find('.btn-black').exists()).toBeTruthy();
    expect(mockGetData).toHaveBeenCalledTimes(2)
  });

  it('Should not render with empty dataList', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper.find('.subtitle').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
  });
});