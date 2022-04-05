import React, { useState, useEffect } from 'react';
import dataSvc from '../../services/dataSvc';
import './styles.scss';

export interface IRelatedProductsAndServicesProps {
  dataList?: any;
}

export const RelatedProductsAndServices: React.FunctionComponent<IRelatedProductsAndServicesProps> = (props) => {
  const { dataList } = props;
  const [content, setContent] = useState<any>();
  
  const getCardIcon = (name: string) => {
    switch (name) {
      case 'Alert':
        return '../assets/icon-setup.png';
      case 'Mobile Phone':
        return '../assets/icon-phone.png';
      case 'Tenancy':
        return '../assets/icon-key.png';
      case 'Protect':
        return '../assets/icon-app.png';
      case 'Insights':
        return '../assets/icon-eye.png';
      case 'Community':
        return '../assets/icon-event.png';
      case 'Loans':
        return '../assets/icon-tax.png';
      case 'Transactions':
        return '../assets/icon-transfers.png';
      default:
        return '';
    }
  };
  
  useEffect(() => {
    if (props.dataList && props.dataList.data && props.dataList.data.length > 0) {
      const url = props.dataList.data[0].relationships.field_quick_links.links.related.href;
      dataSvc.getData(url).then((data) => {
        setContent(data.data);
      });
    }
    
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <React.Fragment>
      {(dataList && dataList.data && dataList.data.length > 0) &&
        dataList.data.map((sectionItem: any, sectionIndex: number) => (
          <div className="section section-faq-individual-related-products-and-services"
            key={sectionIndex}>
            <div className="container">
              <div className="title">{sectionItem.attributes.field_title}</div>
              {!!content && (
                <div className="flex-space service-item">
                  {
                    content.map((cardItem: any, cardIndex: number) => (
                      <React.Fragment key={cardIndex}>
                        {
                          cardItem.attributes.field_single_link && (
                            <a href={cardItem.attributes.field_single_link.uri} className="item">
                              <div className="item-body">
                                <div className="icon">
                                  <img src={getCardIcon(cardItem.attributes.field_icon_class)} alt="img" />
                                </div>
                                <div className="name">{cardItem.attributes.field_single_link.title}</div>
                              </div>
                            </a>
                          )
                        }
                      </React.Fragment>
                    ))
                  }
                </div>
              )}
              </div>
            </div>
        ))
      }
    </React.Fragment>
  );
};

export default RelatedProductsAndServices;
