import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../services/ConfigService';
import dataSvc from '../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ICardWithImageLinkProps {
  classNameContainer?: string;
  isShowRightImage?: boolean;
  dataList?: any;
}

export const CardWithImageLink: React.FunctionComponent<ICardWithImageLinkProps> = (props) => {
  const { classNameContainer, isShowRightImage } = props;
  const [content, setContent] = useState<any>();
  
  const [imageUrl, setImageUrl] = useState<string>('');
  const [lastIndex, setLastIndex] = useState<boolean>(false);
  
  useEffect(() => {
    if (props.dataList) {
      
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);
        
        let imageUrlTemp = '';
        let imageId = '';
        if (data.data.relationships.field_images) {
          imageId = data.data.relationships.field_images.data.id;
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

  useEffect(() => {
    if (props.classNameContainer) {
      props.classNameContainer === 'private-banking borrowing component-index-3'
        ? setLastIndex(true)
        : setLastIndex(false);
    }

  }, [props.classNameContainer]);

  return (
    <React.Fragment>
      {!!content && (
        <div className={`section section-bridging-finance-card-with-image-link ${classNameContainer}`}>
          <div className="container">
            <div className={`card-img ${isShowRightImage && !lastIndex ? 'right-img' : 'left-img'}`}>
              {(!isShowRightImage || (isShowRightImage && lastIndex)) && (
                <div className="img-box w550">
                  <img className="desktop-show" src={imageUrl} alt="img" />
                  <img className="desktop-hide mobile-hide" src={imageUrl} alt="img" />             
                </div>
              )}
              <div className="txt-area">
                {(content.data.attributes.field_title || content.data.attributes.field_titles) && (
                  <div className="little-txt">
                    {content.data.attributes.field_title ? content.data.attributes.field_title : (content.data.attributes.field_titles ? content.data.attributes.field_titles : '')}
                  </div>
                )}
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div className="content-container"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data.attributes.field_text.processed) }}>
                </div>
                {content.data.attributes.field_single_link && (
                  <div className="bottom-btn">
                    <a href={content.data.attributes.field_single_link.uri.replace('internal:', '')} className="btn btn-green-border">
                      {content.data.attributes.field_single_link.title}
                    </a>
                  </div>
                )}
              </div>
              {isShowRightImage && !lastIndex && (
                <div className="img-box w550">
                  <img className="desktop-show" src={imageUrl} alt="img" />
                  <img className="desktop-hide mobile-hide" src={imageUrl} alt="img" />             
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CardWithImageLink;
