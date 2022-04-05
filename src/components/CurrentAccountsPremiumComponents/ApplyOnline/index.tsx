import React, { useEffect, useState } from 'react';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

interface IApplyOnlineProps {
  dataList: any;
}

const ApplyOnline: React.FunctionComponent<IApplyOnlineProps> = (props) => {
  const { dataList } = props;
  const [cardsWithLink, setCardsWithLink] = useState<any>();

  useEffect(() => {
    dataSvc
      .getCurrentAccountsCardsWithLinkTextData(dataList.id)
      .then((data) => {
        setCardsWithLink(data);
      });
  }, [dataList]);

  return (
    <div className="section-cards-with-link">
      <div className="container">
        <h2>{dataList.attributes.field_heading}</h2>
        <div className="list-card">
          {!!cardsWithLink &&
            cardsWithLink.data.map((item: any, index: number) => (
              <div className="item-card" key={index}>
                <p className="txt">{item.attributes.field_description}</p>
                <div className="bottom-btn">
                  <a
                    href={item.attributes.field_single_link.uri}
                    className="btn btn-black">
                    {item.attributes.field_single_link.title}
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyOnline;
