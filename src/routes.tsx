import HomePage from './containers/HomePage';
import NewsArticlesPage from './containers/NewsArticlesPage';

import BridgingFinancePage from './containers/BridgingFinancePage';
import MeetTheTeamPage from './containers/MeetTheTeamPage';
import PersonalSavingsOnlineISAPage from './containers/PersonalSavingsOnlineISAPage';

import BusinessRelationshipManagerPage from './containers/BusinessRelationshipManagerPage';
import ArticleDetailPage from './containers/ArticleDetailPage';
import FAQIndividualPage from './containers/FAQIndividualPage';

import BusinessCurrentAccount from './containers/BusinessCurrentAccount';
import PersonalCurrentAccount from './containers/PersonalCurrentAccount';
import PersonalSavingAccount from './containers/PersonalSavingAccount';

import AboutUsPage from './containers/AboutUsPage';
import AboutUsEthicsValuesPage from './containers/AboutUsEthicsValuesPage';
import BussinessCurrentAccountClassic from './containers/BussinessCurrentAccountClassic';
import PersonalCurrentAccountPremium from './containers/PersonalCurrentAccountPremium';

import Error404Page from './containers/Error404Page';
import MortgageCalculatorStep1Page from './containers/MortgageCalculatorStep1Page';
import MortgageCalculatorStep2Page from './containers/MortgageCalculatorStep2Page';

import CustomerSupportFAQsPage from './containers/CustomerSupportFAQsPage';
import PrivateBankingPage from './containers/PrivateBankingPage';
import PrivateBankingBorrowingPage from './containers/PrivateBankingBorrowingPage';

import PageWithSidebar from './containers/PageWithSidebar';
import PageWithoutSidebar from './containers/PageWithoutSidebar';
import { BreadcrumbItemModel } from './model/breadcrumb.model';
import React from 'react';
import FeeAndRates from './containers/FeeAndRates';
import PersonalCurrentAccountPremiumEuros from './containers/PersonalCurrentAccountPremiumEuros';
import Security from './containers/Security';
import { RouteProps } from 'react-router';
import { ConfigService } from './services/ConfigService';
import PropertyFinanceLoanCompletion from './containers/PropertyFinanceLoanCompletion';
import DealPage from './containers/DealPage';
import CustomerSupportDocumentLibrary from './containers/CustomerSupportDocumentLibrary';
import CustomerSupportContactUsPage from './containers/CustomerSupportContactUsPage';
import ContactForm from './containers/ContactForm';
import PrivateBankingBorrowingStructuredWealthMortgagesPage from './containers/PrivateBankingBorrowingStructuredWealthMortgagesPage';

const { META } = ConfigService.getConfig()

export interface IRoute {
  path: string;
  title: string;
  component: RouteProps['component'];
  description?: string;
  keywords?: string;
  dynamic?: boolean;
}

/**
 * Generate an object with all necessary fields to render a page.
 * @param {string} path - The page path
 * @param {string} title - THe page title (for SEO)
 * @param {Function} component - The component to be rendered. Containers can also be used
 * @param {string} description - The page description (for SEO) [OPTIONAL]
 * @param {string} keywords - The comma separated page keywords (for SEO) [OPTIONAL]
 * @returns {object}
 */
export const createPage = (
  path: any,
  title: any,
  component: any,
  description?: any,
  keywords?: any,
) => ({
  path,
  title: `${title} | ${META.PAGE_TITLE_SUFFIX}`,
  component,
  description: description || META.PAGE_DESCRIPTION,
  keywords: keywords || META.PAGE_KEYWORDS,
});

export interface CreateDrupalPageTemplateConfig {
  path: string;
  title: string;
  description?: string;
  keywords?: string;
  withSidebar: boolean; // whether use template with sidebar or not
  pathAsBaseURL?: boolean;
  bannerBgImageSizeOverride?: CSSStyleDeclaration['backgroundSize'];
  bannerBgImagePositionOverride?: CSSStyleDeclaration['backgroundPosition'];
  bannerMaskSizeOverride?: CSSStyleDeclaration['webkitMaskSize'];
  props: {
    pageId: PageTemplateId; // name of property declared in config.tsx.
    parentBreadcrumb: BreadcrumbItemModel[];
    parentField: string;
  };
}

// Helper class to create a Drupal Page Template.
// PageId is a name of property of DrupalPageTemplateUrl Object (in config.tsx).
export const createDrupalPageTemplatePage = (
  config: CreateDrupalPageTemplateConfig,
) => {
  const dynamic = config.withSidebar;
  return {
    path: config.path,
    title: `${config.title} | ${META.PAGE_TITLE_SUFFIX}`,
    component: (props: any) => {
      const bannerProps = {
        bannerBgImageSizeOverride: config.bannerBgImageSizeOverride,
        bannerBgImagePositionOverride: config.bannerBgImagePositionOverride,
        bannerMaskSizeOverride: config.bannerMaskSizeOverride,
      };
      return config.withSidebar ? (
        <PageWithSidebar
          {...config.props}
          {...props}
          {...bannerProps}
          paragraphsBaseUrl={dynamic ? config.path : undefined}
          pathAsBaseURL={dynamic ? config.pathAsBaseURL : false}
        />
      ) : (
        <PageWithoutSidebar
          {...config.props}
          {...props}
          {...bannerProps}
        />
      );
    },
    description: config.description || META.PAGE_DESCRIPTION,
    keywords: config.keywords || META.PAGE_KEYWORDS,
    dynamic,
  };
};

const exportRoute: IRoute[] = [
  createPage('/', 'HomePage', HomePage),
  createPage('/homePage', 'HomePage', HomePage),
  createPage(
    '/about_us/news_and_articles',
    'NewsArticlesPage',
    NewsArticlesPage,
  ),

  createPage(
    '/business-banking/business-finance',
    'BridgingFinancePage',
    BridgingFinancePage,
  ),
  createPage(
    '/private_banking/meet_the_team',
    'MeetTheTeamPage',
    MeetTheTeamPage,
  ),
  createPage(
    '/business/savings',
    'PersonalSavingsOnlineISAPage',
    PersonalSavingsOnlineISAPage,
  ),

  createPage(
    '/business/relationship_finance',
    'BusinessRelationshipManagerPage',
    BusinessRelationshipManagerPage,
  ),
  createPage(
    '/about_us/article_detail/:id',
    'ArticleDetailPage',
    ArticleDetailPage,
  ),
  createPage(
    '/customer_suppor/online_security',
    'FAQIndividualPage',
    FAQIndividualPage,
  ),

  createPage(
    '/business/current_accounts',
    'BusinessCurrentAccount',
    BusinessCurrentAccount,
  ),
  createPage(
    '/personal/personal-savings',
    'PersonalSavingsAccount',
    PersonalSavingAccount,
  ),
  createPage(
    '/personal/current_account',
    'PersonalCurrentAccount',
    PersonalCurrentAccount,
  ),
  createPage(
    '/contact-form',
    'ContactForm',
    ContactForm
  ),
  createPage(
    '/customer-support/document-library',
    'Customer Support Document Library',
    CustomerSupportDocumentLibrary
  ),
  createPage(
    '/business/current_accounts_classic',
    'BussinessCurrentAccountClassic',
    BussinessCurrentAccountClassic,
  ),
  createPage(
    '/personal/current_account_premium',
    'PersonalCurrentAccountPremium',
    PersonalCurrentAccountPremium,
  ),
  createPage(
    '/personal/current_account_euros',
    'PersonalCurrentAccountPremiumEuros',
    PersonalCurrentAccountPremiumEuros,
  ),
  createPage('/about-us/about-cynergy-bank', 'AboutUsPage', AboutUsPage),
  createPage('/about-cynergy-bank/ethics-values', 'AboutUsEthicsValuesPage', AboutUsEthicsValuesPage),

  createDrupalPageTemplatePage({
    path: '/about_us/message_ceo',
    title: 'aboutUsCeoMessagePage',
    withSidebar: true,
    props: {
      pageId: 'AboutUsCeoMessagePage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/about_us/covid_19',
    title: 'aboutUsCovid19Page',
    withSidebar: true,
    props: {
      pageId: 'AboutUsCovid19Page',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
        {
          label: 'COVID 19',
          url: '#',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/international',
    title: 'internationalPage',
    withSidebar: false,
    props: {
      pageId: 'InternationalPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'International',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createPage('/error404', 'Error404Page', Error404Page),
  createPage(
    '/private_banking/borrowing/mortgage',
    'MortgageCalculatorStep1Page',
    MortgageCalculatorStep1Page,
  ),
  createPage(
    '/private_banking/borrowing/mortgage/step2',
    'MortgageCalculatorStep2Page',
    MortgageCalculatorStep2Page,
  ),

  createPage(
    '/customer_suppor/faqs',
    'CustomerSupportFAQsPage',
    CustomerSupportFAQsPage,
  ),
  createPage(
    '/private_banking/current_account',
    'PrivateBankingPage',
    PrivateBankingPage,
  ),
  createPage(
    '/private_banking/borrowing',
    'PrivateBankingBorrowingPage',
    PrivateBankingBorrowingPage,
  ),
  createPage(
    '/private-banking/borrowing/structured-wealth-mortgages',
    'PrivateBankingBorrowingStructuredWealthMortgagesPage',
    PrivateBankingBorrowingStructuredWealthMortgagesPage,
  ),
  createPage('/customer_support/fees_and_rates', 'FeeAndRatesPage', FeeAndRates),
  createPage(
    '/customer_support/contact_us',
    'Customer Support Contact Us Page',
    CustomerSupportContactUsPage
  ),
  createPage('/deal-sheets/:id', 'Deal Sheets Page', DealPage),
  createPage(
    '/property-finance/loan-completion',
    'PropertyFinanceLoanCompletion',
    PropertyFinanceLoanCompletion),
  createDrupalPageTemplatePage({
    path: '/privacy-policy',
    title: 'ImportantInformation',
    withSidebar: true,
    props: {
      pageId: 'ImportantInformation',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'Business',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/business-banking/identification-requirements',
    title: 'BussinessIdentificationRequirements',
    withSidebar: true,
    props: {
      pageId: 'BussinessIdentificationRequirements',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Business',
          url: '/',
        },
      ],
      parentField: 'Business',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/personal-banking/identification-requirements',
    title: 'PersonalIdentificationRequirements',
    withSidebar: true,
    props: {
      pageId: 'PersonalIdentificationRequirements',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Personal',
          url: '/personal/current_account',
        },
      ],
      parentField: 'Personal',
    },
  }),
  createDrupalPageTemplatePage({
    path: '/personal-savings/current-accounts',
    title: 'PersonalBankingCurrentAccount',
    withSidebar: true,
    props: {
      pageId: 'PersonalBankingCurrentAccount',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Personal',
          url: '/personal/current_account',
        },
      ],
      parentField: 'Personal',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/personal-banking/life-events',
    title: 'PersonalLifeEvents',
    withSidebar: true,
    props: {
      pageId: 'PersonalLifeEvents',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Personal',
          url: '/personal/current_account',
        },
      ],
      parentField: 'Personal',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/accessibility',
    title: 'Accessibility',
    withSidebar: false,
    props: {
      pageId: 'Accessibility',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'Business',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/private_banking/how_to_apply',
    title: 'PrivateBankingHowToApplyData',
    withSidebar: false,
    props: {
      pageId: 'PrivateBankingHowToApplyData',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Private',
          url: '/private_banking/current_account',
        },
      ],
      parentField: 'Private Banking',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/private-banking/mortgage-intermediaries',
    title: 'PrivateBankingIntermediaries',
    withSidebar: true,
    props: {
      pageId: 'PrivateBankingIntermediaries',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Private Banking',
          url: '/private_banking/current_account',
        },
      ],
      parentField: 'Private Banking',
    },
  }),
  
  createDrupalPageTemplatePage({
    path: '/mortgage-intermediaries/working-with-us',
    title: 'PrivateBankingIntermediaries Working With Us',
    withSidebar: true,
    props: {
      pageId: 'PrivateBankingIntermediariesWorkingWithUs',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/mortgage-intermediaries/our-products',
    title: 'PrivateBankingIntermediaries Our Products',
    withSidebar: true,
    props: {
      pageId: 'PrivateBankingIntermediariesOurProducts',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/mortgage-intermediaries/our-criteria',
    title: 'PrivateBankingIntermediaries Our Criteria',
    withSidebar: true,
    props: {
      pageId: 'PrivateBankingIntermediariesOurCriteria',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/mortgage-intermediaries/documents',
    title: 'PrivateBankingIntermediaries Documents',
    withSidebar: false,
    props: {
      pageId: 'PrivateBankingIntermediariesDocuments',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/property-brokers/our-approach',
    title: 'PropertyBrokersOurApproach',
    withSidebar: true,
    props: {
      pageId: 'PropertyBrokersOurApproach',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/property-brokers/property-lending',
    title: 'PropertyBrokersPropertyLending',
    withSidebar: false,
    props: {
      pageId: 'PropertyBrokersPropertyLending',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/property-brokers/nacfb',
    title: 'PropertyBrokersNACFB',
    withSidebar: false,
    props: {
      pageId: 'PropertyBrokersNACFB',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/open-banking',
    title: 'OpenBanking',
    withSidebar: false,
    props: {
      pageId: 'OpenBanking',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
	{
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank/our-partnerships',
    title: 'aboutCynergyBankOurPartnerships',
    withSidebar: true,
    props: {
      pageId: 'AboutCynergyBankOurPartnerships',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Cynergy Bank',
          url: '/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank/about-cbils',
    title: 'aboutCbils',
    withSidebar: true,
    props: {
      pageId: 'AboutUsAboutCbilsPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank/recovery-loan-scheme',
    title: 'aboutUsRecoveryLoanSchemePage',
    withSidebar: true,
    props: {
      pageId: 'AboutUsRecoveryLoanSchemePage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank/our-history',
    title: 'aboutUsOurHistoryPage',
    withSidebar: true,
    props: {
      pageId: 'AboutUsOurHistoryPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),
  
  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank/meet-the-board',
    title: 'aboutUsMeetTheBoardPage',
    withSidebar: true,
    props: {
      pageId: 'AboutUsMeetTheBoardPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    pathAsBaseURL: true,
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/about-cynergy-bank',
    title: 'aboutCynergyBank',
    withSidebar: true,
    props: {
      pageId: 'AboutCynergyBank',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/property-finance/business-lending',
    title: 'propertyFinanceBusinessLending',
    withSidebar: true,
    props: {
      pageId: 'PropertyFinanceBusinessLending',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Business',
          url: '/',
        },
        {
          label: 'Business Finance',
          url: '/business-banking/business-finance',
        },
      ],
      parentField: 'Property Finance',
    },
    bannerBgImageSizeOverride: 'auto 100%',
    bannerMaskSizeOverride: '45% 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/business-banking/business-current-account',
    title: 'businessCurrentAccountPage',
    withSidebar: true,
    props: {
      pageId: 'BusinessCurrentAccountPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Business',
          url: '/',
        },
        {
          label: 'Current Account',
          url: '/business/current_accounts',
        },
        {
          label: 'Classic',
          url: '/business/current_accounts_classic',
        },
      ],
      parentField: 'Business',
    },
  }),

  createDrupalPageTemplatePage({
    path: '/online-banking',
    title: 'onlineBankingPage',
    withSidebar: true,
    props: {
      pageId: 'OnlineBankingPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'Business',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/personal-banking/cash-isa-transfer',
    title: 'personalBankingCashISATransferPage',
    withSidebar: false,
    props: {
      pageId: 'PersonalBankingCashISATransferPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Personal Banking',
          url: '/personal/current-account',
        },
      ],
      parentField: 'Personal',
    },
  }),

  createPage(
    '/security',
    'security',
    Security,
  ),

  createDrupalPageTemplatePage({
    path: '/security/pages',
    title: 'securityPages',
    withSidebar: true,
    props: {
      pageId: 'SecurityPages',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/covid-19/cbils-british-business-bank-covid-19-business-interruption-loan-scheme/podcast-with-savills-and-steve-crosswell',
    title: 'PodcastWithSavills',
    withSidebar: false,
    props: {
      pageId: 'PodcastWithSavillsPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/covid-19/cbils-british-business-bank-covid-19-business-interruption-loan-scheme/podcast',
    title: 'Podcast',
    withSidebar: false,
    props: {
      pageId: 'PodcastPage',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'About Us',
          url: '/about-us/about-cynergy-bank',
        },
      ],
      parentField: 'About Us',
    },
    bannerBgImageSizeOverride: 'auto 100%',
  }),

  createDrupalPageTemplatePage({
    path: '/template/test',
    title: 'testTemplate',
    withSidebar: true,
    props: {
      pageId: 'TestTemplate',
      parentBreadcrumb: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'template',
          url: '#',
        },
        {
          label: 'test',
          url: '#',
        },
      ],
      parentField: '',
    },
  }),
];

export default exportRoute;
