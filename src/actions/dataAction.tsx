import { Dispatch } from 'redux';
import * as types from '../constants/actionTypes';
import dataSvc from '../services/dataSvc';
import { CategoryModel } from '../model/category.model';
import { CommonDataModel } from '../model/common-data.model';

// loads Home Content Data
export function loadHomeContentData(data: CommonDataModel) {
  return { type: types.LOAD_HOME_CONTENT_DATA, data };
}

// loads Home Banner Data
export function loadHomeBannerData(data: any) {
  return { type: types.LOAD_HOME_BANNER_DATA, data };
}

export function loadCustomerSupportDocumentLibaryData(data: any) {
  return { type: types.LOAD_DOCUMENT_LIBRARY_DATA, data };
}

// loads Home Field Quick Links Data
export function loadHomeFieldQuickLinksData(data: any) {
  return { type: types.LOAD_HOME_FIELD_QUICK_LINKS_DATA, data };
}

export function loadCustomerSupportContactUsContent(data: any) {
  return {type:types.LOAD_CUSTOMER_SUPPORT_CONTACT_US_CONTENT_DATA,data}
}

// loads Home Our Customer Promises Data
export function loadHomeOurCustomerPromisesData(data: any) {
  return { type: types.LOAD_HOME_OUR_CUSTOMER_PROMISES_DATA, data };
}

// loads Home Trusted Provider Data
export function loadHomeTrustedProviderData(data: any) {
  return { type: types.LOAD_HOME_TRUSTED_PROVIDER_DATA, data };
}

// loads News Articles Content Data
export function loadNewsArticlesContentData(data: CommonDataModel) {
  return { type: types.LOAD_NEWS_ARTICLES_CONTENT_DATA, data };
}

// loads News Articles Banner Data
export function loadNewsArticlesBannerData(data: any) {
  return { type: types.LOAD_NEWS_ARTICLES_BANNER_DATA, data };
}

// loads News Categories Data
export function loadNewsCategoriesData(data: CategoryModel[]) {
  return { type: types.LOAD_NEWS_CATEGORIES_DATA, data };
}

// loads News Articles List Data
export function loadNewsArticlesListData(data: CommonDataModel) {
  return { type: types.LOAD_NEWS_ARTICLES_LIST_DATA, data };
}

// loads Bridging Finance Content Data
export function loadBridgingFinanceContentData(data: CommonDataModel) {
  return { type: types.LOAD_BRIDGING_FINANCE_CONTENT_DATA, data };
}

// loads Meet The Team Content Data
export function loadMeetTheTeamContentData(data: CommonDataModel) {
  return { type: types.LOAD_MEET_THE_TEAM_CONTENT_DATA, data };
}

// loads Personal Savings Online ISA Content Data
export function loadPersonalSavingsOnlineISAContentData(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_SAVINGS_ONLINE_ISA_CONTENT_DATA, data };
}

// loads Business Relationship Manager Content Data
export function loadBusinessRelationshipManagerContentData(
  data: CommonDataModel,
) {
  return { type: types.LOAD_BUSINESS_RELATIONSHIP_MANAGER_CONTENT_DATA, data };
}

// loads Article Detail Content Data
export function loadArticleDetailContentData(data: CommonDataModel) {
  return { type: types.LOAD_ARTICLE_DETAIL_CONTENT_DATA, data };
}

// loads FAQ Individual Content Data
export function loadFAQIndividualContentData(data: CommonDataModel) {
  return { type: types.LOAD_FAQ_INDIVIDUAL_CONTENT_DATA, data };
}

// loads Property Finance Meet The Team Data
export function loadPropertyFinanceMeetTheTeamData(data: CommonDataModel) {
  return { type: types.LOAD_PROPERTY_FINANCE_MEET_TEAM_DATA, data };
}

// loads Property Finance Meet The Team Teams Data
export function loadPropertyFinanceMeetTheTeamTeamsData(data: CommonDataModel) {
  return { type: types.LOAD_PROPERTY_FINANCE_MEET_TEAM_TEAMS_DATA, data };
}

// loads Property Finance Meet The Team Banner Data
export function loadPropertyFinanceTeamBanner(data: CommonDataModel) {
  return { type: types.LOAD_PROPERTY_FINANCE_MEET_TEAM_BANNER_DATA, data };
}

// loads Property Finance Meet The Team Customer Feedback Data
export function loadPropertyFinanceTeamCustomerFeedback(data: CommonDataModel) {
  return { type: types.LOAD_PROPERTY_FINANCE_MEET_TEAM_CUSTOMER_FEEDBACK, data };
}

// loads Business Current Account Data
export function loadBusinessCurrentAccount(data: CommonDataModel) {
  return { type: types.LOAD_BUSINESS_CURRENT_ACCOUNT_DATA, data };
}

// loads Business Current Account Data
export function loadBusinessBannerData(data: CommonDataModel) {
  return { type: types.LOAD_BUSINESS_BANNER_DATA, data };
}

// loads Business Current Account Data
export function loadBusinessCurrentAccountHighlightedSection(
  data: CommonDataModel,
) {
  return { type: types.LOAD_BUSINESS_HIGHLIGHTED_DATA, data };
}

// loads Business Current Account Highlighted Data
export function loadBusinessCurrentAccountHighlightedCards(
  data: CommonDataModel,
) {
  return { type: types.LOAD_BUSINESS_HIGHLIGHTED_CARDS, data };
}

// loads Business Current Account Compare Account Data
export function loadBusinessCACompareAccounts(data: CommonDataModel) {
  return { type: types.LOAD_BUSINESS_CA_COMPARE_ACCOUNTS_DATA, data };
}

// loads Business Current Account Benefits Data
export function loadBusinessCABenefits(data: CommonDataModel) {
  return { type: types.LOAD_BUSINESS_CA_BENEFITS_DATA, data };
}

// loads Business Current Account Trusted Provider Data
export function loadBusinessCATrustedProvider(data: CommonDataModel) {
  return { type: types.LOAD_BUSINESS_CA_TRUSTED_PROVIDER_DATA, data };
}

// loads Business Current Account Data
export function loadPersonalCurrentAccount(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_CURRENT_ACCOUNT_DATA, data };
}

// loads Business Current Account Data
export function loadPersonalBannerData(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_BANNER_DATA, data };
}
// loads Business Current Account Data
export function loadPersonalCurrentAccountPremiumEuroData(
  data: CommonDataModel,
) {
  return { type: types.LOAD_PERSONAL_CURRENT_ACCOUNT_PREMIUM_EUROS_DATA, data };
}

// loads Business Current Account Data
export function loadPersonalCurrentAccountHighlightedSection(
  data: CommonDataModel,
) {
  return { type: types.LOAD_PERSONAL_HIGHLIGHTED_DATA, data };
}

// loads Business Current Account Highlighted Data
export function loadPersonalCurrentAccountHighlightedCards(
  data: CommonDataModel,
) {
  return { type: types.LOAD_PERSONAL_HIGHLIGHTED_CARDS, data };
}

// loads Business Current Account Compare Account Data
export function loadPersonalCACompareAccounts(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_CA_COMPARE_ACCOUNTS_DATA, data };
}

// loads Business Current Account Benefits Data
export function loadPersonalCABenefits(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_CA_BENEFITS_DATA, data };
}

// loads Business Current Account Trusted Provider Data
export function loadPersonalCATrustedProvider(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_CA_TRUSTED_PROVIDER_DATA, data };
}

// loads Personal savings Account Content
export function loadPersonalSavingAccountContentData(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_SAVING_ACCOUNT_DATA, data };
}

// loads Personal Savings Account Banner
export function loadPersonalSavingAccountBanner(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_SAVING_BANNER_DATA, data };
}

// loads Personal Savings Account Compare Account
export function loadPersonalSACompareAccounts(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_SA_COMPARE_ACCOUNTS, data };
}

// loads Personal Savings Account Ads Awareness
export function loadAdsAwareness(data: CommonDataModel) {
  return { type: types.LOAD_PERSONAL_SA_ADD_AWARENESS, data };
}

// loads CurrentAccounts Content Data
export function loadCurrentAccountsContentData(data: CommonDataModel) {
  return { type: types.LOAD_CURRENT_ACCOUNTS_CONTENT_DATA, data };
}

// loads CurrentAccounts Banner Data
export function loadCurrentAccountsBannerData(data: any) {
  return { type: types.LOAD_CURRENT_ACCOUNTS_BANNER_DATA, data };
}

// loads CurrentAccounts Header Links Data
export function loadCurrentAccountsHeaderLinksData(data: any) {
  return { type: types.LOAD_CURRENT_ACCOUNTS_HEADER_LINKS_DATA, data };
}

// loads CurrentAccounts Field Components Data
export function loadCurrentAccountsFieldComponentsData(data: any) {
  return { type: types.LOAD_CURRENT_ACCOUNTS_FIELD_COMPONENTS_DATA, data };
}

// loads CurrentAccounts Customer Interest Links Data
export function loadCurrentAccountsCustomerInterestLinksData(data: any) {
  return {
    type: types.LOAD_CURRENT_ACCOUNTS_CUSTOMER_INTEREST_LINKS_DATA,
    data,
  };
}

// loads CurrentAccounts FAQs Data
export function loadCurrentAccountsFAQsData(data: any) {
  return {
    type: types.LOAD_CURRENT_ACCOUNTS_FAQS_DATA,
    data,
  };
}

// loads AboutUs Content Data
export function loadAboutUsContentData(data: CommonDataModel) {
  return { type: types.LOAD_ABOUT_US_CONTENT_DATA, data };
}

// loads AboutUs Banner Data
export function loadAboutUsBannerData(data: any) {
  return { type: types.LOAD_ABOUT_US_BANNER_DATA, data };
}

// loads AboutUs Field Components Data
export function loadAboutUsFieldComponentsData(data: any) {
  return { type: types.LOAD_ABOUT_US_FIELD_COMPONENTS_DATA, data };
}

// loads AboutUs FAQs Data
export function loadAboutUsFaqsData(data: any) {
  return { type: types.LOAD_ABOUT_US_FAQS_DATA, data };
}

// loads AboutUs Ethics Values Content Data
export function loadAboutUsEthicsValuesContentData(data: CommonDataModel) {
  return { type: types.LOAD_ABOUT_US_ETHICS_VALUES_CONTENT_DATA, data };
}

// loads Error 404 Content Data
export function loadError404ContentData(data: any) {
  return { type: types.LOAD_ERROR_404_CONTENT_DATA, data };
}

// loads Mortgage Calculator Content Data
export function loadMortgageCalculatorContentData(data: any) {
  return { type: types.LOAD_MORTGAGE_CALCULATOR_CONTENT_DATA, data };
}

// loads Customer Support FAQs Content Data
export function loadCustomerSupportFAQsContentData(data: any) {
  return { type: types.LOAD_CUSTOMER_SUPPORT_FAQS_CONTENT_DATA, data };
}

// loads Private Banking Content Data
export function loadPrivateBankingContentData(data: any) {
  return { type: types.LOAD_PRIVATE_BANKING_CONTENT_DATA, data };
}

// loads Become a client modal in Private Banking Data
export function loadPrivateBankingBecomeAClientData(data: any) {
  return { type: types.LOAD_PRIVATE_BANKING_BECOME_A_CLIENT_DATA, data };
}

// loads Thanks note modal in Private Banking Data
export function loadPrivateBankingThanksNoteData(data: any) {
  return { type: types.LOAD_PRIVATE_BANKING_THANKS_NOTE_DATA, data };
}

// loads Private Banking Borrowing Content Data
export function loadPrivateBankingBorrowingContentData(data: any) {
  return { type: types.LOAD_PRIVATE_BANKING_BORROWING_CONTENT_DATA, data };
}

// loads Private Banking Borrowing Content Data
export function loadFeeAndRatesContentData(data: any) {
  return { type: types.LOAD_FEE_AND_RATES_DATA, data };
}

// loads Security Content Data
export function loadSecurityContentData(data: any) {
  return { type: types.LOAD_SECURITY_CONTENT_DATA, data };
}

// loads Security Categories Data
export function loadSecurityCategoriesData(data: any) {
  return { type: types.LOAD_SECURITY_CATEGORIES_DATA, data };
}

// loads Contact Form Data
export function loadContactFormData(data: any) {
  return { type: types.LOAD_CONTACT_FORM_DATA, data };
}

// loads Deal Sheet Banner Data
export function loadDealSheetBanner(data: any) {
  return { type: types.LOAD_DEAL_SHEET_BANNER, data };
}

// loads Deal Sheet Content Data
export function loadDealSheetContent(data: any) {
  return { type: types.LOAD_DEAL_SHEET_CONTENT, data };
}

// loads Header Menu Data
export function loadLoanCompletionContentData(data: CommonDataModel) {
  return { type: types.LOAD_LOAN_COMPLETION_DATA, data};
}

// loads Header Menu Data
export function loadLoanCompletionBannerData(data: CommonDataModel) {
  return { type: types.LOAD_LOAN_COMPLETION_BANNER, data};
}

export function loadDealSheetListData(data: CommonDataModel) {
  return {type:types.LOAD_DEAL_SHEET_DATA,data}
}

// loads Header Menu Data
export function loadHeaderMenuData(data: CommonDataModel, parentField: string) {
  return { type: types.LOAD_HEADER_MENU_DATA, data, parentField };
}

// loads Footer Data
export function loadFooterData(data: CommonDataModel) {
  return { type: types.LOAD_FOOTER_DATA, data };
}

export function loadDrupalPageTemplateData(
  data: CommonDataModel,
  pageId: PageTemplateId,
) {
  return { type: types.LOAD_DRUPAL_PAGE_TEMPLATE_DATA, data, pageId };
}

// get Home Content data
export function getHomeContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHomeContentData()
      .then((data) => {
        // load data
        dispatch(loadHomeContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Home Banner data
export function getHomeBannerData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHomeBannerData(id)
      .then((data) => {
        // load data
        dispatch(loadHomeBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Home Field Quick Links data
export function getHomeFieldQuickLinksData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHomeFieldQuickLinksData(id)
      .then((data) => {
        // load data
        dispatch(loadHomeFieldQuickLinksData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Home Our Customer Promises data
export function getHomeOurCustomerPromisesData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHomeOurCustomerPromisesData(id)
      .then((data) => {
        // load data
        dispatch(loadHomeOurCustomerPromisesData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Home Trusted Provider data
export function getHomeTrustedProviderData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHomeTrustedProviderData(id)
      .then((data) => {
        // load data
        dispatch(loadHomeTrustedProviderData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get News Articles Content data
export function getNewsArticlesContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getNewsArticlesContentData()
      .then((data) => {
        // load data
        dispatch(loadNewsArticlesContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get News Articles Banner data
export function getNewsArticlesBannerData(uuid: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getNewsArticlesBannerData(uuid)
      .then((data) => {
        // load data
        dispatch(loadNewsArticlesBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getCustomerSupportDocumentLibraryContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCustomerSupportDocumentLibraryContentData()
      .then((data) => {
        // load data
        dispatch(loadCustomerSupportDocumentLibaryData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}


// get News Categories data
export function getNewsCategoriesData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getNewsCategoriesData()
      .then((data) => {
        // load data
        dispatch(loadNewsCategoriesData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get News Articles List data
export function getNewsArticlesListData(uuid: string, nextPath?: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getNewsArticlesListData(uuid, nextPath)
      .then((data) => {
        // load data
        dispatch(loadNewsArticlesListData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Bridging Finance Content data
export function getBridgingFinanceContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getBridgingFinanceContentData()
      .then((data) => {
        // load data
        dispatch(loadBridgingFinanceContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getCustomerSupportContactUsContentData() {
  return function func(dispatch: Dispatch) {
    dataSvc.getCustomerSupportContactUsContentData()
      .then((data) => {
      dispatch(loadCustomerSupportContactUsContent(data))
      })
      .catch((error) => {
        throw error;
      });
  }
}

// get Home Content data
export function getLoanCompletionContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getLoanCompletionContentData()
      .then((data) => {
        // load data
        dispatch(loadLoanCompletionContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Home Banner data
export function getLoanCompletionBannerData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getLoanCompletionBannerData(id)
      .then((data) => {
        // load data
        dispatch(loadLoanCompletionBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getDealSheetListData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getDealSheetListData()
      .then((data) => {
        // load data
        dispatch(loadDealSheetListData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Meet The Team Content data
export function getMeetTheTeamContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMeetTheTeamContentData()
      .then((data) => {
        // load data
        dispatch(loadMeetTheTeamContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Savings Online ISA Content data
export function getPersonalSavingsOnlineISAContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPersonalSavingsOnlineISAContentData()
      .then((data) => {
        // load data
        dispatch(loadPersonalSavingsOnlineISAContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Relationship Manager Content data
export function getBusinessRelationshipManagerContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getBusinessRelationshipManagerContentData()
      .then((data) => {
        // load data
        dispatch(loadBusinessRelationshipManagerContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Article Detail Content data
export function getArticleDetailContentData(uuid: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getArticleDetailContentData(uuid)
      .then((data) => {
        // load data
        dispatch(loadArticleDetailContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get FAQ Individual Content data
export function getFAQIndividualContentData(title: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getFAQIndividualContentData(title)
      .then((data) => {
        // load data
        dispatch(loadFAQIndividualContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Property Finance Meet The Team data
export function getPropertyFinanceMeetTheTeamContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPropertyFinanceMeetTheTeamContentData()
      .then((data) => {
        // load data
        dispatch(loadPropertyFinanceMeetTheTeamData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Property Finance Meet the Team Banner data
export function getPropertyFinanceMeetTheTeamBanner(id: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPropertyFinanceMeetTheTeamBanner(id)
      .then((data) => {
        // load data
        dispatch(loadPropertyFinanceTeamBanner(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Property Finance Meet The Team Teams data
export function getPropertyFinanceMeetTheTeamTeamsData(id: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPropertyFinanceMeetTheTeamTeamsData(id)
      .then((data) => {
        // load data
        dispatch(loadPropertyFinanceMeetTheTeamTeamsData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Property Finance Meet The Team Customer Feedback data
export function getPropertyFinanceMeetTheTeamCustomerFeedback(id: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPropertyFinanceMeetTheTeamCustomerFeedback(id)
      .then((data) => {
        // load data
        dispatch(loadPropertyFinanceTeamCustomerFeedback(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Content data
export function getBusinessCurrentAccountContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getBusinessCurrentAccountContentData()
      .then((data) => {
        // load data
        dispatch(loadBusinessCurrentAccount(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Banner
export function getBusinessCurrentAccountBanner(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Highlighted section data
export function getBusinessCurrentAccountHighlightedSection(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessCurrentAccountHighlightedSection(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Highlighted cards data
export function getBusinessCurrentAccountHighlightedCards(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessCurrentAccountHighlightedCards(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Compare data
export function getBusinessCACompareAccounts(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessCACompareAccounts(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Benefits data
export function getBusinessCABenefits(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessCABenefits(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Business Current Account Trusted Provider data
export function getBusinessCATrustedProvider(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadBusinessCATrustedProvider(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Euros Content data
export function getPersonalCurrentAccountsEurosContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPersonalCurrentAccountsEurosContentData()
      .then((data) => {
        // load data
        dispatch(loadPersonalCurrentAccountPremiumEuroData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Content data
export function getPersonalCurrentAccountContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPersonalCurrentAccountContentData()
      .then((data) => {
        // load data
        dispatch(loadPersonalCurrentAccount(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Banner
export function getPersonalCurrentAccountBanner(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Highlighted section data
export function getPersonalCurrentAccountHighlightedSection(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalCurrentAccountHighlightedSection(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Highlighted cards data
export function getPersonalCurrentAccountHighlightedCards(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalCurrentAccountHighlightedCards(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Compare data
export function getPersonalCACompareAccounts(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalCACompareAccounts(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Benefits data
export function getPersonalCABenefits(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalCABenefits(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Current Account Trusted Provider data
export function getPersonalCATrustedProvider(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalCATrustedProvider(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Savings Account Content data
export function getPersonalSavingAccountContentData(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalSavingAccountContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Savings Account Banner
export function getPersonalSavingAccountBanner(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalSavingAccountBanner(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Savings Account Compare
export function getPersonalSACompareAccounts(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadPersonalSACompareAccounts(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Personal Savings Ads Awareness
export function getAdsAwareness(data: any) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getData(data)
      .then((data) => {
        // load data
        dispatch(loadAdsAwareness(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get CurrentAccounts Content data
export function getBusinessCurrentAccountsContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getBusinessCurrentAccountsContentData()
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get CurrentAccounts Content data
export function getPersonalCurrentAccountsContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPersonalCurrentAccountsContentData()
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get CurrentAccounts Banner data
export function getCurrentAccountsBannerData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCurrentAccountsBannerData(id)
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts Header Links data
export function getCurrentAccountsHeaderLinksData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCurrentAccountsHeaderLinksData(id)
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsHeaderLinksData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts Field Components data
export function getCurrentAccountsFieldComponentsData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCurrentAccountsFieldComponentsData(id)
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsFieldComponentsData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts Customer Interest Links data
export function getCurrentAccountsCustomerInterestLinksData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCurrentAccountsCustomerInterestLinksData(id)
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsCustomerInterestLinksData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts FAQs data
export function getCurrentAccountsFAQsData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCurrentAccountsFAQsData(id)
      .then((data) => {
        // load data
        dispatch(loadCurrentAccountsFAQsData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get CurrentAccounts Content data
export function getAboutUsContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAboutUsContentData()
      .then((data) => {
        // load data
        dispatch(loadAboutUsContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get AboutUs Banner data
export function getAboutUsBannerData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAboutUsBannerData(id)
      .then((data) => {
        // load data
        dispatch(loadAboutUsBannerData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts Field Components data
export function getAboutUsFieldComponentsData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAboutUsFieldComponentsData(id)
      .then((data) => {
        // load data
        dispatch(loadAboutUsFieldComponentsData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Current Accounts FAQs data
export function getAboutUsFaqsData(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAboutUsFaqsData(id)
      .then((data) => {
        // load data
        dispatch(loadAboutUsFaqsData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get CurrentAccounts Ethics Values Content data
export function getAboutUsEthicsValuesContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getAboutUsEthicsValuesContentData()
      .then((data) => {
        // load data
        dispatch(loadAboutUsEthicsValuesContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Error 404 Content data
export function getError404ContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getError404ContentData()
      .then((data) => {
        // load data
        dispatch(loadError404ContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Mortgage Calculator Content data
export function getMortgageCalculatorContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getMortgageCalculatorContentData()
      .then((data) => {
        // load data
        dispatch(loadMortgageCalculatorContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Customer Support FAQs Content data
export function getCustomerSupportFAQsContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getCustomerSupportFAQsContentData()
      .then((data) => {
        // load data
        dispatch(loadCustomerSupportFAQsContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Private Banking Content data
export function getFeeAndRatesContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getFeeAndRatesContentData()
      .then((data) => {
        // load data
        dispatch(loadFeeAndRatesContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Private Banking Content data
export function getPrivateBankingContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPrivateBankingContentData()
      .then((data) => {
        // load data
        dispatch(loadPrivateBankingContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Become a client modal in Private Banking data
export function getPrivateBankingBecomeAClientData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPrivateBankingBecomeAClientData()
      .then((data) => {
        // load data
        dispatch(loadPrivateBankingBecomeAClientData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Thanks note modal in Private Banking data
export function getPrivateBankingThanksNoteData(index: number) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPrivateBankingThanksNoteData(index)
      .then((data) => {
        // load data
        dispatch(loadPrivateBankingThanksNoteData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Private Banking Borrowing Content data
export function getPrivateBankingBorrowingContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getPrivateBankingBorrowingContentData()
      .then((data) => {
        // load data
        dispatch(loadPrivateBankingBorrowingContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Deal Sheet Banner data
export function getDealSheetContent(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getDealSheetContent(id)
      .then((data) => {
        // load data
        dispatch(loadDealSheetContent(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Deal Sheet Banner data
export function getDealSheetBanner(id: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getDealSheetBanner(id)
      .then((data) => {
        // load data
        dispatch(loadDealSheetBanner(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Header Menu data
export function getHeaderMenuData(parentField: string) {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getHeaderMenuData(parentField)
      .then((data) => {
        // load data
        dispatch(loadHeaderMenuData(data, parentField));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// get Footer data
export function getFooterData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getFooterData()
      .then((data) => {
        // load data
        dispatch(loadFooterData(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getDupalPageTemplateData(pageId: PageTemplateId) {
  return function func(dispatch: Dispatch) {
    dataSvc
      .getDupalPageTemplateData(pageId)
      .then((data) => {
        // load data
        dispatch(loadDrupalPageTemplateData(data, pageId));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getSecuritiesContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getSecuritiesContentData()
      .then((data) => {
        // load data
        dispatch(loadSecurityContentData(data));
      })
      .catch((error) => {
        throw error;
      });
  }
}

export function getSecurityCategoriesData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getSecurityCategoriesData()
      .then((data) => {
        // load data
        dispatch(loadSecurityCategoriesData(data));
      })
      .catch((error) => {
        throw error;
      });
  }
}

export function getContactFormContentData() {
  return function func(dispatch: Dispatch) {
    // fetches remote data
    dataSvc
      .getContactFormContentData()
      .then((data) => {
        // load data
        dispatch(loadContactFormData(data));
      })
      .catch((error) => {
        throw error;
      });
  }
}

const exportItem = {
  getHomeContentData,
  getHomeBannerData,
  getHomeFieldQuickLinksData,
  getHomeOurCustomerPromisesData,
  getHomeTrustedProviderData,
  getNewsArticlesContentData,
  getNewsArticlesBannerData,
  getNewsCategoriesData,
  getNewsArticlesListData,

  getBridgingFinanceContentData,
  getMeetTheTeamContentData,
  getPersonalSavingsOnlineISAContentData,

  getBusinessRelationshipManagerContentData,
  getArticleDetailContentData,
  getFAQIndividualContentData,

  getBusinessCurrentAccountContentData,
  getBusinessCurrentAccountBanner,
  getBusinessCurrentAccountHighlightedSection,
  getBusinessCurrentAccountHighlightedCards,
  getBusinessCACompareAccounts,
  getBusinessCABenefits,
  getBusinessCATrustedProvider,
  getPersonalCurrentAccountContentData,
  getPersonalCurrentAccountBanner,
  getPersonalCurrentAccountHighlightedSection,
  getPersonalCurrentAccountHighlightedCards,
  getPersonalCurrentAccountsEurosContentData,
  getPersonalCACompareAccounts,
  getPersonalCABenefits,
  getPersonalCATrustedProvider,
  getPersonalSavingAccountContentData,
  getPersonalSavingAccountBanner,
  getPersonalSACompareAccounts,
  getAdsAwareness,

  getCustomerSupportDocumentLibraryContentData,
  getBusinessCurrentAccountsContentData,
  getPersonalCurrentAccountsContentData,
  getCurrentAccountsBannerData,
  getCurrentAccountsHeaderLinksData,
  getCurrentAccountsFieldComponentsData,
  getCurrentAccountsCustomerInterestLinksData,
  getCurrentAccountsFAQsData,
  getAboutUsContentData,
  getAboutUsBannerData,
  getAboutUsFieldComponentsData,
  getAboutUsFaqsData,
  getAboutUsEthicsValuesContentData,

  getError404ContentData,
  getMortgageCalculatorContentData,

  getCustomerSupportFAQsContentData,
  getPrivateBankingContentData,
  getPrivateBankingBecomeAClientData,
  getPrivateBankingThanksNoteData,
  getPrivateBankingBorrowingContentData,
  getFeeAndRatesContentData,

  getHeaderMenuData,
  getFooterData,
  getDupalPageTemplateData,

  getSecuritiesContentData,
  getSecurityCategoriesData,

  getLoanCompletionContentData,
  getLoanCompletionBannerData,
  getDealSheetListData,
  getDealSheetBanner,
  getDealSheetContent,

  getCustomerSupportContactUsContentData,

  getPropertyFinanceMeetTheTeamContentData,
  getPropertyFinanceMeetTheTeamBanner,
  getPropertyFinanceMeetTheTeamTeamsData,
  getPropertyFinanceMeetTheTeamCustomerFeedback,
  getContactFormContentData
};

export default exportItem;
