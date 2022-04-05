import React from 'react';
import './styles.scss';

export interface IHeaderLinksProps {
  currentAccountsHeaderLinks: any;
  onScrollTop: (data: any) => void;
}

export const HeaderLinks: React.FunctionComponent<IHeaderLinksProps> = (
  props,
) => {
  const { currentAccountsHeaderLinks, onScrollTop } = props;

  return (
    <div className="section-header-links">
      <div className="container">
        <ul>
          {!!currentAccountsHeaderLinks &&
            currentAccountsHeaderLinks.data.map((item: any, index: number) => {
              return (
                <li key={index}>
                  <button
                    className="btn header-link"
                    onClick={() => {
                      onScrollTop(item.attributes.field_single_link);
                    }}>
                    <div className="top-icon">
                      <i
                        className={`icons icon-${item.attributes.field_icon_class}`}></i>
                    </div>
                    <div className="bottom-txt">
                      {item.attributes.field_single_link.title}
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HeaderLinks;
