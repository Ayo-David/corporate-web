import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import OverlayTooltipWrapper from '../OverlayTooltipWrapper';
import { act } from 'react-dom/test-utils';


describe('OverlayTooltipWrapper testing', () => {

  const mockProps = {
    children: (): React.ReactElement => {
      return <></>;
    },
    tooltipText: 'Tooltips Text'
  }

  let wrapper: ReactWrapper;
  const createWrapper = (data: typeof mockProps)=>mount(
    <OverlayTooltipWrapper {...data} />
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
  });
});
