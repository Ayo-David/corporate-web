import React from 'react';
import { mount } from 'enzyme';
import { AppContainer } from '../../../test/helper';
import CompareAccounts from '../CompareAccounts';
import { act } from "react-dom/test-utils";

function createAccount(title: string, subtitle: string, isNextGen: boolean, isChaps: boolean,
                       isForeignCurrency: boolean, addOns: string, linkValue: string, linkTitle: string) {
  return {
    attributes: {
      field_title: title,
      field_subtitle: subtitle,
      field_next_gen_product: isNextGen ? 'included' : 'not included',
      field_chaps_swift: isChaps ? 'included' : 'not included',
      field_foreign_currency: isForeignCurrency ? 'included' : 'not included',
      field_add_ons: {
        processed: addOns
      },
      field_single_link: {
        uri: linkValue,
        title: linkTitle
      }
    }
  }
}

describe('CompareAccounts Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the component properly', async () => {
    const accounts = [
      createAccount('Account 1', 'Account Sub 1', true, true, true,
        "", "accountLink1","Account Link Title 1")
    ]
    const props = {
      data: {
        data: accounts
      }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CompareAccounts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Account 1");
    expect(wrapper!.html()).toContain("Account Sub 1");
    expect(wrapper!.html()).toContain("accountLink1");
    expect(wrapper!.html()).toContain("Account Link Title 1");
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(2).is(`.included`)).toBeTruthy();
  })
  
  it('should display next-gen not included properly', async () => {
    const accounts = [
      createAccount('Account 1', 'Account Sub 1', false, true, true,
        "", "accountLink1","Account Link Title 1"),
      createAccount('Account 2', 'Account Sub 2', true, true, true,
        "", "accountLink2","Account Link Title 2")
    ]
    const props = {
      data: {
        data: accounts
      }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CompareAccounts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("Account 1");
    expect(wrapper!.html()).toContain("Account Sub 1");
    expect(wrapper!.html()).toContain("accountLink1");
    expect(wrapper!.html()).toContain("Account Link Title 1");
    expect(wrapper!.html()).toContain("Account 2");
    expect(wrapper!.html()).toContain("Account Sub 2");
    expect(wrapper!.html()).toContain("accountLink2");
    expect(wrapper!.html()).toContain("Account Link Title 2");
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(0).is(`.included`)).toBeFalsy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(2).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(2).is(`.included`)).toBeTruthy();
  })
  
  it('should display chaps not included properly', async () => {
    const accounts = [
      createAccount('Account 1', 'Account Sub 1', true, false, true,
        "", "accountLink1","Account Link Title 1"),
      createAccount('Account 2', 'Account Sub 2', true, true, true,
        "", "accountLink2","Account Link Title 2")
    ]
    const props = {
      data: {
        data: accounts
      }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CompareAccounts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(1).is(`.included`)).toBeFalsy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(2).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(2).is(`.included`)).toBeTruthy();
  })
  
  it('should display foreign currency not included properly', async () => {
    const accounts = [
      createAccount('Account 1', 'Account Sub 1', true, true, false,
        "", "accountLink1","Account Link Title 1"),
      createAccount('Account 2', 'Account Sub 2', true, true, true,
        "", "accountLink2","Account Link Title 2")
    ]
    const props = {
      data: {
        data: accounts
      }
    }
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><CompareAccounts {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(0).children(`.value`).at(2).is(`.included`)).toBeFalsy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(0).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(1).is(`.included`)).toBeTruthy();
    expect(wrapper!.find(`.content`).at(1).children(`.value`).at(2).is(`.included`)).toBeTruthy();
  })
})
