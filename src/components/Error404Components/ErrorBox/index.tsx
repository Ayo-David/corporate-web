import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IErrorBoxProps {
  dataList?: any;
}

export const ErrorBox: React.FunctionComponent<IErrorBoxProps> = (props) => {
  const { dataList } = props;

  return (
    <React.Fragment>
      <div className="section section-error-box">
      <div className="center-error">
      <div className="container">
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div className="error-num"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.body.processed) }}>
        </div>
        {dataList.field_url && (
          <div className="bottom-btn">
            <a href={dataList.field_url.uri.replace('internal:', '')}
              className="btn btn-green">
              {dataList.field_url.title}
            </a>
          </div>
        )}
      </div>
    </div>
        
      </div>
    </React.Fragment>
  );
};

export default ErrorBox;
