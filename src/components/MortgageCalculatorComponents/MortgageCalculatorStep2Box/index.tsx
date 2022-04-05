import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

export interface IMortgageCalculatorStep2BoxProps {
  dataList?: any;
  onClickGetInTouch: () => void;
}

export const MortgageCalculatorStep2Box: React.FunctionComponent<IMortgageCalculatorStep2BoxProps> = (props) => {  
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="section section-mortgage-calculator-step-2-box">
        <div className="container">
          <div className="top-gray-title">
            Mortgage Calculator
          </div>
          <div className="your-mortgage-area">
            <div className="blue-title">
              Your mortgage borrowing estimate
            </div>
            <div className="white-box">
              <div className="little-title">
                Mortgage 
              </div>
              <div className="three-grid">
                <div className="row">
                  <div className="col col-md-4 col-12">
                    <div className="groups">
                      <div className="price-txt big-green">
                        £ 3,157.05
                      </div>
                      <div className="sub-txt">
                        PER MONTH
                      </div>
                      <div className="txt">
                        Your monthly payments at the start 
                        of the 25 year term
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-4 col-12">
                    <div className="groups">
                      <div className="price-txt ">
                        £ 750,000
                      </div>
                      <div className="sub-txt">
                        LOAN REQUIRED
                      </div>
                      <div className="txt">
                        Potential maximum you could borrow 
                        based on the details you have entered.
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-4 col-12">
                    <div className="groups">
                      <div className="price-txt ">
                        75%
                      </div>
                      <div className="sub-txt">
                        LOAN TO VALUE
                      </div>
                      <div className="txt">
                        1,000,000 GBP value,
                        750,000 GBP mortgage amount.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mortgage-summary-box">
              <div className="title">
                Mortgage Summary
              </div>
              <div className="txt-area">
                <div className="lefts">
                  <p className="txt">
                    Cynergy Client looking for a Residential Mortgage for the acquisition of a new build property valued £1.000.000.
                    32 years term with an initial deposit of £ 150.000 and interest-only repayments.
                  </p>
                  <p className="txt">
                    1 applicant with a gross salary of £300.000, £0 rental income, £0 bonus and £0 investments income.
                    A monthly expenditure of £0 on loan and credit repayments, a committed expenditure of £1.500, 
                    £13.258 in living costs and £4.745 in taxes.  
                  </p>
                </div>
                <div className="rights">
                  <NavLink
                    to={{
                      pathname: '/private_banking/borrowing/mortgage',
                      state: location.state,
                    }} 
                    className="btn btn-green-border">
                    Edit
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="what-are-my-options">
            <div className="title">
              What are my options?
            </div>
            <div className="grey-box-list">
              <div className="grey-box">
                <div className="lefts">
                  2 Year 
                  Base Rate	
                </div>
                <div className="rights">
                  <div className="data-wrap">
                    <div className="three-data">
                      <div className="gropus">
                        <div className="gray-txt">
                          Interest rate
                        </div>
                        <div className="values">
                          <div className="price">
                            1.94%
                          </div>
                          <div className="txt">
                            Variable	
                          </div>
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Repayments
                        </div>
                        <div className="values">
                          <div className="price">
                            £ 3,157.05
                          </div>
                          <div className="txt">
                            Based on current 
                            variable rate
                          </div> 
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Fee
                        </div>
                        <div className="values">
                          £ 1,875
                        </div>
                      </div>
                    </div>
                    <div className="long-txt">
                      <p className="txt">
                        A flexible mortgage product that tracks the Cynergy Base Rate for 2 years. 
                      </p>
                      <p className="txt">
                        You can have the ability to make unlimited overpayments without charge enabling you to clear your balance quicker than planned.
                      </p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <a href="#javascript" className="btn-right-arrow"
                      onClick={(event) => {
                        event.preventDefault()
                      }}>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grey-box">
                <div className="lefts">
                  5 Year 
                  Base Rate	
                </div>
                <div className="rights">
                  <div className="data-wrap">
                    <div className="three-data">
                      <div className="gropus">
                        <div className="gray-txt">
                          Interest rate
                        </div>
                        <div className="values">
                          <div className="price">
                            2.04%
                          </div>
                          <div className="txt">
                            Variable	
                          </div>
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Repayments
                        </div>
                        <div className="values">
                          <div className="price">
                            £ 3,193.53
                          </div>
                          <div className="txt">
                            Based on current 
                            variable rate
                          </div> 
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Fee
                        </div>
                        <div className="values">
                          £ 1,875
                        </div>
                      </div>
                    </div>
                    <div className="long-txt">
                      <p className="txt">
                        A flexible mortgage product that tracks the Cynergy Base Rate for 5 years. You 
                        can have the ability to make unlimited overpayments without charge enabling you 
                        to clear your balance quicker than planned.
                      </p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <a href="#javascript" className="btn-right-arrow"
                      onClick={(event) => {
                        event.preventDefault()
                      }}>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="grey-box">
                <div className="lefts">
                  5 Year 
                  Fixed Rate	
                </div>
                <div className="rights">
                  <div className="data-wrap">
                    <div className="three-data">
                      <div className="gropus">
                        <div className="gray-txt">
                          Interest rate
                        </div>
                        <div className="values">
                          <div className="price">
                            2.19%	
                          </div>
                          <div className="txt">
                            Fixed for 5 years, 	
                          </div>
                          <div className="txt">
                            then variable (3.1%)
                          </div>
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Repayments
                        </div>
                        <div className="values">
                          <div className="price">
                            £ 3,248.74
                          </div> 
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Fee
                        </div>
                        <div className="values">
                          £ 1,875
                        </div>
                      </div>
                    </div>
                    <div className="long-txt">
                      <p className="txt">
                      A fixed mortgage product that provides you with a certainty of mortgage payment over 5 years. 
                      You also have the ability to make overpayments up to a certain percentage of the balance to 
                      further reduce your exposure.
                      </p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <a href="#javascript" className="btn-right-arrow"
                      onClick={(event) => {
                        event.preventDefault()
                      }}>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="grey-box">
                <div className="lefts">
                  10 Year 
                  Fixed Rate	
                </div>
                <div className="rights">
                  <div className="data-wrap">
                    <div className="three-data">
                      <div className="gropus">
                        <div className="gray-txt">
                          Interest rate
                        </div>
                        <div className="values">
                          <div className="price">
                            2.84%	
                          </div>
                          <div className="txt">
                            Fixed for 10 years,
                          </div>
                          <div className="txt">
                            then variable (3.1%)
                          </div>
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Repayments
                        </div>
                        <div className="values">
                          <div className="price">
                            £ 3,494.49
                          </div> 
                        </div>
                      </div>
                      <div className="gropus">
                        <div className="gray-txt">
                          Fee
                        </div>
                        <div className="values">
                          £ 1,875
                        </div>
                      </div>
                    </div>
                    <div className="long-txt">
                      <p className="txt">
                        A fixed mortgage product that provides you with a certainty of mortgage payment over 10 years.
                        You also have the ability to make overpayments up to a certain percentage
                        of the balance to further reduce your exposure.
                      </p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <a href="#javascript" className="btn-right-arrow"
                      onClick={(event) => {
                        event.preventDefault()
                      }}>
                    </a>
                  </div>
                </div>
              </div>

            </div>
            <div className="bottom-btns">
              <div className="right-btn">
                <NavLink to="/private_banking/borrowing/mortgage"
                  className="btn btn-green-border" >
                  Recalculate
                </NavLink>
                <a href="#javascript" className="btn btn-green"
                  onClick={(event) => {
                    event.preventDefault()
                    props.onClickGetInTouch();
                  }}>
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MortgageCalculatorStep2Box;
