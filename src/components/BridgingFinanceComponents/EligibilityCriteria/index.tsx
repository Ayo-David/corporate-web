import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IEligibilityCriteriaProps {
  isShowRightImage?: boolean;
  dataList?: any;
}

export const EligibilityCriteria: React.FunctionComponent<IEligibilityCriteriaProps> = (props) => {
  const { isShowRightImage } = props;
  const [content, setContent] = useState<any>();
  
  const [imageUrl, setImageUrl] = useState<string>('');
  
  useEffect(() => {
    if (props.dataList) {
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);
        
        let imageUrlTemp = '';
        let imageId = '';
        if (data.data.relationships.field_image2) {
          imageId = data.data.relationships.field_image2.data.id;
        }
        if (data.data.relationships.field_image3) {
          imageId = data.data.relationships.field_image3.data.id;
        }
        dataSvc.getImage(imageId).then((data) => {
          // load data          
          imageUrlTemp = CMS_IMAGE_URL + data.data.attributes.uri.url;
          
          setImageUrl(imageUrlTemp);
        })
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);
  
  // get Content Value
  const getContentValue = () => {    
    return content.data.attributes.field_criteria ?
           content.data.attributes.field_criteria.processed : (content.data.attributes.field_text ? content.data.attributes.field_text.processed : '');
  };

  return (
    <React.Fragment>
      {!!content && (
        <div className="section section-bridging-finance-eligibility-criteria">
          <div className="container">
            <div className={`card-img ${isShowRightImage ? 'right-img' : 'left-img'}`}>
              {!isShowRightImage && (
                <div className="img-box w550">
                  <img src={imageUrl} alt="img" />
                </div>
              )}
              <div className="txt-area">
                <div className="little-txt">
                  {content.data.attributes.field_heading ? content.data.attributes.field_heading : content.data.attributes.field_title}
                </div>
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getContentValue())}}>
                </div>
                {content.data.attributes.field_single_link && (
                  <div className="bottom-btn">
                    <a href={content.data.attributes.field_single_link.uri} className="btn btn-green-border">
                      {content.data.attributes.field_single_link.title}
                    </a>
                  </div>
                )}
              </div>
              {isShowRightImage && (
                <div className="img-box w550">
                  <img src={imageUrl} alt="img" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EligibilityCriteria;
