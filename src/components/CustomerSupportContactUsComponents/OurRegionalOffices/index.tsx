import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

interface IOurRegionalOfficesProps {
  dataList?: any;
}

export const OurRegionalOffices: React.FunctionComponent<IOurRegionalOfficesProps> = (props) => {
  const { dataList } = props;

  return (
    <React.Fragment>
      <div className="section section-our-regional-offices">
        <div className="container">
          <div className="up-txt">{dataList.data.attributes.field_title}</div>
          <div className="content">
            {dataList.included &&
              dataList.included.map((item: any, index: number) => {
                return (
                  <div className="office" key={index}>
                    <div className="title">{item.attributes.title}</div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}{' '}
                    {/* eslint-disable-next-line react/no-danger */}
                    <div
                      className="address"
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.attributes.field_address.value),
                      }}></div>
                    <div
                      className="opening-hours"
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.attributes.field_opening_hours.value),
                      }}></div>
                    <a className="btn-green-border" href={item.attributes.field_map_url}>
                      View map
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
