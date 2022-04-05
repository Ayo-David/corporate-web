import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TabsBar from '../index';
import { act } from 'react-dom/test-utils';


describe('TabsBar testing', () => {

  const mockProps = {
    dataList: [{
      changed: [],
      default_langcode: [],
      description: [],
      langcode: [],
      name: [{value: 'value1'}],
      parent: [],
      path: [],
      revision_created: [],
      revision_id: [],
      revision_log_message: [],
      revision_translation_affected: [],
      revision_user: [],
      status: [],
      tid: [],
      uuid: [],
      vid: [],
      weight: [],
    },{
      changed: [],
      default_langcode: [],
      description: [],
      langcode: [],
      name: [{value: 'value2'}],
      parent: [],
      path: [],
      revision_created: [],
      revision_id: [],
      revision_log_message: [],
      revision_translation_affected: [],
      revision_user: [],
      status: [],
      tid: [],
      uuid: [],
      vid: [],
      weight: [],
    }],
    tabIndex: 0,
    onClickTab: (tabIndex: number) => {},
    title: 'VIEW OUR TRENDING NEWS STORIES'
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
      <TabsBar {...data} />
  )


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render li', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!.find('.tab-items.current').exists()).toBeTruthy();
  });

  it('Should not render li', async() => {
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{dataList: []}});
    })
    expect(wrapper!.find('li').exists()).toBeFalsy();
    expect(wrapper!.find('a').exists()).toBeFalsy();
  });

  it('Should call callback', async() => {
    const mockFunc = jest.fn(()=>{})
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClickTab: mockFunc, tabIndex: 0, title: ''}});
    })

    expect(wrapper!.find('a').exists()).toBeTruthy();
    wrapper!.find('a').at(0).simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  
});