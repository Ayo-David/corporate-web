import React, { useState, useEffect } from 'react';
import { ConfigService } from '../../services/ConfigService';
import Carousel from 'react-bootstrap/Carousel';
import dataSvc from '../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig();

export interface ITopBannerImageCarouselProps {
  dataList: any;
}

export const TopBannerImageCarousel: React.FunctionComponent<ITopBannerImageCarouselProps> = (
  props
) => {
  const { dataList } = props;
  const [bannerMode, setBannerMode] = useState<string>('carousel');
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    if (!!dataList && !!dataList.data) {
      if (typeof dataList.data.relationships.field_media_image === 'object' && !Array.isArray(dataList.data.relationships.field_media_image)) {
        const _dealBannerImages: any[] = ['', '', ''];
        let imageUrlTemp = '';
        dataSvc.getImage(dataList.data.id).then((response) => {
          imageUrlTemp = CMS_IMAGE_URL + response.data.attributes.uri.url;
          _dealBannerImages.fill(imageUrlTemp, 0, 3);
          setImageUrl([..._dealBannerImages]);
        });
      }
      else if (Array.isArray(dataList.data.relationships.field_media_image)) {
        const fetchImages = async () => {
          const imageArrayTemp: string[] = [];
            await Promise.all(
              dataList.data.relationships.field_media_image.map(async (logoItem: any) => {
                let response = await dataSvc.getImage(logoItem.relationships.field_media_logo.data.id)
                imageArrayTemp.push(CMS_IMAGE_URL + response.data.attributes.uri.url)
              })
            )
            setImageUrl([...imageArrayTemp]);
        }
      fetchImages().then(r => {});
      }
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      <div className={`section section-top-banner-carousel ${bannerMode}`}>
        <div className="deal-banner-container">
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} controls={false}>
            {!!imageUrl &&
              imageUrl.map((item, key) => {
                return (
                  <Carousel.Item key={key}>
                    <img className="deal-banner" src={item} alt="" />
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>
        {bannerMode === 'show-thumbnails' && (
          <div className="thumbnail-list">
            {!!imageUrl &&
              imageUrl.map((item, key) => {
                return (
                  <div className="thumbnail-container" key={key}>
                    <img
                      className={`thumbnail ${key === activeIndex ? 'active' : ''}`}
                      src={item}
                      alt="thumbnail"
                      key={key}
                      onClick={() => setActiveIndex(key)}
                    />
                    {key === activeIndex && (
                      <img src="/assets/logos/logo.png" alt="logo" className="selected-logo" />
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="container">
        <button
          className="switch-carousel"
          onClick={() => setBannerMode(bannerMode === 'carousel' ? 'show-thumbnails' : 'carousel')}>
          {`Switch to ${bannerMode === 'carousel' ? 'Thumbnails' : 'Carousel'}`}
        </button>
      </div>
    </React.Fragment>
  );
};

export default TopBannerImageCarousel;
