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
import BecomeAClientModal from '../../components/PrivateBankingComponents/BecomeAClientModal';
import PrivateBankingEnquiryFormModal from '../../components/PrivateBankingComponents/PrivateBankingEnquiryFormModal';
import ThankYouForReachingUsModal from '../../components/PrivateBankingComponents/ThankYouForReachingUsModal';
import TitleBox from '../../components/PrivateBankingComponents/TitleBox';
import BecomeAClient from '../../components/PrivateBankingComponents/BecomeAClient';
import TrustedProvider from '../../components/CurrentAccountsPremiumComponents/TrustedProvider';
import OurCustomerPromises from '../../components/HomeComponents/OurCustomerPromises';
import CustomerFeedback from '../../components/PrivateBankingComponents/CustomerFeedback';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Private Banking';

interface IPrivateBankingPageProps {
  privateBankingContent: any;
  privateBankingBecomeAClient: any;
  privateBankingThanksNote: any;
  banner: CommonDataModel;

  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PrivateBankingPage: React.FunctionComponent<IPrivateBankingPageProps> = (
  props,
) => {
  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<CommonDataModel>();
  const [becomeAClientQuestion, setBecomeAClientQuestion] = useState<any[]>([]);
  const [ourCustomerPromises, setOurCustomerPromises] = useState<any>();

  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const [showBecomeAClientModal, setShowBecomeAClientModal] =
    useState<boolean>(false); // false
  const [
    showPrivateBankingEnquiryFormModal,
    setShowPrivateBankingEnquiryFormModal,
  ] = useState<boolean>(false); // false
  const [showThankYouForReachingUsModal, setShowThankYouForReachingUsModal] =
    useState<boolean>(false); // false

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Private Banking',
      url: '#',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getPrivateBankingContentData();
    props.dataAction.getPrivateBankingBecomeAClientData();
    props.dataAction.getPrivateBankingThanksNoteData(0);

    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  const getPathQuery = (data: any, relationship: string) => {
    let url: URL;
    url = new URL(data.relationships[String(relationship)].links.related.href);
    return url.pathname + url.search;
  };

  useEffect(() => {
    if (props.privateBankingContent) {
      setTitle(props.privateBankingContent.data.attributes.body.processed);

      dataSvc
        .getPrivateBankingBannerData(props.privateBankingContent.data.id)
        .then((data) => {
          setBanner(data);
        });

      dataSvc
        .getData(
          getPathQuery(
            props.privateBankingContent.data,
            'field_customer_promises',
          ),
        )
        .then((data) => {
          setOurCustomerPromises(data);
        });
    }
    // eslint-disable-next-line
  }, [props.privateBankingContent]);

  useEffect(() => {
    if (props.privateBankingBecomeAClient) {
      dataSvc
        .getData(
          getPathQuery(
            props.privateBankingBecomeAClient.data,
            'field_question_options',
          ),
        )
        .then((data) => {
          setBecomeAClientQuestion(data.data);
        });
    }
  }, [props.privateBankingBecomeAClient]);

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

  let componentCountCardWithImage = 1;
  // render Switch Components
  const renderSwitchComponents = (param: string, id: string) => {
    let url = '';
    let itemTemp;
    let indexTemp = 0;
    props.privateBankingContent.included.forEach((item: any, index: number) => {
      if (item.id === id) {
        url = item.links.self.href;

        itemTemp = item;
        indexTemp = index;
      }
    });

    switch (param) {
      case 'paragraph--card_with_image_link':
        componentCountCardWithImage++;
        return (
          <CardWithImageLink
            classNameContainer={`private-banking component-index-${
              componentCountCardWithImage - 1
            }`}
            isShowRightImage={componentCountCardWithImage % 2 === 0}
            dataList={url}
          />
        );
      case 'paragraph--become_a_client':
        return (
          <BecomeAClient
            dataList={url}
            onClickBecomeAClient={() => {
              setShowBecomeAClientModal(true);
            }}
          />
        );
      case 'paragraph--trusted_providers':
        return (
          <TrustedProvider
            key={indexTemp}
            dataList={itemTemp}
            smallerTxt={true}
            type="private-banking"
          />
        );
      case 'paragraph--client_feedback':
        return <CustomerFeedback dataList={url} />;
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

      {showBecomeAClientModal && !!props.privateBankingBecomeAClient && (
        <BecomeAClientModal
          titleData={props.privateBankingBecomeAClient.data.attributes}
          dataList={becomeAClientQuestion}
          onClose={() => {
            setShowBecomeAClientModal(false);
          }}
          onNext={() => {
            setShowBecomeAClientModal(false);
            setShowPrivateBankingEnquiryFormModal(true);
          }}
        />
      )}

      {showPrivateBankingEnquiryFormModal && (
        <PrivateBankingEnquiryFormModal
          onClose={() => {
            setShowPrivateBankingEnquiryFormModal(false);
          }}
          onRestart={() => {
            setShowPrivateBankingEnquiryFormModal(false);
            setShowBecomeAClientModal(true);
          }}
          onSubmit={() => {
            setShowPrivateBankingEnquiryFormModal(false);
            setShowThankYouForReachingUsModal(true);
            setTimeout(() => {
              props.dataAction.getPrivateBankingThanksNoteData(1);
            }, 3000);
          }}
        />
      )}

      {showThankYouForReachingUsModal && !!props.privateBankingThanksNote && (
        <ThankYouForReachingUsModal
          dataList={props.privateBankingThanksNote}
          onClose={() => {
            props.dataAction.getPrivateBankingThanksNoteData(0);
            setShowThankYouForReachingUsModal(false);
          }}
        />
      )}

      {!!banner && (
        <TopBanner
          dataList={banner}
          type="private-banking-banner"
          onClickButton={() => setShowBecomeAClientModal(true)}
        />
      )}

      <Breadcrumb itemArray={breadcrumbArray} />

      <TitleBox dataList={title} />

      <OurCustomerPromises
        dataList={ourCustomerPromises}
        type="private-banking-our-customer-promises"
      />

      {!!props.privateBankingContent &&
        props.privateBankingContent.data.relationships.field_components.data.map(
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
)(PrivateBankingPage);
