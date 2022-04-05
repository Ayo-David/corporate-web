import React, { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import { split, last, size } from 'lodash';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { CMS_IMAGE_URL } =ConfigService.getConfig()
export interface ICustomerTestimonialsProps {
  dataList: any;
  position: string;
  isFisrt?: boolean;
  type?: string;
  className?: string;
}

export const CustomerTestimonials: React.FunctionComponent<ICustomerTestimonialsProps> =
  (props) => {
    const { dataList, isFisrt, position, type, className } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoData, setVideoData] = useState<any>();
    const [isShowControls, setIsShowControls] = useState<boolean>(false);

    useEffect(() => {
      if (props.dataList) {
        dataSvc.getImage3(dataList.id).then((data) => {
          dataSvc.getImageVideo(data.data.id).then((dataImage) => {
            // load data
            setVideoData(CMS_IMAGE_URL + dataImage.data.attributes.uri.url);
          });
        });
      }
      // eslint-disable-next-line
    }, [props.dataList]);

    /**
     * get dynamic tail of video for attribute of video tag
     * @param sourceVid - the video source get from endpoint
     */
    function getDynamicTailOfVideo(sourceVid: string) {
      let tail: string = '';
      tail = last(split(last(split(sourceVid, '/')), '.')) as string;

      return `video/${tail}`;
    }

    /**
     * convert link url
     * @param url url
     */
    function convertLinkUrl(url: string) {
      const splitUrl = url.split(':/');
      return `/${splitUrl[1]}`;
    }

    /**
     * handle play video
     */
    const handlePlayVideo = () => {
      videoRef.current?.play();
      setIsShowControls(true);
    };

    return (
      <div
        className={`section-customer-testimonials ${
          type === 'aboutUs' ? 'about-us-products' : ''
        } ${className || ''}`}>
        <div className="container">
          <main>
            {isFisrt && size(dataList.attributes.field_title) && (
              <div className="top-huge-title">
                <h1>{dataList.attributes.field_title}</h1>
              </div>
            )}
            <React.Fragment>
              {position === 'left' && (
                <div className={`group-module ${isFisrt ? 'is-first' : ''}`}>
                  <div className="lefts">
                    {dataList.attributes.field_title && (
                      <div className="gray-title-mobile center">
                        {dataList.attributes.field_title}
                      </div>
                    )}
                    <div className="video-box">
                      {videoData && (
                        <React.Fragment>
                          {!isShowControls && (
                            <button
                              className="btn btn-play"
                              onClick={handlePlayVideo}>
                              <span className="icons icon-play"></span>
                            </button>
                          )}
                          <video ref={videoRef} controls={isShowControls}>
                            <source
                              src={videoData}
                              type={getDynamicTailOfVideo(videoData)}
                            />
                          </video>
                        </React.Fragment>
                      )}
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
                    <div className="video-box">
                      {videoData && (
                        <React.Fragment>
                          {!isShowControls && (
                            <button
                              className="btn btn-play"
                              onClick={handlePlayVideo}>
                              <span className="icons icon-play"></span>
                            </button>
                          )}
                          <video ref={videoRef} controls={isShowControls}>
                            <source
                              src={videoData}
                              type={getDynamicTailOfVideo(videoData)}
                            />
                          </video>
                        </React.Fragment>
                      )}
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

export default CustomerTestimonials;
