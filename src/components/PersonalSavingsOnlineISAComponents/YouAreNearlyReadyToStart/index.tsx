import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IYouAreNearlyReadyToStartProps {
  dataList?: any;
}

export const YouAreNearlyReadyToStart: React.FunctionComponent<IYouAreNearlyReadyToStartProps> = (props) => {
  const [content, setContent] = useState<any>();
  
  const [itemArray, setItemArray] = useState<any[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);
        
        const url = data.data.relationships.field_text_with_link.links.related.href;
        dataSvc.getData(url).then((itemData) => {
          setItemArray(itemData.data);
        });
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      {!!content && (
      <div className="section section-personal-savings-online-isa-you-are-nearly-ready-to-start"
        style={{backgroundColor: content.data.attributes.field_background_color}}>
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div className="content-container"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data.attributes.field_heading) }}>
          </div>
          <div className='subtitle'>
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data.attributes.field_subtitle) }} />
          </div>
          <div className="flex-space w-916">
            {
              itemArray.length > 0 && itemArray.map((item, index) => (
                <div className="isa-box" key={index}>
                  <div className="sm-tit">{item.attributes.field_title}</div>
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div className="txt-p"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.value) }}>
                  </div>
                  {
                    item.attributes.field_links.map((linkItem: any, linkIndex: number) => (
                      <div className="btn-black" key={linkIndex}>
                        <a href={linkItem.uri}>{linkItem.title}</a>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
      </div>
      )}
    </React.Fragment>
  );
};

export default YouAreNearlyReadyToStart;
