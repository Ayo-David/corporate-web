import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import TopInfo from '../../components/TopInfo';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import QuickLinks from '../../components/HomeComponents/QuickLinks';
import HowCanIHelp from '../../components/HomeComponents/HowCanIHelp';
import Products from '../../components/HomeComponents/Products';
import OurCustomerPromises from '../../components/HomeComponents/OurCustomerPromises';
import NewsArticlesList from '../../components/HomeComponents/NewsArticlesList';
import MobileBanking from '../../components/HomeComponents/MobileBanking';
import Awareness from '../../components/HomeComponents/Awareness';
import WeAreATrustedProvider from '../../components/HomeComponents/WeAreATrustedProvider';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CategoryModel } from '../../model/category.model';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Business';

interface IHomePageProps {
  homeContent: any;
  homeBanner: CommonDataModel;
  homeFieldQuickLinks: CommonDataModel;
  homeProduct: CommonDataModel;
  homeOurCustomerPromises: CommonDataModel;
  homeAdsAwareness: CommonDataModel;
  homeTrustedProvider: CommonDataModel;
  newsCategories: CategoryModel[];
  newsArticlesList: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [homeContent, setHomeContent] = useState<any>();
  const [homeBanner, setHomeBanner] = useState<any>();
  const [homeFieldQuickLinks, setHomeFieldQuickLinks] = useState<any>();
  const [homeProduct, setHomeProduct] = useState<any[]>([]);
  const [homeOurCustomerPromises, setHomeOurCustomerPromises] = useState<any>();
  const [homeAdsAwareness, setHomeAdsAwareness] = useState<any[]>([]);
  const [homeTrustedProvider, setHomeTrustedProvider] = useState<any>();
  const [newsArticlesList, setNewsArticlesList] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getHomeContentData();
    props.dataAction.getNewsCategoriesData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.homeContent) {
      setHomeContent(props.homeContent);
      props.dataAction.getHomeBannerData(props.homeContent.data.id);

      props.dataAction.getHomeFieldQuickLinksData(
        props.homeContent.data.relationships.field_customer_interest_links.data
          .id,
      );

      let homeProductTemp: any[] = [];
      props.homeContent.data.relationships.field_products.data.forEach(
        (item: any, index: number) => {
          if (item.type === 'node--product') {
            dataSvc.getHomeProductData(item.id).then((data) => {
              homeProductTemp.push(data);
            });
          }

          if (item.type === 'node--finance_pages') {
            dataSvc.getHomeFinanceData(item.id).then((data) => {
              homeProductTemp.push(data);
            });
          }
        },
      );

      setTimeout(() => {
        setHomeProduct(homeProductTemp);
      }, 5000);

      props.dataAction.getHomeOurCustomerPromisesData(
        props.homeContent.data.id,
      );

      let homeAdsAwarenessTemp: any[] = [];
      props.homeContent.data.relationships.field_ads_awareness.data.forEach(
        (item: any, index: number) => {
          dataSvc.getHomeAdsAwarenessData(item.id).then((data) => {
            homeAdsAwarenessTemp.push(data);
          });
        },
      );

      setTimeout(() => {
        setHomeAdsAwareness(homeAdsAwarenessTemp);
      }, 5000);

      props.dataAction.getHomeTrustedProviderData(
        props.homeContent.data.relationships.field_trusted_provider.data.id,
      );
    }
    // eslint-disable-next-line
  }, [props.homeContent]);

  useEffect(() => {
    if (props.homeBanner) {
      setHomeBanner(props.homeBanner);
    }
  }, [props.homeBanner]);

  useEffect(() => {
    if (props.homeFieldQuickLinks) {
      setHomeFieldQuickLinks(props.homeFieldQuickLinks);
    }
  }, [props.homeFieldQuickLinks]);

  useEffect(() => {
    if (props.homeOurCustomerPromises) {
      setHomeOurCustomerPromises(props.homeOurCustomerPromises);
    }
  }, [props.homeOurCustomerPromises]);

  useEffect(() => {
    if (props.homeTrustedProvider) {
      setHomeTrustedProvider(props.homeTrustedProvider);
    }
  }, [props.homeTrustedProvider]);

  useEffect(() => {
    if (props.newsCategories) {
      props.dataAction.getNewsArticlesListData(
        props.newsCategories[0].uuid[0].value,
      );
    }
    // eslint-disable-next-line
  }, [props.newsCategories]);

  useEffect(() => {
    if (props.newsArticlesList) {
      setNewsArticlesList(props.newsArticlesList);
    }
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
      <div className="desktop-show mobile-hide">
        <TopInfo />
      </div>

      {!!headerMenu && (
        <Header
          activeMenu={parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction}
        />
      )}

      <div className="desktop-hide mobile-show">
        <TopInfo />
      </div>

      {!!homeContent && (
        <>
          {!!homeBanner && (
            <TopBanner dataList={homeBanner} type="home-banner" />
          )}

          <QuickLinks homeFieldQuickLinks={homeFieldQuickLinks} />

          <HowCanIHelp dataList={homeContent} />

          {!!homeProduct && <Products dataList={homeProduct} />}

          <OurCustomerPromises dataList={homeOurCustomerPromises} />

          {!!newsArticlesList && (
            <NewsArticlesList dataList={newsArticlesList} />
          )}

          <MobileBanking />

          {!!homeAdsAwareness && <Awareness dataList={homeAdsAwareness} />}

          <WeAreATrustedProvider dataList={homeTrustedProvider} />
        </>
      )}

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

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
