import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Results } from '../Results';
import { act } from 'react-dom/test-utils';


describe('Results testing', () => {

  const mockNextPage = jest.fn();
  const mockDataList = [
      {
        type: 'node--document_library',
        id: 'id0',
        attributes: {
          title: 'Business Account application form for companies and partnerships',
          field_desc: 'Download this form to apply by post.',
        },
        relationships: {
          field_doc_category: {
            data: {
              type: 'taxonomy_term--categories',
              id: 'id_category'
            }
          },
          field_doc_product: {
            data: [
              {
                type: 'taxonomy_term--cynergy_terms',
                id: 'id_product'
              }
            ]
          },
          field_document: {
            data: {
              type: 'media--document',
              id: 'id_document'
            }
          }
        }
      }
    ];
  
  const mockProps = {
    dataList: mockDataList,
    currentPage: 'Business Documents',
    categoryIdMapping: {
      'cI0': 'Conditions',
      'cI1': 'FSCS'
    },
    productIdMapping: {
      'pI0': 'Savings Accounts',
      'pI1': 'Complaints Leaflet'
    },
    nextPage: mockNextPage()
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <Results {...data} />
  )

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(wrapper.find('.result').length).toBe(1)
  });
  
  it('Should render when field_doc_category and field_doc_product has empty data', async() => {
    await act(async()=>{
      const mockPropsEmpty = mockProps
      mockPropsEmpty.dataList[0].attributes.field_desc = ''
      mockPropsEmpty.dataList[0].relationships.field_doc_category.data = {
        type: '',
        id: ''
      }
      mockPropsEmpty.dataList[0].relationships.field_doc_product.data = []
      wrapper = createWrapper(mockPropsEmpty);
      jest.runAllTimers();
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(wrapper.find('.result').length).toBe(1)
  });
});
