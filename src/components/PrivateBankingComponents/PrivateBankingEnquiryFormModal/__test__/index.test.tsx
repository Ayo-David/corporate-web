import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import PrivateBankingEnquiryFormModal from '../index';
import { act } from 'react-dom/test-utils';

describe('PrivateBankingEnquiryFormModal testing', () => {

  const mockProps = {
    onClose: () => {},
    onRestart: () => {},
    onSubmit: () => {}
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <PrivateBankingEnquiryFormModal {...data} />
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should set first name correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();
    const firsName = 'first Name'
    wrapper.find('[placeholder="First name"]').simulate('change', {target: {value: firsName, validity: {valid: true}}})
    expect(wrapper.find('[placeholder="First name"]').props().value).toContain(firsName)
  });

  it('Should set last name correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();
    const lastName = 'last Name'
    wrapper.find('[placeholder="Last name"]').simulate('change', {target: {value: lastName, validity: {valid: true}}})
    expect(wrapper.find('[placeholder="Last name"]').props().value).toContain(lastName)
  });

  it('Should set email correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    wrapper.find('#radio-preferred-contact-method-email').simulate('change')

    const email = 'test111@google.com'
    wrapper.find('[placeholder="Email address"]').simulate('change', {target: {value: email, validity: {valid: true}}})
    expect(wrapper.find('[placeholder="Email address"]').props().value).toContain(email)
    expect(wrapper.find('.inputs.error').exists()).toBeFalsy()
  });

  it('Should not set email correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    wrapper.find('#radio-preferred-contact-method-email').simulate('change')

    const email = 'test111$google.com'
    wrapper.find('[placeholder="Email address"]').simulate('change', {target: {value: email, validity: {valid: true}}})
    expect(wrapper.find('[placeholder="Email address"]').props().value).toContain(email)
    expect(wrapper.find('.inputs.error').exists()).toBeTruthy()
  });

  it('Should set telephone correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    wrapper.find('#radio-preferred-contact-method-telephone').simulate('change')

    const phone = '1111-2222'
    wrapper.find('[placeholder="Telephone"]').simulate('change', {target: {value: phone, validity: {valid: true}}})
    expect(wrapper.find('[placeholder="Telephone"]').props().value).toContain(phone)
  });

  it('Should set read and accept correctly', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    wrapper.update();

    const checked = true
    wrapper.find('#check-readAndAccept-tablet').simulate('change', {target: {checked, validity: {valid: true}}})
    expect(wrapper.find('#check-readAndAccept-tablet').props().checked).toBe(checked)
    expect(wrapper.find('#check-readAndAccept-desktop').props().value).toBe(checked)

    wrapper.find('#check-readAndAccept-desktop').simulate('click')
    expect(wrapper.find('#check-readAndAccept-tablet').props().checked).toBe(!checked)
    expect(wrapper.find('#check-readAndAccept-desktop').props().value).toBe(!checked)
  });
});
