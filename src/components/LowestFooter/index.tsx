import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface ILowestFooterProps {
  dataList: any;
}

export const LowestFooter: React.FunctionComponent<ILowestFooterProps> = (
  props,
) => {
  const { dataList } = props;
  return (
    <React.Fragment>
      {!!dataList && (
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-description">
              {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
              <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dataList.data.attributes.body.value),
                }}></p>
            </div>
            <div className="footer-bottom-award flex">
              <img src="/assets/logos/footer-award-1.png" alt="Award" />
              <img src="/assets/logos/footer-award-2.png" alt="Award" />
              <img src="/assets/logos/footer-award-3.png" alt="Award" />
              <img src="/assets/logos/footer-award-4.png" alt="Award" />
              <img src="/assets/logos/footer-award-5.png" alt="Award" />
            </div>
          </div>
          <div className="footer-bottom-action">
            <div className="footer-bottom-action-download">
              <h5>DOWNLOAD OUR APP</h5>
              <div className="logos">
                {!!dataList.data.attributes.field_download &&
                  dataList.data.attributes.field_download.map(
                    (item: any, index: number) => {
                      return (
                        <a
                          href={item.uri}
                          className={`logo ${item.title}`}
                          key={index}>
                          <img
                            src={`${
                              item.uri.includes('apple')
                                ? '/assets/logos/download-appstore-black.svg'
                                : '/assets/logos/download-playstore-black.svg'
                            } `}
                            alt="Download"
                          />
                        </a>
                      );
                    },
                  )}
              </div>
            </div>
            <div className="footer-bottom-action-social">
              <h5>Connect with us</h5>
              <div className="logos">
                <a href="#javascript" className="logo">
                  <i className="icons icon-phone-black"></i>
                </a>
                <a href="#javascript" className="logo">
                  <i className="icons icon-message-black"></i>
                </a>
                {!!dataList.data.attributes.field_social_media_links &&
                  dataList.data.attributes.field_social_media_links.map(
                    (item: any, index: number) => {
                      return (
                        <a href={item.uri} className={'logo'} key={index}>
                          <i className={`icons ${item.title}`}></i>
                        </a>
                      );
                    },
                  )}
              </div>

              <a
                href={
                  dataList.data.attributes.field_modern_slavery_statement.uri
                }
                className="btn btn-black">
                {!!dataList.data.attributes.field_modern_slavery_statement &&
                  dataList.data.attributes.field_modern_slavery_statement.title}
              </a>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LowestFooter;
