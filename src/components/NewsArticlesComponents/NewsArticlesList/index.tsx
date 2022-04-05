import React, {useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CommonDataModel } from '../../../model/common-data.model';
import moment from 'moment';
import { ConfigService } from '../../../services/ConfigService';
import * as _ from 'lodash';
import './styles.scss';


const { DATE_FORMAT } = ConfigService.getConfig()
export interface INewsArticlesListProps {
  dataList: CommonDataModel;
  sectionRef?: any;
  hideBigCards?: boolean;
  showAll?: boolean;
  onClickLoadMore?: any;
}

interface ICardProps {
  cardIndex: number;
}

const randomSeeds = [Math.random(), Math.random(), Math.random()].map(n => Math.floor(n * 3));
const colors = _.shuffle(['light-green', 'black-bg', 'ligth-blue']);

export const NewsArticlesList: React.FunctionComponent<INewsArticlesListProps> = (props) => {
  const [dataList, setDataList] = useState<any>(props.dataList);
  const [, setMaxNumberRow] = useState<number>(0);
  const [loadMore, setLoadMore] = useState(false);
  const [maxColumnCards, setMaxColumnCards] = useState<number>(1);
  const MAX_COLS = 3;

  useEffect(() => {
    if (props.dataList) {
      setDataList(rearrangeItems(props.dataList));
      !!props.dataList.data && props.dataList.data.length % 2 === 0 ? setMaxColumnCards(1) : setMaxColumnCards(2);
    }
  }, [props.dataList]);

  /**
   * rearrange Items
   * @param dataList The data that to be rearranged
   */
  const rearrangeItems = (dataList: any) => {
    const dataListTemp = dataList;
    
    let hasImagesNumber = 0;
    if (dataListTemp.data) {
      dataListTemp.data.forEach((item: any, index: number) => {
        if (item.attributes.field_display_image != null) {
          hasImagesNumber++;
        }
      });
      
      if (hasImagesNumber === dataListTemp.data.length) {
        setMaxNumberRow(6);
      }
      
      if (hasImagesNumber === 0) {
        setMaxNumberRow(12);
      }
    }
    
    return dataListTemp;
  };
  
  /**
   * get Items
   * @param rowIndex The index of row
   * @param columnIndex The index of column in the row
   * @param columnSubRowIndex The index of sub row of column in the row
   */
  const getItems = (cardIndex: number) => {
    const item = dataList.data[Number(cardIndex)];

    return item;
  };
  
  // get Color Class
  const getColorClass = (cardIndex: number, title: string) => {
    const hash = (s: string) => {
      let n = 0;
      for(let i = 0; i < s.length; i += 1) {
        n += s.charCodeAt(i);
      }
      return n;
    };

    const index = hash(title) + randomSeeds[cardIndex % (randomSeeds.length)];
    const color = colors[index % colors.length];

    return color;
  };

  const isCardWithImage = (cardIndex: number) => {
    return false /* dataList.data[cardIndex].attributes.field_display_image === 'yes' */;
  };

  const BigCardWithoutImage = (cardProps: ICardProps) => {
    const { cardIndex } = cardProps;
    const item = getItems(cardIndex);
    return (
      <div className="general-content ">
        <h3>
          {item?.attributes.title}
        </h3>
        <div className="greneral-content-action">
          <p className="left-txt">{moment(getItems(cardIndex)?.attributes.changed).format(DATE_FORMAT)}</p>
          <NavLink to={`article_detail/${getItems(cardIndex)?.id}`} className="icons icon-circle-arrow-right">&nbsp;</NavLink>
        </div>
      </div>
    );
  };
  const BigCardWithImage = (cardProps: ICardProps) => {
    const { cardIndex } = cardProps;
    const item = getItems(cardIndex);
    return (
      <div className="general-content img-style black-bg">
        <div className="top-photo">
          <img src="/assets/gen-photo.jpg" alt="img" />
        </div>
        <div className="img-txt-area dark">
          <div className="txt white">
            {item?.attributes.title}
          </div>
          <div className="greneral-content-action white">
            <p className="left-txt">{moment(getItems(cardIndex)?.attributes.changed).format(DATE_FORMAT)}</p>
            <NavLink to={`article_detail/${getItems(cardIndex)?.id}`} className="icons icon-circle-arrow-right">&nbsp;</NavLink>
          </div>
        </div>
      </div>
    );
  };
  const CardWithImage = (cardProps: ICardProps) => {
    const { cardIndex } = cardProps;
    const item = getItems(cardIndex);
    return (
      <div className="general-content img-style">
        <div className="img-txt-area dark-blue">
          <div className="txt">
            {item?.attributes.title}
          </div>
          <div className="greneral-content-action">
            <p className="left-txt">{moment(getItems(cardIndex)?.attributes.changed).format(DATE_FORMAT)}</p>
            <a href="#javascript" className="icons icon-circle-arrow-right">&nbsp;</a>
          </div>
        </div>
        <div className="bottom-photo">
          <img src="/assets/pexels-thisiseng.jpg" alt="img" />
        </div>
      </div>
    );
  };


  const CardWithoutImage = (cardProps: ICardProps) => {
    const { cardIndex } = cardProps;
    const item = getItems(cardIndex);
    return (
      <div className={`general-content ${getColorClass(cardIndex, item?.attributes.title)}`}>
        <h3>
          {item?.attributes.title}
        </h3>
        <div className="greneral-content-action">
          <p className="left-txt">{moment(getItems(cardIndex)?.attributes.changed).format(DATE_FORMAT)}</p>
          <NavLink to={
              item?.attributes.url
              || `/about_us/article_detail/${item?.id}`
            }
            className="icons icon-circle-arrow-right"
          >
            &nbsp;
          </NavLink>
        </div>
      </div>
    );
  }

  const dataLength = !!dataList.data ? dataList.data.length : 0;
  const dataNext = dataList.links?.next;
  let renderedCardCount = 0;

  const renderRowWithBigCards = () => {
    if (dataLength === 0) {
      return null;
    }
    const cards = [];
    for (let i = 0; i < 2 && i < dataLength; i += 1) {
      const card = i === 0
        ? (<BigCardWithoutImage cardIndex={i} />)
        : (<BigCardWithImage cardIndex={i} />);
      cards.push(card);
    }

    renderedCardCount += cards.length;

    return (
      <div className="row">
        <div className="col col-md-6">
          {cards[0]}
        </div>
        <div className="col col-md-6">
          {cards[1]}
        </div>
      </div>
    );
  };

  const renderCol = (columnIndex: number) => {
    const cards = [];
    for (let columnSubRowIndex = 0; columnSubRowIndex < maxColumnCards;) {
      if (renderedCardCount === dataLength) {
        break;
      }

      const isDisplayingImage = isCardWithImage(renderedCardCount);
      if (isDisplayingImage && columnSubRowIndex > maxColumnCards - 2) {
        break;
      }

      const card = isDisplayingImage ? (
        <CardWithImage key={columnSubRowIndex} cardIndex={renderedCardCount} />
      ) : (
        <CardWithoutImage key={columnSubRowIndex} cardIndex={renderedCardCount} />
      );
      cards.push(card);

      renderedCardCount += 1;
      columnSubRowIndex += isDisplayingImage ? 2 : 1;
    }

    return (
      <div className="col col-md-4 general-middle-content" key={columnIndex}>
        {cards}
      </div>
    );
  };

  const renderRow = (rowIndex: number) => {
    const cols = [];
    for (let columnIndex = 0; columnIndex < MAX_COLS; columnIndex += 1) {
      const col = renderCol(columnIndex)
      cols.push(col);
    }

    return (
      <div className="row" key={rowIndex}>
        {cols}
      </div>
    );
  };

  const renderRows = () => {
    const rows = [];
    let rowIndex = 0;
    while (renderedCardCount < dataLength) {
      const row = renderRow(rowIndex);
      rows.push(row);
      rowIndex += 1;
    }
    return rows;
  };

  const showBigCards = !props.hideBigCards;
  const showLoadMoreBtn = (!props.showAll && !loadMore && dataLength > 2) || dataNext;
  const showLoadMoreRows = (!showLoadMoreBtn || dataNext) && loadMore;

  return (
    <div ref={props.sectionRef} className="tab-contents tab-general">
      <div className="container">
        {showBigCards && renderRowWithBigCards()}
        {showLoadMoreRows && renderRows()}
      </div>
      {showLoadMoreBtn && (
        <div className="load-more">
          <button className="load-more-btn" onClick={() => {
            setLoadMore(true);
            if (loadMore) {
              props.onClickLoadMore();
            }
          }}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsArticlesList;
