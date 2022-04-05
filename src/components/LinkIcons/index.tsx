import React from 'react';
import './styles.scss';

export interface ILinkIconsProps {
  dataList?: any;
  onScrollTop: (data: any) => void;
}

export const LinkIcons: React.FunctionComponent<ILinkIconsProps> = (props) => {
  const { dataList, onScrollTop } = props;
  
  const getCardClass = (name: string) => {
    switch (name) {
      case 'ATM':
        return 'icon-features';
      case 'Business':
        return 'icon-eligibility';
      case 'Pencil':
        return 'icon-how-to';
      case 'Community':
        return 'icon-terms';
      case 'Insights':
        return 'icon-features';
      case 'Accounts':
        return 'icon-eligibility';
      
      case 'summary':
        return 'icon-features';
      case 'checkmark':
        return 'icon-eligibility';
      case 'itens':
        return 'icon-terms';
      case 'question':
        return 'icon-faq';
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      <div className="section section-bridging-finance-link-icons">
        <div className="container ">
          <div className="row">
            {
              dataList.data.map((item: any, index: number) => (
                <div className="col" key={index}>
                  <a href={item.attributes.field_single_link.uri} className="items"
                    onClick={(event) => {
                      onScrollTop(item.attributes.field_single_link);
                      event.preventDefault()
                    }}>
                    <div className={`icons ${getCardClass(item.attributes.field_icon_class)}`}></div>
                    <div className="txt">
                      {item.attributes.field_single_link.title}
                    </div>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinkIcons;
