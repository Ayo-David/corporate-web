import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import DetailListRow from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


jest.mock('../../BigCardWithImage', ()=>()=>{
  return (<div></div>)
})

jest.mock('../../SmallCardWithImage', ()=>()=>{
  return (<div></div>)
})

describe('Deal List Row testing', () => {

  const mockItem = {
    id: '22f06d2ea25b49a8a21e4e11adc451c1',
    relationships: {
      field_banner_image: {
        data: {
          id: '9abfe5ef76c9492b811d55d56dcc4567'
        }
      }
    },
    attributes: {
      field_heading: {
        value: '<div></div>'
    }}
  }

  const createWrapper = (item: any, num: number)=>mount(
    <AppContainer>
      <DetailListRow item={item} num={num} />
    </AppContainer>
  )


  it('Should render correctly without crashing', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper([mockItem], 1);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should left have no child', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper([], 1);
    })
    expect(wrapper!.find('.left').children().length).toEqual(0)
    expect(wrapper!.exists('.flex-reverse')).toBeTruthy()
  });

  it('Should left have one child and right have two children', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper([mockItem, mockItem, mockItem], 2);
    })
    expect(wrapper!.find('.right').children().length).toEqual(2)
    expect(wrapper!.exists('.flex-reverse')).toBeFalsy()
  });
});