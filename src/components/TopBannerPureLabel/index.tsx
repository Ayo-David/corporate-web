import React from 'react';
import './styles.scss';

export interface ITopBannerPureLabelProps {
  title: string
}

export const TopBannerPureLabel: React.FunctionComponent<ITopBannerPureLabelProps> = (props) => {
  const { title } = {...props}

  return (
    <React.Fragment>
      <div className="section section-faq-individual-banner">
          <div className="container">
              <div className="hero-business-content">
                <div className="white-big-txt">
                  {title}
                </div>
              </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default TopBannerPureLabel;
