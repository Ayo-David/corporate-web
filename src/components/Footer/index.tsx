import React, {useEffect, useState} from 'react';
import { CommonDataModel } from '../../model/common-data.model';
import * as _ from 'lodash';
import './styles.scss';
import { ConfigService } from '../../services/ConfigService';

const { CMS_API_URL } = ConfigService.getConfig()
export interface IFooterProps {
  dataList: CommonDataModel;
}

export const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const [openedArray, setOpenedArray] = useState<boolean[]>([]);
  
  useEffect(() => {
    if (props.dataList) {
      const openedArrayTemp: boolean[] = [];
      props.dataList.included.forEach((item, index) => {
        openedArrayTemp.push(false)
      });

      setOpenedArray(openedArrayTemp);
    }
  }, [props.dataList]);

  // change Arrow
  const changeArrow = (index: number) => {
    const openedArrayTemp = _.cloneDeep(openedArray);
    openedArrayTemp[Number(index)] = !openedArrayTemp[Number(index)];

    setOpenedArray(openedArrayTemp);
  };

  const { dataList } = props;

  return (
    <div className="footer-menu">
      <div className="container">
        {
          dataList?.included.map((item: any, index: number) => (
            <div
              className={`footer-menu-content ${openedArray[Number(index)] ? 'open' : ''} ${item.attributes.field_title ? 'shown-item' : 'hide'}`}
              key={index}>
              <h5
                onClick={(event) => {
                  changeArrow(index);
                }}>
                {item.attributes.field_title}
                <a href="#javascript" className="btn-arrow"
                  onClick={(event) => {
                    event.preventDefault()
                  }}>
                  &nbsp;
                </a>
              </h5>
              {item.attributes.field_title && (
              <ul>
                {
                  item.attributes.field_links.map((subItem: any, subIndex: number) => (
                    <li key={subIndex}>
                      <a href={`${subItem.uri.replace('internal:', CMS_API_URL)}`}>
                        {subItem.title}
                      </a>
                    </li>
                  ))
                }
              </ul>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Footer;
