import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import { isEqual } from 'lodash';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import TopBanner from '../../components/NewsArticlesComponents/TopBanner';
import Breadcrumb from '../../components/Breadcrumb';
import TabsBar from '../../components/NewsArticlesComponents/TabsBar';
import NewsArticlesList from '../../components/NewsArticlesComponents/NewsArticlesList';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CategoryModel } from '../../model/category.model';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'About Us';

interface INewsArticlesPageProps {
  newsArticlesContent: CommonDataModel;
  newsArticlesBanner: CommonDataModel;
  newsCategories: CategoryModel[];
  newsArticlesList: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const NewsArticlesPage: React.FunctionComponent<INewsArticlesPageProps> = (
  props,
) => {
  const [newsArticlesBanner, setNewsArticlesBanner] =
    useState<CommonDataModel>();
  const [newsCategories, setNewsCategories] = useState<CategoryModel[]>();
  const [newsArticlesList, setNewsArticlesList] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();
  const newsArticleRef = useRef<HTMLDivElement>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'About Us',
      url: '#',
    },
    {
      label: 'News & Articles',
      url: '#',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getNewsArticlesContentData();
    props.dataAction.getNewsCategoriesData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.newsArticlesContent) {
      let newArticleId = '';
      props.newsArticlesContent.data.forEach((item, index) => {
        if (
          !!item.relationships.field_media_image.data &&
          !!item.relationships.field_media_image.data.id &&
          item.relationships.field_media_image.data.id !== 'missing'
        ) {
          if (newArticleId === '') {
            newArticleId = item.id;
          }
        }
      });

      props.dataAction.getNewsArticlesBannerData(newArticleId);
    }
    // eslint-disable-next-line
  }, [props.newsArticlesContent]);

  useEffect(() => {
    if (props.newsArticlesBanner) {
      setNewsArticlesBanner(props.newsArticlesBanner);
    }
  }, [props.newsArticlesBanner]);

  useEffect(() => {
    if (props.newsCategories) {
      setNewsCategories(props.newsCategories);

      props.dataAction.getNewsArticlesListData(
        props.newsCategories[Number(tabIndex)].uuid[0].value,
      );
    }
    // eslint-disable-next-line
  }, [props.newsCategories]);

  useEffect(() => {
    if (props.newsArticlesList) {
      if (newsArticlesList && !isEqual(props.newsArticlesList, newsArticlesList)) {
        setNewsArticlesList((prevState: any) => {
          if(!!prevState.included && !!prevState.data) return ({
          data: [
            ...prevState.data,
            ...props.newsArticlesList.data,
          ],
          included: [
            ...prevState.included,
            ...props.newsArticlesList.included,
          ],
          jsonapi: {
            ...props.newsArticlesList.jsonapi,
          },
          links: {
            ...props.newsArticlesList.links,
          }
        })});
      } else {
        setNewsArticlesList(props.newsArticlesList);
      }
    }
  // eslint-disable-next-line
  }, [props.newsArticlesList]);

  useEffect(() => {
    if (props.headerMenus && props.headerMenus[String(parentField)]) {
      setHeaderMenu(props.headerMenus[String(parentField)]);
    }
  }, [props.headerMenus]);
  useEffect(() => {
    if (props.footer) {
      setFooter(props.footer);
    }
  }, [props.footer]);

  /**
   * on Click Tab
   * @param tabIndex The index of tab
   */
  const onClickTab = (tabIndex: number) => {
    setTabIndex(tabIndex);

    if (newsCategories) {
      setNewsArticlesList(undefined);
      props.dataAction.getNewsArticlesListData(
        newsCategories[Number(tabIndex)].uuid[0].value,
      );
    }
  };

  /**
 * on Click Load MOre
 * @param url The url of CMS API
 */
  const onClickLoadMore = (url: string) => {
    const hostname = new URL(url).hostname;
    const nextPath = url.replace(`https://${hostname}:3000`, '');
    props.dataAction.getNewsArticlesListData(
      props.newsCategories[Number(tabIndex)].uuid[0].value,
      String(nextPath)
    );
  };

  nprogress.done();

  return (
    <React.Fragment>
      {!!headerMenu && (
        <Header
          activeMenu={parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction}
        />
      )}

      {!!newsArticlesBanner && <TopBanner 
      onReadArticleClick={() => {
        setTimeout(() => {
          newsArticleRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 10);
      }}
      dataList={newsArticlesBanner} />}

      <Breadcrumb itemArray={breadcrumbArray} />

      {!!newsCategories && (
        <TabsBar
          tabIndex={tabIndex}
          dataList={newsCategories.sort((a, b) => a.weight[0].value - b.weight[0].value)}
          onClickTab={(tabIndex: number) => {
            onClickTab(tabIndex);
          }}
        />
      )}

      {!!newsArticlesList && 
        <NewsArticlesList 
          sectionRef={newsArticleRef} 
          dataList={newsArticlesList} 
          onClickLoadMore={() => {
            if (newsArticlesList.links.next) {
              onClickLoadMore(newsArticlesList.links.next.href);
            }
          }}
        />
      }

      <div className="footer">
        {!!footer && <Footer dataList={footer} />}

        {!!footer && <LowestFooter dataList={footer} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({ ...state.dataReducer });

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(NewsArticlesPage);
