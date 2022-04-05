import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import BecomeAClientModal from '../index';
import { act } from 'react-dom/test-utils';


describe('BecomeAClientModal testing', () => {

  const mockProps = {
    titleData: {title: 'title', body: {processed: '<div></div>'}},
    dataList:[{
      attributes: {
        field_question: 'field_question',
        field_options: ['option1']}
    },{
      attributes: {
        field_question: 'field_question',
        field_options: ['option2']}
    }],
    onClose: () => {},
    onNext: () => {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <BecomeAClientModal {...data} />
  )

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render specific elements', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
      wrapper.update();
    })
    
    expect(wrapper.find('.left-txt').text()).toEqual(mockProps.titleData.title)
    expect(wrapper.find('.bold-txt').props().dangerouslySetInnerHTML!.__html).toContain(mockProps.titleData.body.processed)
    expect(wrapper.find('.bold-txt').props().dangerouslySetInnerHTML!.__html).toContain(mockProps.titleData.body.processed)
    expect(wrapper.find('[htmlFor="radio-are-you-looking-to-borrow-more-yes-0-0"]').text()).toContain(mockProps.dataList[0].attributes.field_options[0])
    
  });

  

  it('Should call onClose', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onClose: mockFunc}});
      jest.runAllTimers();
      wrapper.update();
    })

    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.btn-close').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
  });

  it('Should call onNext', async() => {
    const mockFunc = jest.fn()
    await act(async()=>{
      wrapper = createWrapper({...mockProps, ...{onNext: mockFunc}});
      jest.runAllTimers();
      wrapper.update();
    })
   
    expect(mockFunc).toHaveBeenCalledTimes(0)
    wrapper.find('.btn.btn-green').simulate('click')
    expect(mockFunc).toHaveBeenCalledTimes(1)
    wrapper.find('#radio-are-you-looking-to-borrow-more-yes-0-0').simulate('change', {target: {value: 'test'}})
    wrapper.find('.btn.btn-green-border').simulate('click')
  });
});
