import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import Teams from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../../services/dataSvc';
import { AppContainer } from '../../../../test/helper';

describe('Teams testing', () => {

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
        title: 'title',
        field_position: 'field_position',
        field_bio: {
          value: '<div></div>'
        }
      }
    }]
  }
  const mockTitle = '<div>title</div>'

  const createWrapper = (dataList: any)=>mount(
    <AppContainer>
      <Teams dataList={dataList} title={mockTitle} />
    </AppContainer>
  )

  let spyOnGetImage: any;
  beforeEach(() => {
    jest.useFakeTimers()
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
    jest.useRealTimers();
  });


  it('Should render correctly without crashing', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockDataList);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(spyOnGetImage).toHaveBeenCalledTimes(1)
  });

  it('Should not call getImage', async() => {
    const mockData = _.merge(_.cloneDeep(mockDataList.data[0]), {relationships: {field_photo: {data: null}}})
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper({data: [mockData]});
      jest.runAllTimers();
    })
    expect(spyOnGetImage).toHaveBeenCalledTimes(0)
    expect(wrapper!.find('.team-list').find('.row').children().length).toEqual(1)
  });
});