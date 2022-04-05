import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ThankYouForReachingUsModal from '../index';
import { act } from 'react-dom/test-utils';


describe('ThankYouForReachingUsModal testing', () => {

  const mockProps = {
    dataList: {
      data: {
        attributes: {
          title: 'title',
          body: {
            processed: '<div></div>'
          }
        }
      }
    },
    onClose: ()=>{}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <ThankYouForReachingUsModal {...data} />
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);

    expect(wrapper.find('.left-txt').text()).toEqual(mockProps.dataList.data.attributes.title)
    expect(wrapper.find('.txt').props().dangerouslySetInnerHTML?.__html).toContain(mockProps.dataList.data.attributes.body.processed)
  });

  it('Should call callback', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClose: mockFunc}});
    })
    wrapper.update()

    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.btn.btn-green').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
  });
});