import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import moment from 'moment';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { DATE_FORMAT, CMS_IMAGE_URL, LOADING_IMAGE_WAIT_TIME }=  ConfigService.getConfig()
export interface ICaseStudiesProps {
  dataList?: any;
  type?: string;
}

export const CaseStudies: React.FunctionComponent<ICaseStudiesProps> = (props) => {
  const [content, setContent] = useState<any>();
  
  //eslint-disable-next-line
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [articleArray, setArticleArray] = useState<any[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      
      dataSvc.getData(props.dataList).then((data) => {
        setContent(data);

        const imageArrayTemp: string[] = [];
        const articleArrayTemp: any[] = [];
        data.data.relationships.field_case_studies.data.forEach((articleItem: any, articleIndex: number) => {
          setTimeout( () => {
            dataSvc.getDealSheetContent(articleItem.id).then((articleData) => {
              // load data          
              articleArrayTemp.push(articleData);
              
              setTimeout( () => {
                dataSvc.getDealSheetThumbnail(articleData.data?.relationships?.field_banner_image?.data?.id).then((imageData) => {
                  // load data          
                  imageArrayTemp.push(CMS_IMAGE_URL + imageData.data.attributes.uri.url);
                })
              }, LOADING_IMAGE_WAIT_TIME * articleIndex * 2);
            });
          }, LOADING_IMAGE_WAIT_TIME * articleIndex);
        });
        
        setTimeout( () => {
          setArticleArray(articleArrayTemp);
        }, LOADING_IMAGE_WAIT_TIME * (data.data.relationships.field_case_studies.data.length + 1));
        
        setTimeout( () => {
          setImageArray(imageArrayTemp);
        }, LOADING_IMAGE_WAIT_TIME * (data.data.relationships.field_case_studies.data.length + 1) * 2);
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      {!!content && (
      <div className={`section section-bridging-finance-case-studies ${props.type}`}>
        <div className="container">
          <div className="flex-space">
            <div className="txt-box">
              <div className="margin">
                <div className="title">
                  {content.data.attributes.field_heading}
                </div>
                {content.data.attributes.field_text && (
                  <div className="txt">
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data.attributes.field_text.processed) }}>
                    </p>
                  </div>
                )}
                {!content.data.attributes.field_text && (
	            <div className="txt">
                  <p>
                    {`We're thrilled to work closely with 
                    our customers providing them 
                    with loans and responsive teams 
                    that support their growth.`}
                  </p>
                </div>
                )}
                <div className="btn-border">
                  <a href="#javascript">See all Case Studies</a>
                </div>
              </div>
            </div>
            {
              articleArray.map((item, index) => (
                <div className="cards" key={index}>
                  <div className="margin">
                    <div className="pic">
                      <img src={`/assets/case-studies-${index + 1}.png`} alt="img" />
                    </div>
                    <div className="main  bg-darkblue">
                      <div className="sm-tit color-white">
                        {item.data.attributes.title}
                      </div>
                      <div className="date">{moment(item.data.attributes.created).format(DATE_FORMAT)}</div>
                    </div>
                  </div>
                </div>
              ))
            }
            <div className="mobile-btn">
              <a href="#javascript">View All Case Studies</a>
            </div>
          </div>
        </div>
      </div>
      )}
    </React.Fragment>
  );
};

export default CaseStudies;
