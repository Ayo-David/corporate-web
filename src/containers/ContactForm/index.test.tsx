import React from 'react';
import dataSvc from '../../services/dataSvc';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ContactForm from '../ContactForm';
import { act } from "react-dom/test-utils";
import FormStep1 from '../../components/ContactFormComponents/FormStep1';
import FormStep2 from '../../components/ContactFormComponents/FormStep2';
import Confirmation from '../../components/ContactFormComponents/Confirmation';

jest.mock('../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

jest.mock('../../components/ContactFormComponents/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})
jest.mock('../../components/ContactFormComponents/FormStep1', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_formStep1">{children}</div>)
  }
})
jest.mock('../../components/ContactFormComponents/FormStep2', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_formStep2">{children}</div>)
  }
})
jest.mock('../../components/ContactFormComponents/Confirmation', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_confirmation">{children}</div>)
  }
})

function createProps() {
  return {
    contactFormContent: {
      data: {
        attributes: null,
        id: '',
        links: {
          self: '',
        },
        relationships: {
          node_type: null,
          revision_uid: null,
          uid: null,
          field_components: null
        },
        type: 'node--contact_form_data'
      },
      included: [],
      jsonapi: {
        version: '',
        meta: null,
      },
      links: {
        self: '',
      },
    },
  }
}

function initDataSvc() {
  mockedDataSvc.getContactFormContentData.mockResolvedValue({
    data: {
      attributes: null,
      id: '',
      links: {
        self: '',
      },
      relationships: {
        node_type: null,
        revision_uid: null,
        uid: null,
        field_components: null
      },
      type: 'node--contact_form_data'
    },
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  })
}

describe('ContactForm Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ContactForm {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_formStep1`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_formStep2`)).toHaveLength(0)
    expect(wrapper!.find(`#mock_confirmation`)).toHaveLength(0)
  })
  
  it('should go to step 2 properly', async () => {
    const props = createProps()
    initDataSvc()
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ContactForm {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => {
        wrapper.find(FormStep1).at(0).props().setStepIndex(2)
    })
    await wrapper!.update();

    expect(wrapper!.find(`#mock_formStep1`)).toHaveLength(0)
    expect(wrapper!.find(`#mock_formStep2`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_confirmation`)).toHaveLength(0)
  })

  it('should show confirmation', async () => {
    const props = createProps()
    initDataSvc()
  
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ContactForm {...props} /></AppContainer>);
    })
    await wrapper!.update();
    await act(async () => {
        wrapper.find(FormStep1).at(0).props().setStepIndex(2)
    })
    await wrapper!.update();
    await act(async () => {
        wrapper.find(FormStep2).at(0).props().setShowConfirmation(true)
    })
    await wrapper!.update();

    expect(wrapper!.find(`#mock_formStep1`)).toHaveLength(0)
    expect(wrapper!.find(`#mock_formStep2`)).toHaveLength(1)
    expect(wrapper!.find(`#mock_confirmation`)).toHaveLength(1)
    
    await act(async () => {
        wrapper.find(Confirmation).at(0).props().onClose()
    })
    await wrapper!.update();
  })
})

