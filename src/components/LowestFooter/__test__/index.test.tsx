import React from 'react';
import { mount } from 'enzyme';
import LowestFooter from '../index';


describe('Lowest Footer testing', () => {

  const mockDataList = { data: {
    attributes: {
      body: {
        value: '<div></div>'
      },
      field_download: [{
        uri: 'apple',
        title: ''
      },{
        uri: 'orange',
        title: ''
      }],
      field_social_media_links: [{
        uri: '',
        title: ''
      }],
      field_modern_slavery_statement: {
        uri: '',
        title: ''
      }
    }
  }}

  const createWrapper = ()=>mount(
      <LowestFooter dataList={mockDataList} />
    )

  it('Should render correctly without crashing', async() => {
    const wrapper = createWrapper();
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should have correct number of children', async() => {
    const wrapper = createWrapper();
    expect(wrapper.find('.footer-bottom-action-download').find('.logos').children().length).toEqual(mockDataList.data.attributes.field_download.length)
    expect(wrapper.find('.footer-bottom-action-social').find('.logos').children().length).toEqual(2 + mockDataList.data.attributes.field_social_media_links.length)
  });
});