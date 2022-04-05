import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import MortgageCalculatorStep2Box from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


describe('MortgageCalculatorStep2Box testing', () => {

  const mockProps = {
    dataList: {},
    onClickGetInTouch: ()=>{
    }
  }


  let wrapper: ReactWrapper;
  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <MortgageCalculatorStep2Box dataList={data.dataList} onClickGetInTouch={data.onClickGetInTouch} />
    </AppContainer>
  )


  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should call onClickGetInTouch', async() => {
    const mockFunc = jest.fn(()=>{});
    const data = {data: {}, onClickGetInTouch: mockFunc}

    await act(async()=>{
      wrapper = createWrapper(data);
    })

    for (let index = 0; index < 7; index++) {
      wrapper!.find('a').at(index).simulate('click')
    }
    
    expect(mockFunc.mock.calls.length).toBe(1)
  });
});