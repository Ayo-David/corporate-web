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
import { WaysToContactUs } from '../../components/CustomerSupportContactUsComponents/WaysToContactUs';
import { VisitOurOffice } from '../../components/CustomerSupportContactUsComponents/VisitOurOffice';
import TopBanner from '../../components/TopBanner';
import { OurRegionalOffices } from '../../components/CustomerSupportContactUsComponents/OurRegionalOffices';
import { TitleDescription } from '../../components/CustomerSupportContactUsComponents/TitleDescription';

const parentField = 'Customer Support';

interface ICustomerSupportContactUsPageProps {
  customerSupportContactUsContent: any;
  waysToContactUs: CommonDataModel;
  mapImage: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const CustomerSupportContactUsPage: React.FunctionComponent<ICustomerSupportContactUsPageProps> = (
  props
) => {
  const [contactUsBanner, setContactUsBanner] = useState<any>();
  const [waysToContactUs, setWaysToContactUs] = useState<CommonDataModel>();
  const [mapImage, setMapImage] = useState<CommonDataModel>();
  const [mapData, setMapData] = useState<any>();
  const [regionalOffices, setRegionalOffices] = useState<any>();
  const [titleDescriptionData, setTitleDescriptionData] = useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Contact Us',
      url: '/',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getCustomerSupportContactUsContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.customerSupportContactUsContent) {
      let _mapImageId = props.customerSupportContactUsContent.included.find(
        (item: any) => item.type === 'paragraph--map_details'
      ).relationships.field_map_background_image.data.id;
      dataSvc.getImage(_mapImageId).then((data) => setMapImage(data));
      let _mapData = props.customerSupportContactUsContent.included.find(
        (item: any) => item.type === 'paragraph--map_details'
      );
      let _regionalId = props.customerSupportContactUsContent.included.find(
        (item: any) => item.type === 'paragraph--regional_offices'
      ).id;
      let _titleDescriptionData = props.customerSupportContactUsContent.included.filter(
        (item: any) => item.type === 'paragraph--title_description'
      );
      setTitleDescriptionData(_titleDescriptionData);
      dataSvc.getCustomerSupportRegionalOffices(_regionalId).then((data) => {
        setRegionalOffices(data);
      });
      setMapData(_mapData);
      dataSvc
        .getCustomerSupportAboutUsBanner(props.customerSupportContactUsContent.data.id)
        .then((data) => {
          setContactUsBanner(data);
        });
      let _waysToContactUs = props.customerSupportContactUsContent.included.filter(
        (item: any) => item.type === 'paragraph--icon_description'
      );
      setWaysToContactUs(_waysToContactUs);
    }
  }, [props.customerSupportContactUsContent]);

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

      {contactUsBanner && (
        <TopBanner
          dataList={contactUsBanner}
          type="customer-support"
          titlePage={props.customerSupportContactUsContent.data.attributes.title}
        />
      )}

      <Breadcrumb itemArray={breadcrumbArray} />

      <div className="customer-support-faqs-content">
        {!!waysToContactUs && <WaysToContactUs dataList={waysToContactUs} />}

        {!!mapImage && <VisitOurOffice dataMap={mapData} dataList={mapImage} />}

        {!!regionalOffices && <OurRegionalOffices dataList={regionalOffices} />}

        {!!titleDescriptionData && <TitleDescription dataList={titleDescriptionData} />}
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

export default connect(mapStateToProps, matchDispatchToProps)(CustomerSupportContactUsPage);
