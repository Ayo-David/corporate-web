import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';
import TopBannerSearch from '../../components/TopBannerSearch';
import TrendingTopics from '../../components/CustomerSupportFAQsComponents/TrendingTopics';
import FAQSet from '../../components/CustomerSupportFAQsComponents/FAQSet';
import AdsAwareness from '../../components/CustomerSupportFAQsComponents/AdsAwareness';
import ServiceStatus from '../../components/CustomerSupportFAQsComponents/ServiceStatus';
import { WaysToContactUs } from '../../components/CustomerSupportFAQsComponents/WaysToContactUs';
import { VisitOurOffice } from '../../components/CustomerSupportFAQsComponents/VisitOurOffice';
import { SocialMedia } from '../../components/CustomerSupportFAQsComponents/SocialMedia';
import { useHistory } from 'react-router';

const parentField = 'Customer Support';

interface ICustomerSupportFAQsPageProps {
  customerSupportFAQsContent: any;
  faqSet: CommonDataModel;
  adsAwareness: CommonDataModel;
  serviceStatus: CommonDataModel;
  waysToContactUs: CommonDataModel;
  mapImage: CommonDataModel;
  socialMedia: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const CustomerSupportFAQsPage: React.FunctionComponent<ICustomerSupportFAQsPageProps> =
  (props) => {
    const history = useHistory();
    const [faqsData, setFaqsData] = useState<any>([]);
    const [faqSet, setFaqSet] = useState<CommonDataModel>();
    const [adsAwareness, setAdsAwareness] = useState<CommonDataModel>();
    const [serviceStatus, setServiceStatus] = useState<CommonDataModel>();
    const [waysToContactUs, setWaysToContactUs] = useState<CommonDataModel>();
    const [mapImage, setMapImage] = useState<CommonDataModel>();
    const [socialMedia, setSocialMedia] = useState<CommonDataModel>();
    const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
    const [footer, setFooter] = useState<CommonDataModel>();

    const breadcrumbArray = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Customer Support',
        url: '/customer_support/faqs',
      },
    ];

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getCustomerSupportFAQsContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

    useEffect(() => {
      if (props.customerSupportFAQsContent) {
        dataSvc
          .getCustomerSupportFAQsSetData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setFaqSet(data);
          });
        dataSvc
          .getCustomerSupportFAQsAdsAwarenessData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setAdsAwareness(data);
          });
        dataSvc
          .getCustomerSupportFAQsServiceStatusData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setServiceStatus(data);
          });
        dataSvc
          .getCustomerSupportFAQsWaysToContactUsData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setWaysToContactUs(data);
          });
        dataSvc
          .getCustomerSupportFAQsMapImageData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setMapImage(data);
          });
        dataSvc
          .getCustomerSupportFAQsSocialMediaData(
            props.customerSupportFAQsContent.data.id,
          )
          .then((data) => {
            setSocialMedia(data);
          });
      }
    }, [props.customerSupportFAQsContent]);

    useEffect(() => {
      dataSvc.getCustomerSupportFAQsData().then((data) => {
        setFaqsData(data);
      });
    }, []);

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

        <TopBannerSearch
          title={props.customerSupportFAQsContent?.data.attributes.title}
          dataList={faqsData}
          onSearch={(value: string) => {
            history.push(`/customer_suppor/online_security?faq=${value}`);
          }}
        />

        <TrendingTopics />

        <Breadcrumb itemArray={breadcrumbArray} />

        <div className="customer-support-faqs-content">
          <FAQSet
            title={props.customerSupportFAQsContent?.data.attributes.field_desc}
            dataList={faqSet}
          />

          {!!adsAwareness && <AdsAwareness dataList={adsAwareness.data} />}

          {!!serviceStatus && <ServiceStatus dataList={serviceStatus.data} />}

          {!!waysToContactUs && (
            <WaysToContactUs dataList={waysToContactUs.data} />
          )}

          {!!mapImage && (
            <VisitOurOffice
              dataMap={props.customerSupportFAQsContent}
              dataList={mapImage}
            />
          )}

          {!!socialMedia && <SocialMedia dataList={socialMedia} />}
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
)(CustomerSupportFAQsPage);
