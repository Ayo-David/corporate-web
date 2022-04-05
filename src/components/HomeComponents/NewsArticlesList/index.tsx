import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { CommonDataModel } from '../../../model/common-data.model';
import moment from 'moment';
import * as _ from 'lodash';
import './styles.scss';
import { ConfigService } from '../../../services/ConfigService';

const { DATE_FORMAT } = ConfigService.getConfig()
export interface INewsArticlesListProps {
  dataList: CommonDataModel;
}

export const NewsArticlesList: React.FunctionComponent<INewsArticlesListProps> = (props) => {
  const [dataList, setDataList] = useState<any>(props.dataList);
  
  useEffect(() => {
    if (props.dataList) {
      const dataListTemp = _.cloneDeep(props.dataList);
      dataListTemp.data = dataListTemp.data.slice(0, 4);
      
      setDataList(rearrangeItems(dataListTemp));
    }
  }, [props.dataList]);
  
  /**
   * rearrange Items
   * @param dataList The data that to be rearranged
   */
  const rearrangeItems = (dataList: any) => {
    const dataListTemp = dataList;
    
    return dataListTemp;
  };

  return (
    <div className="section-news-and-articles">
      <div className="container">
        <div className="new-and-articles">
          <div className="top-title center">
            News And Articles
          </div>
          <div className={`articles-list ${dataList.data.length === 4 ? 'articles-list-grid' : 'articles-list-flex'}`}>
            {
              dataList.data.map((item: any, idx: any) => (
                <div className={`general-content`} key={idx}>
                  <h3>
                    {item?.attributes?.title}
                  </h3>
                  <div className="greneral-content-action">
                    <p className="left-txt">{moment(item.attributes.changed).format(DATE_FORMAT)}</p>
                    <NavLink to={`/about_us/article_detail/${item.id}`}
                      className="icons icon-circle-arrow-right">
                      &nbsp;
                    </NavLink>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="bottom-btn">
            <NavLink to='/about_us/news_and_articles' className="btn btn-green-border">
              View All News & Articles
            </NavLink>
          </div>
        </div>
        {/* end .new-and-articles */}
      </div>
    </div>
  );
};

export default NewsArticlesList;
