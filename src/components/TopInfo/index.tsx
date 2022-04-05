import React, {useState} from 'react';
import './styles.scss';

export interface ITopInfoProps {
}

export const TopInfo: React.FunctionComponent<ITopInfoProps> = (props) => {
  const [showUpcomingInfo, setShowUpcomingInfo] = useState<boolean>(true);
  const [showSupportInfo, setShowSupportInfo] = useState<boolean>(true);

  return (
    <div className="section-top-info">
      {showUpcomingInfo && (
        <div className="red-bar">
          <div className="white-txt">
            <span className="line-txt">Upcoming planned maintenance</span> - Our Online Banking app will be unavailable on 17/04/2021
          </div>
          <a href="#javascript" className="btn-close"
            onClick={(event) => {
              setShowUpcomingInfo(false);
            }}>
            &nbsp;
          </a>
        </div>
      )}
      {showSupportInfo && (
        <div className="blue-bar">
          <div className="white-txt">
            Here to support you and your money. <span className="line-txt">Read our coronavirus support content</span>
          </div>
          <a href="#javascript" className="btn-close"
            onClick={(event) => {
              setShowSupportInfo(false);
            }}>
            &nbsp;
          </a>
        </div>
      )}
    </div>
  );
};

export default TopInfo;
