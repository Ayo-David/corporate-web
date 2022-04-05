import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import './styles.scss';

export interface IRightPanelProps {
  dataList?: any;
}

const { CMS_IMAGE_URL } = ConfigService.getConfig()

export const RightPanel: React.FunctionComponent<IRightPanelProps> = (props) => {
  const { dataList } = props;
  useEffect(() => {
    let array=document.querySelectorAll('img[class="align-right"]');
    array.forEach((item) => {
      item.classList.value= item.classList.value + ' float-right';
    })
    let elements = Array.from(document.querySelectorAll('a'));
    elements.forEach((element: any) => {
      let currentLink = element.getAttribute('href');
      if (!currentLink.includes(CMS_IMAGE_URL)) {
        element.setAttribute('href', CMS_IMAGE_URL + currentLink);
      }
    })
    // eslint-disable-next-line
  }, [dataList]);

  return (
    <React.Fragment>
      {!!dataList && (
        <div className="section section-article-details-right-panel">
          <div className="big-title">
            {dataList.data.attributes.title}
          </div>
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div className="content-container"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.data.attributes.body.processed) }}>
          </div>
          
          
          
          {true && (
            <>
            
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default RightPanel;
