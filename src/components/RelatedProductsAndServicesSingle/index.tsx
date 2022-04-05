import React, { useState, useEffect } from 'react';
import dataSvc from '../../services/dataSvc';
import { removeInternal } from '../../helpers/url';
import '../RelatedProductsAndServices/styles.scss';

export interface IRelatedProductsAndServicesProps {
  dataList?: any;
}

export const RelatedProductsAndServices: React.FunctionComponent<IRelatedProductsAndServicesProps> =
  (props) => {
    const { dataList } = props;
    const [content, setContent] = useState<any>();

    const getCardIcon = (name: string) => {
      switch (name) {
        case 'ATM':
          return '../assets/atm.svg';
        case 'Mobile Phone':
          return '../assets/icon-phone.png';
        case 'cards':
        case 'Card':
          return '../assets/cards.svg';
        case 'Wallet':
          return '../assets/cards.svg';
        case 'Cheque Book':
          return '../assets/icon-cheque-book.png';
        case 'Mail':
          return '../assets/icon-mail.svg';
        case 'Protect':
          return '../assets/protect.svg';
        case 'Transactions':
          return '../assets/icon-transactions.png';
        case 'Bank':
          return '../assets/cheque-book.svg';
        case 'Payment':
          return '../assets/up-down.svg';
        case 'Tenancy':
          return '../assets/switch.svg';
        default:
          return '';
      }
    };

    useEffect(() => {
      if (props.dataList) {
        dataSvc
          .getCurrentAccountsCustomerInterestLinksData(dataList.id)
          .then((data) => {
            setContent(data.data);
          });
      }

      // eslint-disable-next-line
    }, [props.dataList]);
    
    return (
      <React.Fragment>
        <div className="section section-faq-individual-related-products-and-services">
          <div className="container">
            <div className="title">{dataList.attributes.field_title}</div>
            {!!content && (
              <div className="flex-space service-item">
                {content.map((cardItem: any, cardIndex: number) => (
                  <a
                    href={removeInternal(cardItem.attributes.field_single_link.uri)}
                    className="item"
                    key={cardIndex}>
                    <div className="item-body">
                      <div className="icon">
                        <img
                          src={getCardIcon(
                            cardItem.attributes.field_icon_class,
                          )}
                          alt="img"
                        />
                      </div>
                      <div className="name">
                        {cardItem.attributes.field_single_link.title}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };

export default RelatedProductsAndServices;
