import React from 'react';
import { AppContainer } from '../../test/helper';
import { mount } from 'enzyme';
import Header from '../Header';
import { act } from "react-dom/test-utils";
import Modal from 'react-bootstrap/Modal';

//const mockSetPageTemplate = jest.fn();
const mockDataAction = {
  getHeaderMenuData: jest.fn()
}

jest
  .spyOn(document.documentElement, 'clientWidth', 'get')
  .mockImplementation(() => 1000);

function createProps(activeMenu: string, headers: any, hasShadow: boolean = false) {
  return {
    activeMenu,
    hasShadow,
    dataList: {
      data: [],
      included: [],
      jsonapi: {
        version: '',
        meta: null
      },
      links: {
        self: null
      }
    },
    headers,
    dataAction: mockDataAction
  }
}

function createHeader(fieldTitle: any, links: any, headerItems: any) {
  const attributes: any = {}
  if (fieldTitle) {
    attributes.field_title = fieldTitle
    attributes.field_links = links
  }
  return {
    id: "iid",
    attributes,
    links: {
      self: null
    },
    relationships: [],
    type: "includedType",
    data: headerItems
  }
}

function createHeaderItem(title: string, url: string, order: any = null) {
  return {
    attributes: {
      field_url: {
        uri: url
      },
      title,
      field_order: order
    }
  }
}

function createHeaderItems(headerTitle: string, url: string) {
  return [
    createHeaderItem(`${headerTitle} 1`, `${url}1`),
    createHeaderItem(`${headerTitle} 2`, `${url}2`),
  ]
}

const businessHeaderItems = [
  createHeaderItem('Current Accounts', 'currentAccounts'),
  createHeaderItem('Business Finance', 'businessFinance'),
]

const personalHeaderItems = [
  createHeaderItem('Current Accounts', 'personal-current-accounts')
]

const headers = {
  Business: createHeader('Business', 'firstlink', businessHeaderItems),
  'Private Banking': createHeader('Second Header', 'secondlink', createHeaderItems("Private Banking H", "pburl")),
  Personal: createHeader('Third Header', 'thirdlink', personalHeaderItems)
}
describe.only('Header Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load header properly', async () => {
    const props = createProps("Business", headers)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Header {...props} /></AppContainer>);
    })
    await wrapper!.update();
    const businessHeaderItems = wrapper!.find(`.header-nav`).at(1).find(`a.tab-items`);
    expect(businessHeaderItems).toHaveLength(2)
  })
  
  it('should show business hover items properly', async () => {
    const props = createProps("Business", headers)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Header {...props} /></AppContainer>);
    })
    await wrapper!.update();
    const businessHeaderItems = wrapper!.find(`.header-nav`).at(1).find(`a.tab-items`);
    await act(async () => businessHeaderItems.at(1).simulate('mouseEnter'))
    await wrapper!.update();
    expect(wrapper!.find(`.two-items-popup`)).toHaveLength(1);
    expect(wrapper!.find(`.two-items-popup`).html()).toContain('Bridging Finance')
    await act(async () => wrapper!.find(`.two-items-popup`).simulate('mouseEnter'))
    await wrapper!.update();
    expect(wrapper!.find(`.two-items-popup`)).toHaveLength(1);
    expect(wrapper!.find(`.two-items-popup`).html()).toContain('Bridging Finance')
    await act(async () => wrapper!.find(`.two-items-popup`).simulate('mouseLeave'))
    await wrapper!.update();
    await act(async () => businessHeaderItems.at(1).simulate('mouseLeave'))
    await wrapper!.update();
    expect(wrapper!.find(`.two-items-popup`)).toHaveLength(0);
  })
  
  it('should show sidebar properly', async () => {
    const props = createProps("Business", headers)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><Header {...props} /></AppContainer>);
    })
    await wrapper!.update();
    const sidebarShowButton = wrapper!.find(`.mobile-show`).at(0).find(`a.icon-nav`);
    await act(async () => sidebarShowButton.at(0).simulate('click'))
    await wrapper!.update();
    const modalWrapper = wrapper!.find(Modal)
    expect(modalWrapper.find(`a.link-item`)).toHaveLength(3)
    await act(async () => modalWrapper.find(`a.link-item`).at(0).simulate('click'))
    await modalWrapper!.update();
    await act(async () => modalWrapper.find(`a.link-item`).at(1).simulate('click'))
    await modalWrapper!.update();
    await act(async () => modalWrapper.find(`a.link-item`).at(2).simulate('click'))
    await modalWrapper!.update();
    expect(modalWrapper.html()).toContain('Recovery Loan Scheme');
    await act(async () => modalWrapper.find(`.parent-item`).find(`.back-icon`).at(0).simulate('click'))
    expect(modalWrapper.html()).not.toContain('Recovery Loan Scheme');
    await act(async () => modalWrapper.find(`.icon-close`).simulate('click'))
    await modalWrapper!.update();
    expect(modalWrapper.find(`a`).at(0).is(`.icon-close`)).toBeTruthy();
  })
})
