import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ApplyOnline from '../ApplyOnline';
import { act } from "react-dom/test-utils";

jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createProps(dataListId: string, fieldHeading: string) {
  return {
    dataList: {
      id: dataListId,
      attributes: {
        field_heading: fieldHeading
      }
    }
  }
}

function createCardWithLink(description: string, linkUri: string, title: string) {
   return {
    attributes: {
      field_description: description,
      field_single_link: {
        uri: linkUri,
        title
      }
    }
  }
}

function initMockDataSvc(cards: any) {
  mockedDataSvc.getCurrentAccountsCardsWithLinkTextData.mockResolvedValue({ data: cards})
}

describe('Apply Online Component', () => {
    
    afterEach(() => {
      jest.resetAllMocks();
    });
    
    it('should load properly', async () => {
      const cards = [
        createCardWithLink("Card Description 1", "/cardLink1", "Card Title 1"),
        createCardWithLink("Card Description 2", "/cardLink2", "Card Title 2"),
      ]
      initMockDataSvc(cards);
      const props = createProps("ApplyOnlineId", "Apply Online Field Heading")
      
      let wrapper: any;
      await act(async () => {
        wrapper = await mount(<AppContainer><ApplyOnline {...props} /></AppContainer>);
      })
      await wrapper!.update();
      expect(mockedDataSvc.getCurrentAccountsCardsWithLinkTextData.mock.calls).toHaveLength(1);
      expect(mockedDataSvc.getCurrentAccountsCardsWithLinkTextData.mock.calls[0][0]).toEqual('ApplyOnlineId');
      expect(wrapper!.html()).toContain("Card Description 1");
      expect(wrapper!.html()).toContain("Card Description 2");
      expect(wrapper!.html()).toContain("/cardLink1");
      expect(wrapper!.html()).toContain("/cardLink2");
      expect(wrapper!.html()).toContain("Card Title 1");
      expect(wrapper!.html()).toContain("Card Title 2");
    })
})
