import React, { useState } from 'react';
import * as _ from 'lodash';
import formValidationSvc from '../../../services/formValidationSvc'
import './styles.scss';

export interface IPrivateBankingEnquiryFormModalProps {
  onClose: () => void;
  onRestart: () => void;
  onSubmit: () => void;
}

export const PrivateBankingEnquiryFormModal: React.FunctionComponent<IPrivateBankingEnquiryFormModalProps> = (props) => {  
  const { onClose, onRestart, onSubmit } = props;
  
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    preferredContactMethod: 'Email',
    emailAddress: '',
    telephone: '',
    readAndAccept: false
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
  
  // on Change Form Checkbox
  const onChangeFormCheckbox = (fieldName: string, value: boolean) => {    
    const formDataTemp = _.cloneDeep(formData);
    formDataTemp[String(fieldName)] = value;

    setFormData(formDataTemp);
  };

  // enabled Form
  // const enabledForm = () => {
  //   let isCheckMethod: boolean = false;
  //   if (formData.preferredContactMethod === 'Email' && formData.emailAddress !== '') {
  //     isCheckMethod = true;
  //   } else if (formData.preferredContactMethod === 'Telephone' && formData.telephone !== '') {
  //     isCheckMethod = true;
  //   }
  //   return (formData.firstName !== ''
  //        && formData.lastName !== ''
  //        && formData.preferredContactMethod !== ''
  //        && isCheckMethod
  //        && formValidationSvc.validateEmail(formData.emailAddress)
  //        && formData.readAndAccept);
  // };

  return (
    <React.Fragment>
      <div className="modal-default section-private-banking-enquiry-form-modal ">
        <div className="modal-main">
          <div className="modal-top">
            <div className="left-txt">
              Private Banking enquiry form
            </div>
            <a href="#javascript" className="btn-close"
              onClick={onClose}>
            </a>
          </div>
          <div className="modal-inner">
            <div className="row">
              <div className="col col-md-7 col-12">
                <div className="form-box">
                  <div className="groups">
                    <div className="label-txt">
                      First Name
                    </div>
                    <div className="input-area">
                      <div className="inputs">
                        <input type="text" placeholder="First name"
                          value={formData.firstName}
                          onChange={(event) => {
                            onChangeFormInput('firstName', event)
                          }} />
                      </div>
                    </div>
                  </div>
                  <div className="groups">
                    <div className="label-txt">
                      Last Name
                    </div>
                    <div className="input-area">
                      <div className="inputs">
                        <input type="text" placeholder="Last name"
                          value={formData.lastName}
                          onChange={(event) => {
                            onChangeFormInput('lastName', event)
                          }} />
                      </div>
                    </div>
                  </div>
                  <div className="groups">
                    <div className="label-txt">
                      Preferred contact method
                    </div>
                    <div className="check-choose">
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-preferred-contact-method-email" name="preferred-contact-method"
                          checked={formData.preferredContactMethod === 'Email'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('preferredContactMethod', 'Email')
                          }} />
                        <label htmlFor="radio-preferred-contact-method-email">
                          Email
                        </label>
                      </div>
                      <div className="radio-wrap">
                        <input type="radio"
                          id="radio-preferred-contact-method-telephone" name="preferred-contact-method"
                          checked={formData.preferredContactMethod === 'Telephone'}
                          onChange={(event) => {
                            onChangeFormSelectRadio('preferredContactMethod', 'Telephone')
                          }} />
                        <label htmlFor="radio-preferred-contact-method-telephone">
                          Telephone
                        </label>
                      </div>
                    </div>
                  </div>
                  {
                    formData.preferredContactMethod === 'Telephone' ? (
                      <div className="groups">
                        <div className="label-txt">
                          Telephone
                        </div>
                        <div className="input-area">
                          <div className="inputs">
                            <input type="tel" placeholder="Telephone"
                              pattern="[0-9]{0,10}"
                              value={formData.telephone}
                              onChange={(event) => {
                                onChangeFormInput('telephone', event)
                              }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="groups">
                        <div className="label-txt">
                          Email Address
                        </div>
                        <div className="input-area">
                          <div className={`inputs ${formValidationSvc.validateEmail(formData.emailAddress) ? '' : 'error'}`}>
                            <input type="text" placeholder="Email address"
                              value={formData.emailAddress}
                              onChange={(event) => {
                                onChangeFormInput('emailAddress', event)
                              }} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <div className="groups desktop-hide tablet-show">
                    <div className="right-check">
                      <div className="checkbox-wrap">
                        <input type="checkbox" id="check-readAndAccept-tablet" 
                          checked={formData.readAndAccept}
                          onChange={(event) => {
                            onChangeFormCheckbox('readAndAccept', event.target.checked)
                          }}/>
                        <label htmlFor="check-readAndAccept-tablet">
                          {`I have read and accept Cynergy Bank's Privacy Policy.`}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-md-5 col-12">
                <div className="rights">
                  <div className="right-img">
                    <img src="../assets/right-become-img.png" alt="img" />
                  </div>
                  <div className="right-check tablet-hide">
                    <div className="checkbox-wrap">
                      <input type="checkbox" id="check-readAndAccept-desktop" 
                        value={formData.readAndAccept}
                        onClick={() => {
                          onChangeFormCheckbox('readAndAccept', !formData.readAndAccept)
                        }}/>
                      <label htmlFor="check-readAndAccept-desktop">
                        {`I have read and accept Cynergy Bank's Privacy Policy.`}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-btn">
            <a href="#javascript" className="btn btn-green-border"
              onClick={onRestart}>
              Restart
            </a>
            <a href="#javascript"
              className={`btn btn-green`}
                onClick={onSubmit}>
              Submit
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrivateBankingEnquiryFormModal;