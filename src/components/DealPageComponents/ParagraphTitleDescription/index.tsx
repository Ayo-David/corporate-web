import React from 'react';
import DOMPurify from 'dompurify';

export interface IParagraphTitleDescriptionProps {
  dataList: any;
  key: any;
}

const ParagraphTitleDescription: React.FunctionComponent<IParagraphTitleDescriptionProps> = (
  props
) => {
  return (
    <div className={`section ${props.dataList.type}`}>
      <div className="section-legal">
        <div className="category">{props.dataList.attributes.field_title}</div>
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="legal-information"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.dataList.attributes.field_text.value) }}></div>
      </div>
    </div>
  );
};

export default ParagraphTitleDescription;
