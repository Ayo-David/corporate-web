import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IAwarenessProps {
  dataList: any[];
}

export const Awareness: React.FunctionComponent<IAwarenessProps> = (props) => {
  const { dataList } = props;
  
  const [imageArray, setImageArray] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      const fetchImages = async () => {
        const imageArrayTemp: string[] = [];
        await Promise.all(
          props.dataList.map(async (item: any) => {
            let response = await dataSvc.getImage(item.data.relationships.field_image_video.data.id)
            imageArrayTemp.push(CMS_IMAGE_URL + response.data.attributes.uri.url)
          })
        )
        setImageArray(imageArrayTemp);
      }
      fetchImages().then(r => {});
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <div className="section-home-awareness">
      <div className="container">
        <div className="card-three">
          <div className="row">
            <div className="col col-md-6 flex-spacing">
              {
                dataList.map((item, index) => (
                  <div className="gray-panel" key={index}>
                    <div className="left-img">
                      <img src={imageArray[Number(index)]} alt="img" />
                    </div>
                    <div className="right-txt">
                      <div className="top-area">
                        <div className="top-title">{item.data.attributes.title}</div>
                        <p className="txt">
                          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.data.attributes.field_snippet.value) }} />
                        </p>
                      </div>
                      <div className="bottom-more flex-grid">
                        <a
                          href={`https://www.cynergybank.co.uk${item.data.attributes.field_download_or_read_more_link.uri.split(':')[1]}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="blue-link"
                        >
                          {item.data.attributes.field_download_or_read_more_link.title}
                        </a>
                        <a
                          href={`https://www.cynergybank.co.uk${item.data.attributes.field_download_or_read_more_link.uri.split(':')[1]}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="icons icon-circle-arrow-right-dark"
                        >
                          &nbsp;
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="col col-md-6 border-col">
              <div className="border-box">
                <div className="top-bar flex-grid">
                  <div className="lefts flex">
                    <div className="logo-box">
                      <img src="assets/logos/logo.png" alt="logo" />
                    </div>
                    <div className="right-txt">
                      <div className="bold-title">
                        Odyssey Bank
                        <i className="icons icon-done"></i>
                      </div>
                      <div className="gray-txt">
                        @OdysseyBank
                      </div>
                    </div>
                  </div>
                  <a href="#javascript" className="icons icon-twitter">&nbsp;</a>
                </div>
                <div className="long-txt">
                  <a href="#javascript" className="blue-link">Steve Crosswell</a>
                    {`'Relationship Director at Odyssey Bank, participated in 
                    the recent Savills podcast series: Real Estate Insights 
                    with a great discussion on ‘The pub market emerging from 
                    lockdown'. Click here to listen:`}
                    <a href="#javascript" className="blue-link">
                      https://lnkd.in/dZuMFxb #leisure #hospitality
                    </a>
                </div>
                <div className="podcast-img">
                  <img src="assets/podcast-img.png" alt="img" />
                </div>
                <div className="date-info flex-grid">
                  <div className="left-date">
                    12:09 AM · May 6,2014
                  </div>
                  <a href="#javascript" className="icons btn-info">&nbsp;</a>
                </div>
                <div className="link-list">
                  <a href="#javascript" className="icon-txt">
                    <i className="icons icon-like"></i>
                    <span className="txt">6.1k</span>
                  </a>
                  <a href="#javascript" className="icon-txt">
                    <i className="icons icon-talk"></i>
                    <span className="txt">1.8k</span>
                  </a>
                  <a href="#javascript" className="icon-txt">
                    <i className="icons icon-link"></i>
                    <span className="txt">Copy link to Tweet</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end .card-three */}
      </div>
    </div>
  );
};

export default Awareness;
