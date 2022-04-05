import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import BigCardWithImage from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../../services/dataSvc';
import { AppContainer } from '../../../../test/helper';

describe('Big Card Width Image testing', () => {

  const mockDataList = {
    id: '22f06d2ea25b49a8a21e4e11adc451c1',
    relationships: {
      field_banner_image: {
        data: {
          id: '9abfe5ef76c9492b811d55d56dcc4567'
        }
      }
    },
    attributes: {
      field_heading: {
        value: '<div></div>'
    }}
  }
  const mockColor = 'color'

  const createWrapper = (dataList: any)=>mount(
    <AppContainer>
      <BigCardWithImage dataList={dataList} color={mockColor} />
    </AppContainer>
  )

  let spyOnGetDealSheetThumbnail: any;
  beforeEach(() => {
    spyOnGetDealSheetThumbnail = jest.spyOn(dataSvc, 'getDealSheetThumbnail').mockResolvedValue({
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
    expect(spyOnGetDealSheetThumbnail).toHaveBeenCalledTimes(1)
  });

  it('Should not call getDealSheetThumbnail', async() => {
    const mockData = _.merge(_.cloneDeep(mockDataList), {relationships: {field_banner_image: {data: {id: null}}}})
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockData);
    })
    expect(spyOnGetDealSheetThumbnail).toHaveBeenCalledTimes(0)
    expect(wrapper!.find("img").prop("src")).toEqual('');
  });
});