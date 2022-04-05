import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import { size } from 'lodash';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IImageWithLongTextProps {
  dataList: any;
  position: string;
  isFisrt?: boolean;
  type?: string;
  className?: string;
  sectionRef?: any;
}

export const ImageWithLongText: React.FunctionComponent<IImageWithLongTextProps> =
  (props) => {
    const { dataList, position, isFisrt, type, className, sectionRef } = props;

    const [imageData, setImageData] = useState<any>();

    useEffect(() => {
      if (props.dataList) {
        dataSvc.getImageWithLongText(dataList.id).then((data) => {
          dataSvc.getImage(data.data.id).then((dataImage) => {
            // load data
            setImageData(CMS_IMAGE_URL + dataImage.data.attributes.uri.url);
          });
        });
      }
      // eslint-disable-next-line
    }, [props.dataList]);

    /**
     * convert link url
     * @param url url
     */
    function convertLinkUrl(url: string) {
      const splitUrl = url.split(':/');
      return `/${splitUrl[1]}`;
    }

    return (
      <div
        className={`section-image-with-long-text ${
          type === 'aboutUs' ? 'about-us-products' : ''
        } ${className || ''}`}
        ref={sectionRef}>
        <div className="container">
          <main>
            {type === 'aboutUs' && isFisrt && (
              <div className="top-huge-title">
                {size(dataList.attributes.field_titles) ? (
                  <h1>{dataList.attributes.field_titles}</h1>
                ) : null}
              </div>
            )}
            <React.Fragment>
              {position === 'left' && (
                <div className={`group-module ${isFisrt ? 'is-first' : ''}`}>
                  <div className="lefts">
                    {dataList.attributes.field_titles && (
                      <div className="gray-title-mobile center">
                        {dataList.attributes.field_titles}
                      </div>
                    )}
                    <div className="img-box">
                      {imageData && <img src={imageData} alt="img" />}
                    </div>
                  </div>
                  <div className="rights ml60">
                    {dataList.attributes.field_titles && (
                      <div className="gray-title">
                        {dataList.attributes.field_titles}
                      </div>
                    )}
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div
                      className="content"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
                      }}></div>
                    {dataList.attributes.field_single_link && (
                      <div className="bottom-btn">
                        <a
                          href={convertLinkUrl(
                            dataList.attributes.field_single_link.uri,
                          )}
                          className="btn btn-green-border">
                          {dataList.attributes.field_single_link.title}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {position === 'right' && (
                <div
                  className={`group-module is-right ${
                    isFisrt ? 'is-first' : ''
                  }`}>
                  <div className="lefts mr60">
                    {dataList.attributes.field_titles && (
                      <div className="gray-title">
                        {dataList.attributes.field_titles}
                      </div>
                    )}
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div
                      className="content"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
                      }}></div>
                    {dataList.attributes.field_single_link && (
                      <div className="bottom-btn">
                        <a
                          href={convertLinkUrl(
                            dataList.attributes.field_single_link.uri,
                          )}
                          className="btn btn-green-border">
                          {dataList.attributes.field_single_link.title}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="rights ">
                    {dataList.attributes.field_titles && (
                      <div className="gray-title-mobile center">
                        {dataList.attributes.field_titles}
                      </div>
                    )}
                    <div className="img-box">
                      {imageData && <img src={imageData} alt="img" />}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          </main>
        </div>
      </div>
    );
  };

export default ImageWithLongText;
