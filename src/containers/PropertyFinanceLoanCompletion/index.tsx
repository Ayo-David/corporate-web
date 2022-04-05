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
import ParagraphTitleDescription from '../../components/LoanCompletionComponents/ParagraphTitleDescription';
import DealListRow from '../../components/LoanCompletionComponents/DealListRow';

const parentField = 'Business';

interface IPropertyFinanceLoanCompletionProps {
  loanCompletionContent: any;
  dealSheetData: any;
  loanCompletionBanner: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PropertyFinanceLoanCompletion: React.FunctionComponent<
  IPropertyFinanceLoanCompletionProps
> = (props) => {
  const [loanCompletionBanner, setLoanCompletionBanner] = useState<any>();
  const [loanCompletionContent, setLoanCompletionContent] = useState<any>([]);
  const [dealSheetData, setDealSheetData] = useState<any[]>([]);
  const [numberOfRows, setNumberOfRows] = useState<number>(3);
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
      label: 'Property Finance',
      url: '#',
    },
    {
      label: 'Loan Completion',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getLoanCompletionContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getDealSheetListData();
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.loanCompletionContent) {
      props.dataAction.getLoanCompletionBannerData(props.loanCompletionContent.data.id);
      setLoanCompletionContent(props.loanCompletionContent);
    }
    // eslint-disable-next-line
  }, [props.loanCompletionContent]);

  useEffect(() => {
    if (props.dealSheetData && props.dealSheetData.data) {
      let _tempCardList = [...props.dealSheetData.data];
      for (let i = 0; i < Math.ceil(_tempCardList.length / 3); i++) {
        let item = [..._tempCardList].splice(3 * i, 3);
        setDealSheetData((prevState) => [...prevState, item]);
      }
    }
  }, [props.dealSheetData]);

  useEffect(() => {
    if (props.loanCompletionBanner) {
      setLoanCompletionBanner(props.loanCompletionBanner);
    }
  }, [props.loanCompletionBanner]);

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

      {!!loanCompletionBanner && (
        <TopBanner dataList={loanCompletionBanner} type="loan-completion" />
      )}

      <>
        <Breadcrumb itemArray={breadcrumbArray} />
        <div className="container loan-completion">
          {!!loanCompletionContent &&
            !!loanCompletionContent.included &&
            loanCompletionContent.included.map((item: any, key: number) => {
              switch (item.type) {
                case 'paragraph--title_description':
                  return <ParagraphTitleDescription dataList={item} key={key} />;
                default:
                  return null;
              }
            })}
          {!!dealSheetData &&
            dealSheetData
              .filter((item1: any, index1: number) => index1 < numberOfRows)
              .map((item: any, key: number) => {
                return (
                  <div className="deals-listing-container" key={key}>
                    <DealListRow item={item} num={key} />
                  </div>
                );
              })}
          <div className="view-more">
            <button
              className="green-btn"
              onClick={() => setNumberOfRows(Math.ceil(props.dealSheetData.data.length / 3))}>
              View More Deal Sheets
            </button>
          </div>
        </div>
      </>

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

export default connect(mapStateToProps, matchDispatchToProps)(PropertyFinanceLoanCompletion);
