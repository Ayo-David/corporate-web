import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import './styles.scss';

export interface ITopBannerSearchProps {
  title: string;
  dataList?: any;
  onSearch: (value: string) => void;
}

export const TopBannerSearch: React.FunctionComponent<ITopBannerSearchProps> = (
  props,
) => {
  const { title, dataList, onSearch } = { ...props };
  const [isShow, setIsShow] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string>('');

  const handleChangeValue = (event: any) => {
    setIsShow(true);
    setQuerySearch(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="section section-customer-support-faqs-banner">
        <div className="background-image mask-curve-left"></div>
        <div className="background-image mask-curve-right"></div>
        <div className="hero-business-content">
          <div className="title">{title}</div>
          <OutsideClickHandler onOutsideClick={() => setIsShow(false)}>
            <div
              className={`box-search-groups ${
                isShow && querySearch ? 'open' : ''
              }`}>
              <div className="search-box">
                <a
                  href="#javascript"
                  className="btn-search"
                  onClick={(event) => {
                    event.preventDefault();
                  }}>
                  &nbsp;
                </a>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder="Search our FAQs"
                    value={querySearch}
                    onChange={handleChangeValue}
                    onFocus={handleChangeValue}
                  />
                </div>
              </div>
              <div className="search-results">
                <ul>
                  {dataList &&
                    dataList.data &&
                    dataList.data
                      .filter(
                        (item: any) =>
                          item.attributes.title
                            .toLowerCase()
                            .indexOf(querySearch.toLowerCase()) !== -1,
                      )
                      .map((item: any, index: number) => (
                        <li key={index}>
                          <div
                            className={`value ${
                              item.attributes.title === querySearch
                                ? 'active'
                                : ''
                            }`}
                            onClick={() => {
                              setQuerySearch(item.attributes.title);
                              setIsShow(false);
                              onSearch(item.attributes.title);
                            }}>
                            {item.attributes.title}
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopBannerSearch;
