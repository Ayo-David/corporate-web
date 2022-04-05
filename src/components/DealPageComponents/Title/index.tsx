import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

interface ITitleProps {
  dataList: any;
}

export const Title: React.FunctionComponent<ITitleProps> = (props) => {
  return (
    <div className="container deals-page">
      <div className="section section-title-deal-section">
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
        <div className="detail" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.dataList.value) }}></div>
      </div>
    </div>
  );
};

export default Title;
