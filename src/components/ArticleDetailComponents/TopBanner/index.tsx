import React, { useState, useEffect } from 'react';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ITopBannerProps {
  dataList?: any;
}

export const TopBanner: React.FunctionComponent<ITopBannerProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>('/assets/home-banner.jpg');

  useEffect(() => {
    if (props.dataList) {
      if (!!props.dataList.data.relationships.field_media_image.data) {
        let imageUrlTemp = '';
        dataSvc.getImage(props.dataList.data.relationships.field_media_image.data.id).then((data) => {
          // load data
          imageUrlTemp = CMS_IMAGE_URL + data.data.attributes.uri.url;

          setImageUrl(imageUrlTemp);
        })
      }
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  // get Banner Image Style
  const getBannerImageStyle = () => {
    const bannerImageUrl = imageUrl ? imageUrl : '';
    const str = `url(${bannerImageUrl}) center center no-repeat`;

    return str ;
  };

  return (
    <React.Fragment>
      <div className="section section-article-details-banner"
        style={{background: getBannerImageStyle(), backgroundSize: 'cover'}}>
      </div>
    </React.Fragment>
  );
};

export default TopBanner;
