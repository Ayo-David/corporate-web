import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

interface IFAQItemProps {
  dataList: any;
  isSignle?: boolean;
}

const FAQItem: React.FunctionComponent<IFAQItemProps> = (props) => {
  const { dataList, isSignle } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      className={`item-current-accounts-faq ${isExpanded ? 'expanded' : ''} ${
        isSignle ? 'single' : ''
      }`}>
      <div className="top-title" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>{dataList.attributes.field_title}</h4>
        <i className="icons icon-arrow"></i>
      </div>
      <div className="bottom-content">
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        <div
          className="content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dataList.attributes.field_text.value),
          }}></div>
      </div>
    </div>
  );
};

export default FAQItem;
