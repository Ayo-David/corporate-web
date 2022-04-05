import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface ITrustedProviderProps {
  dataList: any;
}

export const TrustedProvider: React.FunctionComponent<ITrustedProviderProps> = (
  props,
) => {
  const { dataList } = props;

  const [imageList, setImageList] = useState<string[]>([]);
  const [imageArray, setImageArray] = useState<string[]>([]);

  useEffect(() => {
    if (props.dataList) {
      const fetchData = async () => {
        let url = new URL(
          props.dataList.data.relationships.field_logo_link.links.related.href,
        );
        let response = await dataSvc.getData(url.pathname + url.search);
        setImageList(response.data);
      };
      fetchData();
    }
  }, [props.dataList]);

  useEffect(() => {
    if (imageList.length > 0) {
      const fetchImages = async () => {
        const imageArrayTemp = await Promise.all(
          imageList.map(async (item: any) => {
            let response = await dataSvc.getImage(
              item.relationships.field_media_logo.data.id,
            );
            return CMS_IMAGE_URL + response.data.attributes.uri.url;
          }),
        );
        setImageArray(imageArrayTemp);
      };
      fetchImages();
    }
  }, [imageList]);

  return (
    <div className="trusted-provider">
      <div className="container">
        <div className="row flex-row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="gray-title">{dataList?.data?.attributes.title}</div>
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
            <div
              className="desc"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataList?.data?.attributes.body.processed),
              }}
            />
          </div>
          <div className="col-lg-7 col-md-6 col-sm-12">
            <div className="flex log-row flex-row justify-content-between">
              {imageArray.map((image: any, index: number) => (
                <div className="logo-holder flex" key={index}>
                  <img src={image} alt="logo" key={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedProvider;
