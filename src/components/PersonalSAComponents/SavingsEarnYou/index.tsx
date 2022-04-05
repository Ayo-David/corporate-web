import React from 'react';
import './styles.scss';
import Dropdown from 'react-bootstrap/Dropdown';

export const SavingsEarnYou: React.FunctionComponent = () => {

  return (
    <div className="savings-earn-you">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section-title">
              What could your savings earn you?
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col first-col">
            <div className="row">
              <div className="col">

                <div className="dropdown-label">Account type</div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Fixed Rate Cash ISA
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Fixed Rate Cash ISA
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="row">
              <div className="col col-lg-6 col-12">

                <label htmlFor="amount-to-save" className="dropdown-label">Enter amount to save</label>
                <input id="amount-to-save" type="text" className="input-text" defaultValue="£1000.00" />
              </div>
              <div className="col col-lg-6 col-12">

                <div className="dropdown-label">Select account term</div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    24 Months
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      24 Months
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row box-row h-100">
              <div className="col box-col col-lg-6 col-12">
                <div className="box">
                  <div className="box-title">Cynergy Bank’s Interest Rate (AER):</div>
                  <div className="box-value">0.50%</div>
                </div>
              </div>
              <div className="col box-col col-lg-6 col-12">
                <div className="box total">
                  <div className="box-title">Total Interest After 12 Months (Assuming no additional deposits / withdrawals)</div>
                  <div className="box-value interest">£5.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsEarnYou;
