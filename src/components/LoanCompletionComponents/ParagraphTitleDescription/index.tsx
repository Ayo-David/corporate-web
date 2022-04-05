import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IParagraphTitleDescriptionProps {
  dataList: any;
  key: any;
}

const ParagraphTitleDescription: React.FunctionComponent<IParagraphTitleDescriptionProps> = (
  props
) => {
  return (
    <div className={props.dataList.type}>
      <div className="category">{props.dataList.attributes.field_title}</div>
      {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
      <div
        className="description"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.dataList.attributes.field_text.value) }}></div>
    </div>
  );
};

export default ParagraphTitleDescription;
