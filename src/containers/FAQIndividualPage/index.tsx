import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import RelatedProductsAndServices from '../../components/RelatedProductsAndServices';
import TopBannerPureLabel from '../../components/TopBannerPureLabel';
import LeftPanel from '../../components/FAQIndividualComponents/LeftPanel';
import RelatedFAQ from '../../components/FAQIndividualComponents/RelatedFAQ';
import NotWhatYouAreLookingFor from '../../components/FAQIndividualComponents/NotWhatYouAreLookingFor';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';
import { useLocation, useHistory } from 'react-router';

const parentField = 'Customer Support';

interface IFAQIndividualPageProps {
  faqIndividualContent: any;
  faqList: CommonDataModel;
  relatedFAQs: CommonDataModel;
  relatedItems: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const FAQIndividualPage: React.FunctionComponent<IFAQIndividualPageProps> = (
  props,
) => {
  const history = useHistory();
  const [faqList, setFAQList] = useState<CommonDataModel>();
  const [relatedFAQs, setRelatedFAQs] = useState<CommonDataModel>();
  const [relatedItems, setRelatedItems] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();
  const query = new URLSearchParams(useLocation().search);

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Customer Support',
      url: '/customer_suppor/faqs',
    },
    {
      label:
        props.faqIndividualContent &&
        props.faqIndividualContent.data[0]?.attributes.title,
      url: '/customer_suppor/faqs',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getFAQIndividualContentData(query.get('faq'));
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataAction]);

  useEffect(() => {
    if (props.faqIndividualContent?.data[0]) {
      dataSvc
        .getFAQIndividualFAQListData(props.faqIndividualContent.data[0]?.id)
        .then((data) => {
          setFAQList(data);
        });

      dataSvc
        .getFAQIndividualRelatedFAQsData(props.faqIndividualContent.data[0]?.id)
        .then((data) => {
          setRelatedFAQs(data);
        });

      dataSvc
        .getFAQIndividualRelatedItemsData(props.faqIndividualContent.data[0]?.id)
        .then((data) => {
          setRelatedItems(data);
        });
    }
    // eslint-disable-next-line
  }, [props.faqIndividualContent]);

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

  if (!query.get('faq')) {
    history.push('/customer_suppor/faqs');
  }

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

      <TopBannerPureLabel
        title={
          props.faqIndividualContent &&
          props.faqIndividualContent.data[0]?.attributes.title
        }
      />

      <Breadcrumb itemArray={breadcrumbArray} />

      <div className="faq-individual-wrap">
        {faqList && <LeftPanel dataList={faqList} />}

        {relatedFAQs && <RelatedFAQ dataList={relatedFAQs} />}
      </div>

      {relatedItems && <RelatedProductsAndServices dataList={relatedItems} />}

      <NotWhatYouAreLookingFor />

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
)(FAQIndividualPage);
