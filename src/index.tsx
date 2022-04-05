import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import 'accessible-nprogress/dist/accessible-nprogress.min.css';
import { ConfigService } from './services/ConfigService';

fetch('/assets/data/config.json')
  .then(res => res.json())
  .then((config) => {
    const newConfig = {
      ...config,
      DrupalPageTemplateUrl: {
        PersonalLifeEvents: `/jsonapi/node/personal_banking_pages/${config.DataServiceId.PersonalLifeEventsId}?include=field_banner,field_components`,
        ImportantInformation: `/jsonapi/node/basic_page/${config.DataServiceId.ImportantInformationId}?include=field_banner,field_components`,
        BussinessIdentificationRequirements: `/jsonapi/node/business_banking_pages/${config.DataServiceId.BusinessIdentificationRequirementsId}?include=field_banner,field_components`,
        Accessibility: `/jsonapi/node/page/${config.DataServiceId.AccessibilityId}?include=field_banner,field_component`,
        PrivateBankingHowToApplyData: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingHowToApplyId}?include=field_banner,field_components`,
        PrivateBankingIntermediaries: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingIntermediariesId}?include=field_banner,field_components`,
        PrivateBankingIntermediariesWorkingWithUs: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingIntermediariesWorkingWithUsId}?include=field_banner,field_components`,
        PrivateBankingIntermediariesOurProducts: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingIntermediariesOurProductsId}?include=field_banner,field_components`,
        PrivateBankingIntermediariesOurCriteria: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingIntermediariesOurCriteriaId}?include=field_banner,field_components`,
        PrivateBankingIntermediariesDocuments: `/jsonapi/node/private_banking_pages/${config.DataServiceId.PrivateBankingIntermediariesDocumentsId}?include=field_banner,field_components`,
        PropertyBrokersOurApproach: `/jsonapi/node/basic_page/${config.DataServiceId.PropertyBrokersOurApproachId}?include=field_components,field_banner`,
        PropertyBrokersPropertyLending: `/jsonapi/node/page/${config.DataServiceId.PropertyBrokersPropertyLendingId}?include=field_component,field_banner`,
        PropertyBrokersNACFB: `/jsonapi/node/page/${config.DataServiceId.PropertyBrokersNACFBId}?include=field_component,field_banner`,
        OpenBanking: `/jsonapi/node/page/${config.DataServiceId.OpenBankingId}?include=field_banner,field_component`,
        PersonalIdentificationRequirements: `/jsonapi/node/personal_banking_pages/${config.DataServiceId.PersonalBankingIdentificationRequirementsId}?include=field_banner,field_components`,
        PersonalBankingCurrentAccount: `/jsonapi/node/personal_banking_pages/${config.DataServiceId.PersonalBankingCurrentAccountId}?include=field_banner,field_components`,
        AboutCynergyBank: `/jsonapi/node/about_us/${config.DataServiceId.AboutCynergyBankId}?include=field_banner,field_components`,
        AboutCynergyBankOurPartnerships: `/jsonapi/node/about_us/${config.DataServiceId.AboutCynergyBankOurPartnershipsId}?include=field_banner,field_components`,
        PropertyFinanceBusinessLending: `/jsonapi/node/basic_page/${config.DataServiceId.PropertyFinanceBusinessLendingId}?include=field_banner,field_components`,
        BusinessCurrentAccountPage: `/jsonapi/node/business_banking_pages/${config.DataServiceId.BusinessCurrentAccountPageId}?include=field_banner,field_components`,
        SecurityPages: `/jsonapi/node/basic_page/${config.DataServiceId.SecurityPagesId}?include=field_banner,field_components`,
        OnlineBankingPage: `/jsonapi/node/basic_page/${config.DataServiceId.OnlineBankingPageId}?include=field_banner,field_components`,
        PersonalBankingCashISATransferPage: `/jsonapi/node/basic_page/${config.DataServiceId.PersonalBankingCashISATransferId}?include=field_components,field_banner`,
        TestTemplate: `/jsonapi/node/test_content_for_templates/${config.DataServiceId.TestTemplateId}?include=field_components`,
        AboutUsCeoMessagePage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsCeoMessagePageId}?include=field_components,field_banner`,
        AboutUsCovid19Page: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsCovid19PageId}?include=field_components,field_banner`,
        InternationalPage: `/jsonapi/node/basic_page/${config.DataServiceId.InternationalPageId}?include=field_banner,field_components`,
        AboutUsAboutCbilsPage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsAboutCbilsPageId}?include=field_banner,field_components`,
        AboutUsRecoveryLoanSchemePage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsRecoveryLoanSchemePageId}?include=field_banner,field_components`,
        AboutUsOurHistoryPage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsOurHistoryPageId}?include=field_components,field_banner`,
        AboutUsMeetTheBoardPage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsMeetTheBoardPageId}?include=field_components,field_banner`,
        AboutUsEthicsValuesPage: `/jsonapi/node/about_us/${config.DataServiceId.AboutUsEthicsValuesPageId}?include=field_components,field_banner`,
        PodcastWithSavillsPage: `/jsonapi/node/page/${config.DataServiceId.PodcastWithSavillsPageId}?include=field_banner,field_component`,
        PodcastPage: `/jsonapi/node/page/${config.DataServiceId.PodcastPageId}?include=field_banner,field_component`,
      },
    }
    const App = React.lazy(() => import('./App'));
    ConfigService.setConfig(newConfig)
    ReactDOM.render(
      <React.Suspense fallback="Loading...">
        <App />
      </React.Suspense>,
      document.getElementById('root'),
    );
  })