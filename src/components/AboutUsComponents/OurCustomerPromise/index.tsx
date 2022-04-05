import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

interface IOurCustomerPromiseProps {
  dataList: any;
}

const OurCustomerPromise: React.FunctionComponent<IOurCustomerPromiseProps> = (
  props,
) => {
  const { dataList } = props;

  return (
    <div className="section-our-customer-promise">
      <div className="container">
        <h2>{dataList.attributes.field_title}</h2>
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="txt text-left"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
          }}></div>
      </div>
    </div>
  );
};

export default OurCustomerPromise;
