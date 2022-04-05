import React, { useState, useEffect } from 'react';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IServiceStatusProps {
  dataList?: any;
}

export const ServiceStatus: React.FunctionComponent<IServiceStatusProps> = (props) => {
	const { dataList } = props;
  const [dataService, setDataService] = useState<any>();

  useEffect(() => {
    dataSvc.getCustomerSupportFAQsFieldServiceStatusData(dataList.id).then((data) => {
      setDataService(data);
    });
  }, [dataList]);

  // Get icon class
  const getIconClass = (status: string) => {
    return status === 'Yes' ? 'icon-check' : 'icon-close';
  };

	return (
		<React.Fragment>
			<div className="section section-service-status">
				<div className="container">
          <div className="up-txt">{dataList.attributes.field_heading}</div>
          <div className="list-service-status">
            {
              dataService && dataService.data.map((item: any, index: number) => (
                <div className="items-service-status" key={index}>
                  <i className={`icon ${getIconClass(item.attributes.field_availability_status)}`}></i>
                  {item.attributes.field_service_name}
                </div>
              ))
            }
          </div>
          <div className="message">
            <div className="content">
              <span className="title">Upcoming planned maintenance</span><span className="description"> - Our Online Banking app will be unavailable on 17/04/2021</span>
            </div>
          </div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ServiceStatus;