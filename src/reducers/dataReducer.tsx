import * as types from '../constants/actionTypes';

const defaultState = {
  db: {},
  headerMenus: {},
  drupalPageTemplate: {},
};

const exportReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case types.LOAD_HOME_CONTENT_DATA:
      return {
        ...state,
        homeContent: action.data,
      };
    case types.LOAD_HOME_BANNER_DATA:
      return {
        ...state,
        homeBanner: action.data,
      };
    case types.LOAD_HOME_FIELD_QUICK_LINKS_DATA:
      return {
        ...state,
        homeFieldQuickLinks: action.data,
      };
    case types.LOAD_HOME_OUR_CUSTOMER_PROMISES_DATA:
      return {
        ...state,
        homeOurCustomerPromises: action.data,
      };
    case types.LOAD_HOME_TRUSTED_PROVIDER_DATA:
      return {
        ...state,
        homeTrustedProvider: action.data,
      };
    case types.LOAD_NEWS_ARTICLES_CONTENT_DATA:
      return {
        ...state,
        newsArticlesContent: action.data,
      };
    case types.LOAD_NEWS_ARTICLES_BANNER_DATA:
      return {
        ...state,
        newsArticlesBanner: action.data,
      };
    case types.LOAD_NEWS_CATEGORIES_DATA:
      return {
        ...state,
        newsCategories: action.data,
      };
    case types.LOAD_NEWS_ARTICLES_LIST_DATA:
      return {
        ...state,
        newsArticlesList: action.data,
      };

    case types.LOAD_BRIDGING_FINANCE_CONTENT_DATA:
      return {
        ...state,
        bridgingFinanceContent: action.data,
      };
    case types.LOAD_MEET_THE_TEAM_CONTENT_DATA:
      return {
        ...state,
        meetTheTeamContent: action.data,
      };
    case types.LOAD_PROPERTY_FINANCE_MEET_TEAM_DATA:
      return {
        ...state,
        meetTheTeamContent: action.data,
      };
    case types.LOAD_PROPERTY_FINANCE_MEET_TEAM_BANNER_DATA:
      return {
        ...state,
        meetTheTeamBanner: action.data,
      };
    case types.LOAD_PROPERTY_FINANCE_MEET_TEAM_TEAMS_DATA:
      return {
        ...state,
        meetTheTeamTeams: action.data,
      };
    case types.LOAD_PROPERTY_FINANCE_MEET_TEAM_CUSTOMER_FEEDBACK:
      return {
        ...state,
        meetTheTeamCustomerFeedback: action.data,
      };
    case types.LOAD_PERSONAL_SAVINGS_ONLINE_ISA_CONTENT_DATA:
      return {
        ...state,
        personalSavingsOnlineISAContent: action.data,
      };
    case types.LOAD_DOCUMENT_LIBRARY_DATA:
      return {
        ...state,
        documentLibraryContent: action.data,
      };
    case types.LOAD_BUSINESS_RELATIONSHIP_MANAGER_CONTENT_DATA:
      return {
        ...state,
        businessRelationshipManagerContent: action.data,
      };
    case types.LOAD_ARTICLE_DETAIL_CONTENT_DATA:
      return {
        ...state,
        articleDetailContent: action.data,
      };
    case types.LOAD_FAQ_INDIVIDUAL_CONTENT_DATA:
      return {
        ...state,
        faqIndividualContent: action.data,
      };

    case types.LOAD_BUSINESS_CURRENT_ACCOUNT_DATA:
      return {
        ...state,
        businessCurrentAccountContent: action.data,
      };
    case types.LOAD_BUSINESS_BANNER_DATA:
      return {
        ...state,
        businessCurrentAccountBanner: action.data,
      };
    case types.LOAD_BUSINESS_HIGHLIGHTED_DATA:
      return {
        ...state,
        businessCurrentAccountHighlightedData: action.data,
      };
    case types.LOAD_BUSINESS_HIGHLIGHTED_CARDS:
      return {
        ...state,
        businessCurrentAccountHighlightedCards: action.data,
      };
    case types.LOAD_BUSINESS_CA_COMPARE_ACCOUNTS_DATA:
      return {
        ...state,
        businessCACompareAccounts: action.data,
      };
    case types.LOAD_BUSINESS_CA_BENEFITS_DATA:
      return {
        ...state,
        businessCABenefits: action.data,
      };
    case types.LOAD_BUSINESS_CA_TRUSTED_PROVIDER_DATA:
      return {
        ...state,
        businessCATrustedProvider: action.data,
      };
    case types.LOAD_PERSONAL_CURRENT_ACCOUNT_DATA:
      return {
        ...state,
        personalCurrentAccountContent: action.data,
      };
    case types.LOAD_PERSONAL_BANNER_DATA:
      return {
        ...state,
        personalCurrentAccountBanner: action.data,
      };
    case types.LOAD_PERSONAL_CURRENT_ACCOUNT_PREMIUM_EUROS_DATA:
      return {
        ...state,
        currentAccountsContent: action.data,
      };
    case types.LOAD_PERSONAL_HIGHLIGHTED_DATA:
      return {
        ...state,
        personalCurrentAccountHighlightedData: action.data,
      };
    case types.LOAD_PERSONAL_HIGHLIGHTED_CARDS:
      return {
        ...state,
        personalCurrentAccountHighlightedCards: action.data,
      };
    case types.LOAD_PERSONAL_CA_COMPARE_ACCOUNTS_DATA:
      return {
        ...state,
        personalCACompareAccounts: action.data,
      };
    case types.LOAD_PERSONAL_CA_BENEFITS_DATA:
      return {
        ...state,
        personalCABenefits: action.data,
      };
    case types.LOAD_CUSTOMER_SUPPORT_CONTACT_US_CONTENT_DATA:
      return {
        ...state,
        customerSupportContactUsContent: action.data,
      };  
    case types.LOAD_CONTACT_FORM_DATA:
      return {
        ...state,
        contactFormContent:action.data
      }
    case types.LOAD_PERSONAL_CA_TRUSTED_PROVIDER_DATA:
      return {
        ...state,
        personalCATrustedProvider: action.data,
      };
    case types.LOAD_PERSONAL_SAVING_ACCOUNT_DATA:
      return {
        ...state,
        personalSavingAccountContent: action.data,
      };
    case types.LOAD_PERSONAL_SAVING_BANNER_DATA:
      return {
        ...state,
        personalSavingAccountBanner: action.data,
      };
    case types.LOAD_PERSONAL_SA_COMPARE_ACCOUNTS:
      return {
        ...state,
        personalSACompareAccounts: action.data,
      };
    case types.LOAD_PERSONAL_SA_ADD_AWARENESS:
      return {
        ...state,
        adsAwareness: action.data,
      };

    case types.LOAD_CURRENT_ACCOUNTS_CONTENT_DATA:
      return {
        ...state,
        currentAccountsContent: action.data,
      };
    case types.LOAD_CURRENT_ACCOUNTS_BANNER_DATA:
      return {
        ...state,
        currentAccountsBanner: action.data,
      };
    case types.LOAD_CURRENT_ACCOUNTS_HEADER_LINKS_DATA:
      return {
        ...state,
        currentAccountsHeaderLinks: action.data,
      };
    case types.LOAD_CURRENT_ACCOUNTS_FIELD_COMPONENTS_DATA:
      return {
        ...state,
        currentAccountsFieldComponents: action.data,
      };
    case types.LOAD_CURRENT_ACCOUNTS_FAQS_DATA:
      return {
        ...state,
        currentAccountsFAQs: action.data,
      };
    case types.LOAD_ABOUT_US_CONTENT_DATA:
      return {
        ...state,
        aboutUsContent: action.data,
      };
    case types.LOAD_ABOUT_US_BANNER_DATA:
      return {
        ...state,
        aboutUsBanner: action.data,
      };
    case types.LOAD_ABOUT_US_FIELD_COMPONENTS_DATA:
      return {
        ...state,
        aboutUsFieldComponents: action.data,
      };
    case types.LOAD_ABOUT_US_FAQS_DATA:
      return {
        ...state,
        aboutUsFaqs: action.data,
      };
    case types.LOAD_ABOUT_US_ETHICS_VALUES_CONTENT_DATA:
      return {
        ...state,
        aboutUsEthicsValuesContent: action.data,
      };
    case types.LOAD_ERROR_404_CONTENT_DATA:
      return {
        ...state,
        error404Content: action.data,
      };
    case types.LOAD_MORTGAGE_CALCULATOR_CONTENT_DATA:
      return {
        ...state,
        mortgageCalculatorContent: action.data,
      };

    case types.LOAD_CUSTOMER_SUPPORT_FAQS_CONTENT_DATA:
      return {
        ...state,
        customerSupportFAQsContent: action.data,
      };
    case types.LOAD_PRIVATE_BANKING_CONTENT_DATA:
      return {
        ...state,
        privateBankingContent: action.data,
      };
    case types.LOAD_PRIVATE_BANKING_BECOME_A_CLIENT_DATA:
      return {
        ...state,
        privateBankingBecomeAClient: action.data,
      };
    case types.LOAD_PRIVATE_BANKING_THANKS_NOTE_DATA:
      return {
        ...state,
        privateBankingThanksNote: action.data,
      };
    case types.LOAD_PRIVATE_BANKING_BORROWING_CONTENT_DATA:
      return {
        ...state,
        privateBankingBorrowingContent: action.data,
      };
    case types.LOAD_FEE_AND_RATES_DATA:
      return {
        ...state,
        feeAndRatesContent: action.data,
      };
    case types.LOAD_LOAN_COMPLETION_DATA:
      return {
        ...state,
        loanCompletionContent: action.data,
      };
    case types.LOAD_LOAN_COMPLETION_BANNER:
      return {
        ...state,
        loanCompletionBanner: action.data,
      };
    case types.LOAD_DEAL_SHEET_DATA:
      return {
        ...state,
        dealSheetData:action.data
      }
    case types.LOAD_DEAL_SHEET_CONTENT:
      return {
        ...state,
        dealContent: action.data,
      };
    case types.LOAD_DEAL_SHEET_BANNER:
      return {
        ...state,
        dealBanner: action.data,
      };
    case types.LOAD_HEADER_MENU_DATA:
      return {
        ...state,
        headerMenus: {
          ...state.headerMenus,
          [action.parentField]: action.data,
        },
      };
    case types.LOAD_FOOTER_DATA:
      return {
        ...state,
        footer: action.data,
      };
    case types.LOAD_DRUPAL_PAGE_TEMPLATE_DATA:
      return {
        ...state,
        drupalPageTemplate: {
          ...state.drupalPageTemplate,
          [action.pageId]: action.data,
        },
      };
    case types.LOAD_SECURITY_CONTENT_DATA:
      return {
        ...state,
        securitiesContent: action.data,
      };
    case types.LOAD_SECURITY_CATEGORIES_DATA:
      return {
        ...state,
        securityCategories: action.data,
      };
    default:
      return state;
  }
};

export default exportReducer;
