import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import LinkIcons from '../../components/LinkIcons';
import EligibilityCriteria from '../../components/BridgingFinanceComponents/EligibilityCriteria';
import SummaryBox from '../../components/PersonalSavingsOnlineISAComponents/SummaryBox';
import YouAreNearlyReadyToStart from '../../components/PersonalSavingsOnlineISAComponents/YouAreNearlyReadyToStart';
import TrustedProviders from '../../components/BridgingFinanceComponents/TrustedProviders';
import CardWithImageLink from '../../components/CardWithImageLink';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Business';

interface IPersonalSavingsOnlineISAPageProps {
  personalSavingsOnlineISAContent: any;
  banner: CommonDataModel;
  linkIcons: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PersonalSavingsOnlineISAPage: React.FunctionComponent<IPersonalSavingsOnlineISAPageProps> =
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
        label: 'Personal',
        url: '#',
      },
      {
        label: 'Savings',
        url: '#',
      },
      {
        label: 'Cash ISA',
        url: '#',
      },
    ];

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getPersonalSavingsOnlineISAContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

    useEffect(() => {
      if (props.personalSavingsOnlineISAContent) {
        dataSvc
          .getPersonalSavingsOnlineISABannerData(
            props.personalSavingsOnlineISAContent.data.id,
          )
          .then((data) => {
            setBanner(data);
          });

        dataSvc
          .getPersonalSavingsOnlineISALinkIconsData(
            props.personalSavingsOnlineISAContent.data.id,
          )
          .then((data) => {
            setLinkIcons(data);
          });
      }
      // eslint-disable-next-line
    }, [props.personalSavingsOnlineISAContent]);

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

    let componentCountCardWithImage = 0;
    const renderSwitchComponents = (param: string, id: string) => {
      let url = '';
      props.personalSavingsOnlineISAContent.included.forEach(
        (item: any, index: number) => {
          if (item.id === id) {
            url = item.links.self.href;
          }
        },
      );

      switch (param) {
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
        case 'paragraph--card_with_image_link':
          componentCountCardWithImage++;
          return (
            <EligibilityCriteria
              isShowRightImage={componentCountCardWithImage % 2 === 0}
              dataList={url}
            />
          );
        case 'paragraph--summery_box':
          return <SummaryBox dataList={url} />;
        case 'paragraph--cards_with_link_text':
          return <YouAreNearlyReadyToStart dataList={url} />;
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

        {!!banner && (
          <TopBanner dataList={banner} type="business-saving-banner" />
        )}

        {!!linkIcons && (
          <LinkIcons dataList={linkIcons} onScrollTop={() => null} />
        )}

        <Breadcrumb itemArray={breadcrumbArray} />

        {!!props.personalSavingsOnlineISAContent &&
          props.personalSavingsOnlineISAContent.data.relationships.field_components.data.map(
            (item: any, index: number) => (
              <React.Fragment key={index}>
                {renderSwitchComponents(item.type, item.id)}
              </React.Fragment>
            ),
          )}

        {false && (
          <>
            {true && <SummaryBox dataList={null} />}

            {true && <YouAreNearlyReadyToStart dataList={null} />}

            {true && <TrustedProviders dataList={null} />}

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
)(PersonalSavingsOnlineISAPage);
