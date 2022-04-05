import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {MortgageCalculatorStep1Box} from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


jest.mock('react-bootstrap/Dropdown', () => {

  const Dropdown = ({ children }: {children: React.ReactNode}) => {
    return <div className='test_dropdown_'>{children}</div>;
  };

  Dropdown.Menu = ({ children, ...otherProps  }: {children: React.ReactNode})=>{
    return <div {...otherProps }>{ children }</div>;
  };

  Dropdown.Toggle = ({ children, ...otherProps  }: {children: React.ReactNode})=>{
    return <button {...otherProps }>{ children }</button>;
  };

  Dropdown.Item = ({ children, onClick }: {children: React.ReactNode, onClick: (e: React.MouseEvent) => void}) => {
    const click = (event: React.MouseEvent)=>{
      event.preventDefault();
      onClick(event)
    }
    return <a href='www.google.com' onClick = {(event) => {
      event.preventDefault()
      click(event)
    }}>{children}</a>;
  };

  return Dropdown
});

describe('MortgageCalculatorStep1Box testing', () => {

  const mockProps = {
    title: 'title',
    body: {processed: '<div></div>'}
  }


  const createWrapper = (data: any)=>mount(
    <AppContainer>
      <MortgageCalculatorStep1Box dataList={data} />
    </AppContainer>
  )

  let wrapper: ReactWrapper;
  beforeEach(() => {
    
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

  it('Should render box-form and btn-green-border', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!.find('.sub-title').text()).toEqual(mockProps.title);
    expect(wrapper!.find('.content-area').props().dangerouslySetInnerHTML!.__html).toContain(mockProps.body.processed)
    expect(wrapper!.find('.btn .btn-green .disabled').exists()).toBeTruthy()
  });

  it('Should select yes radio correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })

    wrapper!.find('#radio-are-you-a-client-yes').simulate('change')
    expect(wrapper!.find('#radio-are-you-a-client-yes').props().checked).toBeTruthy();

    wrapper!.find('#radio-is-it-a-new-build-yes').simulate('change')
    expect(wrapper!.find('#radio-is-it-a-new-build-yes').props().checked).toBeTruthy();
    expect(wrapper!.find('.btn .btn-green .disabled').exists()).toBeTruthy()
  });

  it('Should select no radio correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })

    wrapper!.find('#radio-are-you-a-client-no').simulate('change')
    expect(wrapper!.find('#radio-are-you-a-client-no').props().checked).toBeTruthy();

    wrapper!.find('#radio-is-it-a-new-build-no').simulate('change')
    expect(wrapper!.find('#radio-is-it-a-new-build-no').props().checked).toBeTruthy();
    expect(wrapper!.find('.btn .btn-green .disabled').exists()).toBeTruthy()
  });

  it('Should have not className disabled', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })

    wrapper!.find('#radio-are-you-a-client-yes').simulate('change')
    wrapper!.find('#radio-are-you-a-client-no').simulate('change')
    wrapper!.find('#radio-is-it-a-new-build-yes').simulate('change')
    wrapper!.find('#radio-is-it-a-new-build-no').simulate('change')

    wrapper!.find('input[placeholder="00 YEARS"]').simulate('change', {target: {value: 1111, validity: {valid: true}}})

    for (let index = 0; index < 12; index++) {
      wrapper!.find('a.btn-question').at(index).simulate('click')
    }
    for (let index = 0; index < 10; index++) {
      wrapper!.find('.isPrice').at(index).simulate('change', {target: {value: 1111, validity: {valid: true}}})
    }
    wrapper!.find('#radio-number-of-applicants-1').simulate('change')
    wrapper!.find('#radio-number-of-applicants-2').simulate('change')

    wrapper!.find('.test_dropdown_').at(0).find('a').at(0).simulate('click')
    wrapper!.find('.test_dropdown_').at(0).find('a').at(1).simulate('click')
    wrapper!.find('.test_dropdown_').at(0).find('a').at(2).simulate('click')

    wrapper!.find('.test_dropdown_').at(1).find('a').at(0).simulate('click')
    wrapper!.find('.test_dropdown_').at(1).find('a').at(1).simulate('click')
    wrapper!.find('.test_dropdown_').at(1).find('a').at(2).simulate('click')

    expect(wrapper!.find('.btn .btn-green .disabled').exists()).toBeFalsy()
  });
});