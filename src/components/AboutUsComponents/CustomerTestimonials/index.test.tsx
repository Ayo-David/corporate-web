import React from 'react';
import dataSvc from '../../../services/dataSvc';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import CustomerTestimonials from '../CustomerTestimonials';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function getMockProps(position: string) {
  return {
    dataList: {
      id: 'foo',
      attributes: {
        field_title: 'FooFieldTitle',
        field_text: {
          value: 'FooFieldText'
        },
        field_single_link: {
          uri: 'https://uritestfoo.com/FooSingleLinkUri',
          title: 'FooSingleLinkTitle'
        }
      }
    },
    position
  }
}

function initMockDataSvc(imageId: string, videoUrl: string) {
  mockedDataSvc.getImage3.mockResolvedValue({
    data: {
      id: imageId
    }
  })
  
  mockedDataSvc.getImageVideo.mockResolvedValue({
    data: {
      attributes: {
        uri: {
          url: videoUrl
        }
      }
    }
  })
}

describe('CustomerTestimonials Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load the videos from data list', async () => {
    const props = getMockProps('foo');
    initMockDataSvc('mockImageId', 'mockVideoUrl')
    
    await act(async () => {
      await mount(<CustomerTestimonials {...props} />);
    })
    
    expect(mockedDataSvc.getImage3.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage3.mock.calls[0]).toEqual(['foo']);
    expect(mockedDataSvc.getImageVideo.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImageVideo.mock.calls[0]).toEqual(['mockImageId']);
  })
  
  it('should gracefully handle empty datalist', async() => {
    initMockDataSvc('testId', 'testUrl')
    const props = {
      dataList: null,
      position: '',
    }
    
    await act(async () => {
      await mount(<CustomerTestimonials {...props} />);
    })
    expect(mockedDataSvc.getImage3.mock.calls).toHaveLength(0);
    expect(mockedDataSvc.getImageVideo.mock.calls).toHaveLength(0);
  })
  
  it('should render position left properly', async() => {
    const props = getMockProps('left');
    initMockDataSvc('mockImageIdl', 'testpath.mp4')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CustomerTestimonials {...props} />);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`.lefts .video-box`)).not.toBeNull();
    expect(wrapper!.find(`.rights .video-box`)).toHaveLength(0);
    expect(wrapper!.find(`video > source[type="video/mp4"]`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`).prop('src')).toEqual('https://cms.dev.cynfusion.net/testpath.mp4');
  })
  
  it('should render position right properly', async() => {
    const props = getMockProps('right');
    initMockDataSvc('mockImageIdr', 'testpath.mp4')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CustomerTestimonials {...props} />);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`.lefts .video-box`)).toHaveLength(0);
    expect(wrapper!.find(`.rights .video-box`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`).prop('src')).toEqual('https://cms.dev.cynfusion.net/testpath.mp4');
  })
  
  it('should respect isFisrt flag for left position', async() => {
    const props = Object.assign(getMockProps('left'), {isFisrt: true});
    initMockDataSvc('mockImageIdr', 'testpath2.mp4')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CustomerTestimonials {...props} />);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`.is-first`).length).toBeGreaterThan(0);
    expect(wrapper!.find(`.rights .video-box`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`).prop('src')).toEqual('https://cms.dev.cynfusion.net/testpath2.mp4');
  })
  
  it('should respect isFisrt flag for right position', async() => {
    const props = Object.assign(getMockProps('right'), {isFisrt: true});
    initMockDataSvc('mockImageIdr', 'testpath3.mp4')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CustomerTestimonials {...props} />);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`.is-first`).length).toBeGreaterThan(0);
    expect(wrapper!.find(`.lefts .video-box`)).toHaveLength(0);
    expect(wrapper!.find(`.rights .video-box`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`).prop('src')).toEqual('https://cms.dev.cynfusion.net/testpath3.mp4');
  })
  
  it('should handle the about us type with proper style', async() => {
    const props = Object.assign(getMockProps('right'), {type: 'aboutUs'});
    initMockDataSvc('mockImageIdr', 'testpath4.mp4')
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<CustomerTestimonials {...props} />);
    })
    
    await wrapper!.update();
    expect(wrapper!.find(`.about-us-products`).length).toBeGreaterThan(0);
    expect(wrapper!.find(`video > source[type="video/mp4"]`)).not.toBeNull();
    expect(wrapper!.find(`video > source[type="video/mp4"]`).prop('src')).toEqual('https://cms.dev.cynfusion.net/testpath4.mp4');
  })
})
