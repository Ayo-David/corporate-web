import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ParagraphImageWithLongText from '../ParagraphImageWithLongText';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(className: string, title: string, content: string, imgId: string) {
  return {
    dataList: {
      type: className,
      attributes: {
        field_titles: title,
        field_text: {
          value: content
        }
      },
      relationships: {
        field_images: {
          data: {
            id: imgId
          }
        }
      }
    },
    key: "keyValue"
  }
}

function initMockDataSvc(imageUrl: string) {
  mockedDataSvc.getImage.mockResolvedValueOnce({
    data: {
      attributes: {
        uri: {
          url: imageUrl
        }
      }
    }
  })
}

describe('ParagraphImageWithLongText Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const props = createProps("paragraph-class-name","Paragraph Title", "Paragraph Content","paragraphImgId")
    initMockDataSvc("paragraphImg.jpg")
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ParagraphImageWithLongText {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getImage.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getImage.mock.calls[0][0]).toEqual('paragraphImgId');
    expect(wrapper!.html()).toContain("paragraphImg.jpg");
    expect(wrapper!.html()).toContain("paragraph-class-name");
    expect(wrapper!.html()).toContain("Paragraph Title");
    expect(wrapper!.html()).toContain("Paragraph Content");
  })
})
