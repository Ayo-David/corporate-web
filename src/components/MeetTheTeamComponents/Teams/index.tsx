import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL, LOADING_IMAGE_WAIT_TIME } = ConfigService.getConfig()
export interface ITeamsProps {
  title: string;
  dataList?: any;
}

export const Teams: React.FunctionComponent<ITeamsProps> = (props) => {
  const { title, dataList } = props;
  
  const [imageArray, setImageArray] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {      
      const imageArrayTemp: string[] = [];
      props.dataList.data.forEach((item: any, index: number) => {
        if (item.relationships.field_photo.data) {
          setTimeout( () => {
            dataSvc.getImage(item.relationships.field_photo.data.id).then((data) => {
              // load data          
              imageArrayTemp.push(CMS_IMAGE_URL + data.data.attributes.uri.url);
            })
          }, LOADING_IMAGE_WAIT_TIME * index);
        } else {
          setTimeout( () => {
            imageArrayTemp.push('../assets/photo-bg-gray.png');
          }, LOADING_IMAGE_WAIT_TIME * index);
        }
      });

      setTimeout( () => {
        setImageArray(imageArrayTemp);
      }, LOADING_IMAGE_WAIT_TIME * (props.dataList.data.length + 1));
    }
    
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      <div className="section section-meet-teams">
        <div className="container">
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div className="team-long-txt"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}>
          </div>
          <div className="team-list">
            <div className="row">
              {
                dataList.data.map((item: any, index: number) => (
                  <div className="col col-md-6" key={index}>
                    <div className="items">
                      <div className="left-photo">
                        {!!imageArray[Number(index)] && (
                          <img src={imageArray[Number(index)]} alt="img" />
                        )}
                      </div>
                      <div className="right-area">
                        <div className="top-area">
                          <div className="name-txt">
                            {item.attributes.title}
                          </div>
                          <div className="sub-txt">
                            {item.attributes.field_position}
                          </div>
                          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                          <div className="detail-txt"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_bio?.value) }}>
                          </div>
                        </div>
                        <div className="bottom-icons">
                          <a href="#javascript" className="icons icon-in">&nbsp;</a>
                          <a href="#javascript" className="icons icon-email">&nbsp;</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Teams;
