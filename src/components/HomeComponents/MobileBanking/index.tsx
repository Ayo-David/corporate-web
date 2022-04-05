import React from 'react';
import './styles.scss';

export interface INewsArticlesListProps {
}

export const NewsArticlesList: React.FunctionComponent<INewsArticlesListProps> = (props) => {

  return (
    <div className="section-mobile-banking">
      <div className="container">
        <div className="mobile-banking flex">
          <div className="lefts">
            <div className="gray-title">
              MOBILE BANKING
            </div>
            <div className="big-txt">
              Download our new Odyssey Mobile app.
            </div>
            <div className="txt">
              We’ve built our mobile platform just for you to bring Banking to your fingertips.
            </div>
            <div className="two-black flex">
              <div className="logo-items">
                <img src="../assets/logos/app-store.svg" alt="img" />
              </div>
              <div className="logo-items">
                <img src="../assets/logos/google-play.svg" alt="img" />
              </div>
            </div>
          </div>
          <div className="rights">
            <div className="video-box">
              <div className="video-img">
                <img src="../assets/video-img.jpg" alt="img" />
              </div>
              <a href="#javascript" className="icons btn-play">&nbsp;</a>
            </div>
          </div>
        </div>
        {/* end .mobile-banking */}
      </div>
    </div>
  );
};

export default NewsArticlesList;
