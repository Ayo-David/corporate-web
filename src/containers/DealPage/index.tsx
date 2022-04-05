import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import TopInfo from '../../components/TopInfo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';
import Breadcrumb from '../../components/Breadcrumb';
import TopBannerImageCarousel from '../../components/TopBannerImageCarousel';
import Title from '../../components/DealPageComponents/Title';
import ParagraphImageWithLongText from '../../components/DealPageComponents/ParagraphImageWithLongText';
import ParagraphTitleMultipleTextArea from '../../components/DealPageComponents/ParagraphTitleMultipleTextArea';
import ParagraphDescription from '../../components/DealPageComponents/ParagraphDescription';
import ParagraphTitleDescription from '../../components/DealPageComponents/ParagraphTitleDescription';
import RelatedCaseStudies from '../../components/DealPageComponents/RelatedCaseStudies';

const parentField = 'Business';

interface IDealPageProps extends RouteComponentProps<any> {
  pageId: any;
  breadcrumb?: any;
  dealContent: any;
  dealBanner: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const DealPage: React.FunctionComponent<IDealPageProps> = (props) => {
  const [dealContent, setDealContent] = useState<any>();
  const [dealBanners, setDealBanners] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any[]>([]);
  const [relatedCaseStudies, setCaseStudies] = useState<any[]>([]);
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getDealSheetContent(props.match.params.id);
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
    // eslint-disable-next-line
  }, [props.dataAction, props.match.params.id]);

  useEffect(() => {
    if (props.dealContent) {
      setDealContent(props.dealContent);
      props.dataAction.getDealSheetBanner(props.dealContent.data.id);
      setPageContent(
        props.dealContent.included.filter(
          (item: any) => item.type !== 'media--banner_image' && item.type !== 'node--deal_sheet'
        )
      );
      setCaseStudies(
        props.dealContent.included.filter((item: any) => item.type === 'node--deal_sheet')
      );
    }
    // eslint-disable-next-line
  }, [props.dealContent]);

  useEffect(() => {
    if (props.dealBanner) {
      setDealBanners(props.dealBanner);
    }
  }, [props.dealBanner]);
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

  const breadCrumbArray = [
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
      label: 'Lending',
      url: '#',
    },
    {
      label: !!props.dealContent ? props.dealContent.data.attributes.title : '',
      url: '#',
    },
  ];

  return (
    <React.Fragment>
      <div className="desktop-show mobile-hide">
        <TopInfo />
      </div>

      {!!headerMenu && (
        <Header
          activeMenu={parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction}
        />
      )}

      <div className="desktop-hide mobile-show">
        <TopInfo />
      </div>

      {!!dealContent && (
        <>
          <TopBannerImageCarousel dataList={dealBanners} />
          <Breadcrumb itemArray={breadCrumbArray} />
          <Title dataList={props.dealContent.data.attributes.field_heading} />
          {!!pageContent &&
            pageContent.map((item, index) => {
              switch (item.type) {
                case 'paragraph--image_with_long_text':
                  return <ParagraphImageWithLongText dataList={item} key={index} />;
                case 'paragraph--title_with_multiple_text_area':
                  return <ParagraphTitleMultipleTextArea dataList={item} key={index} />;
                case 'paragraph--description':
                  return <ParagraphDescription dataList={item} key={index} />;
                case 'paragraph--title_description':
                  return <ParagraphTitleDescription dataList={item} key={index} />;
                default:
                  return null;
              }
            })}
          {!!relatedCaseStudies && <RelatedCaseStudies dataList={relatedCaseStudies} />}
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

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DealPage));
