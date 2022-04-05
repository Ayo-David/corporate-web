import React from 'react';
import './styles.scss';

interface ISocialMediaProps {
  dataList?: any;
}

export const SocialMedia: React.FunctionComponent<ISocialMediaProps> = (props) => {
  const { dataList } = props;

  return (
    <React.Fragment>
      <div className="section section-social-media">
        <div className="container">
          <div className="big-txt">Connect with us on social media.</div>
          <div className="social-links">
            {dataList.data.attributes.field_facebook && (
              <a href={dataList.data.attributes.field_facebook.uri} className="social-link"><i className="icon icon-facebook"></i></a>
            )}
            {dataList.data.attributes.field_linkedin && (
              <a href={dataList.data.attributes.field_linkedin.uri} className="social-link"><i className="icon icon-linkedin"></i></a>
            )}
            {dataList.data.attributes.field_twitter && (
              <a href={dataList.data.attributes.field_twitter.uri} className="social-link"><i className="icon icon-twitter"></i></a>
            )}
            {dataList.data.attributes.field_instagram && (
              <a href={dataList.data.attributes.field_instagram.uri} className="social-link"><i className="icon icon-instagram"></i></a>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}