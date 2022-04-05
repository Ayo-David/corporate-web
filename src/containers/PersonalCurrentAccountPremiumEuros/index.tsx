import React, { useEffect, useRef, useState } from 'react';
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
import LinkIcons from '../../components/LinkIcons';
import RelatedProductsAndServicesSingle from '../../components/RelatedProductsAndServicesSingle';
import ImageWithLongText from '../../components/CurrentAccountsPremiumComponents/ImageWithLongText';
import EligibilityCriteria from '../../components/CurrentAccountsPremiumComponents/EligibilityCriteria';
import Overdrafts from '../../components/CurrentAccountsPremiumComponents/Overdrafts';
import ApplyOnline from '../../components/CurrentAccountsPremiumComponents/ApplyOnline';
import FAQs from '../../components/CurrentAccountsPremiumComponents/FAQs';
import Breadcrumb from '../../components/Breadcrumb';
import TrustedProvider from '../../components/CurrentAccountsPremiumComponents/TrustedProvider';
import './styles.scss';

const parentField = 'Personal';

interface IPersonalCurrentAccountPremiumEurosProps {
  currentAccountsContent: any;
  currentAccountsBanner: CommonDataModel;
  currentAccountsHeaderLinks: CommonDataModel;
  currentAccountsFieldComponents: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const PersonalCurrentAccountPremiumEuros: React.FunctionComponent<IPersonalCurrentAccountPremiumEurosProps> =
  (props) => {
    const [currentAccountsContent, setCurrentAccountsContent] = useState<any>();
    const [currentAccountsBanner, setCurrentAccountsBanner] = useState<any>();
    const [currentAccountsHeaderLinks, setCurrentAccountsHeaderLinks] =
      useState<any>();
    const [currentAccountsFieldComponents, setCurrentAccountsFieldComponents] =
      useState<any>();
    const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
    const [footer, setFooter] = useState<CommonDataModel>();

    const summeryRef = useRef<HTMLDivElement>(null);
    const criteriaRef = useRef<HTMLDivElement>(null);
    const termAndConditionsRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);

    const [breadcrumbArray] = useState<BreadcrumbItemModel[]>([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Personal',
        url: '/personal/current_account',
      },
      {
        label: 'Current Account in Euros',
        url: '#',
      },
    ]);

    useEffect(() => {
      nprogress.configure({ parent: 'main' });
      nprogress.start();
      props.dataAction.getPersonalCurrentAccountsEurosContentData();
      props.dataAction.getHeaderMenuData(parentField);
      props.dataAction.getFooterData();
    }, [props.dataAction]);

    useEffect(() => {
      if (props.currentAccountsContent) {
        setCurrentAccountsContent(props.currentAccountsContent);

        props.dataAction.getCurrentAccountsBannerData(
          props.currentAccountsContent.data.id,
        );

        props.dataAction.getCurrentAccountsHeaderLinksData(
          props.currentAccountsContent.data.id,
        );

        props.dataAction.getCurrentAccountsFieldComponentsData(
          props.currentAccountsContent.data.id,
        );
      }
      // eslint-disable-next-line
    }, [props.currentAccountsContent]);

    useEffect(() => {
      if (props.currentAccountsBanner) {
        setCurrentAccountsBanner(props.currentAccountsBanner);
      }
    }, [props.currentAccountsBanner]);

    useEffect(() => {
      if (props.currentAccountsHeaderLinks) {
        setCurrentAccountsHeaderLinks(props.currentAccountsHeaderLinks);
      }
    }, [props.currentAccountsHeaderLinks]);

    useEffect(() => {
      if (props.currentAccountsFieldComponents) {
        setCurrentAccountsFieldComponents(props.currentAccountsFieldComponents);
      }
    }, [props.currentAccountsFieldComponents]);

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
              position={index % 2 === 0 && index > 1 ? 'right' : 'left'}
              className={`section-order-${index}`}
              sectionRef={
                item.attributes.field_titles === 'SUMMERY'
                  ? summeryRef
                  : item.attributes.field_titles === 'TERMS & CONDITIONS'
                  ? termAndConditionsRef
                  : null
              }
            />
          );
        case 'paragraph--eligibility_criteria':
          return (
            <EligibilityCriteria
              key={index}
              dataList={item}
              isFisrt={index === 0}
              position={index % 2 === 0 && index > 1 ? 'right' : 'left'}
              className={`section-order-${index}`}
              sectionRef={criteriaRef}
            />
          );
        case 'paragraph--image_description_with_faq':
          return (
            <Overdrafts
              key={index}
              dataList={item}
              isFisrt={index === 0}
              position={index % 2 === 0 && index > 1 ? 'right' : 'left'}
              className={`section-order-${index}`}
            />
          );
        case 'paragraph--customer_interest_links':
          return (
            <RelatedProductsAndServicesSingle dataList={item} key={index} />
          );
        case 'paragraph--cards_with_link_text':
          return <ApplyOnline key={index} dataList={item} />;
        case 'paragraph--faq_s':
          return <FAQs key={index} dataList={item} sectionRef={faqsRef} />;
        case 'paragraph--trusted_providers':
          return <TrustedProvider key={index} dataList={item} />;
        default:
          return;
      }
    };

    /**
     * handle scroll to top
     * @param data data
     */
    const handleScrollTop = (data: any) => {
      if (data.title === 'Summery') {
        setTimeout(() => {
          summeryRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 10);
      } else if (data.title === 'Eligibility Criteria') {
        setTimeout(() => {
          criteriaRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 10);
      } else if (data.title === 'Terms & Conditions') {
        setTimeout(() => {
          termAndConditionsRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 10);
      } else if (data.title === 'FAQs') {
        setTimeout(() => {
          faqsRef.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 10);
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

        {!!currentAccountsContent && (
          <>
            {!!currentAccountsBanner && (
              <TopBanner
                dataList={currentAccountsBanner}
                type="personal-premium-banner-euros"
              />
            )}

            {!!currentAccountsHeaderLinks && (
              <LinkIcons
                dataList={currentAccountsHeaderLinks}
                onScrollTop={handleScrollTop}
              />
            )}
          </>
        )}

        <Breadcrumb itemArray={breadcrumbArray} />

        {!!currentAccountsFieldComponents &&
          currentAccountsFieldComponents.data.map(
            (item: any, index: number) => {
              return getContentTemp(item, index);
            },
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
)(PersonalCurrentAccountPremiumEuros);
