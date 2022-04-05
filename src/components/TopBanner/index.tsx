import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import moment from 'moment';
import { ConfigService } from '../../services/ConfigService';
import dataSvc from '../../services/dataSvc';
import './styles.scss';

const { DATE_TIME_FORMAT, CMS_IMAGE_URL } = ConfigService.getConfig();
export interface ITopBannerProps {
  titlePage?: string;
  dataList: any;
  type?: string;
  onClickButton?: () => void;
  bgImageSizeOverride?: CSSStyleDeclaration['backgroundSize'];
  bgImagePositionOverride?: CSSStyleDeclaration['backgroundPosition'];
  bannerMaskSizeOverride?: CSSStyleDeclaration['webkitMaskSize'];
}

export const TopBanner: React.FunctionComponent<ITopBannerProps> = (props) => {
  const {
    titlePage,
    dataList,
    type,
    onClickButton,
    bgImageSizeOverride,
    bgImagePositionOverride,
    bannerMaskSizeOverride,
  } = props;
  let position = 'right';

  const [imageUrl, setImageUrl] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('teal');
  const [maskType, setMaskType] = useState<string>('mask-curve-right-top');

  useEffect(() => {
    if (props.dataList) {
      const maskingOnImage = props.dataList.data.attributes.field_masking_on_image || '';
      if (maskingOnImage.startsWith('Teal')) {
        setBackgroundColor('teal');
      } else if (maskingOnImage.startsWith('Pink')) {
        setBackgroundColor('pink');
      } else if (maskingOnImage.startsWith('Grey')) {
        setBackgroundColor('grey');
      }

      if (type === 'relationship-banner') {
        setBackgroundColor('black');
      }

      const maskingPosition = props.dataList.data.attributes.field_masking_position || '';
      if (maskingPosition === 'Right Top') {
        setMaskType('mask-curve-right-top');
      } else if (maskingPosition === 'Right Center') {
        setMaskType('mask-curve-right-center');
      } else if (maskingPosition === 'Left Bottom') {
        setMaskType('mask-curve-left-bottom');
      } else if (maskingPosition === 'Left Center') {
        setMaskType('mask-curve-left-center');
      } else if (!maskingPosition && type === 'personal-banner') {
        setMaskType('mask-curve-left-bottom');
      } else if (!maskingPosition && type === 'private-banking-banner') {
        setMaskType('mask-curve-left-bottom');
      } else if (!maskingPosition && type === 'relationship-banner') {
        setMaskType('mask-curve-left-center');
      } else if (maskingPosition === 'None' && type === 'home-banner') {
        setMaskType('mask-curve-right');
      }

      let imageUrlTemp = '';
      dataSvc.getImage(dataList.data.relationships.field_banner_image.data.id).then((data) => {
        // load data
        imageUrlTemp = CMS_IMAGE_URL + data.data.attributes.uri.url;

        setImageUrl(imageUrlTemp);
      });
    }
    // eslint-disable-next-line
  }, [props.dataList]);

  // get Banner Image Style
  const getBannerImageStyle = () => {
    const bannerImageUrl = imageUrl ? imageUrl : '';

    if (maskType === 'mask-curve-right-top' || maskType === 'mask-curve-right-center') {
      position = 'right';
    } else if (maskType === 'mask-curve-left-bottom' || maskType === 'mask-curve-left-center') {
      position = 'left';
    }

    return {
      backgroundImage: `url(${bannerImageUrl})`,
      backgroundPosition: bgImagePositionOverride || `${position} center`,
      backgroundSize: bgImageSizeOverride,
      backgroundRepeat: 'no-repeat',
    };
  };

  const renderHTML = (html: string) => {
    if (html) {

      // remove empty tag and &nbsp html
      const cleanupHtml = html.replace(/<[^/>][^>]*><\/[^>]+>/g, '').replace(/&nbsp;/g, '');

      // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
      return <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cleanupHtml) }} />; // eslint-disable-line react/no-danger
    }

    return null;
  };

  const content =
    type === 'fee-and-rates-banner' ? (
      <>
        <div className="title-uppercase">{titlePage}</div>
        <div className="subtitle-small-txt">{dataList.data.attributes.field_banner_text}</div>
        <div className="date-txt">
          Last updated:{' '}
          {moment(dataList.data.attributes.changed || dataList.data.attributes.created).format(
            DATE_TIME_FORMAT
          )}
        </div>
      </>
    ) : type === 'page-template-banner' ? (
      <>
        <div className="title-uppercase">{titlePage}</div>
        <div className="title-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
        <div className="subtitle-template-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_subtitle?.value) ||
            dataList.data.attributes.field_banner_text ||
            dataList.data.attributes.field_subtitle}
        </div>
      </>
    ) : type === 'business-banner' ? (
      <>
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="title-big-txt"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.data.attributes.field_title) }}
        />
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="subtitle-big-txt"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dataList.data.attributes.field_subtitle),
          }}
        />
      </>
    ) : type === 'private-banking-banner' ? (
      <>
      <div className="title-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
        <div className="subtitle-private-banking-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_subtitle?.value) ||
            dataList.data.attributes.field_banner_text ||
            dataList.data.attributes.field_subtitle}
        </div>
      </>
    ) : type === 'fee-and-rates-banner' ? (
      <>
        <div className="subtitle-small-txt">{dataList.data.attributes.field_banner_text}</div>
        <div className="date-txt">
          Last updated:{' '}
          {moment(dataList.data.attributes.changed || dataList.data.attributes.created).format(
            DATE_TIME_FORMAT
          )}
        </div>
      </>
    ) : type === 'loan-completion' ? (
      <>
        <div className="title-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
        <div className="subtitle-template-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_subtitle?.value) ||
            dataList.data.attributes.field_banner_text ||
            dataList.data.attributes.field_subtitle}
        </div>
      </>
    ) : type === 'about-us-ethics-values-banner' ? (
      <>
        <div className="title-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
        <div className="subtitle-template-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_subtitle?.value) ||
            dataList.data.attributes.field_banner_text ||
            dataList.data.attributes.field_subtitle}
        </div>
      </>
    ) : type === 'document-library' ? (
      <>
        <div className="title-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
        <div className="subtitle-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_subtitle?.value) ||
            dataList.data.attributes.field_banner_text ||
            dataList.data.attributes.field_subtitle}
        </div>
      </>
    ) : type === 'customer-support' ? (
      <>
        <div className="title">{titlePage}</div>
        <div className="subtitle-big-txt">
          {renderHTML(dataList.data.attributes.field_formatted_heading?.value) ||
            dataList.data.attributes.field_title}
        </div>
      </>
    ) :(
      <>
        <div className="title-big-txt">
          {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                DOMPurify.sanitize(
                  dataList.data.attributes.field_title ||
                  dataList.data.attributes.field_formatted_heading.processed,
                )
            }}
          />
        </div>
        <div className={`subtitle-big-txt ${type}`}>{dataList.data.attributes.field_subtitle}</div>
      </>
    );

  const contentBtn = dataList.data.attributes.field_cta_button_link ? (
    <div className="bottom-btn">
      <a
        href={dataList.data.attributes.field_cta_button_link.uri.replace('internal:', '')}
        className="btn btn-black"
        onClick={onClickButton}>
        {dataList.data.attributes.field_cta_button_link.title}
      </a>
    </div>
  ) : null;

  const bannerMaskStyle = bannerMaskSizeOverride ? (
    <style>
      {`
        @media (min-width: 1280px) {
          .section-top-banner.section-top-banner .background-img {
            -webkit-mask-size: ${bannerMaskSizeOverride};
            mask-size: ${bannerMaskSizeOverride};
          }
        }
      `}
    </style>
  ) : null;

  return (
    <React.Fragment>
      {imageUrl !== '' && (
        <div
          className={`section section-top-banner ${backgroundColor} ${type} ${
            (window.location.pathname === '/personal/identification_requirements' ||
              window.location.pathname === '/personal/current_account_page') &&
            `small-banner-fix`
          }`}>
          <div className={`background-img ${maskType}`} style={getBannerImageStyle()}></div>

          {type === 'home-banner' && <div className="background-img-left mask-curve-left"></div>}
          <div className="container">
            <div className={`banner-content ${position}`}>
              <div className="banner-content-container">
                {content}
                {contentBtn}
              </div>
            </div>
          </div>
        </div>
      )}
      {bannerMaskStyle}
    </React.Fragment>
  );
};

export default TopBanner;
