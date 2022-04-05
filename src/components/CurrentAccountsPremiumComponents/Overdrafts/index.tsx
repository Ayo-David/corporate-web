import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import FAQItem from '../FAQs/FAQItem';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IOverdraftsProps {
  dataList: any;
  position: string;
  isFisrt?: boolean;
  type?: string;
  className?: string;
}

export const Overdrafts: React.FunctionComponent<IOverdraftsProps> = (
  props,
) => {
  const { dataList, isFisrt, position, className } = props;

  const [imageData, setImageData] = useState<any>();
  const [faqData, setFaqData] = useState<any>();

  useEffect(() => {
    if (props.dataList) {
      dataSvc
        .getImageDescriptionWithFaq(dataList.id, 'field_card_image')
        .then((data) => {
          dataSvc.getImage(data.data.id).then((dataImage) => {
            // load data
            setImageData(CMS_IMAGE_URL + dataImage.data.attributes.uri.url);
          });
        });

      dataSvc
        .getImageDescriptionWithFaq(dataList.id, 'field_faq')
        .then((data) => {
          // load data
          setFaqData(data.data);
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
    <div className={`section-overdrafts ${className || ''}`}>
      <div className="container">
        <main>
          <React.Fragment>
            {position === 'left' && (
              <div className={`group-module ${isFisrt ? 'is-first' : ''}`}>
                <div className="lefts">
                  {dataList.attributes.field_title && (
                    <div className="gray-title-mobile center">
                      {dataList.attributes.field_title}
                    </div>
                  )}
                  <div className="img-box">
                    {imageData && <img src={imageData} alt="img" />}
                  </div>
                </div>
                <div className="rights ml60">
                  {dataList.attributes.field_title && (
                    <div className="gray-title">
                      {dataList.attributes.field_title}
                    </div>
                  )}
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div
                    className="content"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
                    }}></div>
                  {faqData && <FAQItem dataList={faqData} isSignle />}
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
                  {dataList.attributes.field_title && (
                    <div className="gray-title">
                      {dataList.attributes.field_title}
                    </div>
                  )}
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div
                    className="content"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
                    }}></div>
                  {faqData && <FAQItem dataList={faqData} isSignle />}
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
                  {dataList.attributes.field_title && (
                    <div className="gray-title-mobile center">
                      {dataList.attributes.field_title}
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

export default Overdrafts;
