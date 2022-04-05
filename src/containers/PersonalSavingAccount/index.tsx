import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import './styles.scss';
import TopBanner from '../../components/TopBanner';
import Breadcrumb from '../../components/Breadcrumb';
import TabsBar from '../../components/PersonalSAComponents/TabsBar';
import WeAreATrustedProvider from '../../components/HomeComponents/WeAreATrustedProvider';
import Awareness from '../../components/PersonalSAComponents/Awareness';
import SavingsEarnYou from '../../components/PersonalSAComponents/SavingsEarnYou';

const parentField = 'Personal';

interface IHomePageProps {
  personalSavingAccountContent: any;
  personalSavingAccountBanner: CommonDataModel;
  personalSACompareAccounts: CommonDataModel;
  homeTrustedProvider: CommonDataModel;
  adsAwareness: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PersonalSavingAccount: React.FunctionComponent<IHomePageProps> = (
  props,
) => {
  const [personalSavingAccountContent, setPersonalSavingAccountContent] =
    useState<any>();
  const [personalSavingAccountBanner, setPersonalSavingAccountBanner] =
    useState<any>();
  const [personalSACompareAccounts, setPersonalSACompareAccounts] =
    useState<any>();
  const [homeTrustedProvider, setHomeTrustedProvider] = useState<any>();
  const [adsAwareness, setAdsAwareness] = useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [tabIndex, setTabIndex] = useState<number>(1);

  const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Personal',
      url: '/personal/current_account',
    },
    {
      label: 'Savings',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getPersonalSavingAccountContentData(
      '/jsonapi/node/savings_accounts_suite_page/15ccafeb-d897-4a34-ac02-eb869ffb10fe?include=field_banner,field_ads_awareness,field_compare_accounts,field_trusted_provider',
    );
    props.dataAction.getNewsCategoriesData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  const getPathQuery = (data: any, relationship: string) => {
    let url: URL;
    url = new URL(data.relationships[String(relationship)].links.related.href);
    return url.pathname + url.search;
  };

  useEffect(() => {
    if (props.personalSavingAccountContent) {
      setPersonalSavingAccountContent(props.personalSavingAccountContent);

      props.dataAction.getPersonalSavingAccountBanner(
        getPathQuery(props.personalSavingAccountContent.data, 'field_banner'),
      );

      props.dataAction.getPersonalSACompareAccounts(
        getPathQuery(
          props.personalSavingAccountContent.data,
          'field_compare_accounts',
        ),
      );

      props.dataAction.getHomeTrustedProviderData(
        props.personalSavingAccountContent.data.relationships
          .field_trusted_provider.data.id,
      );

      props.dataAction.getAdsAwareness(
        getPathQuery(
          props.personalSavingAccountContent.data,
          'field_ads_awareness',
        ),
      );
    }
    // eslint-disable-next-line
  }, [props.personalSavingAccountContent]);

  useEffect(() => {
    if (props.personalSavingAccountBanner) {
      setPersonalSavingAccountBanner(props.personalSavingAccountBanner);
    }
  }, [props.personalSavingAccountBanner]);

  useEffect(() => {
    if (props.personalSACompareAccounts) {
      setPersonalSACompareAccounts(props.personalSACompareAccounts);
    }
  }, [props.personalSACompareAccounts]);

  useEffect(() => {
    if (props.homeTrustedProvider) {
      setHomeTrustedProvider(props.homeTrustedProvider);
    }
  }, [props.homeTrustedProvider]);

  useEffect(() => {
    if (props.adsAwareness) {
      setAdsAwareness(props.adsAwareness);
    }
  }, [props.adsAwareness]);

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

      {!!personalSavingAccountContent && (
        <>
          {!!personalSavingAccountBanner && (
            <TopBanner
              dataList={personalSavingAccountBanner}
              type="personal-banner"
            />
          )}

          <Breadcrumb itemArray={breadcrumbArray} />

          {!!personalSACompareAccounts && (
            <TabsBar
              tabIndex={tabIndex}
              dataList={personalSACompareAccounts?.data}
              onClickTab={(tabIndex: number) => {
                setTabIndex(tabIndex);
              }}
            />
          )}

          <SavingsEarnYou />

          <WeAreATrustedProvider dataList={homeTrustedProvider} />

          {!!adsAwareness && <Awareness dataList={adsAwareness} />}
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

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(PersonalSavingAccount);
