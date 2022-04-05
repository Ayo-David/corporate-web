import React from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig();
interface IVisitOurOfficeProps {
  dataMap?: any;
  dataList?: any;
}

export const VisitOurOffice: React.FunctionComponent<IVisitOurOfficeProps> = (props) => {
  const { dataMap, dataList } = props;

  return (
    <React.Fragment>
      <div className="section section-visit-our-office">
        <div className="up-txt">{dataMap.attributes.field_map_title}</div>
        <div className="content">
          <img src={CMS_IMAGE_URL + dataList.data.attributes.uri.url} alt="" />
          <div className="box-marker">
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}{' '}
            {/* eslint-disable-next-line react/no-danger */}
            <div
              className="address"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataMap.attributes.field_map_address.value),
              }}></div>
            <div className="bottom-btn">
              <a href={dataMap.attributes.field_map_link.uri} className="btn btn-white-border">
                {dataMap.attributes.field_map_link.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
