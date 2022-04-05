import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { ConfigService } from '../../../services/ConfigService';
import ReCAPTCHA from 'react-google-recaptcha';
import './styles.scss';

const titleData = ['Mr', 'Miss', 'Mrs', 'Ms', 'Dr', 'Prof'];
const helpTopicData = [
  'Online banking help and support',
  'Saving accounts',
  'Complaints',
  'Fraud & security information',
  'Current accounts, debit cards & payment',
  'Loans & mortgages',
  'Bereavement',
];
const helpSubjectData = ['Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5'];
const { GCLOUD_API_KEY } = ConfigService.getConfig()

interface IFormStep2Props {
  setShowConfirmation: (val: boolean) => void;
}

const FormStep2: React.FunctionComponent<IFormStep2Props> = ({ setShowConfirmation }) => {
  const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false);
  const [isHelpTopicOpen, setIsHelpTopicOpen] = useState<boolean>(false);
  const [isHelpSubjectOpen, setIsHelpSubjectOpen] = useState<boolean>(false);
  const [recaptcha, setRecaptcha] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    helpTopic: '',
    helpSubject: '',
    description: '',
  });

  const onEditForm = (field: any, e: any) => {
    if (typeof e !== 'string') {
      setFormData((prevState: any) => ({ ...prevState, [field]: e.target.value }));
    } else setFormData((prevState: any) => ({ ...prevState, [field]: e }));
  };

  const isFormValid = () => {
    return (
      recaptcha &&
      formData.title &&
      formData.firstName &&
      formData.lastName &&
      formData.helpTopic &&
      formData.helpSubject &&
      formData.description
    );
  };

  return (
    <div className="form-container">
      <div className="form-title form-unit">
        <div className="page-title">Contact us form</div>
      </div>
      <div className="form-unit">
        <div className="txt">We aim to respond to you within three working days</div>
        <div className="question">Your details</div>

        <div className="input-container d-block">
          <Dropdown onToggle={() => setIsTitleOpen(!isTitleOpen)}>
            <Dropdown.Toggle className={`${!formData.title && 'faded'} ${isTitleOpen && 'open'}`}>
              {formData.title ? formData.title : 'Select title'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {titleData.map((item: string, index: number) => {
                return (
                  <Dropdown.Item key={index} onClick={() => onEditForm('title', item)}>
                    {item}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="input-container">
          <div className="inputs">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => onEditForm('firstName', e)}
            />
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => onEditForm('lastName', e)}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="inputs">
            <input
              type="tel"
              placeholder="Enter mobile"
              value={formData.mobile}
              pattern="[0-9]{0,10}"
              onChange={(e) => onEditForm('mobile', e)}
            />
          </div>
          <div className="inputs">
            <input
              type="email"
              pattern=".+@.+\..+"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => onEditForm('email', e)}
            />
          </div>
        </div>
      </div>
      <div className="form-unit required-for">
        <div className="page-title">Help required for</div>
        <div className="input-container">
          <div className="inputs help">
            <Dropdown onToggle={() => setIsHelpTopicOpen(!isHelpTopicOpen)}>
              <Dropdown.Toggle
                className={`${!formData.helpTopic && 'faded'} ${isHelpTopicOpen && 'open'}`}>
                {formData.helpTopic ? formData.helpTopic : 'Select topic'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {helpTopicData.map((item: string, index: number) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => onEditForm('helpTopic', item)}>
                      {item}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="inputs help">
            <Dropdown onToggle={() => setIsHelpSubjectOpen(!isHelpSubjectOpen)}>
              <Dropdown.Toggle
                disabled={!formData.helpTopic}
                className={`${!formData.helpSubject && 'faded'} ${isHelpSubjectOpen && 'open'} `}>
                {formData.helpSubject ? formData.helpSubject : 'Select subject'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {helpSubjectData.map((item: string, index: number) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => onEditForm('helpSubject', item)}>
                      {item}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="input-container">
          <div className="inputs textarea">
            <textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => onEditForm('description', e)}
            />
          </div>
        </div>
        <div className="links">
          <div className="question">Helpful links</div>
          <a href="#link" className="link">
            Odyssey Bank authenticator app registration
          </a>
          <a href="#link" className="link">
            Forgotten passcode
          </a>
        </div>
      </div>
      <div className="form-unit">
        <ReCAPTCHA sitekey={GCLOUD_API_KEY || 'Your sitekey goes here'} onChange={() => setRecaptcha(true)} />
        <div className="instructions">
          <ul>
            <li>
              Please tick the above box to confirm you are a real person completing the application
              (not a piece of automated software)
            </li>
            <li>
              Once you click &quot;I&quot;m not a robot&quot; you may proceed to the confirmation
              page or you may have a security question to complete
            </li>
            <li>
              If you are asked to answer a security question, you can click the round arrow to
              generate an alternative question if required
            </li>
          </ul>
        </div>
        <button
          className={`btn btn-green ${isFormValid() ? '' : 'disabled'}`}
          onClick={() => {
            if (isFormValid()) {
              setShowConfirmation(true);
            }
          }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormStep2;
