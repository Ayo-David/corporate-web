import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './styles.scss';

export interface IHowCanIHelpProps {
  dataList: any;
}

export const HowCanIHelp: React.FunctionComponent<IHowCanIHelpProps> = (props) => {
  const { dataList } = props;
  
  const [helpSelection, setHelpSelection] = useState<string>('');
  
  useEffect(() => {
    if (props.dataList) {
      if (props.dataList.data.attributes.field_filter_products.length > 0) {
        setHelpSelection(props.dataList.data.attributes.field_filter_products[0]);
      }
    }
  }, [props.dataList]);

  return (
    <div className="section-how-can-i-help">
      <div className="container">
        <div className="how-can-we-help">
          <div className="gray-title center">How Can We Help?</div>
          <div className="blue-search flex">
            <div className="lefts flex">
              <div className="white-txt">
                {`I'd like to`}
              </div>
              <div className="green-drop">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {helpSelection}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      dataList.data.attributes.field_filter_products.map((item: string, index: number) => (
                        <Dropdown.Item key={index}
                          onClick={(event) => {
                            setHelpSelection(item);
                          }}>
                          {item}
                        </Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="rights">
              <a href="#javascript" className="btn btn-green">
                Show Me How
              </a>
            </div>
          </div>
        </div>
        {/* how-can-we-help */}
      </div>
    </div>
  );
};

export default HowCanIHelp;
