import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import moment from 'moment';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { DATE_FORMAT, CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ITopBannerProps {
  dataList: any;
  onReadArticleClick?: () => void
}

export const TopBanner: React.FunctionComponent<ITopBannerProps> = (props) => {
  const { dataList, onReadArticleClick } = props;

  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (props.dataList) {
      let imageUrlTemp = '';
      dataSvc.getImage(dataList.data.relationships.field_media_image.data.id).then((data) => {
        // load data
        imageUrlTemp = CMS_IMAGE_URL + data.data.attributes.uri.url;

        setImageUrl(imageUrlTemp);
      })
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  // get Banner Image Style
  const getBannerImageStyle = () => {
    const bannerImageUrl = imageUrl ? imageUrl : '';
    const str = `url(${bannerImageUrl}) right center no-repeat`;

    return str ;
  };

  return (
    <React.Fragment>
      {imageUrl !== '' && (
        <div className="section section-articles-banner">
          <div className="background-img" style={{background: getBannerImageStyle()}}></div>
          <div className="container">
            <div className="hero-business-content">
              <div className="date-txt">
                {moment(dataList.data.attributes.created).format(DATE_FORMAT)}
              </div>
              <div className="big-txt">
                {dataList.data.attributes.title}
              </div>
              <div className="bank-txt">
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.data.attributes.field_snippet.value) }}
                />
              </div>
              <div className="bottom-btn">
                <a
                  href="#javascript"
                  onClick={onReadArticleClick}
                  className="btn btn-black">Read Article</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopBanner;
