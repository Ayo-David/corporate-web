import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../../services/dataSvc';
import TopBanner from '../index';

jest.mock('../../../../services/ConfigService', ()=>{
  class ConfigService{
    static getConfig() {
      return {
        DATE_FORMAT: 'DD MMMM YYYY',
        CMS_IMAGE_URL: 'https://cms.dev.cynfusion.net',
        CMS_API_URL: 'https://cms.dev.cynfusion.net'
      }
   }
  }
  return {ConfigService};
})

describe('TopBanner testing', () => {

  const mockProps = {
    dataList: {
      data: {
        attributes: {
          created: '2022-01-10',
          field_snippet: {
            value: '<div></div>'
        }},
        relationships: {
          field_media_image: {
            data: {
              id: 'c84d4fa5-2d22-4207-a05d-d31a45f58fcf',
              attributes: {
                field_snippet: {
                  value: '<div></div>'}}
      }}}}
    },
    onReadArticleClick: ()=>{}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TopBanner {...data} />
  )

  let spyOnGetImage: any;
  beforeEach(() => {
    spyOnGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        attributes: {
          uri: {
            url: '/jsonapi/media/video/f9eea4c9-1f72-4412-bc2e-4b9158908a3e/field_media_video_file'
          }
        }
      }
    })
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

  it('Should call callback', async() => {
    const mockFunc = jest.fn(()=>{})
    const data = {...mockProps, ...{onReadArticleClick: mockFunc}};
    await act(async()=>{
      wrapper = createWrapper(data);
    })
    wrapper.update();

    wrapper!.find('a').at(0).simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(spyOnGetImage).toHaveBeenCalledTimes(1)
  });
});