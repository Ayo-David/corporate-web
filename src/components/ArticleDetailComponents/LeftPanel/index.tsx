import React from 'react';
import moment from 'moment';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { DATE_FORMAT } = ConfigService.getConfig()
export interface ILeftPanelProps {
  dateLabel?: string;
}

export const LeftPanel: React.FunctionComponent<ILeftPanelProps> = (props) => {
  const { dateLabel } = props;

  return (
    <React.Fragment>
      <div className="section section-article-details-left-panel">
        <div className="top-date">
          {moment(dateLabel).format(DATE_FORMAT)}
        </div>
        <div className="share-list">
          <div className="title">Share</div>
          <ul>
            <li>
              <a href="#javascript" className="icons icon-in"
                onClick={(event) => event.preventDefault()}>
                <img src="/assets/dark-black-in.svg" alt="img" />
              </a>
            </li>
            <li>
              <a href="#javascript" className="icons icon-twitter"
                onClick={(event) => event.preventDefault()}>
                <img src="/assets/dark-blue-twitter.svg" alt="img" />
              </a>
            </li>
            <li>
              <a href="#javascript" className="icons icon-camera"
                onClick={(event) => event.preventDefault()}>
                <img src="/assets/dark-blue-camera.svg" alt="img" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftPanel;
