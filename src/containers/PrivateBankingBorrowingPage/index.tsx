import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import Breadcrumb from '../../components/Breadcrumb';
import CardWithImageLink from '../../components/CardWithImageLink';
import OurClients from '../../components/PrivateBankingBorrowingComponents/OurClients';
import TrustedProviders from '../../components/BridgingFinanceComponents/TrustedProviders';
import CaseStudies from '../../components/BridgingFinanceComponents/CaseStudies';
import ImageWithLongText from '../../components/CurrentAccountsPremiumComponents/ImageWithLongText';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Private Banking';

interface IPrivateBankingBorrowingPageProps {
  privateBankingBorrowingContent: any;
  banner: CommonDataModel;

  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PrivateBankingBorrowingPage: React.FunctionComponent<IPrivateBankingBorrowingPageProps> =
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

    let componentCountCardWithImage = 0;
    // render Switch Components
    const renderSwitchComponents = (param: string, id: string) => {
      let url = '';
      let itemTemp: any;
      let indexTemp = 0;
      props.privateBankingBorrowingContent.included.forEach(
        (item: any, index: number) => {
          if (item.id === id) {
            url = item.links.self.href;

            itemTemp = item;
            indexTemp = index;
          }
        },
      );

      switch (param) {
        case 'paragraph--card_with_image_link':
          componentCountCardWithImage++;
          return (
            <CardWithImageLink
              classNameContainer={`private-banking borrowing component-index-${
                componentCountCardWithImage - 1
              }`}
              isShowRightImage={componentCountCardWithImage % 2 === 0}
              dataList={url}
            />
          );
        case 'paragraph--our_clients':
          return <OurClients dataList={url} />;
        case 'paragraph--image_with_long_text':
          return (
            <ImageWithLongText
              key={indexTemp}
              dataList={itemTemp}
              isFisrt={indexTemp === 0}
              position={indexTemp % 2 === 0 && indexTemp > 1 ? 'right' : 'left'}
              sectionRef={null}
              className="private-banking"
            />
          );
        case 'paragraph--case_studies':
          return <CaseStudies dataList={url} type="private-banking" />;
        case 'paragraph--trusted_providers':
          return (
            <TrustedProviders
              dataList={url}
              type="private-banking"
              noMarginBottom={true}
            />
          );
        default:
          return <></>;
      }
    };

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

        {!!props.privateBankingBorrowingContent &&
          props.privateBankingBorrowingContent.data.relationships.field_components.data.map(
            (item: any, index: number) => (
              <React.Fragment key={index}>
                {renderSwitchComponents(item.type, item.id)}
              </React.Fragment>
            ),
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
)(PrivateBankingBorrowingPage);
