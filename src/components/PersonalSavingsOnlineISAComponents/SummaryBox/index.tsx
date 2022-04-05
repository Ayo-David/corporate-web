import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface ISummaryBoxProps {
  dataList?: any;
}

export const SummaryBox: React.FunctionComponent<ISummaryBoxProps> = (props) => {
  const [content, setContent] = useState<any>();
  
  useEffect(() => {
    if (props.dataList) {      
      dataSvc.getData(props.dataList).then((data) => {        
        const url = data.data.relationships.field_summeries.links.related.href;
        dataSvc.getData(url).then((summaryData) => {
          setContent(summaryData.data);
        });
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      {!!content && (
        <div className="section section-personal-savings-online-isa-summary-box">
          <div className="title-full">SUMMARY BOX</div>
          
          {
            content.map((item: any, index: number) => (
              <div className="con-box" key={index}>
                <div className="title">
                  {item.attributes.field_title}
                </div>
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.processed) }}>
                </div>
              </div>
            ))
          }
	  
        </div>
      )}
    </React.Fragment>
  );
};

export default SummaryBox;
