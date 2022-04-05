import React from 'react';
import dataSvc from '../../../services/dataSvc';
import { AppContainer } from '../../../test/helper';
import '../../../test/dataSvcHelper'
import { mocked } from 'jest-mock';
import { mount } from 'enzyme';
import ServiceStatus from '../ServiceStatus';
import { act } from "react-dom/test-utils";


jest.mock('../../../services/dataSvc');
const mockedDataSvc = mocked(dataSvc, true);

function createService(name: string, status: string) {
  return {
    attributes: {
      field_availability_status: status,
      field_service_name: name
    }
  }
}

function createProps(ssId: string, heading: string) {
  return {
    dataList: {
      id: ssId,
      attributes: {
        field_heading: heading
      }
    }
  }
}

function initMockDataSvc(services: any) {
  mockedDataSvc.getCustomerSupportFAQsFieldServiceStatusData.mockResolvedValueOnce({data: services})
}

describe('ServiceStatus Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should load properly', async () => {
    const services = [
      createService("Service 1", "Yes"),
      createService("Service 2", "No"),
    ]
    const props = createProps("serviceId", "Service Heading")
    initMockDataSvc(services)
    
    let wrapper: any;
    await act(async () => {
      wrapper = await mount(<AppContainer><ServiceStatus {...props} /></AppContainer>);
    })
    await wrapper!.update();
    expect(mockedDataSvc.getCustomerSupportFAQsFieldServiceStatusData.mock.calls).toHaveLength(1);
    expect(mockedDataSvc.getCustomerSupportFAQsFieldServiceStatusData.mock.calls[0][0]).toEqual('serviceId');
    expect(wrapper!.html()).toContain("Service 1");
    expect(wrapper!.html()).toContain("Service 2");
    expect(wrapper!.find(`i`).at(0).is(`.icon-check`)).toBeTruthy();
    expect(wrapper!.find(`i`).at(0).is(`.icon-close`)).toBeFalsy();
    expect(wrapper!.find(`i`).at(1).is(`.icon-check`)).toBeFalsy();
    expect(wrapper!.find(`i`).at(1).is(`.icon-close`)).toBeTruthy();
  })
})
