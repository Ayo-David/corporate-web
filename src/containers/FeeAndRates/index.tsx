import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';
import RatesDropdown from '../../components/FeeAndRatesComponents/RatesDropdown';
import SectionTitle from '../../components/FeeAndRatesComponents/SectionTitle';
import FeesAndRatesPageBody from '../../components/FeeAndRatesComponents/FeesAndRatesPageBody';

const parentField = 'Customer Support';

interface IFeeAndRatesProps {
  feeAndRatesContent: any;
  banner: CommonDataModel;
  teams: CommonDataModel;
  customerFeedback: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const FeeAndRates: React.FunctionComponent<IFeeAndRatesProps> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [preText, setPreText] = useState<string>('');
  const [postText, setPostText] = useState<string>('');

  const [rateData, setRateData] = useState<string[]>(['']);
  const [categoriesData, setCategoriesData] = useState<string[]>();
  const [rateTablesData, setRateTablesData] =
    useState<{ Categoty: string; Rate_Table: string; body: string }[]>();
  const [foreignExchangeData, setForeignExchangeData] = 
    useState<{ Rate_Table: string; body: string }[]>();
  const [pageTemplate, setPageTemplate] = useState<string>('');
  const [lastUpdatedPage, setLastUpdatedPage] = useState<string>('');

  const [selectedRate, setSelectedRate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRatesTable, setSelectedRatesTable] = useState<string>('');
  const [selectedForeignExchange, setSelectedForeignExchange] =
    useState<any>('');

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Customer Support',
      url: '/customer_suppor/faqs',
    },
    {
      label: 'Fee & Rates',
      url: '#',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getFeeAndRatesContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.feeAndRatesContent) {
      setTitle(props.feeAndRatesContent?.data?.attributes?.title);
      dataSvc
        .getFeeAndRatesBannerData(props.feeAndRatesContent.data.id)
        .then((data) => {
          setBanner(data);
        });
      dataSvc
        .getFeeAndRatesDropdownData(props.feeAndRatesContent.data.id)
        .then((data) => {
          const _rates = data.data.map((item: any) => {
            return item.attributes.field_title;
          });
          setRateData(_rates);
          setSelectedRate(_rates[0]);
        });
      dataSvc.getFeeAndRateRateDetailsData().then((data) => {
        const _categoriesData = data.map((item: any) => {
          return item.Categoty;
        });
        const _finalCategoriesData = _categoriesData.filter(
          (x: any, i: any, a: any) => a.indexOf(x) === i,
        );
        setCategoriesData(_finalCategoriesData);
        setRateTablesData(data);
      });
      dataSvc.getFeeAndRateForeignExchangeDetailsData().then((data) => {
        setForeignExchangeData(data);
      });
    }
  }, [props.feeAndRatesContent]);

  useEffect(() => {
    if (selectedRate === 'Interest Rates' && selectedRatesTable) {
      dataSvc.getFeeAndRatesRatesTemplateData().then((data) => {
        const _temp: number = data.findIndex(
          (item: any) =>
            item.Categoty === selectedCategory &&
            item.Rate_Table === selectedRatesTable,
        );
        if (_temp > -1) {
          setPageTemplate(data[Number(_temp)].body);
        }
      });
    }
    if (selectedRate === 'Foreign Exchange' && selectedForeignExchange) {
      dataSvc.getFeeAndRateForeignExchangeDetailsData().then((data) => {
        const _temp = data.findIndex(
          (item: any) => item.Rate_Table === selectedForeignExchange,
        );
        if (_temp > -1) {
          setPageTemplate(data[Number(_temp)].body);
        }
      });
    }
    if (
      !!selectedRate &&
      selectedRate !== 'Interest Rates' &&
      selectedRate !== 'Foreign Exchange'
    ) {
      const _temp = props.feeAndRatesContent.included.findIndex(
        (item: any) => item.attributes.field_title === selectedRate,
      );
      if (_temp > -1) {
        setLastUpdatedPage(
          props.feeAndRatesContent.included[Number(_temp)].attributes.changed ||
          props.feeAndRatesContent.included[Number(_temp)].attributes.created
        );
        setPageTemplate(
          props.feeAndRatesContent.included[Number(_temp)].attributes.field_text.value,
        );
      }
    }
    // eslint-disable-next-line
  }, [selectedRatesTable, selectedForeignExchange, selectedRate]);

  useEffect(() => {
    if (selectedRate) {
      switch (selectedRate) {
        case 'Interest Rates':
          setPreText(
            props.feeAndRatesContent.data.attributes
              .field_interest_rates_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes
              .field_interest_rates_post_text,
          );
          break;
        case 'Foreign Exchange':
          setPreText(
            props.feeAndRatesContent.data.attributes
              .field_foreign_exchange_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes
              .field_foreign_exchange_post_text,
          );
          break;
        case 'Base Rates':
          setPreText(
            props.feeAndRatesContent.data.attributes.field_base_rates_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes.field_base_rates_post_text,
          );
          break;
        case 'Libor Transition':
          setPreText(
            props.feeAndRatesContent.data.attributes
              .field_libor_transition_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes
              .field_libor_transition_post_text,
          );
          break;
        case 'Benchmark Transition':
          setPreText(
            props.feeAndRatesContent.data.attributes
              .field_benchmark_transition_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes
              .field_benchmark_transition_post_text,
          );
          break;
        case 'Historical Interest Rates':
          setPreText(
            props.feeAndRatesContent.data.attributes
              .field_historical_interest_rates_pre_text,
          );
          setPostText(
            props.feeAndRatesContent.data.attributes
              .field_historical_interest_rates_post_text,
          );
          break;
      }
    }
    // eslint-disable-next-line
  }, [selectedRate]);

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

      {!!banner && <TopBanner dataList={banner} type="fee-and-rates-banner" titlePage={title} />}

      <Breadcrumb itemArray={breadcrumbArray} />
      <SectionTitle />
      {rateData && (
        <RatesDropdown
          dataList={rateData}
          selectedRate={selectedRate}
          setSelectedRate={setSelectedRate}
          setPageTemplate={setPageTemplate}
          setSelectedCategory={setSelectedCategory}
          setSelectedRatesTable={setSelectedRatesTable}
          setSelectedForeignExchange={setSelectedForeignExchange}
        />
      )}
      <FeesAndRatesPageBody
        postText={postText}
        preText={preText}
        selectedRate={selectedRate}
        categories={categoriesData}
        rateTables={rateTablesData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRatesTable={selectedRatesTable}
        setSelectedRatesTable={setSelectedRatesTable}
        pageTemplate={pageTemplate}
        setPageTemplate={setPageTemplate}
        lastUpdatedPage={lastUpdatedPage}
        foreignExchangeData={foreignExchangeData}
        selectedForeignExchange={selectedForeignExchange}
        setSelectedForeignExchange={setSelectedForeignExchange}
      />
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

export default connect(mapStateToProps, matchDispatchToProps)(FeeAndRates);
