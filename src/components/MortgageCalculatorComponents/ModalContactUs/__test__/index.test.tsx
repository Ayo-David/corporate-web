import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {ModalContactUs} from '../index';
import { act } from 'react-dom/test-utils';
import dataSvc from '../../../../services/dataSvc';


describe('Modal Contact Us testing', () => {

  const mockProps = {
    open: true,
    onClose: ()=>{
    }
  }


  const createWrapper = (data: any)=>shallow(
    <ModalContactUs open={data.open} onClose={data.onClose} />
  )

  let spyOnGetThanksNoteData: any;
  beforeEach(() => {
    spyOnGetThanksNoteData = jest.spyOn(dataSvc, 'getThanksNoteData').mockResolvedValue({
      data: {
        attributes: {
          body: {
            value: '<div></div>'
          }
        }
      }
    })
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('Should render correctly without crashing', async() => {
    let wrapper: ShallowWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should render box-form and btn-green-border', async() => {
    let wrapper: ShallowWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!.find('.box-form').exists()).toBeTruthy();
    expect(wrapper!.find('.btn-green-border').exists()).toBeTruthy();
    expect(wrapper!.find('.btn-green').text()).toEqual('Submit')
    expect(spyOnGetThanksNoteData).toHaveBeenCalledTimes(0)
  });

  it('Should call onClose', async() => {
    const mockFunc = jest.fn(()=>{});
    const data = {open: true, onClose: mockFunc}
    let wrapper: ShallowWrapper;
    await act(async()=>{
      wrapper = createWrapper(data);
    })

    wrapper!.find('.btn.btn-close').simulate('click')
    expect(mockFunc.mock.calls.length).toBe(1)
    expect(spyOnGetThanksNoteData).toHaveBeenCalledTimes(0)
  });

  it('Should submit form with email', async() => {
    let wrapper: ShallowWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockProps);

      const mockFirstName = {target: {value: 'first name', validity: {valid: true}}}
      wrapper!.find('input[placeholder="First name"]').at(0).simulate('change', mockFirstName)
      expect(wrapper!.find('input[placeholder="First name"]').at(0).props().value).toEqual(mockFirstName.target.value)

      const mockLastName = {target: {value: 'last name', validity: {valid: true}}}
      wrapper!.find('input[placeholder="Last name"]').at(0).simulate('change', mockLastName)
      expect(wrapper!.find('input[placeholder="Last name"]').at(0).props().value).toEqual(mockLastName.target.value)

      wrapper!.find('#radio-text-input-resting-email').at(0).simulate('change')

      const mockEmail = {target: {value: 'faker@google.com', validity: {valid: true}}}
      wrapper!.find('input[placeholder="Email address"]').at(0).simulate('change', mockEmail)
      expect(wrapper!.find('input[placeholder="Email address"]').at(0).props().value).toEqual(mockEmail.target.value)

      wrapper!.find('.btn.btn-green').at(0).simulate('click')
    })

    expect(spyOnGetThanksNoteData).toHaveBeenCalledTimes(1)
  });

  it('Should submit form with phone number', async() => {
    let wrapper: ShallowWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockProps);

      const mockFirstName = {target: {value: 'first name', validity: {valid: true}}}
      wrapper!.find('input[placeholder="First name"]').at(0).simulate('change', mockFirstName)
      expect(wrapper!.find('input[placeholder="First name"]').at(0).props().value).toEqual(mockFirstName.target.value)

      const mockLastName = {target: {value: 'last name', validity: {valid: true}}}
      wrapper!.find('input[placeholder="Last name"]').at(0).simulate('change', mockLastName)
      expect(wrapper!.find('input[placeholder="Last name"]').at(0).props().value).toEqual(mockLastName.target.value)

      wrapper!.find('#radio-text-input-resting-phone').at(0).simulate('change')
      
      const mockPhoneNumber = {target: {value: '11111-222222', validity: {valid: true}}}
      wrapper!.find('input[placeholder="Phone number"]').at(0).simulate('change', mockPhoneNumber)
      expect(wrapper!.find('input[placeholder="Phone number"]').at(0).props().value).toEqual(mockPhoneNumber.target.value)

      wrapper!.find('.btn.btn-green').at(0).simulate('click')
    })

    expect(spyOnGetThanksNoteData).toHaveBeenCalledTimes(1)
  });
});