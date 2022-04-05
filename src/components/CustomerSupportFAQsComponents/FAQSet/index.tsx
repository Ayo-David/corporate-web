import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

export interface IFAQSetProps {
  title: string;
  dataList?: any;
}

export const FAQSet: React.FunctionComponent<IFAQSetProps> = (props) => {
	const { title, dataList } = props;
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (dataList) {
      const fetchDataFaq = async () => {
        let tempData = dataList.data;
        await Promise.all(
          tempData.map(async (item: any) => {
            const index: number = tempData.indexOf(item);
            let response = await dataSvc.getCustomerSupportFAQsFieldFAQSetData(item.id);
            tempData[Number(index)].corporateFaqs = response;
          })
        )
        setData(tempData);
      }
      fetchDataFaq().then(r => {});
    }
  }, [dataList]);

  const getIconClass = (name: string) => {
    switch (name) {
      case 'cards':
        return 'icon-accounts';
      case 'Lock':
        return 'icon-savings';
      case 'Loans':
        return 'icon-lending-finance';
      case 'Wallet':
        return 'icon-security';
      default:
        return '';
    }  
  }

	return (
		<React.Fragment>
			<div className="section section-faq-set">
        <div className="container">
          <div className="up-txt">{title}</div>
          <div className="list-faqs">
              {
                data.map((item: any, index: number) => (
                  <div className="items-faq" key={index}>
                    <div className="title">
                      <i className={`icon ${getIconClass(item.attributes.field_icon_class)}`}></i>
                      {item.attributes.field_heading}
                    </div>
                    <ul>
                      {
                        item.corporateFaqs?.data.map((corporate: any, index: number) => (
                          <li key={index}>
                            <Link to={corporate.attributes?.path?.alias}>
                              <div className="items-corporate-faq">
                                {corporate.attributes.title}
                              </div>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))
              }
          </div>
        </div>
			</div>
		</React.Fragment>
	);
};

export default FAQSet;