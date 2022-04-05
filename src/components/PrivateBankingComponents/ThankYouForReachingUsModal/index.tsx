import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IThankYouForReachingUsModalProps {
  dataList: any;
  onClose: () => void;
}

export const ThankYouForReachingUsModal: React.FunctionComponent<IThankYouForReachingUsModalProps> = (props) => {  
  const { dataList, onClose } = props;
  
  return (
    <React.Fragment>
      <div className="modal-default section-thank-you-for-reaching-us-modal ">
        <div className="modal-main">
          <div className="modal-top">
            <div className="left-txt">
              {dataList.data.attributes.title}
            </div>
            <a href="#javascript" className="btn-close"
              onClick={onClose}>
            </a>
          </div>
          <div className="modal-inner">
            <div className="row">
              <div className="col col-md-6 col-12">
                <div className="txt-area">
                  {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                  <div className="txt"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataList.data.attributes.body.processed) }}> 
                  </div>
                </div>
              </div>
              <div className="col col-md-6  col-12">
                <div className="right-img">
                  <img src="../assets/right-become-img.png" alt="img" />
                </div>
              </div>
            </div>
            
            <div>
              
            </div>
          </div>
          <div className="bottom-btn">
            <a href="#javascript" className="btn btn-green"
              onClick={onClose}>
              Close
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThankYouForReachingUsModal;