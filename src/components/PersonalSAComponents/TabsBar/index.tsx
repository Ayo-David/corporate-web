import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';
import dataSvc from '../../../services/dataSvc';
import nprogress from 'accessible-nprogress';
import {useWindowSize} from '../../../hooks/useWindowSize';
import { removeInternal } from '../../../helpers/url';

export interface ITabsBarProps {
  tabIndex: number;
  dataList: any;
  onClickTab: (tabIndex: number) => void
}

export const TabsBar: React.FunctionComponent<ITabsBarProps> = (props) => {
  const { tabIndex, dataList, onClickTab } = props;

  const [accounts, setAccounts] = useState([]);
  const [width] = useWindowSize();

  useEffect(() => {
    nprogress.configure({parent: 'main'});
    nprogress.start();
    const fetchAccounts = async () => {

      let url= new URL(dataList[props.tabIndex].relationships.field_products_to_compare.links.related.href)
      let response = await dataSvc.getData(url.pathname + url.search)
      setAccounts(response.data);
      nprogress.done();
    }
    fetchAccounts().then(r => {});

    // eslint-disable-next-line
  }, [props.tabIndex]);

  return (
    <div className="section-tab-bar" id="compare">
      <div className="container">
        <div className="up-txt">
          Compare our savings products
        </div>
        <div className="nav-bar">
          <ul>
            {
              dataList.map((item: any, index: number) => (
                <li key={index}>
                  <a href="#javascript"
                    className={`tab-items ${tabIndex === index ? 'current' : ''}`}
                    onClick={(event) => {
                      onClickTab(index);
                      event.preventDefault();
                    }}>
                    {item.attributes.field_title}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>


        <div className="card-row row">
          {accounts.map((account: any, ind: number) =>
            <div className={`${width <= 1400 ? 'col-lg-4' : 'col-lg-3'} col-md-6 col-12`} key={ind}>
              <div className="account-type">
                <div className="header flex flex-column justify-content-between align-items-start">
                  <div className={`header-title ${(account.attributes.field_title).trim().split(' ').length > 3 
                    ? 'long' 
                    : (account.attributes.field_title).trim().split(' ').length > 2 
                      ? 'medium'
                      : 'short'
                  }`}>
                    {account.attributes.field_title}
                  </div>
                  <div className="header-sub-title">{account.attributes.field_subtitle}</div>
                </div>
                <div className="aer border-bottom-1">
                  <div className="content">
                    <div className="gray-title">
                      AER
                    </div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                    <div className="value" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(account.attributes.field_aer.processed)}}/>
                  </div>
                </div>
                <div className="opens-with border-bottom-1">
                  <div className="content">
                    <div className="gray-title">
                      OPENS WITH
                    </div>
                    <h2>
                      {account.attributes.field_opens_with}
                    </h2>
                  </div>
                </div>
                <div className="acc-management border-bottom-1">
                  <div className="content">
                    <div className="gray-title">
                      ACCOUNT MANAGEMENT
                    </div>
                    <div className="managements flex flex-row flex-wrap">
                      <p className="icon wifi">Online</p>
                      <p className="icon mail">Post</p>
                    </div>
                  </div>
                </div>
                <div className="withdrawal border-bottom-1">
                  <div className="content">
                    <div className="gray-title">
                      WITHDRAWALS
                    </div>
                    <ul>
                      {
                        account.attributes.field_withdrawals.map((item: any, ind: number) =>
                          <li key={ind}>{item}</li>
                        )
                      }
                    </ul>
                  </div>
                </div>
                <div className="issue">
                  <div className="content pt-0">
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                    <div className="issue-text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(account.attributes.field_issue?.processed)}}/>
                  </div>
                </div>
                <div className="content pt-0">
                  <div className="flex flex-row justify-content-center">
                    <a 
                      href={removeInternal(account.attributes.field_apply_link.uri)} 
                      className="btn btn-green">
                        {account.attributes.field_apply_link.title}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsBar;
