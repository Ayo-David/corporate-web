import React, { useEffect, useState,useRef } from 'react';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig();

export interface IResultsProps {
  dataList: any;
  currentPage: string;
  categoryIdMapping: any;
  productIdMapping: any;
  nextPage:()=>void;
}

export const Results: React.FunctionComponent<IResultsProps> = (props) => {
  const { dataList, currentPage, categoryIdMapping, productIdMapping,nextPage } = props;
  const ref=useRef<any|undefined>();
  const [links,setLinks]=useState<any>();

  
  const throttleFunction=(func:any, delay:any)=>{
    let prev = 0;
    return (...args:any) => {
      let now = new Date().getTime();
      if(now - prev> delay){
        prev = now;
        return func(...args); 
      }
    }
  }

  const isElementInViewport=function (el:any) {
    let rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) ;
  } 

  useEffect(()=>{
    window.addEventListener('scroll',throttleFunction(()=>{
      if(!!ref.current && isElementInViewport(ref.current)){
        nextPage()
      }
    },1500))
    return window.removeEventListener('scroll',()=>{})
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(dataList){
      const fetchUrls=async ()=>{
        let urlObject:any={};
        await Promise.all(dataList.map(async(item:any,index:number)=>{
          if(item.relationships.field_document.data){
            let response=await dataSvc.getDocumentLibraryFileDownload(item.relationships.field_document.data.id)
            urlObject[`${index}`]=CMS_IMAGE_URL+response.data.attributes.uri.url
          }
          else urlObject[`${index}`]=''
        }))
        setLinks(urlObject)
      }
      fetchUrls().then(r=>{})
    }
  },[dataList])

  
  
  return (
    <div className="section-results">
      <div className="headers">
        <div className="header light mobile-hide">Product</div>
        <div className="header neutral mobile-hide">Category</div>
        <div className="header dark mobile-hide">Document</div>
        <div className="header light desktop-hide mobile-show">{currentPage}</div>
      </div>
      <div className="results">
        {!!dataList &&
          dataList.map((item: any, index: number) => {
            return (
              <div className="result" key={index} ref={index===dataList.length-1?ref:undefined}>
                <div className="product">
                  <span className="label desktop-hide mobile-show">Product</span>{' '}
                  {!!item.relationships.field_doc_product.data
                    ? item.relationships.field_doc_product.data.map(
                        (item1: any) => productIdMapping[item1.id]
                      )
                    : null}
                </div>
                <div className="category">
                  <span className="label desktop-hide mobile-show">Category</span>{' '}
                  {!!item.relationships.field_doc_category.data
                    ? categoryIdMapping[item.relationships.field_doc_category.data.id]
                    : null}
                </div>
                <div className="document">
                  <img src="/assets/pdf-icon.svg" alt="pdf" className="icon" />
                  <div className="left">
                    <div className="title">{item.attributes.title}</div>
                    <div className="description">
                      {item.attributes.field_desc ? item.attributes.field_desc : '-'}
                    </div>
                  </div>
                  {!!links &&<a className="download" href={links[`${index}`]}>
                    <img src="/assets/download.png" alt="download" />
                  </a>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Results;
