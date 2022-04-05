import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IOurClientsProps {
  dataList?: any
}

export const OurClients: React.FunctionComponent<IOurClientsProps> = (props) => {    
  const [content, setContent] = useState<any>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabArray, setTabArray] = useState<any[]>([]);
  
  useEffect(() => {
    if (props.dataList) {       
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data.data);

        const urlSub = data.data.relationships.field_title_description.links.related.href;
        dataSvc.getData(urlSub).then((dataSub) => {
          setTabArray(dataSub.data)
        });
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);
  
  return (
    <React.Fragment>
      <div className="section-private-banking-borrowing-our-clients ">
        {!!content && (
          <div className="container">
            <div className="gray-title">
              {content.attributes.field_heading}
            </div>
            <div className="client-area">
              <div className="left-tabs">
                <ul>
                  {
                    tabArray.map((item, index) => (
                      <li key={index}>
                        <a href="#javascript"
                          className={`tab-items ${tabIndex === index ? 'current' : ''}`}
                          onClick={(event) => {
                            setTabIndex(index)
                            event.preventDefault()
                          }}>
                          {item.attributes.field_title}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="right-content">
                {
                  tabArray.map((item, index) => (
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                    <div className={`tab-content ${tabIndex === index ? '' : 'hide'}`}
                      key={index}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.processed) }}>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="mobile-client-area">
              {
                tabArray.map((item, index) => (
                  <div key={index}
                    className={`client-groups ${tabIndex === index ? 'open' : ''}`}>
                    <div className="title-bar">
                      <div className="title">
                        {item.attributes.field_title}
                      </div>
                      <a href="#javscript" className="btn-expand"
                        onClick={(event) => {
                          setTabIndex(index !== tabIndex ? index : -1)
                          event.preventDefault()
                        }}>
                        &nbsp;
                      </a>
                    </div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div className="expand-panel"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.processed) }}>
                    </div>
                  </div>
                ))
              }
            </div>
            {!!content.attributes.field_more_link && (
              <div className="bottom-btn">
                <a
                  href={content.attributes.field_more_link.uri.replace('internal:', '')}
                  className="btn btn-green-border">
                  {content.attributes.field_more_link.title}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OurClients;