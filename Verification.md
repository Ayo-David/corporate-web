## Odyssey Corporate Website

### Prerequisites

node 12.14+
npm 6.13+

### How to run

- `npm install`
- `npm start`
- then you can view the app running at `http://localhost:3000`

### Pages and URLs

- `http://localhost:3000/personal/current_account_euros`
- `http://localhost:3000/template/test`

### Other fixes

<RelatedProductsAndServicesSingle> is a component used in 3 containers. It had a bad request which returned 403 error , fixed the request (getData changed to getCurrentAccountsCustomerInterestLinksData) and it renders.

### Verification

## Integration #2 note
- Home banner mask for desktop, tablet, mobile fixed
- Layout issues fixed
- FAQ autocomplete and individual FAQ fixed
- 404 page not found fix

And all issues listed in private section of spec are fixed.

## Series #09 note
- Two created Drupal content templates are /src/components/PageWithSidebarTemplate and /src/components/PageWithoutSidebarTemplate
- 6 pages are built from two templates above are:
  - Important information: URL: http://localhost:3000/important_information
  - Identification Requirements: URL: http://localhost:3000/business/identification_requirements
  - Life Events: URL: http://localhost:3000/personal/life_events
  - Accessibility: URL: http://localhost:3000/accessibility
  - How to apply: URL: http://localhost:3000/private_banking/how_to_apply
  - Intermediaries: URL: http://localhost:3000/private_banking/intermediaries
- Mobile and Tablet flyout has been implemented 

### Test Steps
User can click on the tabs to show different News/Articles.

### Screen recording series 9 verification
https://youtu.be/NQwaPwb3HU0

## Series #10 note

- `http://localhost:3000/customer_suppor/fee_and_rates`
- `http://localhost:3000/personal/identification_requirements`
- `http://localhost:3000/personal/current_account_page`

### Other fixes

Lowest Footer and Dark Green footer both use the new API request. Lowest footer uses data from Drupal except for images

### Verification

https://drive.google.com/file/d/1_Qt9xeHaR718c4rO4p6yds7UY6p6PVIT/view?usp=sharing
https://drive.google.com/file/d/10V8pvTMr7GWSIUggtCg_OTXfZ-bAEpY4/view?usp=sharing


## Series #14 Challenge note

Developed 3 pages as stated in the requirements. Below are the URLs

1. CEO Message 
- `http://localhost:3000/about_us/message_ceo`
   
   Sub links for Paragraph :
   - `http://localhost:3000/about_us/message_ceo/providing-businesses-with-faster-access-to-financing/`
   - `http://localhost:3000/about_us/message_ceo/autumn-a-time-to-take-stock/`
   - `http://localhost:3000/about_us/message_ceo/press-0-for-a-human-being/`
   - `http://localhost:3000/about_us/message_ceo/patient-centred-healthcare-customer-centric-banking/`

2. COVID 19   
- `http://localhost:3000/about_us/covid_19`

   Sub links for Paragrah:
   - `http://localhost:3000/about_us/covid_19/supporting-customers-affected-by-covid-19`
   - `http://localhost:3000/about_us/covid_19/stay-safe-protecting-yourself-against-fraud-and-scams`

   - there are more endpoints , couldn't add more as Drupal API went down.

3. International
- `http://localhost:3000/international`


## Series #15 Challenge note

1. ABOUT US - ABOUT CBILS
- `http://localhost:3000/about-cynergy-bank/about-cbils`

2. ABOUT US - RECOVERY LOAN SCHEME
- `http://localhost:3000/about-cynergy-bank/recovery-loan-scheme`

3. PODCAST WITH SAVILLS
- `http://localhost:3000/covid-19/cbils-british-business-bank-covid-19-business-interruption-loan-scheme/podcast-with-savills-and-steve-crosswell`

4. PODCAST
- `http://localhost:3000/covid-19/cbils-british-business-bank-covid-19-business-interruption-loan-scheme/podcast`

### Route change

As per requirements https://www.dropbox.com/s/e7jassxgg70kdxv/Odyssey%20Corporate%20Website%20-%20series%2015%20ss.png?dl=0, these are routes path need changes to `data.attributes.path.alias` url from Drupal Content

- `/important_information` to `/privacy-policy` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/basic_page/e97a68bb-776e-4080-83d1-72398884ec55?include=field_banner,field_components)

- `/business/identification_requirements` to `/business-banking/identification-requirements` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/business_banking_pages/28398fbe-8c0f-407a-a41a-a47b479e54d2?include=field_banner,field_components) NOTE: This Drupal URL doesn't has `field_url_alias` properties so this page doesn't has `sub_path` or `dynamic routing` url, need fix on CMS

- `/personal/identification_requirements` to `/personal-banking/identification-requirements` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/personal_banking_pages/b0f114c7-eaa5-472a-99fb-39f50ad7b477?include=field_banner,field_components)

- `/personal/current_account_page` to `/personal-savings/current-accounts` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/personal_banking_pages/c1203945-f9ec-4ff5-9fe8-9b1a6de30f34?include=field_banner,field_components)

- `/personal/life_events` to `/personal-banking/life-events` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/personal_banking_pages/b4d32d1a-e17e-41a7-92a6-99e2e26c555d?include=field_banner,field_components) NOTE: This Drupal URL doesn't has `field_url_alias` properties so this page doesn't has `sub_path` or `dynamic routing` url, need fix on CMS

- `/private_banking/intermediaries` to `/private-banking/mortgage-intermediaries` (Drupal URL: https://cms.dev.cynfusion.net/jsonapi/node/private_banking_pages/ce290d6a-ab06-4cfd-89d4-0fe38ca08ef1?include=field_banner,field_components)

- `/template/test` doesn't has `data.attributes.path.alias` value or has a null value, need fix on CMS.

## Series #16 Challenge note

1. MORTGAGE INTERMEDIARIES - WORKING WITH US
- `http://localhost:3000/mortgage-intermediaries/working-with-us`

2. MORTGAGE INTERMEDIARIES-PRODUCTS
- `http://localhost:3000/mortgage-intermediaries/our-products`

3. MORTGAGE INTERMEDIARIES-OUR CRITERIA
- `http://localhost:3000/mortgage-intermediaries/our-criteria`

4. OUR APPROACH
- `http://localhost:3000/property-brokers/our-approach`

5. MORTGAGE INTERMEDIARIES-DOCUMENTS
- `http://localhost:3000/mortgage-intermediaries/documents`

6. PROPERTY LENDING
- `http://localhost:3000/property-brokers/property-lending`

7. NACFB
- `http://localhost:3000/property-brokers/nacfb`

8. OPEN BANKING
- `http://localhost:3000/open-banking`

9. ABOUT US - OUR HISTORY
- `http://localhost:3000/about-cynergy-bank/our-history`

10. ABOUT US - MEET THE BOARD
- `http://localhost:3000/about-cynergy-bank/meet-the-board`

11. ABOUT US - ETHICS & VALUES
- `http://localhost:3000/about-cynergy-bank/ethics-values`

12. ABOUT US CEO MESSAGE
- `http://localhost:3000/about_us/message_ceo`

### Verification of Challenge 15

1. New Page Verification
- https://www.dropbox.com/s/l5cai2ydcuti0qx/Odyssey%20Corporate%20Website%20-%20series%2015.mp4?dl=0

2. Dynamic Routing Verification
- https://www.dropbox.com/s/1ywhi8rgkyumibs/Odyssey%20Corporate%20Website%20-%20series%2015%20dynamic%20routing.mp4?dl=0

3. Unit Testing Verification
- https://www.dropbox.com/s/xsiyhi2q2h2f4do/Odyssey%20Corporate%20Website%20-%20series%2015%20unit%20testing.mp4?dl=0

### Verification of Challenge 16

Video:
https://www.dropbox.com/s/iue72y1na1s7arr/video-part-16.mp4?dl=0