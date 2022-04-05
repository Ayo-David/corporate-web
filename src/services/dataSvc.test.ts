import  '../test/dataSvcHelper'
import routeMap from '../test/routeMap.json'
import DataSvc from './dataSvc'


jest.setTimeout(60*1000)

describe('data service tests', () => {

  describe('Home page service tests', () => {
    let homeContent: any;
    it('getHomeContentData', async() => {
      homeContent = await DataSvc.getHomeContentData()
      expect(homeContent.data.id).toEqual(routeMap.getHomeContentData.id)
      expect(homeContent.data.attributes.title).toEqual(routeMap.getHomeContentData.title)
    });
  
    it('getHomeBannerData', async() => {
      const data = await DataSvc.getHomeBannerData(homeContent.data.id)
      expect(data.data.id).toEqual(routeMap.getHomeBannerData.id)

      const imgData = await DataSvc.getImage(data.data.relationships.field_banner_image.data.id);
      expect(imgData.data.id).toEqual('21efb728-551e-4843-a57f-811bf8e81be2')

      try {
        await DataSvc.getImageBanner(data.data.relationships.field_banner_image.data.id);
      } catch (err) {
        expect(err.message).toEqual('Request failed with status code 404')
      }
    });
  
    it('getHomeFieldQuickLinksData', async() => {
      const data = await DataSvc.getHomeFieldQuickLinksData(homeContent.data.relationships.field_customer_interest_links.data
        .id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  
  
    it('getHomeProductData', async() => {
      const data = await DataSvc.getHomeProductData(homeContent.data.relationships.field_products.data[1].id)
      expect(data.data.id).toEqual(routeMap.getHomeProductData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getHomeProductData.title)
    });
  
    it('getHomeFinanceData', async() => {
      const product = homeContent.data.relationships.field_products.data.find((item: { type: string; })=>item.type === 'node--finance_pages')
      const data = await DataSvc.getHomeFinanceData(product.id)
      expect(data.data.id).toEqual(routeMap.getHomeFinanceData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getHomeFinanceData.title)
    });
  
    it('getHomeAdsAwarenessData', async() => {
      const data = await DataSvc.getHomeAdsAwarenessData(homeContent.data.relationships.field_ads_awareness.data[0].id)
      expect(data.data.id).toEqual(routeMap.getHomeAdsAwarenessData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getHomeAdsAwarenessData.title)
    });
  
    it('getHomeOurCustomerPromisesData', async() => {
      const data = await DataSvc.getHomeOurCustomerPromisesData(homeContent.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  
    it('getHomeTrustedProviderData', async() => {
      const data = await DataSvc.getHomeTrustedProviderData(homeContent.data.relationships.field_trusted_provider.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  });

  describe('News and Articles page service tests', () => {
    let newsArticlesContent: any;
    it('getNewsArticlesContentData', async() => {
      newsArticlesContent = await DataSvc.getNewsArticlesContentData()
      expect(Array.isArray(newsArticlesContent.data)).toBeTruthy()
    });

    it('getNewsArticlesBannerData', async() => {
      let newArticleId = '';
      newsArticlesContent.data.forEach((item: any) => {
        if (
          !!item.relationships.field_media_image.data &&
          !!item.relationships.field_media_image.data.id &&
          item.relationships.field_media_image.data.id !== 'missing'
        ) {
          if (newArticleId === '') {
            newArticleId = item.id;
          }
        }
      });
      const data = await DataSvc.getNewsArticlesBannerData(newArticleId)
      expect(data.data.id).toEqual(newArticleId)
      
      // Cannot expect the title, since it is updated to always show the latest.
      //expect(data.data.attributes.title).toEqual(routeMap.getNewsArticlesBannerData.title)
    });

    let newsCategories: any;
    it('getNewsCategoriesData', async() => {
      newsCategories = await DataSvc.getNewsCategoriesData()
      expect(Array.isArray(newsCategories)).toBeTruthy()
    });

    it('getNewsArticlesListData', async() => {
      const data = await DataSvc.getNewsArticlesListData(newsCategories[0].uuid[0].value)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  });

  describe('Bridging Finance page service tests', () => {
    let bridgingFinanceContent: any;
    it('getBridgingFinanceContentData', async() => {
      bridgingFinanceContent = await DataSvc.getBridgingFinanceContentData()
      expect(bridgingFinanceContent.data.id).toEqual(routeMap.getBridgingFinanceContentData.id)
      expect(bridgingFinanceContent.data.attributes.title).toEqual(routeMap.getBridgingFinanceContentData.title)
    });

    it('getBridgingFinanceBannerData', async() => {
      const data = await DataSvc.getBridgingFinanceBannerData(bridgingFinanceContent.data.id)
      expect(data.data.id).toEqual(routeMap.getBridgingFinanceBannerData.id)
      expect(data.data.attributes.field_title).toEqual(routeMap.getBridgingFinanceBannerData.title)
    });

    it('getBridgingFinanceLinkIconsData', async() => {
      const data = await DataSvc.getBridgingFinanceLinkIconsData(bridgingFinanceContent.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });

    describe('Article Detail page service tests', () => {
      it('getArticleDetailContentData', async() => {
        const included = bridgingFinanceContent.included.find((item: { type: string; })=>item.type === 'paragraph--case_studies')
        const data = await DataSvc.getData(included.links.self.href);
        const articleDetailContent = await DataSvc.getArticleDetailContentData(data.data.relationships.field_case_studies.data[0].id)
        expect(articleDetailContent.data.id).toEqual('9a281ce8-1174-43e9-9316-6d41c39a091b')
        expect(articleDetailContent.data.attributes.title).toEqual('CBILs restructuring deals supporting customers through COVID-19')
      });
    });
  });

  describe('Meet The Team page service tests', () => {
    let meetTheTeamContent: any;
    it('getMeetTheTeamContentData', async() => {
      meetTheTeamContent = await DataSvc.getMeetTheTeamContentData()
      expect(meetTheTeamContent.data.id).toEqual(routeMap.getMeetTheTeamContentData.id)
      expect(meetTheTeamContent.data.attributes.title).toEqual(routeMap.getMeetTheTeamContentData.title)
    });

    it('getMeetTheTeamBannerData', async() => {
      const data = await DataSvc.getMeetTheTeamBannerData(meetTheTeamContent.data.id)
      expect(data.data.id).toEqual(routeMap.getMeetTheTeamBannerData.id)
      expect(data.data.attributes.field_title).toEqual(routeMap.getMeetTheTeamBannerData.title)
    });

    it('getMeetTheTeamTeamsData', async() => {
      const meetTheTeamTeamsId = Array.isArray(meetTheTeamContent.data.relationships.field_team_members.data) ?
        meetTheTeamContent.data.relationships.field_team_members.data[0].id :
        meetTheTeamContent.data.relationships.field_team_members.data.id
      const data = await DataSvc.getMeetTheTeamTeamsData(meetTheTeamTeamsId)
      expect(Array.isArray(data.data)).toBeTruthy()
    });

    it('getMeetTheTeamCustomerFeedbackData', async() => {
      const data = await DataSvc.getMeetTheTeamCustomerFeedbackData(meetTheTeamContent.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  });

  describe('Personal Savings Online ISA page service tests', () => {
    let personalSavingsOnlineISAContent: any;
    it('getPersonalSavingsOnlineISAContentData', async() => {
      personalSavingsOnlineISAContent = await DataSvc.getPersonalSavingsOnlineISAContentData()
      expect(personalSavingsOnlineISAContent.data.id).toEqual(routeMap.getPersonalSavingsOnlineISAContentData.id)
      expect(personalSavingsOnlineISAContent.data.attributes.title).toEqual(routeMap.getPersonalSavingsOnlineISAContentData.title)
    });

    it('getPersonalSavingsOnlineISABannerData', async() => {
      const data = await DataSvc.getPersonalSavingsOnlineISABannerData(personalSavingsOnlineISAContent.data.id)
      expect(data.data.id).toEqual(routeMap.getPersonalSavingsOnlineISABannerData.id)
    });

    it('getPersonalSavingsOnlineISALinkIconsData', async() => {
      const data = await DataSvc.getPersonalSavingsOnlineISALinkIconsData(personalSavingsOnlineISAContent.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  });

  describe('Business Relationship Manager page service tests', () => {
    let businessRelationshipManagerContent: any;
    it('getBusinessRelationshipManagerContentData', async() => {
      businessRelationshipManagerContent = await DataSvc.getBusinessRelationshipManagerContentData()
      expect(businessRelationshipManagerContent.data.id).toEqual(routeMap.getBusinessRelationshipManagerContentData.id)
      expect(businessRelationshipManagerContent.data.attributes.title).toEqual(routeMap.getBusinessRelationshipManagerContentData.title)
    });

    it('getBusinessRelationshipManagerBannerData', async() => {
      const data = await DataSvc.getBusinessRelationshipManagerBannerData(businessRelationshipManagerContent.data.id)
      expect(data.data.id).toEqual(routeMap.getBusinessRelationshipManagerBannerData.id)
    });

    it('getBusinessRelationshipManagerTeamsData', async() => {
      await Promise.all(businessRelationshipManagerContent.data.relationships.field_team_members.data.map(async ({id}: {id: string}) => {
        const data = await DataSvc.getBusinessRelationshipManagerTeamsData(id)
        expect(Array.isArray(data.data)).toBeTruthy()
      }))
    });

    it('getBusinessRelationshipManagerCustomerFeedbackData', async() => {
      const data = await DataSvc.getBusinessRelationshipManagerCustomerFeedbackData(businessRelationshipManagerContent.data.id)
      expect(Array.isArray(data.data)).toBeTruthy()
    });
  });

  describe('FAQ Individual page service tests', () => {
    let faqIndividualContent: any;
    it('getFAQIndividualContentData', async() => {
      faqIndividualContent = await DataSvc.getFAQIndividualContentData('Business Current Account FAQ');
      expect(Array.isArray(faqIndividualContent.data)).toBeTruthy();
    });

    it('getFAQIndividualFAQListData', async() => {
      const data = await DataSvc.getFAQIndividualFAQListData(faqIndividualContent.data[0].id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getFAQIndividualRelatedFAQsData', async() => {
      const data = await DataSvc.getFAQIndividualRelatedFAQsData(faqIndividualContent.data[0].id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getFAQIndividualRelatedItemsData', async() => {
      const data = await DataSvc.getFAQIndividualRelatedItemsData(faqIndividualContent.data[0].id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });
  });
  

  describe('Business Current Account page service tests', () => {
    let businessCurrentAccountContent: any;
    it('getBusinessCurrentAccountContentData', async() => {
      businessCurrentAccountContent = await DataSvc.getBusinessCurrentAccountContentData();
      expect(businessCurrentAccountContent.data.id).toEqual(routeMap.getBusinessCurrentAccountContentData.id)
      expect(businessCurrentAccountContent.data.attributes.title).toEqual(routeMap.getBusinessCurrentAccountContentData.title)
    });

    it('getPersonalCurrentAccountContentData', async() => {
      const data = await DataSvc.getPersonalCurrentAccountContentData();
      expect(data.data.id).toEqual(routeMap.getPersonalCurrentAccountContentData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getPersonalCurrentAccountContentData.title)
    });

    let businessCurrentAccountsContent: any;
    it('getBusinessCurrentAccountsContentData', async() => {
      businessCurrentAccountsContent = await DataSvc.getBusinessCurrentAccountsContentData();
      expect(businessCurrentAccountsContent.data.id).toEqual(routeMap.getBusinessCurrentAccountsContentData.id)
      expect(businessCurrentAccountsContent.data.attributes.title).toEqual(routeMap.getBusinessCurrentAccountsContentData.title)
    });

    let personalCurrentAccountsContent: any;
    it('getPersonalCurrentAccountsContentData', async() => {
      personalCurrentAccountsContent = await DataSvc.getPersonalCurrentAccountsContentData();
      expect(personalCurrentAccountsContent.data.id).toEqual(routeMap.getPersonalCurrentAccountsContentData.id)
      expect(personalCurrentAccountsContent.data.attributes.title).toEqual(routeMap.getPersonalCurrentAccountsContentData.title)
    });

    it('getPersonalCurrentAccountsEurosContentData', async() => {
      const data = await DataSvc.getPersonalCurrentAccountsEurosContentData();
      expect(data.data.id).toEqual(routeMap.getPersonalCurrentAccountsEurosContentData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getPersonalCurrentAccountsEurosContentData.title)
    });

    it('getCurrentAccountsBannerData', async() => {
      const data = await DataSvc.getCurrentAccountsBannerData(businessCurrentAccountsContent.data.id);
      expect(data.data.id).toEqual('93d9ebd0-7094-4547-96ba-1fcd9bdd81a7')
    });

    it('getCurrentAccountsHeaderLinksData', async() => {
      const data = await DataSvc.getCurrentAccountsHeaderLinksData(businessCurrentAccountsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCurrentAccountsFieldComponentsData', async() => {
      const data = await DataSvc.getCurrentAccountsFieldComponentsData(businessCurrentAccountsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
      const imgData = await DataSvc.getImageEligibilityCriteria(data.data.find((item: { type: string; })=>item.type === 'paragraph--eligibility_criteria').id)
      expect(imgData.data.id).toEqual(routeMap.getImageEligibilityCriteria.id)

      const imgFaq = await DataSvc.getImageDescriptionWithFaq(data.data.find((item: { type: string; })=>item.type === 'paragraph--image_description_with_faq').id, 'field_card_image');
      expect(imgFaq.data.id).toEqual(routeMap.getImageDescriptionWithFaq.id)
    });

    it('getCurrentAccountsCustomerInterestLinksData', async() => {
      const faqIndividualContent = await DataSvc.getFAQIndividualContentData('Business Current Account FAQ');
      const relatedItemsData = await DataSvc.getFAQIndividualRelatedItemsData(faqIndividualContent.data[0].id)
      const data = await DataSvc.getCurrentAccountsCustomerInterestLinksData(relatedItemsData.data[0].id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    let currentAccountsFAQsData: any;
    it('getCurrentAccountsFAQsData', async() => {
      const componentsData = await DataSvc.getCurrentAccountsFieldComponentsData(businessCurrentAccountsContent.data.id);
      currentAccountsFAQsData = await DataSvc.getCurrentAccountsFAQsData(componentsData.data.find((item: { type: string; })=>item.type === 'paragraph--faq_s').id);
      expect(currentAccountsFAQsData.data.id).toEqual(routeMap.getCurrentAccountsFAQsData.id)
      expect(currentAccountsFAQsData.data.attributes.title).toEqual(routeMap.getCurrentAccountsFAQsData.title)
    });

    it('getCurrentAccountsCorporateFAQData', async() => {
      const data = await DataSvc.getCurrentAccountsCorporateFAQData(currentAccountsFAQsData.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCurrentAccountsCardsWithLinkTextData', async() => {
      const componentsData = await DataSvc.getCurrentAccountsFieldComponentsData(businessCurrentAccountsContent.data.id);
      const data = await DataSvc.getCurrentAccountsCardsWithLinkTextData(componentsData.data.find((item: { type: string; })=>item.type === 'paragraph--cards_with_link_text').id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCurrentAccountsTrustedProviderData', async() => {
      const componentsData = await DataSvc.getCurrentAccountsFieldComponentsData(businessCurrentAccountsContent.data.id);
      const data = await DataSvc.getCurrentAccountsTrustedProviderData(componentsData.data.find((item: { type: string; })=>item.type === 'paragraph--trusted_providers').id);
      expect(data.data.id).toEqual(routeMap.getCurrentAccountsTrustedProviderData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getCurrentAccountsTrustedProviderData.title)
    });

    it('getCurrentAccountsTrustedProviderLogoData', async() => {
      const componentsData = await DataSvc.getCurrentAccountsFieldComponentsData(businessCurrentAccountsContent.data.id);
      const providerData = await DataSvc.getCurrentAccountsTrustedProviderData(componentsData.data.find((item: { type: string; })=>item.type === 'paragraph--trusted_providers').id);

      const data = await DataSvc.getCurrentAccountsTrustedProviderLogoData(providerData.data.id)
      expect(Array.isArray(data.data)).toBeTruthy();
    });
  });
  
  describe('About Us page service tests', () => {
    let aboutUsContent: any;
    let aboutUsEthicsValuesContent: any;
    it('getAboutUsContentData', async() => {
      aboutUsContent = await DataSvc.getAboutUsContentData();
      expect(aboutUsContent.data.id).toEqual(routeMap.getAboutUsContentData.id)
      expect(aboutUsContent.data.attributes.title).toEqual(routeMap.getAboutUsContentData.title)
    });
    
    it('getAboutUsEthicsValuesContentData', async() => {
      aboutUsEthicsValuesContent = await DataSvc.getAboutUsEthicsValuesContentData();
      expect(aboutUsEthicsValuesContent.data.id).toEqual(routeMap.getAboutUsEthicsValuesContentData.id)
      expect(aboutUsEthicsValuesContent.data.attributes.title).toEqual(routeMap.getAboutUsEthicsValuesContentData.title)
    });

    it('getAboutUsBannerData', async() => {
      const data = await DataSvc.getAboutUsBannerData(aboutUsContent.data.id);
      expect(data.data.id).toEqual(routeMap.getAboutUsBannerData.id)
    });

    it('getAboutUsFieldComponentsData', async() => {
      const data = await DataSvc.getAboutUsFieldComponentsData(aboutUsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();

      const img = data.data.find((item: { type: string; })=>item.type === 'paragraph--card_with_image_link')
      const imgData = await DataSvc.getImage3(img.id)
      expect(imgData.data.id).toEqual(routeMap.getImage3.id)

      const imgWithLongText = await DataSvc.getImageWithLongText(data.data.find((item: { type: string; })=>item.type === 'paragraph--image_with_long_text').id)
      expect(imgWithLongText.data.id).toEqual(routeMap.getImageWithLongText.id)

      const video = await DataSvc.getImageVideo(imgData.data.id)
      expect(video.data.id).toEqual(routeMap.getImageVideo.id)
    });

    it('getAboutUsFaqsData', async() => {
      const data = await DataSvc.getAboutUsFaqsData(aboutUsContent.data.id);
      expect(data.data.id).toEqual(routeMap.getAboutUsFaqsData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getAboutUsFaqsData.title)
    });
  });

  describe('Error 404 page service tests', () => {
    it('getError404ContentData', async() => {
      const data = await DataSvc.getError404ContentData();
      expect(data.data.id).toEqual(routeMap.getError404ContentData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getError404ContentData.title)
    });
  });

  describe('Mortgage Calculator page service tests', () => {
    it('getMortgageCalculatorContentData', async() => {
      const data = await DataSvc.getMortgageCalculatorContentData();
      expect(data.data.id).toEqual(routeMap.getMortgageCalculatorContentData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getMortgageCalculatorContentData.title)
    });
  });

  describe('Thanks note service tests', () => {
    it('getThanksNoteData', async() => {
      const data = await DataSvc.getThanksNoteData();
      expect(data.data.id).toEqual(routeMap.getThanksNoteData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getThanksNoteData.title)
    });
  });

  describe('Customer Support FAQs page service tests', () => {
    let customerSupportFAQsContent: any;
    it('getCustomerSupportFAQsContentData', async() => {
      customerSupportFAQsContent = await DataSvc.getCustomerSupportFAQsContentData();
      expect(customerSupportFAQsContent.data.id).toEqual(routeMap.getCustomerSupportFAQsContentData.id)
      expect(customerSupportFAQsContent.data.attributes.title).toEqual(routeMap.getCustomerSupportFAQsContentData.title)
    });

    it('getCustomerSupportFAQsSetData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsSetData(customerSupportFAQsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCustomerSupportFAQsAdsAwarenessData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsAdsAwarenessData(customerSupportFAQsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    let customerSupportFAQsServiceStatus: any;
    it('getCustomerSupportFAQsServiceStatusData', async() => {
      customerSupportFAQsServiceStatus = await DataSvc.getCustomerSupportFAQsServiceStatusData(customerSupportFAQsContent.data.id);
      expect(customerSupportFAQsServiceStatus.data.id).toEqual(routeMap.getCustomerSupportFAQsServiceStatusData.id)
    });

    it('getCustomerSupportFAQsFieldServiceStatusData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsFieldServiceStatusData(customerSupportFAQsServiceStatus.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCustomerSupportFAQsWaysToContactUsData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsWaysToContactUsData(customerSupportFAQsContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCustomerSupportFAQsMapImageData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsMapImageData(customerSupportFAQsContent.data.id);
      expect(data.data.id).toEqual(routeMap.getCustomerSupportFAQsMapImageData.id)
    });

    it('getCustomerSupportFAQsSocialMediaData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsSocialMediaData(customerSupportFAQsContent.data.id);
      expect(data.data.id).toEqual(routeMap.getCustomerSupportFAQsSocialMediaData.id)
    });

    it('getCustomerSupportFAQsData', async() => {
      const data = await DataSvc.getCustomerSupportFAQsData();
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getCustomerSupportFAQsFieldFAQSetData', async() => {
      const fAQsSetData = await DataSvc.getCustomerSupportFAQsSetData(customerSupportFAQsContent.data.id);
      const data = await DataSvc.getCustomerSupportFAQsFieldFAQSetData(fAQsSetData.data[0].id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });
  });

  describe('Private Banking page service tests', () => {
    let privateBankingContent: any;
    it('getPrivateBankingContentData', async() => {
      privateBankingContent = await DataSvc.getPrivateBankingContentData();
      expect(privateBankingContent.data.id).toEqual(routeMap.getPrivateBankingContentData.id)
      expect(privateBankingContent.data.attributes.title).toEqual(routeMap.getPrivateBankingContentData.title)
    });

    it('getPrivateBankingBannerData', async() => {
      const data = await DataSvc.getPrivateBankingBannerData(privateBankingContent.data.id);
      expect(data.data.id).toEqual(routeMap.getPrivateBankingBannerData.id)
    });
  });

  describe('Fee and Rates page service tests', () => {
    let feeAndRatesContent: any;
    it('getFeeAndRatesContentData', async() => {
      feeAndRatesContent = await DataSvc.getFeeAndRatesContentData();
      expect(feeAndRatesContent.data.id).toEqual(routeMap.getFeeAndRatesContentData.id)
      expect(feeAndRatesContent.data.attributes.title).toEqual(routeMap.getFeeAndRatesContentData.title)
    });

    it('getFeeAndRatesBannerData', async() => {
      const data = await DataSvc.getFeeAndRatesBannerData(feeAndRatesContent.data.id);
      expect(data.data.id).toEqual(routeMap.getFeeAndRatesBannerData.id)
    });

    it('getFeeAndRateRateDetailsData', async() => {
      const data = await DataSvc.getFeeAndRateRateDetailsData();
      expect(Array.isArray(data)).toBeTruthy();
    });

    it('getFeeAndRateForeignExchangeDetailsData', async() => {
      const data = await DataSvc.getFeeAndRateForeignExchangeDetailsData();
      expect(Array.isArray(data)).toBeTruthy();
    });

    it('getFeeAndRatesDropdownData', async() => {
      const data = await DataSvc.getFeeAndRatesDropdownData(feeAndRatesContent.data.id);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getFeeAndRatesRatesTemplateData', async() => {
      const data = await DataSvc.getFeeAndRatesRatesTemplateData();
      expect(Array.isArray(data)).toBeTruthy();
    });
  });

  describe('Private Banking page service tests', () => {
    it('getPrivateBankingBecomeAClientData', async() => {
      const data = await DataSvc.getPrivateBankingBecomeAClientData();
      expect(data.data.id).toEqual(routeMap.getPrivateBankingBecomeAClientData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getPrivateBankingBecomeAClientData.title)
    });

    it('getPrivateBankingThanksNoteData', async() => {
      const data = await DataSvc.getPrivateBankingThanksNoteData(0);
      expect(data.data.id).toEqual(routeMap.getPrivateBankingThanksNoteData.id[0])
      expect(data.data.attributes.title).toEqual(routeMap.getPrivateBankingThanksNoteData.title)

      const thanksNote = await DataSvc.getPrivateBankingThanksNoteData(1);
      expect(thanksNote.data.id).toEqual(routeMap.getPrivateBankingThanksNoteData.id[1])
      expect(thanksNote.data.attributes.title).toEqual(routeMap.getPrivateBankingThanksNoteData.title)
    });

    let privateBankingBorrowingContent: any;
    it('getPrivateBankingBorrowingContentData', async() => {
      privateBankingBorrowingContent = await DataSvc.getPrivateBankingBorrowingContentData();
      expect(privateBankingBorrowingContent.data.id).toEqual(routeMap.getPrivateBankingBorrowingContentData.id)
      expect(privateBankingBorrowingContent.data.attributes.title).toEqual(routeMap.getPrivateBankingBorrowingContentData.title)
    });

    it('getPrivateBankingBorrowingBannerData', async() => {
      const data = await DataSvc.getPrivateBankingBorrowingBannerData(privateBankingBorrowingContent.data.id);
      expect(data.data.id).toEqual(routeMap.getPrivateBankingBorrowingBannerData.id)
    });
  });

  describe('Template Page service tests', () => {
    it('getFooterData', async() => {
      const data = await DataSvc.getFooterData();
      expect(data.data.id).toEqual(routeMap.getFooterData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getFooterData.title)
    });

    it('getDupalPageTemplateData', async() => {
      const data = await DataSvc.getDupalPageTemplateData('ImportantInformation');
      expect(data.data.id).toEqual(routeMap.getDupalPageTemplateData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getDupalPageTemplateData.title)
    });

    it('getTemplatePageFAQItems', async() => {
      const templateData = await DataSvc.getDupalPageTemplateData('PersonalIdentificationRequirements');
      const included = templateData.included.find((item: { type: string; })=>item.type === 'paragraph--title_faqs_url')
      const data = await DataSvc.getTemplatePageFAQItems(included.relationships.field_faq_set.data.id)
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    let dupalPageTemplateData: any;
    it('getTemplatePageFileListItems', async() => {
      dupalPageTemplateData = await DataSvc.getDupalPageTemplateData('TestTemplate');
      const included = dupalPageTemplateData.included.find((item: { type: string; })=>item.type === 'paragraph--title_files_list')
      const data = await DataSvc.getTemplatePageFileListItems(included.id)
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getTemplatePageMemberListItems', async() => {
      const included = dupalPageTemplateData.included.find((item: { type: string; })=>item.type === 'paragraph--title_members')
      const data = await DataSvc.getTemplatePageMemberListItems(included.id)
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    it('getTemplatePageCardListItems', async() => {
      const included = dupalPageTemplateData.included.find((item: { type: string; })=>item.type === 'paragraph--title_desc_cards_with_url')
      const data = await DataSvc.getTemplatePageCardListItems(included.id)
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    let templatePageAwardAccreditationItems: any;
    it('getTemplatePageAwardAccreditationItems', async() => {
      const included = dupalPageTemplateData.included.find((item: { type: string; })=>item.type === 'paragraph--awards_and_accreditations')
      templatePageAwardAccreditationItems = await DataSvc.getTemplatePageAwardAccreditationItems(included.id)
      expect(Array.isArray(templatePageAwardAccreditationItems.data)).toBeTruthy();
    });

    it('getTemplatePageAwardAccreditationData', async() => {
      const data = await DataSvc.getTemplatePageAwardAccreditationData(templatePageAwardAccreditationItems.data[0].id)
      expect(data.data.id).toEqual(routeMap.getTemplatePageAwardAccreditationData.id);
    });

    it('getHeaderMenuData', async() => {
      const data = await DataSvc.getHeaderMenuData('Customer Support');
      expect(Array.isArray(data.data)).toBeTruthy();
    });
  });

  describe('Security Landing page service tests', () => {
    it('getSecuritiesContentData', async() => {
      const data = await DataSvc.getSecuritiesContentData();
      expect(data.data.id).toEqual(routeMap.getSecuritiesContentData.id)
      expect(data.data.attributes.title).toEqual(routeMap.getSecuritiesContentData.title)
    });

    it('getSecurityCategoriesData', async() => {
      const data = await DataSvc.getSecurityCategoriesData();
      expect(Array.isArray(data.data)).toBeTruthy();
    });
  });

  describe('Covid19 Page Referenced data tests', () => {
    it('getReferencedPageData', async() => {
      const data = await DataSvc.getReferencedPageData({type: 'node--about_us', id: '2e40c893-3f28-4aa9-8b96-221ca73bdac9'});
      expect(data).toBeTruthy();
    });
  });
});
