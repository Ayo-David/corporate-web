import axios from 'axios';
import { ConfigService } from './ConfigService';

const {
  CMS_API_URL,
  DataServiceId,
  DrupalPageTemplateUrl,
} = ConfigService.getConfig()

const axiosInstance = axios.create({
  baseURL: CMS_API_URL,
});

// data service
export default class DataSvc {
  // Home page
  static async getHomeContentData() {
    const response =
      await axiosInstance.get(`/jsonapi/node/cw_business_home/${DataServiceId.HomeId}?include=\
                                              field_hero_banner,field_hero_banner.field_banner_image,field_customer_interest_links,field_products,field_customer_promises,field_ads_awareness,field_trusted_provider`);
    return response.data;
  }

  static async getHomeBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/cw_business_home/${id}/field_hero_banner`,
    );

    return response.data;
  }

  static async getHomeFieldQuickLinksData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/customer_interest_links/${id}/field_quick_links`,
    );
    return response.data;
  }

  static async getHomeProductData(id: string) {
    const response = await axiosInstance.get(`/jsonapi/node/product/${id}`);

    return response.data;
  }

  static async getHomeFinanceData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/finance_pages/${id}`,
    );

    return response.data;
  }

  static async getHomeAdsAwarenessData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/ads_and_awareness/${id}`,
    );

    return response.data;
  }

  static async getHomeOurCustomerPromisesData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/cw_business_home/${id}/field_customer_promises`,
    );
    return response.data;
  }

  static async getHomeTrustedProviderData(id: string) {
    const response = await axiosInstance.get(
      `jsonapi/node/trusted_provider/${id}/field_logo_link`,
    );
    return response.data;
  }

  // News and Articles page
  static async getNewsArticlesContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/news_and_articles?include=field_media_image,field_media_image.field_media_image`,
    );
    return response.data;
  }

  static async getNewsArticlesBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/news_and_articles/${id}`,
    );
    return response.data;
  }

  static async getNewsCategoriesData() {
    const response = await axiosInstance.get(`/news-categories`);
    return response.data;
  }

  static async getNewsArticlesListData(uuid: string, nextPath?: string) {
    if (nextPath) {
      const nextResponse = await axiosInstance.get(nextPath);
      return nextResponse.data;
    }

    const response = await axiosInstance.get(`/jsonapi/node/news_and_articles?page[limit]=12&include=field_media_image,field_media_image.field_media_image&filter[field_tag_to.id][value]=${uuid}&sort=-created`);
    return response.data;
  }

  // Bridging Finance page
  static async getBridgingFinanceContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.BridgingFinanceId}?include=field_banner,field_header_links,field_components`,
    );
    return response.data;
  }

  static async getBridgingFinanceBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_banner`,
    );
    return response.data;
  }

  static async getBridgingFinanceLinkIconsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_header_links`,
    );
    return response.data;
  }

// Document Library Page

  static async getCustomerSupportDocumentLibraryContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/document_library_page/${DataServiceId.CustomerSupportDocumentLibrary}?include=field_banner`
    );
    return response.data;
  }

  static async getCustomerSupportDocumentLibraryBanner(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/document_library_page/${id}/field_banner`
    );
    return response.data;
  }

  static async getDocumentLibraryProductsPersonalData() {
    const response = await axiosInstance.get('/doc-products-personal');
    return response.data;
  }

  static async getDocumentLibraryProductsBusinessData() {
    const response = await axiosInstance.get('/doc-products-business');
    return response.data;
  }

  static async getDocumentLibraryCategoryData() {
    const response = await axiosInstance.get('/doc-category-list');
    return response.data;
  }

  static async getDocumentLibraryResultsData(type: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/document_library?include=field_doc_category,field_doc_product&page[offset]=0&page[limit]=50&filter[field_document_type]=${type}`
    );
    return response.data;
  }

  static async getDocumentLibraryFileDownload(id: string) {
    const response = await axiosInstance.get(`/jsonapi/media/document/${id}/field_media_document`);
    return response.data;
  }

  // Meet The Team page
  static async getMeetTheTeamContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${DataServiceId.MeetTheTeamId}?include=field_banner,field_team_members,field_client_feedback`,
    );
    return response.data;
  }

  static async getMeetTheTeamBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${id}/field_banner`,
    );
    return response.data;
  }

  static async getMeetTheTeamTeamsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/teams/${id}/field_members`,
    );
    return response.data;
  }

  static async getMeetTheTeamCustomerFeedbackData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${id}/field_client_feedback`,
    );
    return response.data;
  }

  // Personal Savings Online ISA page
  static async getPersonalSavingsOnlineISAContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.PersonalSavingsOnlineISAId}?include=field_banner,field_header_links,field_components`,
    );
    return response.data;
  }

  static async getPersonalSavingsOnlineISABannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_banner`,
    );
    return response.data;
  }

  static async getPersonalSavingsOnlineISALinkIconsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_header_links`,
    ); // '764a6bb4-62a7-4d1b-8412-97c38a96fcbc'
    return response.data;
  }

  // Business Relationship Manager page
  static async getBusinessRelationshipManagerContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${DataServiceId.BusinessRelationshipManagerId}?include=field_banner,field_team_members,field_client_feedback`,
    );
    return response.data;
  }

  static async getBusinessRelationshipManagerBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${id}/field_banner`,
    );
    return response.data;
  }

  static async getBusinessRelationshipManagerTeamsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/teams/${id}/field_members`,
    );
    return response.data;
  }

  static async getBusinessRelationshipManagerCustomerFeedbackData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/meet_the_team/${id}/field_client_feedback`,
    );
    return response.data;
  }

  // Article Detail page
  static async getArticleDetailContentData(article_uuid: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/news_and_articles/${article_uuid}?include=field_media_image,field_media_image.field_media_image,field_tag_to`,
    );
    return response.data;
  }

  // FAQ Individual page
  static async getFAQIndividualContentData(title: string) {
    // const response = await axiosInstance.get(`/jsonapi/node/corporate_faq/${DataServiceId.FAQIndividualId}?include=field_faqs,field_category,field_related_faqs,field_related_items`);
    const response = await axiosInstance.get(
      `/jsonapi/node/corporate_faq?include=field_faqs,field_category,field_related_faqs,field_related_items&filter[title]=${title}`,
    );
    return response.data;
  }

  static async getFAQIndividualFAQListData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/corporate_faq/${id}/field_faqs`,
    );
    return response.data;
  }

  static async getFAQIndividualRelatedFAQsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/corporate_faq/${id}/field_related_faqs`,
    );
    return response.data;
  }

  static async getFAQIndividualRelatedItemsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/corporate_faq/${id}/field_related_items`,
    );
    return response.data;
  }

  static async getPropertyFinanceMeetTheTeamContentData() {
    const response = await axiosInstance.get(
      `jsonapi/node/meet_the_team/${DataServiceId.PropertyFinanceMeetTheTeamId}?include=field_banner,field_team_members,field_client_feedback`,
    );
    return response.data;
  }

  static async getPropertyFinanceMeetTheTeamBanner(id: string) {
    const response = await axiosInstance.get(
      `jsonapi/node/meet_the_team/${id}/field_banner`,
    );
    return response.data;
  }

  static async getPropertyFinanceMeetTheTeamTeamsData(id: string) {
    const response = await axiosInstance.get(
      `jsonapi/node/teams/${id}/field_members`,
    );
    return response.data;
  }

  static async getPropertyFinanceMeetTheTeamCustomerFeedback(id: string) {
    const response = await axiosInstance.get(
      `jsonapi/node/meet_the_team/${id}/field_client_feedback`,
    );
    return response.data;
  }

  static async getBusinessCurrentAccountContentData() {
    const response = await axiosInstance.get(
      `jsonapi/node/business_current_account/${DataServiceId.BusinessCurrentAccountId}?include=field_compare_accounts,field_components,field_banner,field_highlighted_section,field_trusted_provider`,
    );
    return response.data;
  }

  static async getPersonalCurrentAccountContentData() {
    const response = await axiosInstance.get(
      `jsonapi/node/business_current_account/${DataServiceId.PersonalCurrentAccountId}?include=field_compare_accounts,field_components,field_banner,field_highlighted_section,field_trusted_provider`,
    );
    return response.data;
  }

  static async getBusinessCurrentAccountsContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.BussinessCurrentAccountPremiumId}?include=field_header_links,field_banner,field_components`,
    );
    return response.data;
  }

  static async getPersonalCurrentAccountsContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.PersonalCurrentAccountPremiumId}?include=field_header_links,field_banner,field_components`,
    );
    return response.data;
  }

  static async getPersonalCurrentAccountsEurosContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.PersonalCurrentAccountPremiumEurosId}?include=field_header_links,field_banner`,
    );
    return response.data;
  }

  static async getCurrentAccountsBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_banner`,
    );
    return response.data;
  }

  static async getCurrentAccountsHeaderLinksData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_header_links`,
    );
    return response.data;
  }

  static async getCurrentAccountsFieldComponentsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_components`,
    );
    return response.data;
  }

  static async getCurrentAccountsCustomerInterestLinksData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/customer_interest_links/${id}/field_quick_links`,
    );
    return response.data;
  }

  static async getCurrentAccountsFAQsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/faq_s/${id}/field_faqs`,
    );
    return response.data;
  }

  static async getCurrentAccountsCorporateFAQData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/corporate_faq/${id}/field_faqs`,
    );
    return response.data;
  }

  static async getCurrentAccountsCardsWithLinkTextData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/cards_with_link_text/${id}/field_text_with_link`,
    );
    return response.data;
  }

  static async getCurrentAccountsTrustedProviderData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/trusted_providers/${id}/field_trusted_provider`,
    );
    return response.data;
  }

  static async getCurrentAccountsTrustedProviderLogoData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/trusted_provider/${id}/field_logo_link`,
    );
    return response.data;
  }

  static async getAboutUsContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/about_us_landing/${DataServiceId.AboutUsId}?include=field_banner,field_components,field_cw_faqs`,
    );
    return response.data;
  }

  static async getAboutUsBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/about_us_landing/${id}/field_banner`,
    );
    return response.data;
  }

  static async getAboutUsFieldComponentsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/about_us_landing/${id}/field_components`,
    );
    return response.data;
  }

  static async getAboutUsFaqsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/about_us_landing/${id}/field_cw_faqs`,
    );
    return response.data;
  }
  
  static async getAboutUsEthicsValuesContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/about_us/${DataServiceId.AboutUsEthicsValuesPageId}?include=field_components,field_banner`,
    );
    return response.data;
  }

  // Error 404 page
  static async getError404ContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/page_not_found/${DataServiceId.Error404}`,
    );
    return response.data;
  }

  // Mortgage Calculator page
  static async getMortgageCalculatorContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/mortgage_calculator_page/${DataServiceId.MortgageCalculator}?include=field_components`,
    );
    return response.data;
  }

  // Thanks note
  static async getThanksNoteData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/thanks_note/${DataServiceId.ThanksNote}?include=field_media_image`,
    );
    return response.data;
  }

  static async getContactFormContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/contact_form_data/${DataServiceId.ContactFormId}?include=field_components`
    );
    return response.data;
  }

  static async getCustomerSupportContactUsContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/contact_us/${DataServiceId.CustomerSupportContactUs}?include=field_hero_banner,field_components`
    );
    return response.data;
  }

  static async getCustomerSupportRegionalOffices(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/regional_offices/${id}?include=field_regional_office`
    );
    return response.data;
  }

  static async getCustomerSupportAboutUsBanner(id: string) {
    const response = await axiosInstance.get(`/jsonapi/node/contact_us/${id}/field_hero_banner`);
    return response.data;
  }

  // Customer Support FAQs page
  static async getCustomerSupportFAQsContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${DataServiceId.CustomerSupportFAQs}?include=field_ads_awareness,field_social_media,field_faq_set`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsSetData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_faq_set`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsFieldFAQSetData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/heading_faq/${id}/field_faqset`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsAdsAwarenessData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_ads_awareness`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsServiceStatusData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_service_status`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsFieldServiceStatusData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/services_status/${id}/field_services_status`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsWaysToContactUsData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_ways_to_contact_us`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsMapImageData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_map_image`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsSocialMediaData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/customer_support/${id}/field_social_media`,
    );
    return response.data;
  }

  static async getCustomerSupportFAQsData() {
    const response = await axiosInstance.get(`/jsonapi/node/corporate_faq`);
    return response.data;
  }

  // Private Banking page
  static async getPrivateBankingContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/private_banking_home/${DataServiceId.PrivateBanking}?include=field_banner,field_customer_promises,field_components`,
    );
    return response.data;
  }

  static async getPrivateBankingBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/private_banking_home/${id}/field_banner`,
    );
    return response.data;
  }

  // Fee and Rates page

  // Page Content
  static async getFeeAndRatesContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/rates_page/${DataServiceId.FeeAndRatesId}?include=field_banner,field_rate_details`,
    );
    return response.data;
  }
  // Banner Data
  static async getFeeAndRatesBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/rates_page/${id}/field_banner`,
    );
    return response.data;
  }

  // Interest Rates dropdowns 2 data
  static async getFeeAndRateRateDetailsData() {
    const response = await axiosInstance.get(`/rate-details`);
    return response.data;
  }

  // Foreign Exchange Data
  static async getFeeAndRateForeignExchangeDetailsData() {
    const response = await axiosInstance.get(`/foreign-exchane-rates`);
    return response.data;
  }

  // Main Dropdown Data
  static async getFeeAndRatesDropdownData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/rates_page/${id}/field_rate_details`,
    );
    return response.data;
  }

  // Template Data
  static async getFeeAndRatesRatesTemplateData() {
    const response = await axiosInstance.get(`/rate-details`);
    return response.data;
  }

  // Become a client modal in Private Banking page
  static async getPrivateBankingBecomeAClientData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/become_a_client/${DataServiceId.PrivateBankingBecomeAClient}?include=field_question_options`,
    );
    return response.data;
  }

  // Thanks note modal in Private Banking page
  static async getPrivateBankingThanksNoteData(index: number) {
    const response = await axiosInstance.get(
      `/jsonapi/node/thanks_note/${
        index
          ? DataServiceId.PrivateBankingThanksNoteSuitable
          : DataServiceId.PrivateBankingThanksNoteNotSuitable
      }`,
    );
    return response.data;
  }

  // Private Banking Borrowing page
  static async getPrivateBankingBorrowingContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${DataServiceId.PrivateBankingBorrowing}?include=field_banner,field_header_links,field_components`,
    );
    return response.data;
  }

  static async getPrivateBankingBorrowingBannerData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/product/${id}/field_banner`,
    );
    return response.data;
  }

  // Template Page
  static async getTemplatePageFileListItems(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/title_files_list/${id}/field_files`,
    );
    return response.data;
  }

  static async getTemplatePageMemberListItems(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/title_members/${id}/field_members`,
    );
    return response.data;
  }

  static async getTemplatePageCardListItems(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/title_desc_cards/${id}/field_cards`,
    );
    return response.data;
  }

  static async getTemplatePageFAQItems(id: string) {
    const response = await axiosInstance.get(`/jsonapi/node/corporate_faq/${id}/field_faqs`);
    return response.data;
  }

  static async getTemplatePageAwardAccreditationItems(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/awards_and_accreditations/${id}/field_awards`,
    );
    return response.data;
  }

  static async getTemplatePageAwardAccreditationData(id: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/awards/${id}/?include=field_all_awards`,
    );
    return response.data;
  }

  static async getData(url: string) {
    // Use base url for all CMS requests
    // Uncomment below for local deployments
    // const CMS_HOST_URL = 'cms.dev.cynfusion.net';
    // if (url.startsWith('http')) {
    //   let newUrl = new URL(url);
    //   const baseUrl = new URL(CMS_API_URL);
    //   if (newUrl.hostname === CMS_HOST_URL) {
    //     newUrl.host = baseUrl.host;
    //     newUrl.protocol = baseUrl.protocol;
    //   }
    //   const response = await axiosInstance.get(newUrl.toString());
    //   return response.data;
    // }
    const response = await axiosInstance.get(url);
    return response.data;
  }

  static async getLoanCompletionContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/loan_completion/${DataServiceId.LoanCompletionId}?include=field_hero_banner,field_components`,
    );
    return response.data;
  }

  static async getLoanCompletionBannerData(id:string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/loan_completion/${id}/field_hero_banner`,
    );
    return response.data;
  }

  static async getDealSheetListData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/deal_sheet`,
    );
    return response.data;
  }

  static async getDealSheetThumbnail(id:string) {
    const response = await axiosInstance.get(
      `/jsonapi/media/banner_image/${id}/field_media_image`,
    );
    return response.data;
  }

  static async getDealSheetContent(uuid: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/deal_sheet/${uuid}?include=field_banner_image,field_components,field_related_case_studies`,
    );
    return response.data;
  }

  static async getDealSheetBanner(id: string) {
      const response = await axiosInstance.get(`/jsonapi/node/deal_sheet/${id}/field_banner_image`,)
      return response.data;
  }

  static async getHeaderMenuData(parentField: string) {
    const response = await axiosInstance.get(
      `/jsonapi/node/dynamic_menu?filter[field_parent]=` + parentField,
    );
    return response.data;
  }

  static async getFooterData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/footer/${DataServiceId.FooterId}?include=field_footer_menu,field_trusted_providers`,
    );
    return response.data;
  }

  static async getDupalPageTemplateData(pageId: PageTemplateId) {
    const url = DrupalPageTemplateUrl[String(pageId)];
    const response = await axiosInstance.get(url);
    return response.data;
  }

  static async getImage(imageId?: string) {
    const response = await axiosInstance.get(
      `/jsonapi/media/image/${imageId}/field_media_image`,
    );

    return response.data;
  }

  static async getImageVideo(imageId?: string) {
    const response = await axiosInstance.get(
      `/jsonapi/media/video/${imageId}/field_media_video_file`,
    );

    return response.data;
  }

  static async getImageBanner(imageId?: string) {
    const response = await axiosInstance.get(
      `/jsonapi/paragraph/banner/${imageId}/field_banner_image`,
    );

    return response.data;
  }

  static async getImageWithLongText(imageId?: string) {
    const response = await axiosInstance.get(
      `jsonapi/paragraph/image_with_long_text/${imageId}/field_images`,
    );

    return response.data;
  }

  static async getImageEligibilityCriteria(imageId?: string) {
    const response = await axiosInstance.get(
      `jsonapi/paragraph/eligibility_criteria/${imageId}/field_image2`,
    );

    return response.data;
  }

  static async getImage3(imageId?: string) {
    const response = await axiosInstance.get(
      `jsonapi/paragraph/card_with_image_link/${imageId}/field_image3`,
    );

    return response.data;
  }

  static async getImageDescriptionWithFaq(imageId?: string, field?: string) {
    const response = await axiosInstance.get(
      `jsonapi/paragraph/image_description_with_faq/${imageId}/${field}`,
    );

    return response.data;
  }

  // Security Landing Page
  static async getSecuritiesContentData() {
    const response = await axiosInstance.get(
      `/jsonapi/node/basic_page/${DataServiceId.SecurityId}?include=field_banner,field_components,field_components.field_security_category`,
    );
    return response.data;
  }

  static async getSecurityCategoriesData() {
    const response = await axiosInstance.get(
      '/jsonapi/taxonomy_term/security_category',
    );
    return response.data;
  }

  static async getReferencedPageData(data: {type: string, id: string}) {
    const url = ['', 'jsonapi', ...data.type.split('--'), data.id].join('/');
    const response = await axiosInstance.get(url);
    return response.data;
  }
}
