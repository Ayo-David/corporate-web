import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IParagraphTitleMultipleTextAreaProps {
  dataList: any;
  key: any;
}

const ParagraphTitleMultipleTextArea: React.FunctionComponent<IParagraphTitleMultipleTextAreaProps> =
  (props) => {
    return (
      <div className="container deals-page">
        <div className={`section ${props.dataList.type}`}>
          <div className="category">{props.dataList.attributes.field_title}</div>
          <div className="text-area-container">
            {!!props.dataList.attributes.field_descriptions &&
              props.dataList.attributes.field_descriptions.map((item: any, index: number) => {
                return (
                  <div className={`text-area ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                    <div className="quotes">{`"`}</div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                    <div className="detail" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.value) }}></div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

export default ParagraphTitleMultipleTextArea;
