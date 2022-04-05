import React, { useEffect } from 'react';
import './styles.scss';

export interface IProductsProps {
  dataList: any[];
}

const imageArrayStatic = ['./assets/iPhone_XR.svg', './assets/max-shilov.png', './assets/three-cards.png'];
const productTitleStatic = [
  'Helping you manage your day-to-day business',
  'Looking to expand your property portfolio?',
  'Convenient access to foreign exchange services'
];
const productDescriptionStatic = [
  'A straightforward Business Current Account that provides everything you need to manage your day-to-day finances simply and efficiently.',
  'We know you\'re busy, so our knowledgeable relationship managers will work with you to make quick decisions.',
  'Make payments in foreign currencies, or to send money abroad, then our foreign exchange service can help you.'
];
const productButtonStatic = ['Explore Property Finance', 'Explore Business Banking', 'Explore Foreign Currency Transfer'];

export const Products: React.FunctionComponent<IProductsProps> = (props) => {
  const { dataList } = props;
  
  useEffect(() => {
    // eslint-disable-next-line
  }, [props.dataList]);

  return (
    <div className="section-home-products">
      <div className="container">
        {
          dataList.map((item, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 && (
                <div className="group-module digital-relationship flex">
                  <div className="lefts">
                    <div className="img-box">
                      <img src={imageArrayStatic[Number(index)]} alt="img" />
                    </div>
                  </div>
                  <div className="rights ml60">
                    <div className="gray-title">
                      {item.data.attributes.title}
                    </div>
                    <div className="big-txt">
                      {productTitleStatic[Number(index)]}
                    </div>
                    <p className="txt">
                      {productDescriptionStatic[Number(index)]}
                    </p>
                    <div className="bottom-btn">
                      <a href="#javascript" className="btn btn-green-border">
                        {productButtonStatic[Number(index)]}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {index % 2 === 1 && (
                <div className=" group-module property-finance flex">
                  <div className="lefts mr60">
                    <div className="gray-title">
                      {item.data.attributes.title}
                    </div>
                    <div className="big-txt">
                      {productTitleStatic[Number(index)]}
                    </div>
                    <p className="txt">
                      {productDescriptionStatic[Number(index)]}
                    </p>
                    <div className="bottom-btn">
                      <a href="#javascript" className="btn btn-green-border">
                        {productButtonStatic[Number(index)]}
                      </a>
                    </div>
                  </div>
                  <div className="rights ">
                    <div className="img-box">
                      <div className="top-left-cover"></div>
                      <img src={imageArrayStatic[Number(index)]}  alt="img" />
                      <div className="bottom-right-cover"></div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        }
        
        <div className="group-module flex hide">
          <div className="lefts">
            <div className="img-box light-grey">
              <img src="../assets/three-cards.png" className="three-img" alt="img" />
            </div>
          </div>
          <div className="rights ml60">
            <div className="gray-title">
              Business Finance
            </div>
            <div className="big-txt">
              Convenient access to foreign exchange services
            </div>
            <p className="txt">
              
            </p>
            <div className="bottom-btn">
              <a href="#javascript" className="btn btn-green-border">
                Explore Foreign Currency Transfer
              </a>
            </div>
          </div>
        </div>
        {/* end .digital-ralationship-banking */}
      </div>
    </div>
  );
};

export default Products;
