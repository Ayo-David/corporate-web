import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import TopBanner from '../../components/ArticleDetailComponents/TopBanner';
import LeftPanel from '../../components/ArticleDetailComponents/LeftPanel';
import RightPanel from '../../components/ArticleDetailComponents/RightPanel';
import NewsArticlesList from '../../components/HomeComponents/NewsArticlesList';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CategoryModel } from '../../model/category.model';
import { CommonDataModel } from '../../model/common-data.model';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import './styles.scss';
import { ConfigService } from '../../services/ConfigService';

const parentField = 'About Us';

interface IArticleDetailPageProps extends RouteComponentProps<any> {
  articleDetailContent: any;
  newsCategories: CategoryModel[];
  newsArticlesList: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const ArticleDetailPage: React.FunctionComponent<IArticleDetailPageProps> = (props) => {
  const [dateLabel, setDateLabel] = useState<string>('');
  const [bodyData, setBodyData] = useState<any>();
  const [newsArticlesList, setNewsArticlesList] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const { CMS_IMAGE_URL } = ConfigService.getConfig();
  const [breadcrumbArray, setBreadcrumbArray] = useState<BreadcrumbItemModel[]>([
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
      url: '/about_us/news_and_articles',
    },
    {
      label: '',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getArticleDetailContentData(props.match.params.id);
    props.dataAction.getNewsCategoriesData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
    // eslint-disable-next-line
  }, [props.dataAction, props.match.params.id]);

  useEffect(() => {
    if (props.articleDetailContent) {
      setDateLabel(props.articleDetailContent.data.attributes.created);
      setBodyData(props.articleDetailContent);
      breadcrumbArray[3].label = props.articleDetailContent.data.attributes.title;
      setBreadcrumbArray(breadcrumbArray);
    }
    // eslint-disable-next-line
  }, [props.articleDetailContent]);

  useEffect(() => {
    if (props.newsCategories) {
      props.dataAction.getNewsArticlesListData(props.newsCategories[0].uuid[0].value);
    }
    // eslint-disable-next-line
  }, [props.newsCategories]);

  useEffect(() => {
    if (props.newsArticlesList) {
      setNewsArticlesList(props.newsArticlesList);
    }
  }, [props.newsArticlesList]);

  useEffect(() => {
    let element = document.querySelector('.file');
    let currentLink = element?.getAttribute('href');
    if (!currentLink?.includes(CMS_IMAGE_URL)) {
      element?.setAttribute('href', CMS_IMAGE_URL + currentLink);
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

      {!!bodyData && <TopBanner dataList={bodyData} />}

      <Breadcrumb itemArray={breadcrumbArray} />

      <div className="article-detail-mains ">
        <div className="container">
          <div className="row">
            <div className="col col-md-3 left">
              {dateLabel && <LeftPanel dateLabel={dateLabel} />}
            </div>
            <div className="col col-md-9 right">
              <RightPanel dataList={bodyData} />
            </div>
          </div>
        </div>
      </div>
      {!!newsArticlesList && <NewsArticlesList dataList={newsArticlesList} />}

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

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ArticleDetailPage));
