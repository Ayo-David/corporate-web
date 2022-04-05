import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as _ from 'lodash';
import NewsArticlesList from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


describe('NewsArticlesList testing', () => {

  const mockProps = {
    dataList: {
      data: [{
        attributes: {
          field_display_image: 'yes',
          title: 'title1',
          changed: '2022-01-01',
          url: ''
        },
        id: '',
        links: {
          self: ''
        },
        relationships: {},
        type: '',
      },{
        attributes: {
          field_display_image: 'no',
          title: 'title2',
          changed: '2022-01-01',
          url: ''
        },
        id: '',
        links: {
          self: ''
        },
        relationships: {},
        type: '',
      }],
      included: [{
        attributes: {},
        id: '',
        links: {
          self: ''
        },
        relationships: {},
        type: '',
      }],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    },
    sectionRef: React.createRef(),
    hideBigCards: true,
    showAll: true,
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <AppContainer>
      <NewsArticlesList {...data} />
    </AppContainer>
  )


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should hide big cards', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!.find('.general-content.img-style.black-bg').exists()).toBeFalsy();
    expect(wrapper!.find('.col.col-md-6').exists()).toBeFalsy();
  });

  it('Should show big cards', async() => {
    await act(async()=>{
      wrapper = createWrapper({...mockProps, hideBigCards: false});
    })
    expect(wrapper!.find('.general-content.img-style.black-bg').exists()).toBeTruthy();
    expect(wrapper!.find('.col.col-md-6').exists()).toBeTruthy();
  });

  it('Should show big cards with data.length = 0', async() => {
    let data = _.cloneDeep(mockProps)
    data = {...data, hideBigCards: false}
    data.dataList.data = [];
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    expect(wrapper!.find('.general-content.img-style.black-bg').exists()).toBeFalsy();
    expect(wrapper!.find('.col.col-md-6').exists()).toBeFalsy();
  });

  it('Should load more', async() => {
    const data = _.cloneDeep(mockProps)
    data.dataList.data.push({
      attributes: {
        field_display_image: 'yes',
        title: 'title3',
        changed: '2022-01-01',
        url: ''
      },
      id: '',
      links: {
        self: ''
      },
      relationships: {},
      type: '',
    })
    await act(async()=>{
      wrapper = createWrapper({...data, showAll: false, hideBigCards: true});
    })
    expect(wrapper!.find('.load-more').exists()).toBeTruthy();

    wrapper!.find('.load-more-btn').simulate('click')

    expect(wrapper!.find('.load-more').exists()).toBeFalsy();
    expect(wrapper!.find('.container').find('.row').exists()).toBeTruthy();
  });

});