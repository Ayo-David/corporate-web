import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
interface ITrustedProviderProps {
  dataList: any;
  type?: string;
  smallerTxt?: boolean;
}

const TrustedProvider: React.FunctionComponent<ITrustedProviderProps> = (
  props,
) => {
  const { dataList, type, smallerTxt } = props;
  const [dataTrustedProvider, setDataTrustedProvider] = useState<any>();
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageArray, setImageArray] = useState<string[]>([]);

  useEffect(() => {
    dataSvc.getCurrentAccountsTrustedProviderData(dataList.id).then((data) => {
      setDataTrustedProvider(data);
      dataSvc
        .getCurrentAccountsTrustedProviderLogoData(data.data.id)
        .then((dataTrusted) => {
          setImageList(dataTrusted.data);
        });
    });
  }, [dataList]);

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
    <div
      className={`section-trusted-provider ${
        type === 'personal' ? 'personal-trusted-provider' : type === 'private-banking' ? 'private-banking-trusted-provider' : ''
      }`}>
      <div className="container">
        <div className="trusted-provider-content">
          <div className="left-content">
            <h2 className="title">
              {!!dataTrustedProvider &&
                dataTrustedProvider.data.attributes.title}
            </h2>
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
            <div
              className={`txt ${smallerTxt ? 'smaller-txt' : ''}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  DOMPurify.sanitize(
                    !!dataTrustedProvider &&
                    dataTrustedProvider.data.attributes.body.value,
                  )
              }}></div>
          </div>
          <div className="right-content">
            <ul className="flex-grid">
              {!!imageArray &&
                imageArray.map((item: any, index: number) => (
                  <li key={index}>
                    <div className="logo">
                      <img src={item} alt="logo" />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedProvider;
