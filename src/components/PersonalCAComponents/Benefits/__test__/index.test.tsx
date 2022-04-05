import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import Benefits from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


describe('Benefits testing', () => {

  const mockProps = {
    data: {
      data: [
        {
          type: 'paragraph--image_with_long_text',
          imageUrl: '',
          attributes:{
            field_titles: 'field_titles',
            field_text: { processed: '<a href="#javascript"/>'}
          },
          relationships: { field_images: {data: {id: 'id'}} }
        },
        {
          type: 'paragraph--image_with_long_text',
          imageUrl: '',
          attributes:{
            field_titles: 'field_titles',
            field_text: { processed: '<a href="#javascript"/>'}
          },
          relationships: { field_images: {data: {id: 'id'}} }
        },

        {
          type: 'paragraph--cards_with_link_text',
          imageUrl: '',
          attributes:{
            field_titles: 'field_titles',
            field_text: { processed: '<div></div'}
          },
          relationships: { field_text_with_link: {links: {related: {href: 'http://www.google.com'} }}}
        },
      ]
    },
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <AppContainer>
      <Benefits {...data} />
    </AppContainer>
  )

  let mockGetImage: any, mockGetData: any;
  beforeEach(() => {
    mockGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        field_titles: 'field_titles',
        attributes: {
          uri: {
            url: 'url'
          }
        }
      }
    })
    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue(
      {data: [{
        attributes: { field_description: '', field_single_link: {uri: 'internal'}}
      }]}
    )
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render image and cards', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(wrapper!.find('.personal-account-benefits').exists()).toBeTruthy();
    expect(wrapper!.find('.col-md-6.col-sm-12.align-items-center.d-flex.flex-column').exists()).toBeTruthy();
    expect(mockGetImage).toHaveBeenCalledTimes(2)
    expect(mockGetData).toHaveBeenCalledTimes(1)
  });

  it('Should contentClickHandler', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    wrapper!.find('.field_text').at(0).simulate('click')
    expect(wrapper!.find('.personal-account-benefits').exists()).toBeTruthy();
    expect(wrapper!.find('.col-md-6.col-sm-12.align-items-center.d-flex.flex-column').exists()).toBeTruthy();
    expect(mockGetImage).toHaveBeenCalledTimes(2)
    expect(mockGetData).toHaveBeenCalledTimes(1)
  });
});