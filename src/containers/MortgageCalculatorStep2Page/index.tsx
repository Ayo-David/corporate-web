import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import TopBannerPureLabel from '../../components/TopBannerPureLabel';
import Breadcrumb from '../../components/Breadcrumb';
import MortgageCalculatorStep2Box from '../../components/MortgageCalculatorComponents/MortgageCalculatorStep2Box';
import CardWithImageLink from '../../components/CardWithImageLink';
import TrustedProvider from '../../components/CurrentAccountsPremiumComponents/TrustedProvider';
import { ModalContactUs } from '../../components/MortgageCalculatorComponents/ModalContactUs';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import '../MortgageCalculatorStep1Page/styles.scss';

const parentField = 'Private Banking';

interface IMortgageCalculatorStep2PageProps {
  mortgageCalculatorContent: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const MortgageCalculatorStep2Page: React.FunctionComponent<IMortgageCalculatorStep2PageProps> =
  (props) => {
    const [showContactUsModal, setShowContactUsModal] =
      useState<boolean>(false);
    const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
    const [footer, setFooter] = useState<CommonDataModel>();

    const breadcrumbArray = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Private Banking',
        url: '/private_banking/meet_the_team',
      },
      {
        label: 'Borrowing',
        url: '#',
      },
      {
        label: 'Support',
        url: '#',
      },
      {
        label: ' Mortgage Calculator',
        url: '#',
      },
    ];

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getMortgageCalculatorContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

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

    const renderSwitchComponents = (param: string, id: string) => {
      let url = '';
      let itemTemp;
      let indexTemp = 0;
      props.mortgageCalculatorContent.included.forEach(
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
          return <CardWithImageLink isShowRightImage={false} dataList={url} />;
        case 'paragraph--trusted_providers':
          return <TrustedProvider key={indexTemp} dataList={itemTemp} />;
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

        {showContactUsModal && (
          <ModalContactUs
            open={showContactUsModal}
            onClose={() => {
              setShowContactUsModal(false);
            }}
          />
        )}

        <TopBannerPureLabel title="Mortgage Calculator" />

        <Breadcrumb itemArray={breadcrumbArray} />

        {!!props.mortgageCalculatorContent && (
          <MortgageCalculatorStep2Box
            dataList={null}
            onClickGetInTouch={() => {
              setShowContactUsModal(true);
            }}
          />
        )}

        <div className="mortgage-calculator-content">
          {!!props.mortgageCalculatorContent &&
            props.mortgageCalculatorContent.data.relationships.field_components.data.map(
              (item: any, index: number) => (
                <React.Fragment key={index}>
                  {renderSwitchComponents(item.type, item.id)}
                </React.Fragment>
              ),
            )}
        </div>

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
)(MortgageCalculatorStep2Page);
