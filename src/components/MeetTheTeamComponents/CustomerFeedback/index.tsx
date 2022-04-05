import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Carousel from 'react-bootstrap/Carousel';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ICustomerFeedbackProps {
  dataList?: any;
}

export const CustomerFeedback: React.FunctionComponent<ICustomerFeedbackProps> = (props) => {
  const { dataList } = props;
  
  const [imageArray, setImageArray] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {      
      const fetchImages = async () => {
        const imageArrayTemp: string[] = [];
        await Promise.all(
          props.dataList.data.map(async (item: any) => {
            let response = await dataSvc.getImage(item.relationships.field_photo.data.id)
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
    <React.Fragment>
      <div className="section section-meet-customer-feedback">
        <Carousel>
          {
            !!dataList && dataList.data.map((item: any, index: number) => (
            <Carousel.Item key={index}>
              <div className="flex-space mleft-162">
                <div className="left">
                  <div className="title">
                    What our clients 
                    say about us
                  </div>
                  <p className="txt-p">
                    This is what our customers and 
                    business partners think about us.
                  </p>
                </div>
                <div className="right">
                  <div className="bg"></div>
                  <div className="pic-bg">
                    <img src="../assets/mask.png" alt="img"/>
                  </div>
                  <div className="mobile-pic-bg"></div>
                  <div className="photo">
                    <img src={imageArray[Number(index)]} alt="img"/>
                  </div>
                  <div className="w-427">
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div className="txts"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.body.value) }}>
                    </div>
                    <div className="author">
                      <p className="bold">{item.attributes.field_name}</p>
                      <p>{item.attributes.field_designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            ))
          }
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default CustomerFeedback;
