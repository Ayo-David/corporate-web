import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import dataAction from '../../actions/dataAction';
import './styles.scss';
import Header from '../../components/ContactFormComponents/Header';
import FormStep1 from '../../components/ContactFormComponents/FormStep1';
import FormStep2 from '../../components/ContactFormComponents/FormStep2';
import Confirmation from '../../components/ContactFormComponents/Confirmation';

interface IContactFormProps {
  contactFormContent: any;
  dataAction?: any;
}

const ContactForm: React.FunctionComponent<IContactFormProps> = (props) => {
  const [contactFormContent, setContactFormContent] = useState<any>();
  const [stepIndex, setStepIndex] = useState<number>(1);
  const [isExistingCustomer, setIsExistingCustomer] = useState<string>('No');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    props.dataAction.getContactFormContentData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.contactFormContent) {
      setContactFormContent(props.contactFormContent);
    }
  }, [props.contactFormContent]);

  return (
    <>
      {<Header stepIndex={stepIndex} />}
      {contactFormContent && stepIndex === 1 && (
        <FormStep1
          dataList={contactFormContent}
          isExistingCustomer={isExistingCustomer}
          setIsExistingCustomer={setIsExistingCustomer}
          setStepIndex={setStepIndex}
        />
      )}
      {stepIndex === 2 && <FormStep2 setShowConfirmation={setShowConfirmation} />}
      {showConfirmation && <Confirmation onClose={() => history.push('/')} />}
    </>
  );
};

const mapStateToProps = (state: any) => ({ ...state.dataReducer });

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(ContactForm);
