import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import CompareAccounts from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';


describe('CompareAccounts testing', () => {

  const mockProps = {
    data: {
      data: [
        {
          attributes:{
            field_add_ons: {
              processed: '<div></div>'
            },
            field_single_link: {uri: 'internal', title: 'title'},
            field_next_gen_product: 'included',
            field_chaps_swift: 'included',
            field_foreign_currency: 'included'
          },
        }
      ]
    },
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <AppContainer>
      <CompareAccounts {...data} />
    </AppContainer>
  )

  it('Should render correctly without crashing', async() => {
    await act(async()=>{
      wrapper = createWrapper(mockProps);
    })
    expect(wrapper!).not.toEqual(undefined);
    expect(wrapper.find('.value.included').length).toBe(3)
  });
});