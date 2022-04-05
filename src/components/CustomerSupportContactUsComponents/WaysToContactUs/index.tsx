import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IWaysToContactUsProps {
  dataList?: any;
}

export const WaysToContactUs: React.FunctionComponent<IWaysToContactUsProps> = (props) => {
  const { dataList } = props;

  const getIconClass = (name: string) => {
    switch (name) {
      case 'Phone':
        return 'icon-phone';
      case 'Protect':
        return 'icon-protect';
      case 'Mail':
        return 'icon-mail';
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      <div className="section section-ways-to-contact-us-support">
        <div className="container">
          <div className="row">
            {dataList.map((item: any, index: number) => (
              <div className="col col-md-4" key={index}>
                <div className="general-content">
                  <div className="top-icon">
                    <div className={`icon ${getIconClass(item.attributes.field_icon_class)}`}></div>
                  </div>
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}{' '}
                  <div
                    className="content"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.attributes.field_text.value),
                    }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
