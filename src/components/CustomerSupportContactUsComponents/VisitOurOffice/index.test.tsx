import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { VisitOurOffice } from '../VisitOurOffice';
import { act } from 'react-dom/test-utils';


describe('VisitOurOffice testing', () => {

  const mockDataMap = {
    attributes: {
      field_map_title: '',
      field_map_address: {
        value: 'valueAddress',
      },
      field_map_link: {
        title: 'map title',
        uri: 'uri'
      },
    },
    id: 'id0',
    links: {
      self: null
    },
    type: 'paragraph--map_details'
  };
  const mockDataList = {
    data: {
      attributes: {
        uri: {
          url: 'url'
        }
      }
    }
  };
  
  const mockProps = {
    dataMap: mockDataMap,
    dataList: mockDataList,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <VisitOurOffice {...data} />
  )

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
  });
});
