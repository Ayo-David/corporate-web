import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IYouAreNearlyReadyToStartProps {
  dataList?: any;
}

export const YouAreNearlyReadyToStart: React.FunctionComponent<IYouAreNearlyReadyToStartProps> = (props) => {
  const [content, setContent] = useState<any>();
  
  useEffect(() => {
    if (props.dataList) {      
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      {!!content && (
        <div className="section section-bridging-finance-you-are-nearly-ready-to-start"
          style={{backgroundColor: content.data.attributes.field_background_color}}>
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div className="content-container"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data.attributes.field_text.processed) }}>
          </div>
          {content.data.attributes.field_link && (
            <div className="btn-black">
              <a href={content.data.attributes.field_link.uri}>
                {content.data.attributes.field_link.title}
              </a>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default YouAreNearlyReadyToStart;
