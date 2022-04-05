import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface ITitleBoxProps {
  dataList?: any
}

export const TitleBox: React.FunctionComponent<ITitleBoxProps> = (props) => {  
  const { dataList } = props;
  
  return (
    <React.Fragment>
      <div className="section-private-banking-title-box ">
        <div className="container">
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div className="title-txt"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList) }}>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TitleBox;