import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import CustomerFeedback from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../../services/dataSvc';
import { AppContainer } from '../../../../test/helper';

describe('Customer Feedback testing', () => {

  const mockDataList = {
    data: [{
      relationships: {
        field_photo: {
          data: {
            id: '9abfe5ef76c9492b811d55d56dcc4567'
          }
        }
      },
      attributes: {
        body: {
          value: '<div></div>'
        },
        filed_name: 'name',
        field_designation: 'field_designation'
      }
    }]
  }

  const createWrapper = (dataList: any)=>mount(
    <AppContainer>
      <CustomerFeedback dataList={dataList} />
    </AppContainer>
  )

  let spyOnGetImage: any;
  beforeEach(() => {
    spyOnGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        attributes: {
          uri: {
            url: ''
          }
        }
      }
    })
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('Should render correctly without crashing', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockDataList);
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(spyOnGetImage).toHaveBeenCalledTimes(1)
    expect(wrapper!.find('.left').exists()).toBeTruthy()
  });

  it('Should not call getImage', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(null);
    })
    expect(spyOnGetImage).toHaveBeenCalledTimes(0)
    expect(wrapper!.find('.left').exists()).toBeFalsy()
  });
});