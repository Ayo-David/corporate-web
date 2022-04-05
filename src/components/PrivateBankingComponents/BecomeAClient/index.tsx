import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IBecomeAClientProps {
  dataList?: any
  onClickBecomeAClient: () => void;
}

export const BecomeAClient: React.FunctionComponent<IBecomeAClientProps> = (props) => {  
  const { onClickBecomeAClient } = props;
  
  const [content, setContent] = useState<any>();
  const [itemArray, setItemArray] = useState<any[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);

        const urlSub = data.data.relationships.field_steps.links.related.href;
        dataSvc.getData(urlSub).then((dataSub) => {
          setItemArray(dataSub.data)
        });
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);
  
  return (
    <React.Fragment>
      <div className="section-private-banking-become-a-client ">
        {!!content && (
          <div className="container" id="client">
            <div className="top-title">
              {content.data.attributes.field_title}
            </div>
            <div className="three-grid">
              <div className="row">
                {
                  itemArray.map((item: any, index: number) => (
                    <div className="col col-md-4 col-12" key={index}>
                      <div className="white-box">
                        <div className="left-num">
                          {item.attributes.field_number}
                        </div>
                        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                        <div className="txt-area"
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.processed) }}>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="bottom-btn">
              {!!content.data.attributes.field_become_client_link && (
                <a href="#javascript" className="btn btn-green"
                  onClick={onClickBecomeAClient}>
                  {content.data.attributes.field_become_client_link.title}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BecomeAClient;