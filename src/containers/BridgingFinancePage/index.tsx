import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import LinkIcons from '../../components/LinkIcons';
import CardWithImageLink from '../../components/CardWithImageLink';
import EligibilityCriteria from '../../components/BridgingFinanceComponents/EligibilityCriteria';
import HowToApply from '../../components/BridgingFinanceComponents/HowToApply';
import CaseStudies from '../../components/BridgingFinanceComponents/CaseStudies';
import YouAreNearlyReadyToStart from '../../components/BridgingFinanceComponents/YouAreNearlyReadyToStart';
import TrustedProviders from '../../components/BridgingFinanceComponents/TrustedProviders';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Business';

interface IBridgingFinancePageProps {
  bridgingFinanceContent: any;
  banner: CommonDataModel;
  linkIcons: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const BridgingFinancePage: React.FunctionComponent<IBridgingFinancePageProps> =
  (props) => {
    const [banner, setBanner] = useState<CommonDataModel>();
    const [linkIcons, setLinkIcons] = useState<CommonDataModel>();
    const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
    const [footer, setFooter] = useState<CommonDataModel>();

    const breadcrumbArray = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Business Banking',
        url: '/',
      },
      {
        label: 'Business Finance',
        url: '#',
      },
      {
        label: 'Bridging Finance',
        url: '#',
      },
    ];

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getBridgingFinanceContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

    useEffect(() => {
      if (props.bridgingFinanceContent) {
        dataSvc
          .getBridgingFinanceBannerData(props.bridgingFinanceContent.data.id)
          .then((data) => {
            setBanner(data);
          });

        dataSvc
          .getBridgingFinanceLinkIconsData(props.bridgingFinanceContent.data.id)
          .then((data) => {
            setLinkIcons(data);
          });
      }
      // eslint-disable-next-line
    }, [props.bridgingFinanceContent]);

    useEffect(() => {
      if (props.banner) {
        setBanner(props.banner);
      }
    }, [props.banner]);

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

    let componentCount = 0;
    let componentCountCardWithImage = 0;
    const renderSwitchComponents = (param: string, id: string) => {
      let url = '';
      props.bridgingFinanceContent.included.forEach(
        (item: any, index: number) => {
          if (item.id === id) {
            url = item.links.self.href;
          }
        },
      );

      componentCount++;
      switch (param) {
        case 'paragraph--card_with_image_link':
        case 'paragraph--image_with_long_text':
          componentCountCardWithImage++;
          return (
            <CardWithImageLink
              classNameContainer={`component-index-${
                componentCountCardWithImage - 1
              }`}
              isShowRightImage={componentCountCardWithImage % 2 === 0}
              dataList={url}
            />
          );
        case 'paragraph--eligibility_criteria':
          componentCountCardWithImage++;
          return (
            <EligibilityCriteria
              isShowRightImage={componentCountCardWithImage % 2 === 0}
              dataList={url}
            />
          );
        case 'paragraph--cards_with_link_text':
          return componentCount <= 4 ? <HowToApply dataList={url} /> : <></>;
        case 'paragraph--link_text_background':
          return <YouAreNearlyReadyToStart dataList={url} />;
        case 'paragraph--case_studies':
          return <CaseStudies dataList={url} />;
        case 'paragraph--trusted_providers':
          return <TrustedProviders dataList={url} />;
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

        {!!banner && <TopBanner dataList={banner} type="business-banner" />}

        {!!linkIcons && (
          <LinkIcons dataList={linkIcons} onScrollTop={() => null} />
        )}

        <Breadcrumb itemArray={breadcrumbArray} />

        {!!props.bridgingFinanceContent &&
          props.bridgingFinanceContent.data.relationships.field_components.data.map(
            (item: any, index: number) => (
              <React.Fragment key={index}>
                {renderSwitchComponents(item.type, item.id)}
              </React.Fragment>
            ),
          )}

        {false && (
          <>
            {true && <CardWithImageLink dataList={null} />}

            {true && <YouAreNearlyReadyToStart dataList={null} />}

            {true && <TrustedProviders dataList={null} />}

            {true && <CardWithImageLink dataList={null} />}

            {true && <CardWithImageLink dataList={null} />}
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
)(BridgingFinancePage);
