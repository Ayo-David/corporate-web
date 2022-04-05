import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TitleBox from '../index';
import { act } from 'react-dom/test-utils';


describe('TitleBox testing', () => {

  const mockProps = {
    dataList: '<div></div>',
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <TitleBox {...data} />
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);

    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.title-txt').props().dangerouslySetInnerHTML?.__html).toContain('<div></div>')
  });
});