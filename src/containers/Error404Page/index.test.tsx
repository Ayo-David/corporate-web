import React from 'react';
import '../../test/dataSvcHelper'
import { AppContainer } from '../../test/helper';
import { mount } from 'enzyme';
import Error404Page from '../Error404Page';
import { act } from "react-dom/test-utils";
import ErrorBox from  '../../components/Error404Components/ErrorBox'


jest.mock('../../components/Header', ()=>{
  return ({children}: {children: React.ReactNode})=>{
    return (<div id="mock_header">{children}</div>)
  }
})

function createHeaderItems(headerTitle: string, url: string) {
  return {
    data: [{
      attributes: {
        field_url: {
          uri: `${url}1`,
        },
        title: `${headerTitle} 1`,
        field_order: 1,
      },
      id: '1',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }, {
      attributes: {
        field_url: {
          uri: `${url}2`,
        },
        title: `${headerTitle} 2`,
        field_order: 2,
      },
      id: '2',
      links: {self: ''},
      relationships: {},
      type: 'menu_item',
    }],
    included: [],
    jsonapi: {
      version: '',
      meta: null,
    },
    links: {
      self: '',
    },
  }
}

function createProps() {
  return {
    headerMenus: {
      'Business': createHeaderItems('Business', 'businessLink')
    },
    error404Content: {
      data: {
        attributes: {
          body: {
            processed: 'This is not the page you are looking for.'
          }
        }
      }
    }
  }
}

function initDataSvc() {

}

describe('Error404 Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps()
    initDataSvc()
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Error404Page {...props} /></AppContainer>);
    })
    await wrapper!.update();
    
    expect(wrapper!.find(`#mock_header`)).toHaveLength(1)
    expect(wrapper!.find(ErrorBox)).toHaveLength(1)
  })
})
