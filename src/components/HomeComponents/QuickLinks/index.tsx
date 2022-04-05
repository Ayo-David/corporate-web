import React from 'react';
import OverlayTooltipWrapper from '../../OverlayTooltipWrapper';
import './styles.scss';

export interface IQuickLinksProps {
  homeFieldQuickLinks: any;
}

export const QuickLinks: React.FunctionComponent<IQuickLinksProps> = (props) => {
  const { homeFieldQuickLinks } = props;
  
  const getCardClass = (name: string) => {
    switch (name) {
      case 'Card':
        return 'icon-account-card';
      case 'Loans':
        return 'icon-loans';
      case 'Investment':
        return 'icon-investment';
      case 'Bank':
        return 'icon-bank';
      default:
        return '';
    }
  };

  return (
    <div className="section-quick-links">
      <div className="container">
        <div className="four-panel">
          <div className="row">
            {
              !!homeFieldQuickLinks && homeFieldQuickLinks.data.map((item: any, index: number) => {
                if (item.id === '08324b23-ac08-4d38-9c09-2b43e05a88ac') {
                  return (
                    <div className="col col-md-3" key={index}>
                      <OverlayTooltipWrapper tooltipText="Coming soon">
                        <div style={{cursor: 'pointer'}} className="white-panel">
                          <div className="left-icon">
                            <i className={`icons ${getCardClass(item.attributes.field_icon_class)}`}>
                            </i>
                          </div>
                          <div className="right-txt">
                            {item.attributes.field_single_link.title}
                          </div>
                        </div>
                      </OverlayTooltipWrapper>
                    </div>
                  );
                }
                return (
                  <div className="col col-md-3" key={index}>
                    <a
                      // href={item.attributes.field_single_link.uri}
                      href="#!"
                      className="white-panel">
                      <div className="left-icon">
                        <i className={`icons ${getCardClass(item.attributes.field_icon_class)}`}>
                        </i>
                      </div>
                      <div className="right-txt">
                        {item.attributes.field_single_link.title}
                      </div>
                    </a>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
