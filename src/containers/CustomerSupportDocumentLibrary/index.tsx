import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';
import TopBanner from '../../components/TopBanner';
import Filters from '../../components/CustomerSupportDocumentLibraryDocuments/Filters';
import Results from '../../components/CustomerSupportDocumentLibraryDocuments/Results';
import Dropdown from 'react-bootstrap/esm/Dropdown';

const parentField = 'Customer Support';

interface ICustomerSupportDocumentLibraryPageProps {
  documentLibraryContent: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const CustomerSupportDocumentLibraryPage: React.FunctionComponent<
  ICustomerSupportDocumentLibraryPageProps
> = (props) => {
  const [banner, setBanner] = useState<CommonDataModel>();
  const [productOptions, setProductOptions] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>();
  const [categoryIdMapping, setCategoryIdMapping] = useState<any>();
  const [productIdMapping, setProductIdMapping] = useState<any>();
  const [currentPage, setCurrentPage] = useState<string>('Business Documents');
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [allResults, setAllResults] = useState<any>();
  const [filteredResults, setFilteredResults] = useState<any>();
  const [isNextPage, setNextPage] = useState<boolean>(false);
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Document Library',
      url: '/',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getCustomerSupportDocumentLibraryContentData()
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.documentLibraryContent) {
      dataSvc
        .getCustomerSupportDocumentLibraryBanner(props.documentLibraryContent.data.id)
        .then((data) => setBanner(data));
        dataSvc.getDocumentLibraryProductsBusinessData().then((data: any) => {
          data.unshift({'name':'All'})
          setProductOptions(data)
        });
      dataSvc.getDocumentLibraryResultsData('Business').then((data) => {
        setAllResults(data.data);
        setFilteredResults(data.data);
        let _categoryDataMapping: any = {};
        let _productDataMapping: any = {};
        data.included.forEach((item: any) => {
          if (item.type === 'taxonomy_term--categories') {
            _categoryDataMapping[item.attributes.name] = item.id;
          } else if (item.type === 'taxonomy_term--cynergy_terms') {
            _productDataMapping[item.attributes.name] = item.id;
          }
        });
        setCategoryIdMapping(_categoryDataMapping);
        setProductIdMapping(_productDataMapping);
      });
      dataSvc.getDocumentLibraryCategoryData().then((data) => {
        data.unshift({'name':'All'})
        setCategoryOptions(data);
      });
    }
    // eslint-disable-next-line
  }, [props.documentLibraryContent]);

  useEffect(() => {
    let _resultsCopy = allResults;
    if (selectedProduct === 'All' && selectedCategory === 'All') setFilteredResults(allResults);
    if (selectedProduct !== 'All' && selectedCategory === 'All') {
      let _result = _resultsCopy.filter(
        (item: any) =>
          item.relationships.field_doc_product.data.findIndex(
            (item1: any) => item1.id === productIdMapping[`${selectedProduct}`]
          ) > -1
      );
      setFilteredResults(_result);
    }
    if (selectedProduct === 'All' && selectedCategory !== 'All') {
      let _result = _resultsCopy.filter(
        (item: any) =>
          !!item.relationships.field_doc_category.data &&
          item.relationships.field_doc_category.data.id === categoryIdMapping[`${selectedCategory}`]
      );
      setFilteredResults(_result);
    }
    if (selectedProduct !== 'All' && selectedCategory !== 'All') {
      let _result1 = _resultsCopy.filter(
        (item: any) =>
          !!item.relationships.field_doc_category.data &&
          item.relationships.field_doc_category.data.id === categoryIdMapping[`${selectedCategory}`]
      );
      let _result2 = _result1.filter(
        (item: any) =>
          item.relationships.field_doc_product.data.findIndex(
            (item1: any) => item1.id === productIdMapping[`${selectedProduct}`]
          ) > -1
      );
      setFilteredResults(_result2);
    }
    // eslint-disable-next-line
  }, [selectedProduct, selectedCategory]);

  const nextPage=()=>{
    if(!isNextPage){
      setNextPage(true)
      dataSvc.getCustomerSupportDocumentLibraryContentData().then((data)=>{
        if(!!data.links && !!data.links.next && !isNextPage){
          dataSvc.getData(data.links.next.href).then((response)=>{
            let _allResults=allResults.push(response.data);
            let _filteredResults=filteredResults.push(response.data);
            setAllResults(_allResults)
            setFilteredResults(_filteredResults)
          })
        }
      })
    }
  }
  
  useEffect(() => {
    if (currentPage === 'Business Documents') {
      setFilteredResults(allResults);
      setSelectedCategory('All');
      setSelectedProduct('All');
      dataSvc.getDocumentLibraryProductsBusinessData().then((data: any) => {
        data.unshift({'name':'All'})
        setProductOptions(data)
      });
      dataSvc.getDocumentLibraryResultsData('Business').then((data:any)=>{
        setAllResults(data.data)
        setFilteredResults(data.data)
      })
    } else if (currentPage === 'Personal Documents') {
      setFilteredResults(allResults);
      setSelectedCategory('All');
      setSelectedProduct('All');
      dataSvc.getDocumentLibraryProductsPersonalData().then((data: any) => {
        data.unshift({'name':'All'})
        setProductOptions(data)});
      dataSvc.getDocumentLibraryResultsData('Personal').then((data:any)=>{
        setAllResults(data.data)
        setFilteredResults(data.data)
      })
    }
    // eslint-disable-next-line
  }, [currentPage]);

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

  const changePage = function (page: string) {
    setCurrentPage(page);
  };

  const invertObject = function (obj: any) {
    var retobj: any = Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
    return retobj;
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
      {!!banner && <TopBanner dataList={banner} type="document-library" />}
      <Breadcrumb itemArray={breadcrumbArray} />
      <div className="narrow-container">
        {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
        {!!props.documentLibraryContent && (
          <div
            className="need-adobe"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.documentLibraryContent.data.attributes.body.value),
            }}></div>
        )}
        <div className="document-module">
          <div className="document-type mobile-hide">
            <span
              onClick={() => changePage('Business Documents')}
              className={`txt ${currentPage === 'Business Documents' && 'active'}`}>
              Business Documents
            </span>
            <span
              onClick={() => changePage('Personal Documents')}
              className={`txt ${currentPage === 'Personal Documents' && 'active'}`}>
              Personal Documents
            </span>
          </div>

          <Dropdown
            className="desktop-hide mobile-show"
            onToggle={() => setIsProductsOpen(!isProductsOpen)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCurrentPage('Business Documents')}>
                Business Documents
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setCurrentPage('Personal Documents')}>
                Personal Documents
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {!!productOptions && !!categoryOptions && (
            <Filters
              productOptions={productOptions}
              categoryOptions={categoryOptions}
              isProductsOpen={isProductsOpen}
              setIsProductsOpen={setIsProductsOpen}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              isCategoryOpen={isCategoryOpen}
              setIsCategoryOpen={setIsCategoryOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </div>
        <Results
          dataList={filteredResults}
          currentPage={currentPage}
          categoryIdMapping={invertObject(Object.assign({}, categoryIdMapping))}
          productIdMapping={invertObject(Object.assign({}, productIdMapping))}
          nextPage={nextPage}
        />
      </div>

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

export default connect(mapStateToProps, matchDispatchToProps)(CustomerSupportDocumentLibraryPage);

