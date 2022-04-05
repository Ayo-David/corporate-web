import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import { NavLink } from 'react-router-dom';

export interface IRelatedCaseStudiesProps {
  dataList: any;
}

const { CMS_IMAGE_URL } = ConfigService.getConfig();

const RelatedCaseStudies: React.FunctionComponent<IRelatedCaseStudiesProps> = (props) => {
  const [imageUrlArray, setImageUrlArray] = useState<any[]>([]);

  useEffect(() => {
    const _imageIds: string[] = [
      ...props.dataList.map((item: any) => item.relationships.field_banner_image.data.id),
    ];
    let _imageUrlTemp: string = '';
    let _imageUrlArray: any[] = [];
    _imageIds.forEach((item: any) => {
      dataSvc.getImage(item).then((response) => {
        _imageUrlTemp = CMS_IMAGE_URL + response.data.attributes.uri.url;
        _imageUrlArray.push(_imageUrlTemp);
        setImageUrlArray([..._imageUrlArray]);
      });
    });
  }, [props.dataList]);
  return (
    <div className="container case-studies">
      <div className="section-title">Related Case Studies</div>
      <div className="case-study-container">
        {!!props.dataList &&
          props.dataList.map((item: any, key: any) => {
            return (
              <div className="case-study" key={key}>
                <NavLink to={`/deal-sheets/${item.id}`}>
                  <div className="image-holder">
                    <img src={imageUrlArray[Number(key)]} alt="deal" />
                  </div>
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div
                    className={`deal-title ${key % 2 === 0 ? 'even' : 'odd'}`}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.attributes.field_heading.value),
                    }}></div>
                </NavLink>
              </div>
            );
          })}
      </div>
      <div className="btn-container">
        <button className="view-more">View More Deal Sheets</button>{' '}
      </div>
    </div>
  );
};

export default RelatedCaseStudies;
