import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import PageWithSidebar from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../test/helper';

jest.mock('../../../components/Paragraph', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_paragraph">{children}</div>)
  }
})
jest.mock('../../PageLayout', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_page_layout" >{children}</div>)
  }
})
jest.mock('../../../components/TemplatePageSidebar', ()=>{
  const {useState, useEffect} = require('react');
  return ({children, onSelectItem}: {children: React.ReactNode, onSelectItem: (arg: string) => void})=>{
    const [select, setSelect] = useState(false);
    useEffect(() => {
      if(select){
        onSelectItem('test')
      }
    }, [select, onSelectItem]);
    
    return (<div id="mock_template_page_sidebar" onClick={()=>{setSelect(true)}}>{children}</div>)
  }
})


describe('PageWithSidebar testing', () => {

  const mockProps = {
    pageId: 'AboutCynergyBank',
    parentBreadcrumb: [],
    parentField: 'AboutCynergyBank',
    drupalPageTemplate: {AboutCynergyBank: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01', field_url_alias: 'field_url_alias'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01'}
      }]
    }},
    headerMenus: { parentField: {} },
    paragraphsBaseUrl: 'url',
    bannerBgImageSizeOverride: 'backgroundSize',
    bannerBgImagePositionOverride: 'backgroundPosition',
    bannerMaskSizeOverride: 'webkitMaskSize',
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PageWithSidebar {...data} />
    </AppContainer>
  )

  let mockGetDupalPageTemplateData: any;
  beforeEach(() => {
    mockGetDupalPageTemplateData = jest.spyOn(dataSvc, 'getDupalPageTemplateData').mockResolvedValue({})
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper).not.toEqual(undefined);
  });

  it('Should render elements correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();
    
    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
    wrapper.find('#mock_template_page_sidebar').simulate('click')
    
  });
  
  it('Should render elements correctly for non pageId', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.pageId = 'AboutCynergyBank1';
    data.drupalPageTemplate = {AboutCynergyBank1: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01', field_url_alias: 'field_url_alias'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01', field_url_alias: '/'}
      }]
    }};

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });

  it('Should render elements correctly for AboutUsOurHistoryPage', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.pageId = 'AboutUsOurHistoryPage';
    data.drupalPageTemplate = {AboutUsOurHistoryPage: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01', field_url_alias: 'field_url_alias'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01', field_url_alias: '/'}
      }]
    }};

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });
  
  it('Should render elements correctly for AboutUsCeoMessagePage', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.pageId = 'AboutUsCeoMessagePage';
    data.drupalPageTemplate = {AboutUsCeoMessagePage: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01', field_url_alias: 'field_url_alias'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01', field_url_alias: '/'}
      }]
    }};

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });

  it('Should render elements correctly for AboutUsMeetTheBoardPage', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.pageId = 'AboutUsMeetTheBoardPage';
    data.drupalPageTemplate = {AboutUsMeetTheBoardPage: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01', field_url_alias: 'field_url_alias'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01', field_url_alias: '/'}
      }]
    }};

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });

  xit('Should not render container', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.drupalPageTemplate = null;

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeFalsy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('#mock_template_page_sidebar').exists()).toBeFalsy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });
});