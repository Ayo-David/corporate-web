import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { OurRegionalOffices } from '../OurRegionalOffices';
import { act } from 'react-dom/test-utils';


describe('OurRegionalOffices testing', () => {

  const mockDataList = {
    data: {
      attributes: {
        title: 'title',
      },
    },
    included: [
      {
        type: 'node--regional_office',
        attributes: {
          title: 'title',
          field_address: {
            value: 'valueAddress',
          },
          field_opening_hours: {
            value: 'valueHours',
          },
          field_map_url: ''
        },
      },
    ],
  };
  
  const mockProps = {
    dataList: mockDataList,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <OurRegionalOffices {...data} />
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
