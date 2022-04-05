import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import FAQSet from '../FAQSet';
import { act } from "react-dom/test-utils";


jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(pageTitle: string, faqs: any) {
  const result: any = {
    title: pageTitle,
  }
  if (faqs) {
    result.dataList = {
      data: faqs
    }
  }
  return result
}

function createFaq(faqId: string, iconClass: string, heading: string, faqTitles: string[]) {
  
  const mappedTitles = faqTitles.map((title) => {
    return {
      attributes: {
        title
      }
    }
  })
  mockedDataSvc.getCustomerSupportFAQsFieldFAQSetData.mockResolvedValueOnce({
    data: mappedTitles
  })
  
  return {
    id: faqId,
    attributes: {
      field_icon_class: iconClass,
      field_heading: heading
    }
  }
}

describe('FAQSet Component', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const faqs = [
      createFaq("faqId1", "faq-class-1", "FAQ Heading 1", ["FAQ Title 1", "FAQ Title 2"]),
      createFaq("faqId2", "faq-class-2", "FAQ Heading 2", ["FAQ Title A", "FAQ Title B"]),
    ]
    const props = createProps("Corporate FAQs Title", faqs)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FAQSet {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getCustomerSupportFAQsFieldFAQSetData.mock.calls).toHaveLength(2);
    expect(mockedDataSvc.getCustomerSupportFAQsFieldFAQSetData.mock.calls[0][0]).toEqual('faqId1');
    expect(mockedDataSvc.getCustomerSupportFAQsFieldFAQSetData.mock.calls[1][0]).toEqual('faqId2');
    expect(wrapper!.html()).toContain("FAQ Heading 1");
    expect(wrapper!.html()).toContain("FAQ Heading 2");
    expect(wrapper!.html()).toContain("FAQ Title 1");
    expect(wrapper!.html()).toContain("FAQ Title 2");
    expect(wrapper!.html()).toContain("FAQ Title A");
    expect(wrapper!.html()).toContain("FAQ Title B");
  })
  
  it('should load all classes properly', async () => {
    const faqs = [
      createFaq("faqId1", "cards", "FAQ Heading 1", ["FAQ Title 1", "FAQ Title 2"]),
      createFaq("faqId2", "Lock", "FAQ Heading 2", ["FAQ Title A", "FAQ Title B"]),
      createFaq("faqId3", "Loans", "FAQ Heading 3", ["FAQ Title C", "FAQ Title D"]),
      createFaq("faqId4", "Wallet", "FAQ Heading 4", ["FAQ Title E", "FAQ Title F"]),
    ]
    const props = createProps("Corporate FAQs Title", faqs)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FAQSet {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getCustomerSupportFAQsFieldFAQSetData.mock.calls).toHaveLength(4);
    expect(wrapper!.find(`i`).at(0).is(`.icon-accounts`)).toBeTruthy();
    expect(wrapper!.find(`i`).at(1).is(`.icon-savings`)).toBeTruthy();
    expect(wrapper!.find(`i`).at(2).is(`.icon-lending-finance`)).toBeTruthy();
    expect(wrapper!.find(`i`).at(3).is(`.icon-security`)).toBeTruthy();
  })
  
  it('should fail gracefully if no datalist is provided', async () => {
    const props = createProps("Corporate FAQs Title", null);
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<FAQSet {...props} />);
    })
    await wrapper!.update();
    expect(Object.keys(wrapper).length).toEqual(0);
  })
})
