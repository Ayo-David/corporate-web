import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import './styles.scss';

interface IRatesDropdownProps {
  dataList: any;
  selectedRate: string;
  setSelectedRate: (value: string) => void;
  setPageTemplate: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setSelectedRatesTable: (value: string) => void;
  setSelectedForeignExchange: (value: string) => void;
}

const RatesDropdown: React.FunctionComponent<IRatesDropdownProps> = (props) => {
  const {
    dataList,
    selectedRate,
    setSelectedRate,
    setPageTemplate,
    setSelectedCategory,
    setSelectedRatesTable,
    setSelectedForeignExchange,
  } = props;
  return (
    <div className="section-select-rates">
      <div className="container">
        <div className="select-rates">
          <div className="blue-search flex">
            <div className="lefts flex">
              <div className="green-drop">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedRate}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {dataList.map((item: string, index: number) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setSelectedRate(item);
                          if (item !== selectedRate) {
                            setPageTemplate('');
                            setSelectedCategory('');
                            setSelectedRatesTable('');
                            setSelectedForeignExchange('');
                          }
                        }}>
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="rights">
              <a href="#javascript" className="btn btn-green">
                Show Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RatesDropdown;
