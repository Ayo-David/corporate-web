import React, { useEffect, useState } from 'react';
import dataSvc from '../../../services/dataSvc';
import FAQItem from './FAQItem';
import './styles.scss';

interface IFAQsProps {
  dataList: any;
  type?: string;
  sectionRef?: any;
}

const FAQs: React.FunctionComponent<IFAQsProps> = (props) => {
  const { dataList, type, sectionRef } = props;
  const [faqsData, setFaqsData] = useState<any>();
  const [showNumber, setShowNumber] = useState<number>(3);
  const [showViewAllFAQs, setShowViewAllFAQs] = useState<boolean>(true);

  useEffect(() => {
    if (type === 'aboutUs') {
      dataSvc
        .getCurrentAccountsCorporateFAQData(dataList.data.id)
        .then((dataFaqs) => {
          // load data
          setFaqsData(dataFaqs);
        });
    } else {
      dataSvc.getCurrentAccountsFAQsData(dataList.id).then((data) => {
        dataSvc
          .getCurrentAccountsCorporateFAQData(data.data.id)
          .then((dataFaqs) => {
            // load data
            setFaqsData(dataFaqs);
          });
      });
    }
  }, [dataList, type]);

  return (
    <div
      className={`section-current-accounts-faqs ${
        type === 'aboutUs' ? 'about-us-faqs' : ''
      }`}
      ref={sectionRef}>
      <div className="container">
        <h2>
          {type !== 'aboutUs'
            ? dataList.attributes.field_heading
            : dataList.data.attributes.title}
        </h2>
        <div className="list-faq">
          {!!faqsData &&
            faqsData.data
              .slice(0, showNumber)
              .map((item: any, index: number) => (
                <FAQItem key={index} dataList={item} />
              ))}
        </div>
        {showViewAllFAQs && (
          <div className="bottom-btn">
            <button
              className="btn btn-green-border"
              onClick={() => {
                setShowNumber(faqsData.data.length)
                setShowViewAllFAQs(viewAll => !viewAll)
              }}>
              {type !== 'aboutUs' ? 'All Current Account FAQs' : 'View All FAQs'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;
