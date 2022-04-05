import React, { useState } from 'react';
import './styles.scss';

export interface IRelatedFAQProps {
  dataList?: any;
}

export const RelatedFAQ: React.FunctionComponent<IRelatedFAQProps> = (props) => {
  const { dataList } = props;
  const [tabIndex] = useState<number>(0);

  return (
    <React.Fragment>
      <div className="section section-faq-individual-related-faq">
        <div className="tit-gray">Related FAQs</div>
        <div className="line"></div>
        <ul className="list">
          {
            dataList.data.map((item: any, index: number) => (
              <li className={`${tabIndex === index ? 'active' : ''}`} key={index}>
                <a href="#javascript"
                  onClick={(event) => event.preventDefault()}>
                  {item.attributes.title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </React.Fragment>
  );
};

export default RelatedFAQ;
