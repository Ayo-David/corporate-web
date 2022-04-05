declare namespace config {
  const CMS_API_URL: string;
  const CMS_IMAGE_URL: string;
  const DATE_FORMAT: string;
  const LOADING_IMAGE_WAIT_TIME: number;
  interface IMETA {
    PAGE_TITLE_SUFFIX: string;
    PAGE_DESCRIPTION: string,
    PAGE_KEYWORDS: string,
  }
  const META: IMETA;
  interface IDataServiceId {
    HomeId: string,
    BridgingFinanceId: string,
    MeetTheTeamId: string,
    PersonalSavingsOnlineISAId: string,
    BusinessRelationshipManagerId: string,
    FAQIndividualId: string,
    AboutUsId: string,
    BusinessCurrentAccountId: string,
    PersonalCurrentAccountId: string,
    BussinessCurrentAccountPremiumId: string,
    PersonalCurrentAccountPremiumId: string,
    PersonalCurrentAccountPremiumEurosId: string,
    Error404: string,
    MortgageCalculator: string,
    ThanksNote: string,
    CustomerSupportFAQs: string,
    PrivateBanking: string,
    PrivateBankingBecomeAClient: string,
    PrivateBankingThanksNoteSuitable: string,
    PrivateBankingThanksNoteNotSuitable: string,
    PrivateBankingBorrowing: string,
    ImportantInformationId: string,
    BusinessIdentificationRequirementsId: string,
    PersonalLifeEventsId: string,
    AccessibilityId: string,
    PrivateBankingHowToApplyId: string,
    PrivateBankingIntermediariesId: string,
    PrivateBankingIntermediariesWorkingWithUsId: string,
    PrivateBankingIntermediariesOurProductsId: string,
    PrivateBankingIntermediariesOurCriteriaId: string,
    PrivateBankingIntermediariesDocumentsId: string,
    PropertyBrokersOurApproachId: string,
    PropertyBrokersPropertyLendingId: string,
    PropertyBrokersNACFBId: string,
    OpenBankingId: string,
    FeeAndRatesId: string,
    PersonalBankingIdentificationRequirementsId: string,
    PersonalBankingCurrentAccountId: string,
    FooterId: string,
    TestTemplateId: string,
    AboutUsCeoMessagePageId: string,
    AboutUsCovid19PageId: string,
    InternationalPageId: string,
    AboutUsAboutCbilsPageId: string,
    AboutUsRecoveryLoanSchemePageId: string,
    AboutUsOurHistoryPageId: string,
    AboutUsMeetTheBoardPageId: string,
    AboutUsEthicsValuesPageId: string,
    PodcastWithSavillsPageId: string,
    PodcastPageId: string,
  }
  const DataServiceId: IDataServiceId;
  interface IDrupalPageTemplateUrl {
    PersonalLifeEvents: string,
    ImportantInformation: string,
    BussinessIdentificationRequirements: string,
    Accessibility: string,
    PrivateBankingHowToApplyData: string,
    PrivateBankingIntermediaries: string,
    PersonalIdentificationRequirements: string,
    PersonalBankingCurrentAccount: string,
    TestTemplate: string,
  }
  const DrupalPageTemplateUrl: IDrupalPageTemplateUrl;
  // type PageTemplateId: keyof typeof DrupalPageTemplateUrl;
  // const PageTemplateId: PageTemplateId;
}
type PageTemplateId = keyof typeof DrupalPageTemplateUrl;