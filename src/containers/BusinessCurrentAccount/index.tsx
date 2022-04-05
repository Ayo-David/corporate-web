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
import TrustedProvider from '../../components/BusinessCAComponents/TrustedProvider';
import Breadcrumb from '../../components/Breadcrumb';
import HighlightedSection from '../../components/BusinessCAComponents/HighligtedSection';
import CompareAccounts from '../../components/BusinessCAComponents/CompareAccounts';
import Benefits from '../../components/BusinessCAComponents/Benefits';

const parentField = 'Business';

interface IHomePageProps {
  businessCurrentAccountContent: any;
  businessCurrentAccountBanner: CommonDataModel;
  businessCurrentAccountHighlightedData: any;
  businessCurrentAccountHighlightedCards: any;
  businessCACompareAccounts: any;
  businessCABenefits: any;
  businessCATrustedProvider: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const BusinessCurrentAccount: React.FunctionComponent<IHomePageProps> = (
  props,
) => {
  const [businessCurrentAccountContent, setBusinessCurrentAccountContent] =
    useState<any>();
  const [businessCurrentAccountBanner, setBusinessCurrentAccountBanner] =
    useState<any>();
  const [
    businessCurrentAccountHighlightedData,
    setBusinessCurrentAccountHighlightedSection,
  ] = useState<any>();
  const [
    businessCurrentAccountHighlightedCards,
    setBusinessCurrentAccountHighlightedCards,
  ] = useState<any>();
  const [businessCACompareAccounts, setBusinessCACompareAccounts] =
    useState<any>();
  const [businessCABenefits, setBusinessCABenefits] = useState<any>();
  const [businessCATrustedProvider, setBusinessCATrustedProvider] =
    useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Business',
      url: '/',
    },
    {
      label: 'Current Accounts',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getBusinessCurrentAccountContentData();
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
    if (props.businessCurrentAccountContent) {
      setBusinessCurrentAccountContent(props.businessCurrentAccountContent);

      props.dataAction.getBusinessCurrentAccountBanner(
        getPathQuery(props.businessCurrentAccountContent.data, 'field_banner'),
      );

      props.dataAction.getBusinessCurrentAccountHighlightedSection(
        getPathQuery(
          props.businessCurrentAccountContent.data,
          'field_highlighted_section',
        ),
      );

      props.dataAction.getBusinessCACompareAccounts(
        getPathQuery(
          props.businessCurrentAccountContent.data,
          'field_compare_accounts',
        ),
      );

      props.dataAction.getBusinessCABenefits(
        getPathQuery(
          props.businessCurrentAccountContent.data,
          'field_components',
        ),
      );

      props.dataAction.getBusinessCATrustedProvider(
        getPathQuery(
          props.businessCurrentAccountContent.data,
          'field_trusted_provider',
        ),
      );
    }
    // eslint-disable-next-line
  }, [props.businessCurrentAccountContent]);

  useEffect(() => {
    if (props.businessCurrentAccountBanner) {
      setBusinessCurrentAccountBanner(props.businessCurrentAccountBanner);
    }
  }, [props.businessCurrentAccountBanner]);

  useEffect(() => {
    if (props.businessCurrentAccountHighlightedData) {
      setBusinessCurrentAccountHighlightedSection(
        props.businessCurrentAccountHighlightedData,
      );
      props.dataAction.getBusinessCurrentAccountHighlightedCards(
        getPathQuery(
          props.businessCurrentAccountHighlightedData.data,
          'field_cards',
        ),
      );
    }
    // eslint-disable-next-line
  }, [props.businessCurrentAccountHighlightedData]);

  useEffect(() => {
    if (props.businessCurrentAccountHighlightedCards) {
      setBusinessCurrentAccountHighlightedCards(
        props.businessCurrentAccountHighlightedCards,
      );
    }
  }, [props.businessCurrentAccountHighlightedCards]);

  useEffect(() => {
    if (props.businessCACompareAccounts) {
      setBusinessCACompareAccounts(props.businessCACompareAccounts);
    }
  }, [props.businessCACompareAccounts]);

  useEffect(() => {
    if (props.businessCABenefits) {
      setBusinessCABenefits(props.businessCABenefits);
    }
  }, [props.businessCABenefits]);

  useEffect(() => {
    if (props.businessCATrustedProvider) {
      setBusinessCATrustedProvider(props.businessCATrustedProvider);
    }
  }, [props.businessCATrustedProvider]);

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

      {!!businessCurrentAccountContent && (
        <>
          {!!businessCurrentAccountBanner && (
            <TopBanner
              dataList={businessCurrentAccountBanner}
              type="business-banner"
            />
          )}

          <Breadcrumb itemArray={breadcrumbArray} className="dark-bg-mode" />

          <HighlightedSection
            info={businessCurrentAccountHighlightedData}
            cards={businessCurrentAccountHighlightedCards}
          />

          <CompareAccounts data={businessCACompareAccounts} />

          <Benefits data={businessCABenefits} />

          <TrustedProvider dataList={businessCATrustedProvider} />
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
)(BusinessCurrentAccount);
