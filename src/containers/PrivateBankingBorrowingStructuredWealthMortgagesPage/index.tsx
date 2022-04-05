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

const parentField = 'Private Banking';

interface IPrivateBankingBorrowingStructuredWealthMortgagesPageProps {
  privateBankingBorrowingContent: any;
  banner: CommonDataModel;

  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PrivateBankingBorrowingStructuredWealthMortgagesPage: 
  React.FunctionComponent<IPrivateBankingBorrowingStructuredWealthMortgagesPageProps> =
  (props) => {
    const [banner, setBanner] = useState<CommonDataModel>();

    const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
    const [footer, setFooter] = useState<CommonDataModel>();

    const breadcrumbArray = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Private Banking',
        url: '/private_banking/current_account',
      },
      {
        label: 'Borrowing',
        url: '/private_banking/borrowing',
      },
      {
        label: 'Structured Wealth Mortgages',
        url: '#',
      },
    ];

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getPrivateBankingBorrowingContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

    useEffect(() => {
      if (props.privateBankingBorrowingContent) {
        dataSvc
          .getPrivateBankingBorrowingBannerData(
            props.privateBankingBorrowingContent.data.id,
          )
          .then((data) => {
            setBanner(data);
          });
      }
      // eslint-disable-next-line
    }, [props.privateBankingBorrowingContent]);

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

        {!!banner && (
          <TopBanner dataList={banner} type="private-banking-banner" />
        )}

        <Breadcrumb itemArray={breadcrumbArray} />

        <React.Fragment>
          <div className="section section-bridging-finance-card-with-image-link private-banking borrowing component-index-0">
            <div className="container">
              <div className="card-img left-img">
                <div className="img-box w550">
                  <img 
                    className="desktop-show"
                    src="https://cms.dev.cynfusion.net/sites/default/files/2021-09/gate.png" alt="img" />
                    <img
                      className="desktop-hide mobile-hide" 
                      src="https://cms.dev.cynfusion.net/sites/default/files/2021-09/gate.png"
                      alt="img"/>
                </div>
                <div className="txt-area">
                  <div className="little-txt">SELF BUILD MORTGAGES</div>
                  <div className="content-container">
                    <p>Odyssey Bank Consumer Mortgages have been specifically designed to help those who are looking to purchase
                      their first home or even simply move into a new property from their existing home. Our bespoke solutions
                      help individuals finance their next big property move.</p>

                    <ul>
                      <li>Features:
                        <ul>
                          <li>Capital repayment/Interest Only and Part:</li>
                          <li>Joint borrower/sole proprietor</li>
                          <li>Bespoke underwriting</li>
                          <li>Minimum loan size £250,000 - £2,000,000</li>
                          <li>U.K Residents Only</li>
                          <li> Over 18+ Only</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section section-bridging-finance-card-with-image-link private-banking borrowing component-index-1">
            <div className="container">
              <div className="card-img right-img">
                <div className="txt-area">
                  <div className="little-txt">MONETISATION OF ASSET</div>
                  <div className="content-container">
                    <p>The Odyssey Bank Wealth Mortgages are designed UK resident High Net Worth* Individuals. Our Wealth Mortgage
                      offering has been designed to take into consideration the specific way in which HNW Individuals structure
                      their assets, income and cashflow. Each application is structured by an experienced relationship manager and
                      assessed on a case-by-case basis by our specialist underwriting team.</p>

                    <p>Key Benefits</p>

                    <ul>
                      <li>A named relationship manager</li>
                      <li>Bespoke transaction analysis/structuring</li>
                      <li>On-going support and periodic reviews with your relationship manager</li>
                      <li>Minimum loan size £750,000 - £5,000,000</li>
                    </ul>
                    <p>&nbsp;</p>
                  </div>
                </div>
                <div className="img-box w550">
                  <img 
                    className="desktop-show"
                    src="https://cms.dev.cynfusion.net/sites/default/files/2021-12/wealth_mortgages.PNG" alt="img" />
                  <img
                    className="desktop-hide mobile-hide"
                    src="https://cms.dev.cynfusion.net/sites/default/files/2021-12/wealth_mortgages.PNG" alt="img" />
                </div>
              </div>
            </div>
          </div>

          <div className="section section-bridging-finance-card-with-image-link private-banking borrowing component-index-2">
            <div className="container">
              <div className="card-img left-img">
                <div className="img-box w550">
                  <img 
                    className="desktop-show"
                    src="https://cms.dev.cynfusion.net/sites/default/files/2021-09/gate.png" alt="img" />
                    <img
                      className="desktop-hide mobile-hide" 
                      src="https://cms.dev.cynfusion.net/sites/default/files/2021-09/gate.png"
                      alt="img"/>
                </div>
                <div className="txt-area">
                  <div className="little-txt">UTILISATION OF FORIEGN INCOME</div>
                  <div className="content-container">
                    <p>Odyssey Bank Consumer Mortgages have been specifically designed to help those who are looking to purchase
                      their first home or even simply move into a new property from their existing home. Our bespoke solutions
                      help individuals finance their next big property move.</p>

                    <ul>
                      <li>Features:
                        <ul>
                          <li>Capital repayment/Interest Only and Part:</li>
                          <li>Joint borrower/sole proprietor</li>
                          <li>Bespoke underwriting</li>
                          <li>Minimum loan size £250,000 - £2,000,000</li>
                          <li>U.K Residents Only</li>
                          <li> Over 18+ Only</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        
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
)(PrivateBankingBorrowingStructuredWealthMortgagesPage);
