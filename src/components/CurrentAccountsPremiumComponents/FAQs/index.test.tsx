import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import FAQs from '../FAQs';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(content: any, faqType: string, sectionRef: any = null) {
  return {
    dataList: content,
    type: faqType,
    sectionRef
  }
}

function createFAQ(title: string, text: string) {
  return {
    attributes: {
      field_title: title,
      field_text: {
        value: text
      }
    }
  }
}


function createContent(id: string, heading: string, title: string) {
  return {
    data: {
      id,
      attributes: {
        title
      }
    },
    attributes: {
      field_heading: heading
    }
  }
}

function initMockDataSvc(faqs: any) {
  mockedDataSvc.getCurrentAccountsCorporateFAQData.mockResolvedValueOnce({
    data: faqs
  })
  
  mockedDataSvc.getCurrentAccountsFAQsData.mockResolvedValueOnce({
    data: {
      id: 'corporateFAQId'
    }
  })
}

describe('FAQs Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should display the component properly', async () => {
    const content = createContent("faqDataId", "FAQ Heading", "FAQ Title")
    const props = createProps(content, "randomType")
    const faqs = [
      createFAQ("FAQ Item 1", "FAQ Itemtext 1"),
      createFAQ("FAQ Item 2", "FAQ Itemtext 2")
    ]
    initMockDataSvc(faqs)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FAQs {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("FAQ Heading");
    expect(wrapper!.html()).toContain("FAQ Item 1");
    expect(wrapper!.html()).toContain("FAQ Item 2");
    expect(wrapper!.html()).toContain("FAQ Itemtext 1");
    expect(wrapper!.html()).toContain("FAQ Itemtext 2");
    expect(wrapper!.html()).toContain("All Current Account FAQs");
  })
  
  it('should display the about us properly', async () => {
    const content = createContent("faqDataId", "FAQ Heading", "FAQ Title")
    const props = createProps(content, "aboutUs")
    const faqs = [
      createFAQ("FAQ Item 1", "FAQ Itemtext 1"),
      createFAQ("FAQ Item 2", "FAQ Itemtext 2")
    ]
    initMockDataSvc(faqs)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FAQs {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain("FAQ Title");
    expect(wrapper!.html()).toContain("View All FAQs");
  })
  
  it('should display the other FAQs when clicked', async () => {
    const content = createContent("faqDataId", "FAQ Heading", "FAQ Title")
    const props = createProps(content, "randomType")
    const faqs = [
      createFAQ("FAQ Item 1", "FAQ Itemtext 1"),
      createFAQ("FAQ Item 2", "FAQ Itemtext 2"),
      createFAQ("FAQ Item 3", "FAQ Itemtext 3"),
      createFAQ("FAQ Item 4", "FAQ Itemtext 4"),
    ]
    initMockDataSvc(faqs)
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><FAQs {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(wrapper!.find(`.list-faq`).at(0).children()).toHaveLength(3);
    wrapper!.find(`.bottom-btn`).at(0).children(`button`).at(0).simulate('click');
    await wrapper!.update();
    expect(wrapper!.find(`.list-faq`).at(0).children()).toHaveLength(4);
  })
})
