import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import moment from 'moment';
import { ConfigService } from '../../../services/ConfigService';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import './styles.scss';

const { DATE_TIME_FORMAT } = ConfigService.getConfig();

interface IFeesAndRatesPageBodyProps {
  postText?: any;
  preText?: any;
  selectedRate: string;
  categories?: string[];
  rateTables?: { Categoty: string; Rate_Table: string; body: string }[];
  selectedCategory: string;
  setSelectedCategory: (i: string) => void;
  selectedRatesTable: string;
  setSelectedRatesTable: (i: string) => void;
  pageTemplate: string;
  setPageTemplate: (i: string) => void;
  lastUpdatedPage?: string;
  foreignExchangeData?: { Rate_Table: string, body: string }[];
  selectedForeignExchange: string;
  setSelectedForeignExchange: (i: string) => void;
}

const FeesAndRatesPageBody: React.FunctionComponent<IFeesAndRatesPageBodyProps> =
  (props) => {
    const {
      preText,
      postText,
      selectedRate,
      categories,
      rateTables,
      selectedCategory,
      setSelectedCategory,
      selectedRatesTable,
      setSelectedRatesTable,
      pageTemplate,
      setPageTemplate,
      lastUpdatedPage,
      foreignExchangeData,
      selectedForeignExchange,
      setSelectedForeignExchange,
    } = props;
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isRatesTableOpen, setIsRatesTableOpen] = useState(false);
    const [isForeignExchangeOpen, setIsForeignExchangeOpen] = useState(false);

    return (
      <div className="section-fees-rates-page-body">
        <div className="container">
          <div className="title-txt-big">{selectedRate}</div>
          {selectedRate === 'Interest Rates' && (
            <React.Fragment>
              <div className="section-dropdowns">
                <div className="categories">
                  <div className="dropdown-label">1. Select your category</div>
                  <Dropdown
                    onToggle={() => {
                      setIsCategoriesOpen(!isCategoriesOpen);
                    }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {isCategoriesOpen
                        ? 'Choose your category here'
                        : selectedCategory}{' '}
                      {!selectedCategory && !isCategoriesOpen ? 'Choose your category here' : ''}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {!!categories &&
                        categories.map((item: string, index: number) => (
                          <Dropdown.Item
                            key={index}
                            onClick={(event) => {
                              setSelectedCategory(item);
                              if (!!selectedRatesTable) {
                                setSelectedRatesTable('');
                                setPageTemplate('');
                              }
                            }}>
                            {item}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="rates">
                  <div className="dropdown-label">2. Select rates table</div>
                  <Dropdown
                    onToggle={() => {
                      setIsRatesTableOpen(!isRatesTableOpen);
                    }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {isRatesTableOpen
                        ? 'Choose your rates here'
                        : selectedRatesTable}
                      {!selectedRatesTable && !isRatesTableOpen ? 'All Rates' : ''}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {selectedCategory.trim() === '' && (
                        <Dropdown.Item
                          key={0}
                          onClick={(event) => {
                            setSelectedRatesTable('All Rates');
                          }}>
                          All Rates
                        </Dropdown.Item>
                      )}
                      {!!rateTables && (
                        rateTables
                        .filter((i: any) => i.Categoty === selectedCategory)
                        .map((item: any, index: number) => (
                          index === 0 ?
                            <React.Fragment>
                              <Dropdown.Item
                                key={index}
                                onClick={(event) => {
                                  setSelectedRatesTable('All Rates');
                                }}>
                                All Rates
                              </Dropdown.Item>
                              <Dropdown.Item
                                key={index + 1}
                                onClick={(event) => {
                                  setSelectedRatesTable(item.Rate_Table);
                                }}>
                                {item.Rate_Table}
                              </Dropdown.Item>
                            </React.Fragment>
                          :
                            <Dropdown.Item
                              key={index + 1}
                              onClick={(event) => {
                                setSelectedRatesTable(item.Rate_Table);
                              }}>
                              {item.Rate_Table}
                            </Dropdown.Item>
                        ))  
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {!!preText && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="pre-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preText.value) }}></div>
              )}
              {!!rateTables && (selectedRatesTable === 'All Rates' || selectedRatesTable.trim() === '') && (
                selectedCategory.trim() === ''
                ?
                  rateTables.map((item: any) => (
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                    <div
                      className="section-page-body"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }}></div>
                  ))
                :
                  rateTables
                  .filter((i: any) => i.Categoty === selectedCategory)
                  .map((item: any) => (
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                    <div
                      className="section-page-body"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }}></div>
                  ))
              )}
              {selectedRatesTable !== 'All Rates' && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="section-page-body"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageTemplate) }}></div>
              )}
              {!!postText && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="post-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postText.value) }}></div>
              )}
            </React.Fragment>
          )}
          {selectedRate === 'Foreign Exchange' && (
            <React.Fragment>
              <div className="section-dropdowns">
                <div className="foreign-exchange">
                  <div className="dropdown-label">1. Select your category</div>
                  <Dropdown
                    onToggle={() => {
                      setIsForeignExchangeOpen(!isForeignExchangeOpen);
                    }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {isForeignExchangeOpen
                        ? 'Choose your category here'
                        : selectedForeignExchange}{' '}
                      {!selectedForeignExchange && !isForeignExchangeOpen
                        ? 'Choose your category here'
                        : ''}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {!!foreignExchangeData &&
                        foreignExchangeData.map(
                          (item: any, index: number) => (
                            index === 0 ?
                              <React.Fragment>
                                <Dropdown.Item
                                  key={index}
                                  onClick={(event) => {
                                    setSelectedForeignExchange('All Rates');
                                  }}>
                                  All Rates
                                </Dropdown.Item>
                                <Dropdown.Item
                                  key={index + 1}
                                  onClick={(event) => {
                                    setSelectedForeignExchange(item.Rate_Table);
                                  }}>
                                  {item.Rate_Table}
                                </Dropdown.Item>
                              </React.Fragment>
                            :
                              <Dropdown.Item
                                key={index + 1}
                                onClick={(event) => {
                                  setSelectedForeignExchange(item.Rate_Table);
                                }}>
                                {item.Rate_Table}
                              </Dropdown.Item>
                          ),
                        )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {!!preText && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="pre-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preText.value) }}></div>
              )}


              {!!foreignExchangeData && (selectedForeignExchange === 'All Rates' || selectedForeignExchange.trim() === '') && (
                selectedCategory.trim() === ''
                ?
                foreignExchangeData.map((item: any) => (
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                    <div
                      className="section-page-body"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }}></div>
                  ))
                :
                foreignExchangeData
                  .filter((i: any) => i.Categoty === selectedCategory)
                  .map((item: any) => (
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                    <div
                      className="section-page-body"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }}></div>
                  ))
              )}

              {selectedForeignExchange !== 'All Rates' && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="section-page-body"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageTemplate) }}></div>
              )}
              {!!postText && (
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                <div
                  className="post-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postText.value) }}></div>
              )}
            </React.Fragment>
          )}
          {selectedRate !== 'Interest Rates' &&
            selectedRate !== 'Foreign Exchange' && (
              <React.Fragment>
                {!!preText && (
                  // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                  <div
                    className="pre-text"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preText.value) }}></div>
                )}
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                <div
                  className="section-page-body"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageTemplate) }}></div>
                {selectedRate === 'Base Rates' && (
                  <div className="section-page-body mt-0">
                    Last updated: {moment(lastUpdatedPage).format(DATE_TIME_FORMAT)}
                  </div>
                )}
                {!!postText && (
                  // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
                  <div
                    className="post-text"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postText.value) }}></div>
                )}
              </React.Fragment>
            )}
        </div>
      </div>
    );
  };
export default FeesAndRatesPageBody;
