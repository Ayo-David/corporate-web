import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import * as _ from 'lodash';
import './styles.scss';

export interface IBecomeAClientModalProps {
  titleData: any;
  dataList: any;
  onClose: () => void;
  onNext: () => void;
}

export const BecomeAClientModal: React.FunctionComponent<IBecomeAClientModalProps> = (props) => {  
  const { titleData, dataList, onClose, onNext } = props;
  
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [shownQuestionIndex, setShownQuestionIndex] = useState<number>(0);
  
  const [formData, setFormData] = useState<string[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      const formDataTemp: string[] = [];
      props.dataList.forEach((item: any) => {
        formDataTemp.push('');
      });
      
      setFormData(formDataTemp)
    }
  }, [props.dataList]);
  
  // on Change Form Select and Radio box
  const onChangeFormSelectRadio = (index: number, value: string) => {    
    const formDataTemp: any[] = _.cloneDeep(formData);
    formDataTemp[Number(index)] = value;
      
    setFormData(formDataTemp);
    
    if (formData[Number(index)] === '' && index < formData.length - 1) {
      setIsLoadingQuestion(true);
      setTimeout( () => {
        setIsLoadingQuestion(false);
        setShownQuestionIndex(shownQuestionIndex + 1)
      }, 2000);
    }
  };
  
  // enabled Form
  const enabledForm = () => {    
    let passed = true;
    formData.forEach((item: any) => {
      if (item === '') {
        passed = false;
      }
    });
    
    return passed;
  };

  const onRestart = () => {
    const formDataTemp: string[] = [];
    props.dataList.forEach((item: any) => {
      formDataTemp.push('');
    });
      
    setFormData(formDataTemp);
    setIsLoadingQuestion(false);
    setShownQuestionIndex(0);
  }

  return (
    <React.Fragment>
      <div className="modal-default section-become-a-client-modal ">
        <div className="modal-main">
          <div className="modal-top">
            <div className="left-txt">
              {titleData.title}
            </div>
            <a href="#javascript" className="btn-close"
              onClick={onClose}>
            </a>
          </div>
          <div className="modal-inner">
            <div className="row">
              <div className="col col-md-7 col-12">
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div className="bold-txt"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(titleData.body.processed) }}>
                </div>
                <div className="form-box">
                  {
                    dataList.map((item: any, index: number) => (
                      <React.Fragment key={index}>
                        {shownQuestionIndex >= index && (
                          <div className="groups">
                            <div className="label-txt">
                              {item.attributes.field_question}
                            </div>
                            <div className="check-choose">
                              {
                                item.attributes.field_options.map((optionItem: any, optionIndex: number) => {
                                  if (optionIndex === 0 && !formData[Number(index)] && !formData[index+1]) {
                                    onChangeFormSelectRadio(index, optionItem);
                                  }
                                  return (
                                    <div className="radio-wrap" key={optionIndex}>
                                      <input type="radio"
                                        id={`radio-are-you-looking-to-borrow-more-yes-${index}-${optionIndex}`}
                                        name={`are-you-looking-to-borrow-more-${index}`}
                                        checked={formData[Number(index)] === optionItem}
                                        onChange={(event) => {
                                          onChangeFormSelectRadio(index, optionItem)
                                        }} />
                                      <label htmlFor={`radio-are-you-looking-to-borrow-more-yes-${index}-${optionIndex}`}>
                                        {optionItem}
                                      </label>
                                    </div>
                                  );
                                })
                              }
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))
                  }
                  {isLoadingQuestion && (
                  <div className="loading-wrap">
                    <img src="../assets/icon-loading.svg" alt="img" />
                  </div>
                  )}
                </div>
              </div>
              <div className="col col-md-5 col-12">
                <div className="right-img">
                  <img src="../assets/right-become-img.png" alt="img" />
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
              className={`btn btn-green ${isLoadingQuestion ? 'loading' : ''} ${enabledForm() ? '' : 'disabled'}`}
                onClick={onNext}>
              Next
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BecomeAClientModal;