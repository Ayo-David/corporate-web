import React from 'react';
import * as _ from 'lodash'
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import PageWithoutSidebar from '../index';
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


describe('PageWithoutSidebar testing', () => {

  const mockProps = {
    pageId: 'pageId',
    parentBreadcrumb: [],
    parentField: 'parentField',
    drupalPageTemplate: {pageId: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner',
        attributes: {created: '2022-01-01'}
      },{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01'}
      }]
    }},
    headerMenus: { parentField: {} },
    bannerBgImageSizeOverride: 'backgroundSize',
    bannerBgImagePositionOverride: 'backgroundPosition',
    bannerMaskSizeOverride: 'webkitMaskSize',
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <PageWithoutSidebar {...data} />
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
    expect(wrapper.find('.container.container-page-without-sidebar').exists()).toBeTruthy()
    expect(wrapper.find('.modified-date').exists()).toBeFalsy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });

  it('Should render modified-date', async() => {
    const data = _.cloneDeep(mockProps)
    data.drupalPageTemplate = {pageId: {
      data: {
        attributes: {
          title: 'title'
        }
      },
      included: [{
        type: 'paragraph--banner1',
        attributes: {created: '2022-01-01'}
      }]
    }};

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeTruthy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('.container.container-page-without-sidebar').exists()).toBeTruthy()
    expect(wrapper.find('.modified-date').exists()).toBeTruthy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });

  it('Should not render container', async() => {
    const data: any = _.cloneDeep(mockProps)
    data.drupalPageTemplate = null;

    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(wrapper.find('#mock_paragraph').exists()).toBeFalsy()
    expect(wrapper.find('#mock_page_layout').exists()).toBeTruthy()
    expect(wrapper.find('.container.container-page-without-sidebar').exists()).toBeFalsy()
    expect(wrapper.find('.modified-date').exists()).toBeFalsy()
    expect(mockGetDupalPageTemplateData).toHaveBeenCalledTimes(1)
  });
});