import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IParagraphDescriptionProps {
  dataList: any;
  key: any;
}

const ParagraphDescription: React.FunctionComponent<IParagraphDescriptionProps> = (props) => {
  return (
    <div className="container deals-page">
      <div className={`section ${props.dataList.type}`}>
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="description"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.dataList.attributes.field_text.value) }}></div>
      </div>
    </div>
  );
};

export default ParagraphDescription;
