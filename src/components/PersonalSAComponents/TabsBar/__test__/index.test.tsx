import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import TabsBar from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


describe('TabsBar testing', () => {

  const mockProps = {
    tabIndex: 0,
    dataList: [{
      relationships: {field_products_to_compare: {links: {related: {href: 'https://www.google.com'}}}},
      attributes: {field_title: 'field_title'}
    },{
      relationships: {field_products_to_compare: {links: {related: {href: 'https://www.google.com'}}}},
      attributes: {field_title: 'field_title'}
    }],
    onClickTab: (tabIndex: number) => {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <AppContainer>
      <TabsBar {...data} />
    </AppContainer>
  )

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue({
      data: [{
        attributes: {field_title: 'field_title', field_subtitle: 'field_subtitle',
        field_aer: {processed: '<div></div>'},
        field_withdrawals: ['test1'],
        field_apply_link: {uri: 'https://www.google.com', title: 'title'}}
      }]})
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

  it('Should call callback', async() => {
    const mockFunc = jest.fn();
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClickTab: mockFunc}});
    })
    wrapper.update();

    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.tab-items.current').at(0).simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)

    expect(wrapper!.find('.tab-items.current').exists()).toBeTruthy();
    expect(wrapper!.find('.tab-items').exists()).toBeTruthy();
    expect(mockGetData).toHaveBeenCalledTimes(1)
  });
});