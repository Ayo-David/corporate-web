import React, { useState, useEffect } from 'react';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IHowToApplyProps {
  dataList?: any;
}

export const HowToApply: React.FunctionComponent<IHowToApplyProps> = (props) => {
  const [content, setContent] = useState<any>();
  
  useEffect(() => {
    if (props.dataList) {      
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);
  
  // get Card Label
  const getCardLabel = (index: number) => {
    switch (index) {
      case 0:
        return 'Apply Online';
      case 1:
        return 'Sign and Submit';
      case 2:
        return 'Receive Funds';
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      {!!content && (
        <div className="section section-bridging-finance-how-to-apply">
          <div className="title">
            {content.data.attributes.field_heading}
          </div>
          <div className="flex-space">
            {
              content.data.relationships.field_text_with_link.data.map((item: any, index: number) => (
                <div className="part" key={index}>
                  <div className="num">{index + 1}</div>
                  <div className="tit-sm">{getCardLabel(index)}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HowToApply;
