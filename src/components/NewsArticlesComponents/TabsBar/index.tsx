import React from 'react';
import { CategoryModel } from '../../../model/category.model';
import './styles.scss';

export interface ITabsBarProps {
  tabIndex: number;
  dataList: CategoryModel[];
  onClickTab: (tabIndex: number) => void,
  title?: string;
}

export const TabsBar: React.FunctionComponent<ITabsBarProps> = (props) => {
  const {
    tabIndex,
    dataList,
    onClickTab,
    title = 'VIEW OUR TRENDING NEWS STORIES',
  } = props;

  return (
    <div className="section section-view-stories">
      <div className="container">
        <div className="up-txt">
          {title}
        </div>
        <div className="nav-bar">
          <ul>
            {
              dataList.map((item: any, index: number) => (
                <li key={index} style={{
                  maxWidth: `${100 / dataList.length}%`,
                  flex: `0 0 ${100 / dataList.length}%`,
                }}>
                  <a href="#javascript"
                    className={`tab-items ${tabIndex === index ? 'current' : ''}`}
                    onClick={(event) => {
                      onClickTab(index);
                      event.preventDefault();
                    }}>
                    {item.name[0].value}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabsBar;
