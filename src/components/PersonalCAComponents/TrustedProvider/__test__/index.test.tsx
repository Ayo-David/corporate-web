import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import dataSvc from '../../../../services/dataSvc';
import TrustedProvider from '../index';
import { act } from 'react-dom/test-utils';


describe('TrustedProvider testing', () => {

  const mockProps = {
    dataList: {
      data: {
        relationships: {
          field_logo_link: {
            links: {
              related: {
                href: 'https://www.google.com'
              }
            }
          },
        },
        attributes: {
          title: 'title',
          body: {processed: '<div></div>'}
        }
      }
    }
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TrustedProvider {...data} />
  )

  let mockGetImage: any, mockGetData: any;
  beforeEach(() => {
    mockGetData = jest.spyOn(dataSvc, 'getData').mockResolvedValue({
      data: [{
        relationships: {
          field_media_logo: {
            data: {
              id: 'id'
            }
          }
        }
      }]})

    mockGetImage = jest.spyOn(dataSvc, 'getImage').mockResolvedValue({
      data: {
        relationships: {
          field_media_logo: {
            data: {
              id: 'id'
            }
          }
        },
        attributes: {
          uri: {
            url:'url'
          }
        }
      }});
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

  it('Should render image', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    expect(wrapper!.find('img[alt="logo"]').exists()).toBeTruthy();
    expect(mockGetData).toHaveBeenCalledTimes(1)
    expect(mockGetImage).toHaveBeenCalledTimes(1)
  });

  it('Should not render image', async() => {
    await act(async()=>{
      // @ts-ignore
      wrapper = createWrapper({dataList: null});
    })
    wrapper.update();

    expect(wrapper!.find('img[alt="logo"]').exists()).toBeFalsy();
    expect(mockGetData).toHaveBeenCalledTimes(0)
    expect(mockGetImage).toHaveBeenCalledTimes(0)
  });
});