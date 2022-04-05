import React from 'react';
import * as _ from 'lodash';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../services/dataSvc';
import TopBanner from '../index';
import { act } from 'react-dom/test-utils';


describe('TopBanner testing', () => {

  const mockProps = {
    titlePage: 'titlePage',
    type: 'relationship-banner',
    onClickButton: ()=>{},
    bgImageSizeOverride: '',
    bgImagePositionOverride: '',
    bannerMaskSizeOverride: '',
    dataList: {
      data: {
        attributes: {
          field_masking_on_image: 'field_masking_on_image',
          field_masking_position: 'field_masking_position',
          field_banner_text: 'field_banner_text',
          created: '2022-01-01',
          field_formatted_heading: {
            value: 'value',
            processed: '<div></div>'
          },
          field_formatted_subtitle: {
            value: 'value'
          },
          field_title: 'field_title',
          field_subtitle: '<div></div>',
          field_cta_button_link: {
            uri: 'uri',
            title: 'title'
          }
        },
        relationships: {
          field_banner_image: {
            data: {
              id: 'id'
            }
          }
        }
      }
    },
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TopBanner {...data} />
  )


  const mockContentData = {
    data: {attributes: {uri: {url: 'url'}}}
  }

  let mockGetImage: any;
  beforeEach(() => {
    mockGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue(mockContentData)
  })

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it.each(['Teal', 'Pink', 'Grey', ''])('Should render elements correctly with maskingOnImage', async(maskingOnImage) => {
    const data = _.cloneDeep(mockProps)
    data.dataList.data.attributes.field_masking_on_image = maskingOnImage
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    // expect(wrapper.find('.title').text()).toContain(mockProps.dataList.attributes.field_title)
    // expect(wrapper.find('.item').at(0).props().href).toBe(mockContentData[0].attributes.field_single_link.uri)
    expect(mockGetImage).toHaveBeenCalledTimes(1)
  });

  it.each(['Right Top', 'Right Center', 'Left Bottom', 'Left Center'])('Should render elements correctly with maskingPosition', async(maskingPosition) => {
    const mockFunc = jest.fn();
    const data = _.cloneDeep(mockProps)
    data.dataList.data.attributes.field_masking_position = maskingPosition
    data.onClickButton = mockFunc;
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetImage).toHaveBeenCalledTimes(1)
    wrapper.find('.btn.btn-black').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
  });

  it.each(['personal-banner', 'relationship-banner', 'home-banner', 'fee-and-rates-banner', 'page-template-banner', 'business-banner', 'private-banking-banner', 'fee-and-rates-banner', 'loan-completion', 'about-us-ethics-values-banner', ''])('Should render elements correctly with type', async(type) => {
    const data: any = _.cloneDeep(mockProps)
    data.type= type
    data.dataList.data.attributes.field_masking_position = type === 'home-banner' ? 'None' : null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetImage).toHaveBeenCalledTimes(1)
  });

  it.each(['page-template-banner', 'fee-and-rates-banner', 'loan-completion', 'about-us-ethics-values-banner', 'title-big-txt'])('Should render elements correctly with type', async(type) => {
    const data: any = _.cloneDeep(mockProps)
    data.type = type
    data.dataList.data.attributes.field_formatted_heading.value = null
    data.dataList.data.attributes.field_title = null
    data.dataList.data.attributes.field_formatted_subtitle = null
    data.dataList.data.attributes.field_banner_text = null;
    data.dataList.data.attributes.field_subtitle = null
    data.dataList.data.attributes.field_title = null;
    data.bannerMaskSizeOverride = 'bannerMaskSizeOverride'

    data.dataList.data.attributes.field_cta_button_link = null
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    expect(mockGetImage).toHaveBeenCalledTimes(1)
  });
});
