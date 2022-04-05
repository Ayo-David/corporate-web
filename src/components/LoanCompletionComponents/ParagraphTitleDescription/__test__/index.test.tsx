import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ParagraphTitleDescription from '../index';
import { act } from 'react-dom/test-utils';
import { AppContainer } from '../../../../test/helper';

describe('Paragraph Title Description testing', () => {

  const mockDataList = {
    type: 'mock-type',
    attributes: {
      field_title: 'field_title',
      field_text: {
        value: '<div></div>'
    }}
  }

  const createWrapper = (dataList: any)=>mount(
    <AppContainer>
      <ParagraphTitleDescription dataList={dataList} key={''} />
    </AppContainer>
  )

  it('Should render correctly without crashing', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockDataList);
    })
    expect(wrapper!).not.toEqual(undefined);
  });

  it('Should have two children', async() => {
    let wrapper: ReactWrapper;
    await act(async()=>{
      wrapper = createWrapper(mockDataList);
    })
    expect(wrapper!.find(`.${mockDataList.type}`).children().length).toEqual(2)
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(wrapper!.exists(`.${mockDataList.type}`)).toBeTruthy()
  });
});