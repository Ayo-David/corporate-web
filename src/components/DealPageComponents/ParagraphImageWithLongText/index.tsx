import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import { ConfigService } from '../../../services/ConfigService';
import './styles.scss';

export interface IParagraphImageWithLongTextProps {
  dataList: any;
  key: any;
}

const { CMS_IMAGE_URL } = ConfigService.getConfig();

const ParagraphImageWithLongText: React.FunctionComponent<IParagraphImageWithLongTextProps> = (
  props
) => {
  const [imageUrlTemp, setImageUrlTemp] = useState<string>('');
  useEffect(() => {
    let _imageUrlTemp = '';
    dataSvc.getImage(props.dataList.relationships.field_images.data.id).then((response) => {
      _imageUrlTemp = CMS_IMAGE_URL + response.data.attributes.uri.url;
      setImageUrlTemp(_imageUrlTemp);
    });
  }, [props.dataList]);
  return (
    <div className="container deals-page">
      <div className={`section ${props.dataList.type}`}>
        <div className="category">{props.dataList.attributes.field_titles}</div>
        <div className="field_text_container">
          <div className="left">{!!imageUrlTemp && <img src={imageUrlTemp} alt="" />}</div>
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div
            className="right"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.dataList.attributes.field_text.value) }}></div>
        </div>
      </div>
    </div>
  );
};

export default ParagraphImageWithLongText;
