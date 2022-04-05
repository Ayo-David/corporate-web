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
import HighlightedSection from '../../components/PersonalCAComponents/HighligtedSection';
import CompareAccounts from '../../components/PersonalCAComponents/CompareAccounts';
import Benefits from '../../components/PersonalCAComponents/Benefits';
import TrustedProvider from '../../components/PersonalCAComponents/TrustedProvider';

const parentField = 'Personal';

interface IHomePageProps {
  personalCurrentAccountContent: any;
  personalCurrentAccountBanner: CommonDataModel;
  personalCurrentAccountHighlightedData: any;
  personalCurrentAccountHighlightedCards: any;
  personalCACompareAccounts: any;
  personalCABenefits: any;
  personalCATrustedProvider: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PersonalCurrentAccount: React.FunctionComponent<IHomePageProps> = (
  props,
) => {
  const [personalCurrentAccountContent, setPersonalCurrentAccountContent] =
    useState<any>();
  const [personalCurrentAccountBanner, setPersonalCurrentAccountBanner] =
    useState<any>();
  const [
    personalCurrentAccountHighlightedData,
    setPersonalCurrentAccountHighlightedSection,
  ] = useState<any>();
  const [
    personalCurrentAccountHighlightedCards,
    setPersonalCurrentAccountHighlightedCards,
  ] = useState<any>();
  const [personalCACompareAccounts, setPersonalCACompareAccounts] =
    useState<any>();
  const [personalCABenefits, setPersonalCABenefits] = useState<any>();
  const [personalCATrustedProvider, setPersonalCATrustedProvider] =
    useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Personal',
      url: '#',
    },
    {
      label: 'Current Accounts',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getPersonalCurrentAccountContentData();
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
    if (props.personalCurrentAccountContent) {
      setPersonalCurrentAccountContent(props.personalCurrentAccountContent);

      props.dataAction.getPersonalCurrentAccountBanner(
        getPathQuery(props.personalCurrentAccountContent.data, 'field_banner'),
      );

      props.dataAction.getPersonalCurrentAccountHighlightedSection(
        getPathQuery(
          props.personalCurrentAccountContent.data,
          'field_highlighted_section',
        ),
      );

      props.dataAction.getPersonalCACompareAccounts(
        getPathQuery(
          props.personalCurrentAccountContent.data,
          'field_compare_accounts',
        ),
      );

      props.dataAction.getPersonalCABenefits(
        getPathQuery(
          props.personalCurrentAccountContent.data,
          'field_components',
        ),
      );

      props.dataAction.getPersonalCATrustedProvider(
        getPathQuery(
          props.personalCurrentAccountContent.data,
          'field_trusted_provider',
        ),
      );
    }
    // eslint-disable-next-line
  }, [props.personalCurrentAccountContent]);

  useEffect(() => {
    if (props.personalCurrentAccountBanner) {
      setPersonalCurrentAccountBanner(props.personalCurrentAccountBanner);
    }
  }, [props.personalCurrentAccountBanner]);

  useEffect(() => {
    if (props.personalCurrentAccountHighlightedData) {
      setPersonalCurrentAccountHighlightedSection(
        props.personalCurrentAccountHighlightedData,
      );
      props.dataAction.getPersonalCurrentAccountHighlightedCards(
        getPathQuery(
          props.personalCurrentAccountHighlightedData.data,
          'field_cards',
        ),
      );
    }
    // eslint-disable-next-line
  }, [props.personalCurrentAccountHighlightedData]);

  useEffect(() => {
    if (props.personalCurrentAccountHighlightedCards) {
      setPersonalCurrentAccountHighlightedCards(
        props.personalCurrentAccountHighlightedCards,
      );
    }
  }, [props.personalCurrentAccountHighlightedCards]);

  useEffect(() => {
    if (props.personalCACompareAccounts) {
      setPersonalCACompareAccounts(props.personalCACompareAccounts);
    }
  }, [props.personalCACompareAccounts]);

  useEffect(() => {
    if (props.personalCABenefits) {
      setPersonalCABenefits(props.personalCABenefits);
    }
  }, [props.personalCABenefits]);

  useEffect(() => {
    if (props.personalCATrustedProvider) {
      setPersonalCATrustedProvider(props.personalCATrustedProvider);
    }
  }, [props.personalCATrustedProvider]);

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

      {!!personalCurrentAccountContent && (
        <>
          {!!personalCurrentAccountBanner && (
            <TopBanner
              dataList={personalCurrentAccountBanner}
              type="personal-banner"
            />
          )}

          <Breadcrumb itemArray={breadcrumbArray} className="dark-bg-mode" />

          <HighlightedSection
            info={personalCurrentAccountHighlightedData}
            cards={personalCurrentAccountHighlightedCards}
          />

          <CompareAccounts data={personalCACompareAccounts} />

          <Benefits data={personalCABenefits} />

          <TrustedProvider dataList={personalCATrustedProvider} />
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
)(PersonalCurrentAccount);
