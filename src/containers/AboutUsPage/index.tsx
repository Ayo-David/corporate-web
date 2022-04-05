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
import CustomerTestimonials from '../../components/AboutUsComponents/CustomerTestimonials';
import FAQs from '../../components/CurrentAccountsPremiumComponents/FAQs';
import OurCustomerPromise from '../../components/AboutUsComponents/OurCustomerPromise';
import './styles.scss';

const parentField = 'About Us';

interface IAboutUsPageProps {
  aboutUsContent: any;
  aboutUsBanner: CommonDataModel;
  aboutUsHeaderLinks: CommonDataModel;
  aboutUsFieldComponents: CommonDataModel;
  aboutUsFaqs: CommonDataModel;
  headerMenus: {[parentField: string]: CommonDataModel};
  footer: CommonDataModel;
  dataAction?: any;
}

const AboutUsPage: React.FunctionComponent<IAboutUsPageProps> = (props) => {
  const [aboutUsContent, setAboutUsContent] = useState<any>();
  const [aboutUsBanner, setAboutUsBanner] = useState<any>();
  const [aboutUsFieldComponents, setAboutUsFieldComponents] = useState<any>();
  const [aboutUsFaqs, setAboutUsFaqs] = useState<any>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'About Us',
      url: '#',
    },
  ]);

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getAboutUsContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.aboutUsContent) {
      setAboutUsContent(props.aboutUsContent);

      props.dataAction.getAboutUsBannerData(props.aboutUsContent.data.id);

      props.dataAction.getAboutUsFieldComponentsData(
        props.aboutUsContent.data.id,
      );

      props.dataAction.getAboutUsFaqsData(props.aboutUsContent.data.id);
    }
    // eslint-disable-next-line
  }, [props.aboutUsContent]);

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
    if (props.aboutUsFaqs) {
      setAboutUsFaqs(props.aboutUsFaqs);
    }
  }, [props.aboutUsFaqs]);

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

  const getContentTemp = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph--image_with_long_text':
        return (
          <ImageWithLongText
            key={index}
            dataList={item}
            isFisrt={index === 0}
            position={index % 2 === 0 && index > 0 ? 'right' : 'left'}
            type="aboutUs"
          />
        );
      case 'paragraph--card_with_image_link':
        return (
          <CustomerTestimonials
            key={index}
            dataList={item}
            isFisrt={index === 0}
            position={index % 2 === 0 && index > 0 ? 'right' : 'left'}
            type="aboutUs"
          />
        );
      case 'paragraph--title_description':
        return <OurCustomerPromise key={index} dataList={item} />;
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

      {!!aboutUsContent && (
        <>
          {!!aboutUsBanner && (
            <TopBanner dataList={aboutUsBanner} type="about-us-banner" />
          )}
        </>
      )}

      <Breadcrumb itemArray={breadcrumbArray} />

      {!!aboutUsFieldComponents &&
        aboutUsFieldComponents.data.map((item: any, index: number) => {
          return getContentTemp(item, index);
        })}

      {!!aboutUsFaqs && <FAQs dataList={aboutUsFaqs} type="aboutUs" />}

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

export default connect(mapStateToProps, matchDispatchToProps)(AboutUsPage);
