import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import PageLayout from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../../components/TopBanner', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_top_banner" >{children}</div>)
  }
})
jest.mock('../../../components/Footer', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_footer">{children}</div>)
  }
})
jest.mock('../../../components/LowestFooter', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_lowest_footer">{children}</div>)
  }
})


describe('PageLayout testing', () => {

  const mockProps = {
    parentField: 'About Us',
    breadcrumb: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Private Banking',
        url: '/private_banking/meet_the_team',
      },
      {
        label: 'Borrowing',
        url: '#',
      },
      {
        label: 'Support',
        url: '#',
      },
      {
        label: ' Mortgage Calculator',
        url: '#',
      },
    ],
    banner: {},
    title: 'title',
    headerMenus: {
      "About Us": {}
    },
    footer: {
    },
    dataAction: {
      getHeaderMenuData: ()=>{},
      getFooterData: ()=>{}
    },
    bannerBgImageSizeOverride: '',
    bannerBgImagePositionOverride: '',
    bannerMaskSizeOverride: ''
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PageLayout {...data} />
    </AppContainer>
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    const data = _.cloneDeep(mockProps)
    data.dataAction.getHeaderMenuData = jest.fn()
    data.dataAction.getFooterData = jest.fn()
    
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();
    
    expect(wrapper.find('#mock_header').exists()).toBeTruthy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeTruthy()
    expect(wrapper.find('#mock_footer').exists()).toBeTruthy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeTruthy()
    expect(data.dataAction.getHeaderMenuData).toHaveBeenCalledTimes(1)
    expect(data.dataAction.getFooterData).toHaveBeenCalledTimes(1)
  });

  it('Should not render elements', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.headerMenus = null;
    data.banner = null
    data.footer = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_header').exists()).toBeFalsy()
    expect(wrapper.find('#mock_top_banner').exists()).toBeFalsy()
    expect(wrapper.find('#mock_footer').exists()).toBeFalsy()
    expect(wrapper.find('#mock_lowest_footer').exists()).toBeFalsy()
  });
});