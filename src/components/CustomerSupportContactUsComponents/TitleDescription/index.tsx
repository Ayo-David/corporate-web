import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

interface ITitleDescriptionProps {
  showTitle?: boolean;
  dataList?: any;
}

export const TitleDescription: React.FunctionComponent<ITitleDescriptionProps> = (props) => {
  const { dataList } = props;
  const [selectedOption, setSelectedOption] = useState<any>(dataList ? dataList[0] : null);
  const [resultDetail, setResultDetail] = useState<string>(
    selectedOption ? selectedOption.attributes.field_text.value : null
  );

  return (
    <React.Fragment>
      <div className="section section-title-description">
        <div className="container">
          <div className="content">
            <div className="left">
              {!!dataList &&
                dataList.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`help-option ${
                        selectedOption &&
                        item.attributes.field_title === selectedOption.attributes.field_title
                          ? 'active'
                          : ''
                      }`}>
                      <div
                        className="txt"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedOption === item) {
                            setSelectedOption(null);
                            return;
                          }
                          let _newResultDetail = dataList.find((option: any) => item === option);
                          setResultDetail(_newResultDetail.attributes.field_text.value);
                          setSelectedOption(_newResultDetail);
                        }}>
                        {item.attributes.field_title}

                        <img
                          src="/assets/chevron-bottom.svg"
                          alt="expand"
                          className={`${item === selectedOption ? 'active' : ''}`}
                        />
                      </div>
                      {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}{' '}
                      {/* eslint-disable-next-line react/no-danger */}
                      {item === selectedOption && (
                        <div
                          className="mobile-detail"
                          /* eslint-disable-next-line react/no-danger */
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(resultDetail),
                          }}></div>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="right">
              <div className="detail">
                <div className="field-title hide">{selectedOption?.attributes.field_title}</div>
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}{' '}
                {/* eslint-disable-next-line react/no-danger */}
                <div
                  className="title"
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resultDetail) }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
