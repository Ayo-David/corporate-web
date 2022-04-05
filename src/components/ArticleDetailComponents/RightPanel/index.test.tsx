import React from 'react';
import { mount } from 'enzyme';
import RightPanel from '../RightPanel';
import { act } from "react-dom/test-utils";

function getMockProps() {
  return {
    dataList: {
      id: 'ArticleDetailComponentId',
      data: {
        attributes: {
          title: 'ArticleDetailComponentTitle',
          body: {
            processed: 'ArticleDetailComponentText Body'
          },
        }
      }
    },
  }
}

describe('ArticleDetails Right Panel Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the attribute values properly', async () => {
    const props = getMockProps();
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<RightPanel {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.html()).toContain('ArticleDetailComponentTitle');
    expect(wrapper!.html()).toContain('ArticleDetailComponentText Body');
  })
})
