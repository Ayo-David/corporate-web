import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import dataSvc from '../../../services/dataSvc';
import * as _ from 'lodash';
import formValidationSvc from '../../../services/formValidationSvc';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';

interface IModalContactUsProps {
  open: boolean;
  onClose: () => void;
}

export const ModalContactUs: React.FunctionComponent<IModalContactUsProps> = (
  props,
) => {
  const { open, onClose } = props;
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  });
  const [selectTextInput, setSelectTextInput] = useState<string>('Email');
  const [thanksNoteData, setThanksNoteData] = useState<any>();

  const validateEmail = (email: string) => {
    // eslint-disable-next-line security/detect-unsafe-regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // on Change Form Input box
  const onChangeFormInput = (fieldName: string, event: any) => {
    const formDataTemp = _.cloneDeep(formData);
    formDataTemp[String(fieldName)] = formValidationSvc.validateInputEnteringPattern(
      event,
      formDataTemp[String(fieldName)],
    );

    setFormData(formDataTemp);
  };

  // enabled Form
  const enabledForm = () => {
    let isDisabled = true;
    if (selectTextInput === 'Email') {
      isDisabled = formData.firstName !== '' && formData.lastName !== '' && formData.emailAddress !== '' && validateEmail(formData.emailAddress);
    } else {
      isDisabled = formData.firstName !== '' && formData.lastName !== '' && formData.phoneNumber !== '';
    }
    return isDisabled;
  };

  // handle submit form
  const handleSubmit = () => {
    dataSvc.getThanksNoteData().then((data) => {
      setThanksNoteData(data);
    })
  }

  return (
    <Modal show={open} centered={true} dialogClassName="modal-contact-us">
      <Modal.Header>
        <Modal.Title>Contact us</Modal.Title>
        <button className="btn btn-close" onClick={onClose}>
          <i className="icon icon-close"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        {
          !thanksNoteData && (
            <div className="box-form">
              <div className="data-row">
                <div className="label-txt">First Name</div>
                <div className="input-area">
                  <div className="inputs">
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(event) => {
                        onChangeFormInput('firstName', event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="data-row">
                <div className="label-txt">Last Name</div>
                <div className="input-area">
                  <div className="inputs">
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(event) => {
                        onChangeFormInput('lastName', event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="data-row radio-row">
                <div className="label-txt">Text input resting</div>
                <div className="check-choose">
                  <div className="radio-wrap">
                    <input
                      type="radio"
                      id="radio-text-input-resting-email"
                      name="text-input-resting"
                      value={selectTextInput}
                      checked={selectTextInput === 'Email'}
                      onChange={(event) => {
                        setSelectTextInput('Email');
                      }}
                    />
                    <label htmlFor="radio-text-input-resting-email">Email</label>
                  </div>
                  <div className="radio-wrap">
                    <input
                      type="radio"
                      id="radio-text-input-resting-phone"
                      name="text-input-resting"
                      value={selectTextInput}
                      checked={selectTextInput === 'Phone'}
                      onChange={(event) => {
                        setSelectTextInput('Phone');
                      }}
                    />
                    <label htmlFor="radio-text-input-resting-phone">Telephone</label>
                  </div>
                </div>
              </div>
              {
                selectTextInput === 'Email' ? (
                  <div className="data-row">
                    <div className="label-txt">Email Address</div>
                    <div className="input-area">
                      <div className="inputs">
                        <input
                          type="text"
                          placeholder="Email address"
                          value={formData.emailAddress}
                          onChange={(event) => {
                            onChangeFormInput('emailAddress', event);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="data-row">
                    <div className="label-txt">Phone Number</div>
                    <div className="input-area">
                      <div className="inputs">
                        <input
                          type="text"
                          pattern="[0-9]{0,8}"
                          placeholder="Phone number"
                          value={formData.phoneNumber}
                          onChange={(event) => {
                            onChangeFormInput('phoneNumber', event);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
        {
          thanksNoteData && (
            <div className="box-thanks-note">
              <div className="groups">
                <img src="/assets/illustration-bg.svg" alt="IMG" />
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                <div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thanksNoteData.data.attributes.body.value) }}></div>
              </div>
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        {
          !thanksNoteData ? (
            <React.Fragment>
              <button className="btn btn-green-border" onClick={onClose}>Cancel</button>
              <button className={`btn btn-green ${enabledForm() ? '' : 'disabled'}`} onClick={handleSubmit}>Submit</button>
            </React.Fragment>
          ) : (
            <button className="btn btn-green" onClick={onClose}>OK</button>
          )
        }
      </Modal.Footer>
    </Modal>
  );
};
