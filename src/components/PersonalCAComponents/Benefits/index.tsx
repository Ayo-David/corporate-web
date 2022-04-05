import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import { NavLink, useHistory } from 'react-router-dom';
import './styles.scss';
import dataSvc from '../../../services/dataSvc';
import { ConfigService } from '../../../services/ConfigService';

const {CMS_IMAGE_URL} = ConfigService.getConfig()
export interface IBenefitsProps {
  data: any
}

export const Benefits: React.FunctionComponent<IBenefitsProps> = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.data) {
      const fetchImages = async () => {
        let tempData = props.data.data;
        await Promise.all(
          tempData.map(async (item: any) => {
            const index: number = tempData.indexOf(item);
            if(item.type === 'paragraph--image_with_long_text'){
              let response = await dataSvc.getImage(item.relationships.field_images.data.id)
              tempData[Number(index)].imageUrl = CMS_IMAGE_URL + response.data.attributes.uri.url;
            }
            if(item.type === 'paragraph--cards_with_link_text'){
              let url= new URL(item.relationships.field_text_with_link.links.related.href)
              let response = await dataSvc.getData(url.pathname + url.search)
              tempData[Number(index)].readyToJoin = response.data;
            }
          })
        )
        setData(tempData);
      }
      fetchImages().then(r => {});
    }
    // eslint-disable-next-line
  }, [props.data]);

  const contentClickHandler = (e: any) => {
    const targetLink = e.target.closest('a');
    if(!targetLink) return;
    e.preventDefault();
    history.push(targetLink.href);
  };

  return (
    <>
      <div className="personal-account-benefits">
        <div className="container">
          <div className="section-title mobile-hide">Benefits</div>
          <div className="section-title desktop-hide mobile-show">KEY FEATURES</div>
        </div>
      </div>
      {data.map((benefits: any, ind: number) =>
        <React.Fragment key={ind}>
          {benefits.type === "paragraph--image_with_long_text" &&
          <div className="personal-account-benefits">
            <div className="container">
              <div className={`section flex ${ind % 2 === 0 ? 'flex-md-row-reverse' : 'flex-md-row'} flex-column justify-content-between`}
                   key={ind}>
                <div className="image-holder">
                  <img src={benefits.imageUrl} alt={benefits.attributes.field_titles}/>
                </div>
                <div className={`content-holder ${ind % 2 === 1 && 'content-right'}`}>
                  {/*<div className="content-title">{benefits.attributes.field_titles}</div>*/}
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div className="field_text"
                       onClick={contentClickHandler}
                       // eslint-disable-next-line react/no-danger
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(benefits.attributes.field_text.processed)}}/>
                </div>
              </div>
            </div>
          </div>
          }
          {benefits.type === "paragraph--cards_with_link_text" &&
          <div className="ready-to-join-personal flex flex-column">
            <div className="title">{benefits.attributes.field_heading}</div>
            <div className="content">
              <div className="row flex-row">
                {benefits.readyToJoin.map((item: any, i: number) =>
                  <div className="col-md-6 col-sm-12 align-items-center d-flex flex-column" key={i}>
                    <div className="text">{item.attributes.field_description}</div>
                    <NavLink to={item.attributes.field_single_link.uri.replace('internal:', '')} className="btn btn-black">{item.attributes.field_single_link.title}</NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
          }
        </React.Fragment>
      )}
    </>
  );
};

export default Benefits;
