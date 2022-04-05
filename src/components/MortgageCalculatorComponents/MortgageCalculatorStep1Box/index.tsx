import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { NavLink, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import * as _ from 'lodash';
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss';

export interface IMortgageCalculatorStep1BoxProps {
  dataList?: any;
}

const mortgageTypeOptions: string[] = ['Mortgage Type 1', 'Mortgage Type 2', 'Mortgage Type 3'];
const repaymentTypeOptions: string[] = ['Repayment Type 1', 'Repayment Type 2', 'Repayment Type 3'];

export const MortgageCalculatorStep1Box: React.FunctionComponent<IMortgageCalculatorStep1BoxProps> = (props) => {
  const location = useLocation();
  const { dataList } = props;
  
  const [formData, setFormData] = useState<any>({
    areYouAclient: 'Yes',
    mortgageType: '',
    isItANewBuild: 'Yes',
    propertyValue: '',
    deposit: '',
    mortgageTerm: '',
    repaymentType: '',
    
    numberOfApplicants: '1',
    grossSalary: '',
    rentalIncome: '',
    bonus: '',
    investmentsIncome: '',
    
    loanAndCreditRepayments: '',
    committedExpenditure: '',
    livingCosts: '',
    tax: '',
  });
  
  // on Change Form Input box
  const onChangeFormInput = (fieldName: string, event: any) => {    
    const formDataTemp = _.cloneDeep(formData);
    formDataTemp[String(fieldName)] = formValidationSvc.validateInputEnteringPattern(event, formDataTemp[String(fieldName)]);
      
    setFormData(formDataTemp);
  };
  
  // on Change Form Select and Radio box
  const onChangeFormSelectRadio = (fieldName: string, value: string) => {    
    const formDataTemp = _.cloneDeep(formData);
    formDataTemp[String(fieldName)] = value;
      
    setFormData(formDataTemp);
  };
  
  // enabled Form
  const enabledForm = () => {    
    return (formData.areYouAclient !== ''
         && formData.mortgageType !== ''
         && formData.isItANewBuild !== ''
         && formData.propertyValue !== ''
         && formData.deposit !== ''
         && formData.mortgageTerm !== ''
         && formData.repaymentType !== ''
         
         && formData.numberOfApplicants !== ''
         && formData.grossSalary !== ''
         && formData.rentalIncome !== ''
         && formData.bonus !== ''
         && formData.investmentsIncome !== ''
         
         && formData.loanAndCreditRepayments !== ''
         && formData.committedExpenditure !== ''
         && formData.livingCosts !== ''
         && formData.tax !== '');
  };

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location]);

  return (
    <React.Fragment>
      <div className="section section-mortgage-calculator-step-1-box">
        <div className="container">
          <div className="row">
            <div className="col col-md-5 col-12">
              <div className="left-area">
                <div className="sub-title">
                  {dataList.title}
                </div>
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div className="content-area"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.body.processed) }}>
                </div>
              </div>
            </div>
            <div className="col col-md-7 col-12">
              <div className="right-area">
                <div className="form-box">
                  <div className="data-row">
                    <div className="label-txt">
                      Are you a client?
                    </div>
                    <div className="check-choose">
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-are-you-a-client-yes" name="are-you-a-client"
                          checked={formData.areYouAclient === 'Yes'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('areYouAclient', 'Yes')
                          }} />
                        <label htmlFor="radio-are-you-a-client-yes">
                          Yes
                        </label>
                      </div>
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-are-you-a-client-no" name="are-you-a-client"
                          checked={formData.areYouAclient === 'No'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('areYouAclient', 'No')
                          }} />
                        <label htmlFor="radio-are-you-a-client-no">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="label-txt">
                      Mortgage type
                    </div>
                    <div className="input-area">
                      <Dropdown>
                        <Dropdown.Toggle variant="success"
                          className={`${formData.mortgageType === '' ? 'gray-txt' : ''}`}>
                          {formData.mortgageType ? formData.mortgageType : 'Select option'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {
                            mortgageTypeOptions.map((item: string, index: number) => (
                              <Dropdown.Item key={index}
                                onClick={(event) => {
                                  onChangeFormSelectRadio('mortgageType', item)
                                }}>
                                {item}
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="label-txt">
                      Is it a new build?
                      <a href="#javascript" className="icons btn-question"
                        onClick={(event) => {
                          event.preventDefault()
                        }}>&nbsp;</a>
                    </div>
                    <div className="check-choose">
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-is-it-a-new-build-yes" name="is-it-a-new-build"
                          checked={formData.isItANewBuild === 'Yes'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('isItANewBuild', 'Yes')
                          }} />
                        <label htmlFor="radio-is-it-a-new-build-yes">
                          Yes
                        </label>
                      </div>
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-is-it-a-new-build-no" name="is-it-a-new-build"
                          checked={formData.isItANewBuild === 'No'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('isItANewBuild', 'No')
                          }} />
                        <label htmlFor="radio-is-it-a-new-build-no">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="row">
                      <div className="col col-md-6 col-12">
                        <div className="groups">
                          <div className="label-txt">
                            Property value
                          </div>
                          <div className="input-area">
                            <div className="inputs">
                              <span className="icon-price"></span>
                              <input type="text" placeholder="000"
                                pattern="[0-9]{0,8}"
                                className="isPrice"
                                value={formData.propertyValue}
                                onChange={(event) => {
                                  onChangeFormInput('propertyValue', event)
                                }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col col-md-6 col-12">
                        <div className="groups">
                          <div className="label-txt">
                            Deposit
                            <a href="#javascript" className="icons btn-question"
                              onClick={(event) => {
                                event.preventDefault()
                              }}>&nbsp;</a>
                          </div>
                          <div className="input-area">
                            <div className="inputs">
                              <span className="icon-price"></span>
                              <input type="text" placeholder="000"
                                pattern="[0-9]{0,8}"
                                className="isPrice"
                                value={formData.deposit}
                                onChange={(event) => {
                                  onChangeFormInput('deposit', event)
                                }} />
                            </div>
                            <div className="bottom-info-txt">
                              Minimum deposit of 5% (£50,000)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="row">
                      <div className="col col-md-6 col-12">
                        <div className="groups">
                          <div className="label-txt">
                            Mortgage term
                            <a href="#javascript" className="icons btn-question"
                              onClick={(event) => {
                                event.preventDefault()
                              }}>&nbsp;</a>
                          </div>
                          <div className="input-area">
                            <div className="inputs">
                              <input type="text" placeholder="00 YEARS"
                                pattern="[0-9]{0,8}"
                                value={formData.mortgageTerm}
                                onChange={(event) => {
                                  onChangeFormInput('mortgageTerm', event)
                                }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="label-txt">
                      Repayment type
                      <a href="#javascript" className="icons btn-question"
                        onClick={(event) => {
                          event.preventDefault()
                        }}>&nbsp;</a>
                    </div>
                    <div className="input-area">
                      <Dropdown>
                        <Dropdown.Toggle variant="success"
                          className={`${formData.repaymentType === '' ? 'gray-txt' : ''}`}>
                          {formData.repaymentType ? formData.repaymentType : 'Select option'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {
                            repaymentTypeOptions.map((item: string, index: number) => (
                              <Dropdown.Item key={index}
                                onClick={(event) => {
                                  onChangeFormSelectRadio('repaymentType', item)
                                }}>
                                {item}
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="how-much-box">
                    <div className="top-title">
                      How much can I borrow?
                    </div>
                    <div className="data-row">
                      <div className="label-txt">
                        Number of applicants
                      </div>
                      <div className="check-choose">
                        <div className="radio-wrap">
                          <input type="radio"
                            id="radio-number-of-applicants-1" name="number-of-applicants"
                            checked={formData.numberOfApplicants === '1'}
                            onChange={(event) => {
                              onChangeFormSelectRadio('numberOfApplicants', '1')
                            }} />
                          <label htmlFor="radio-number-of-applicants-1">
                            1
                          </label>
                        </div>
                        <div className="radio-wrap">
                          <input type="radio"
                            id="radio-number-of-applicants-2" name="number-of-applicants"
                            checked={formData.numberOfApplicants === '2'}
                            onChange={(event) => {
                              onChangeFormSelectRadio('numberOfApplicants', '2')
                            }} />
                          <label htmlFor="radio-number-of-applicants-2">
                            2
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="your-anual-area">
                      <div className="your-anual-title">
                        Your anual income
                      </div>
                      <div className="data-row">
                        <div className="row">
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Gross Salary
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.grossSalary}
                                    onChange={(event) => {
                                      onChangeFormInput('grossSalary', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Rental Income
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.rentalIncome}
                                    onChange={(event) => {
                                      onChangeFormInput('rentalIncome', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="data-row">
                        <div className="row">
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Bonus
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.bonus}
                                    onChange={(event) => {
                                      onChangeFormInput('bonus', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Investments income
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.investmentsIncome}
                                    onChange={(event) => {
                                      onChangeFormInput('investmentsIncome', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="your-monthly-area">
                      <div className="your-monthly-title">
                        Your monthly expenditure
                      </div>
                      <div className="data-row">
                        <div className="row">
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Loan and Credit repayments
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.loanAndCreditRepayments}
                                    onChange={(event) => {
                                      onChangeFormInput('loanAndCreditRepayments', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Committed expenditure
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.committedExpenditure}
                                    onChange={(event) => {
                                      onChangeFormInput('committedExpenditure', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="data-row">
                        <div className="row">
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Living costs
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.livingCosts}
                                    onChange={(event) => {
                                      onChangeFormInput('livingCosts', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col col-md-6 col-12">
                            <div className="groups">
                              <div className="label-txt">
                                Tax
                                <a href="#javascript" className="icons btn-question"
                                  onClick={(event) => {
                                    event.preventDefault()
                                  }}>&nbsp;</a>
                              </div>
                              <div className="input-area">
                                <div className="inputs">
                                  <span className="icon-price"></span>
                                  <input type="text" placeholder="000"
                                    pattern="[0-9]{0,8}"
                                    className="isPrice"
                                    value={formData.tax}
                                    onChange={(event) => {
                                      onChangeFormInput('tax', event)
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-btn">
                  <NavLink 
                    to={{
                      pathname: '/private_banking/borrowing/mortgage/step2',
                      state: formData,
                    }}
                    className={`btn btn-green ${enabledForm() ? '' : 'disabled'}`}>
                    Calculate
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MortgageCalculatorStep1Box;
