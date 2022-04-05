import React, { useState, useEffect } from 'react';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IWeAreATrustedProviderProps {
  dataList: any;
}

export const WeAreATrustedProvider: React.FunctionComponent<IWeAreATrustedProviderProps> = (props) => {
  const { dataList } = props;
  
  const [imageArray, setImageArray] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      const fetchImages = async () => {
        const imageArrayTemp: string[] = [];
        const results: any[] = [];
        
        await Promise.all(
          props.dataList.data.map(async (item: any, index: number) => {
            let response = await dataSvc.getImage(item.relationships.field_media_logo.data.id)
            results[Number(index)] = CMS_IMAGE_URL + response.data.attributes.uri.url;
          })
        )

        results.forEach(response => {
          imageArrayTemp.push(
            response
          );
        });

        setImageArray(imageArrayTemp);
      }
      fetchImages().then(r => {});
    }
  }, [props.dataList]);
  
  return (
    <div className="section-we-are-a-trusted-provider">
      <div className="container">
        <div className="gray-title center">A TRUSTED INSTITUTION SINCE 1953</div>
        <div className="logos-list">
          <ul className="flex-grid">
            {
              !!dataList && dataList.data.map((item: any, index: number) => (
              <li key={index}>
                {!!imageArray[Number(index)] && (
                <div className="logo">
                  <img src={imageArray[Number(index)]} alt="logo" />
                </div>
                )}
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeAreATrustedProvider;
