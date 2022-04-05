import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IAwarenessProps {
  dataList: any;
}

export const Awareness: React.FunctionComponent<IAwarenessProps> = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.dataList) {
      const fetchImages = async () => {
        let tempData = props.dataList.data;
        await Promise.all(
          tempData.map(async (item: any) => {
            const index: number = tempData.indexOf(item);
            let response = await dataSvc.getImage(item.relationships.field_image_video.data.id)
            tempData[Number(index)].imageUrl = CMS_IMAGE_URL + response.data.attributes.uri.url;
          })
        )
        setData(tempData);
      }
      fetchImages().then(r => {});
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <div className="section-personal-sa-awareness">
      <div className="container">
        <div className="card-three">
          <div className="row">
            {
              data.map((item: any, index: number) => (
                <div className={`col ${index === 0 ? 'col-md-12' : 'col-md-6 col-sm-12'}`} key={index}>
                  <div className={`gray-panel ${index === 0 && 'first-panel'}`}>
                    <div className="left-img">
                      <img src={item.imageUrl} alt="img"/>
                    </div>
                    <div className="right-txt">
                      <div className="top-area">
                        <div className="top-title">{item.attributes.title}</div>
                        <p className="txt">
                          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.attributes.field_snippet.value)}}/>
                        </p>
                      </div>
                      <div className="bottom-more flex-grid">
                        <a href={item.attributes.field_download_or_read_more_link?.uri.replace('internal:','')}
                           className="blue-link">
                          {item.attributes.field_download_or_read_more_link?.title}
                        </a>
                        <a href={item.attributes.field_download_or_read_more_link?.uri.replace('internal:','')}
                           className="icons icon-circle-arrow-right-dark">&nbsp;</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* end .card-three */}
      </div>
    </div>
  );
};

export default Awareness;
