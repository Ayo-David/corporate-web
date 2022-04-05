import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import { ConfigService } from '../../../services/ConfigService';
import './styles.scss';
import { NavLink } from 'react-router-dom';

const { CMS_IMAGE_URL } = ConfigService.getConfig();

interface ISmallCardWithImageProps {
  dataList: any;
  color: string;
}

const SmallCardWithImage: React.FunctionComponent<ISmallCardWithImageProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    if (!!props.dataList && !!props.dataList.relationships.field_banner_image.data.id) {
      let imageUrlTemp;
      dataSvc
        .getDealSheetThumbnail(props.dataList.relationships.field_banner_image.data.id)
        .then((data) => {
          imageUrlTemp = CMS_IMAGE_URL + data.data.attributes.uri.url;

          setImageUrl(imageUrlTemp);
        });
    }
  }, [props.dataList]);
  return (
    <NavLink to={`/deal-sheets/${props.dataList.id}`} className="small-card">
      <div className="top">
        <img src={imageUrl} alt="" />
      </div>
      <div className={`detail ${props.color}`}>
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="top-txt"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.dataList.attributes.field_heading.value),
          }}></div>
      </div>
    </NavLink>
  );
};

export default SmallCardWithImage;
