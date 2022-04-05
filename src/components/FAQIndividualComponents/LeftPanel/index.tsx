import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface ILeftPanelProps {
  dataList?: any;
}

export const LeftPanel: React.FunctionComponent<ILeftPanelProps> = (props) => {
  const { dataList } = props;

  return (
    <React.Fragment>
      <div className="section section-faq-individual-left-panel">
        {
          dataList.data.map((item: any, index: number) => (
            <div className="panel" key={index}>
              <div className="title">{item.attributes.field_title}</div>
              {item.attributes.field_text && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <p className="txt-p"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.processed) }}>
                </p>
              )}
            </div>
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default LeftPanel;
