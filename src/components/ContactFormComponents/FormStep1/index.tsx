import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import './styles.scss';

interface IFormStep1Props {
  dataList: any;
  isExistingCustomer: string;
  setIsExistingCustomer: (val: string) => void;
  setStepIndex: (val: number) => void;
}

const FormStep1: React.FunctionComponent<IFormStep1Props> = ({
  dataList,
  isExistingCustomer,
  setIsExistingCustomer,
  setStepIndex,
}) => {
  const [includedItems, setIncludedItems] = useState<any>();
  const [privacyPolicy, setPrivacyPolicy] = useState<any>();
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  useEffect(() => {
    const included = dataList.included.filter(
      (item: any) =>
        item.type === 'paragraph--title_description' &&
        item.attributes.field_title !== 'Privacy Policy'
    );
    setIncludedItems(included);
    const privacyPolicy = dataList.included.find(
      (item: any) => item.attributes.field_title === 'Privacy Policy'
    );
    setPrivacyPolicy(privacyPolicy);
  }, [dataList]);

  return (
    <div className="form-container">
      <div className="form-title form-unit">
        <div className="page-title">{dataList.data.attributes.title}</div>
      </div>
      <div className="form-unit">
        <div className="question">Are you an existing customer?</div>
        <div className="data-row radio-row">
          <div className="check-choose">
            <div className="radio-wrap">
              <input
                type="radio"
                id="radio-text-yes"
                name="text-input-existing"
                checked={isExistingCustomer === 'Yes'}
                onChange={(event) => {
                  setIsExistingCustomer('Yes');
                }}
              />
              <label htmlFor="radio-text-yes">Yes</label>
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                id="radio-text-no"
                name="text-input-existing"
                checked={isExistingCustomer === 'No'}
                onChange={(event) => {
                  setIsExistingCustomer('No');
                }}
              />
              <label htmlFor="radio-text-no">No</label>
            </div>
          </div>
        </div>
      </div>
      {includedItems &&
        includedItems.map((item: any, index: number) => {
          return (
            <div className="form-unit" key={index}>
              <div className="question">{item.attributes.field_title}</div>
              {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
              <div
                className="detail" // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.attributes.field_text.value),
                }}></div>
              {index === includedItems.length - 1 && !!privacyPolicy && (
                <>
                  <div className="policy">
                    <div className="title">{privacyPolicy.attributes.field_title}</div>{' '}
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div
                      className="detail privacy-policy" // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(privacyPolicy.attributes.field_text.value),
                      }}></div>
                  </div>
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      id="check-readAndAccept"
                      value={termsAccepted.toString()}
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <label htmlFor="check-readAndAccept">
                      I have read and accept Cynergy Bank&apos;s Privacy Policy.
                    </label>
                  </div>
                  <div className="next">
                    <button
                      className={`btn btn-green ${!termsAccepted && 'disabled'}`}
                      onClick={() => {
                        setStepIndex(2);
                        window.scrollTo(0, 0);
                      }}>
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default FormStep1;
