import React from 'react';
import { CommonDataModel } from '../../../model/common-data.model';
import './styles.scss';

export interface IOurCustomerPromisesProps {
  dataList: CommonDataModel;
  type?: string;
}

export const OurCustomerPromises: React.FunctionComponent<IOurCustomerPromisesProps> = (props) => {
  const { dataList, type } = props;
  
  const getCardClass = (index: number) => {
    switch (index) {
      case 0:
        return 'icon-one';
      case 1:
        return 'icon-two';
      case 2:
        return 'icon-three';
      default:
        return '';
    }
  };

  return (
    <div className={`section-our-customer-promises ${type}`}>
      <div className="container">
        <div className="top-title">Our Customer Promises</div>
        <div className="three-items">
          <div className="row">
            {
              !!dataList && dataList.data.map((item, index) => (
                <div className="col col-md-4" key={index}>
                  <div className="top-icons">
                    <i className={`icons ${getCardClass(index)}`}>
                    </i>
                  </div>
                  <div className="big-txt">
                    {item.attributes.field_title}
                  </div>
                  <div className="txt">
                    {item.attributes.field_description}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OurCustomerPromises;
