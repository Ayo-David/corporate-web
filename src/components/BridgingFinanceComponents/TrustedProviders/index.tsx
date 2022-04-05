import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ITrustedProvidersProps {
  dataList?: any;
  noMarginBottom?: boolean;
  type?: string;
}

export const TrustedProviders: React.FunctionComponent<ITrustedProvidersProps> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [itemArray, setItemArray] = useState<any[]>([]);
  const [imageArray, setImageArray] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {      
      dataSvc.getData(props.dataList).then((data) => {        
        const url = data.data.relationships.field_trusted_provider.links.related.href;
        dataSvc.getData(url).then((fieldTrustedProviderData) => {
          setTitle(fieldTrustedProviderData.data.attributes.title);
          
          const fieldTrustedProviderUrl = fieldTrustedProviderData.data.relationships.field_logo_link.links.related.href;
          dataSvc.getData(fieldTrustedProviderUrl).then((itemData) => {
            setItemArray(itemData.data);
            
            const fetchImages = async () => {
              const imageArrayTemp: string[] = [];
              await Promise.all(
                itemData.data.map(async (logoItem: any) => {
                  let response = await dataSvc.getImage(logoItem.relationships.field_media_logo.data.id)
                  imageArrayTemp.push(CMS_IMAGE_URL + response.data.attributes.uri.url)
                })
              )
              setImageArray(imageArrayTemp);
            }
            fetchImages().then(r => {});
          });
        });
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      <div className={`section section-bridging-finance-trusted-providers ${props.type} ${props.noMarginBottom ? 'no-margin-bottom' : ''}`}>
        <div className="container">
          <div className="title">
            {title}
          </div>
          <div className="flex-space">
            {
              itemArray.map((item, index) => (
                <div className="section" key={index}>
                  <div className="icon-img">
                    <img src={imageArray[Number(index)]} alt="img" />
                  </div>
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div className="content-container"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_text.value) }}>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrustedProviders;
