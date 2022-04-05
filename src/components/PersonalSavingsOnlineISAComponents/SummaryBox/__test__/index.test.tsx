import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import SummaryBox from '../index';
import { act } from 'react-dom/test-utils';


describe('SummaryBox testing', () => {

  const mockProps = {
    dataList:{},
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data?: typeof mockProps)=>mount(
    <SummaryBox {...data} />
  )

  let mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockImplementationOnce(async()=>{
      return {
        data: {
          relationships: {
            field_summeries: {
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
        attributes: {field_title: 'field_title', field_text: {processed: '<div></div>'}}
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

    expect(wrapper.find('.title').exists()).toBeTruthy();
    expect(mockGetData).toHaveBeenCalledTimes(2)
  });

  it('Should not render with empty dataList', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({});
    })
    wrapper.update();

    expect(wrapper.find('.title').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
  });
});