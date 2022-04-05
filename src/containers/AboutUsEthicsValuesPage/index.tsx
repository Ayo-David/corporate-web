import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { CommonDataModel } from '../../model/common-data.model';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import dataAction from '../../actions/dataAction';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import TopBanner from '../../components/TopBanner';
import Breadcrumb from '../../components/Breadcrumb';
import ImageWithLongText from '../../components/CurrentAccountsPremiumComponents/ImageWithLongText';
import OurCustomerPromise from '../../components/AboutUsComponents/OurCustomerPromise';
import { TitleDescription } from '../../components/CustomerSupportContactUsComponents/TitleDescription';
import './styles.scss';

const parentField = 'About Us';

interface IAboutUsEthicsValuesPageProps {
  aboutUsEthicsValuesContent: any;
  aboutUsBanner: CommonDataModel;
  aboutUsHeaderLinks: CommonDataModel;
  aboutUsFieldComponents: CommonDataModel;
  headerMenus: {[parentField: string]: CommonDataModel};
  footer: CommonDataModel;
  dataAction?: any;
}

const AboutUsEthicsValuesPage: React.FunctionComponent<IAboutUsEthicsValuesPageProps> = (props) => {
  const [aboutUsEthicsValuesContent, setAboutUsEthicsValuesContent] = useState<any>();
  const [aboutUsBanner, setAboutUsBanner] = useState<any>();
  const [aboutUsFieldComponents, setAboutUsFieldComponents] = useState<any>();
  const [titleDescriptionData, setTitleDescriptionData] = useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'About Us',
      url: '/about-us/about-cynergy-bank',
    },
    {
      label: 'Ethics & Values',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getAboutUsEthicsValuesContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.aboutUsEthicsValuesContent) {      
      let _titleDescriptionData = props.aboutUsEthicsValuesContent.included.filter(
        (item: any, index: number) => (item.type === 'paragraph--title_description' && index <= 4)
      );
      setTitleDescriptionData(_titleDescriptionData);
    
      setAboutUsEthicsValuesContent(props.aboutUsEthicsValuesContent);

      props.dataAction.getAboutUsBannerData(props.aboutUsEthicsValuesContent.data.id);

      props.dataAction.getAboutUsFieldComponentsData(
        props.aboutUsEthicsValuesContent.data.id,
      );
    }
    // eslint-disable-next-line
  }, [props.aboutUsEthicsValuesContent]);

  useEffect(() => {
    if (props.aboutUsBanner) {
      setAboutUsBanner(props.aboutUsBanner);
    }
  }, [props.aboutUsBanner]);

  useEffect(() => {
    if (props.aboutUsFieldComponents) {
      setAboutUsFieldComponents(props.aboutUsFieldComponents);
    }
  }, [props.aboutUsFieldComponents]);

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

  let imageWithLongTextIndex = 0;
  const getContentTemp = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph--image_with_long_text':
        imageWithLongTextIndex++;
        return (
          <ImageWithLongText
            key={index}
            dataList={item}
            isFisrt={index === 0}
            position={imageWithLongTextIndex % 2 === 1 && imageWithLongTextIndex > 0 ? 'right' : 'left'}
            type="aboutUs"
          />
        );
      case 'paragraph--title_description':
        return (index > 4 ? <OurCustomerPromise key={index} dataList={item} /> : <></>);
      default:
        return;
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

      {!!aboutUsEthicsValuesContent && (
        <>
          {!!aboutUsBanner && (
            <TopBanner dataList={aboutUsBanner} type="about-us-ethics-values-banner" />
          )}
        </>
      )}

      <Breadcrumb itemArray={breadcrumbArray} />
      
      <div className="about-us-ethics-values-content">
        {!!titleDescriptionData && <TitleDescription showTitle={true} dataList={titleDescriptionData} />}
        
        {!!aboutUsFieldComponents &&
          aboutUsFieldComponents.data.map((item: any, index: number) => {
            return getContentTemp(item, index);
          })}
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

export default connect(mapStateToProps, matchDispatchToProps)(AboutUsEthicsValuesPage);
