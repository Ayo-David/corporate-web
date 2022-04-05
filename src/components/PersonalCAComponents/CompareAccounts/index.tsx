import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';
import {NavLink} from 'react-router-dom';

export interface ICompareAccountsProps {
  data: any,
}

export const CompareAccounts: React.FunctionComponent<ICompareAccountsProps> = (props) => {

  return (
    <div className="compare-personal-accounts" id="compare">
      <div className="container flex flex-column align-items-center">
        <div className="gray-title center">compare our Current ACCOUNT products</div>
        <div className="title">Personal Current Accounts</div>

        <div className="card-row row">
          {props.data?.data.map((account: any, ind: number) =>
            <div className="col-md-6 col-12" key={ind}>
              <div className="account-type">
                <div className="header">
                  <div className="header-title">{account.attributes.field_title}</div>
                  <div className="header-sub-title">{account.attributes.field_subtitle}</div>
                </div>
                <div className="content">
                  <div className="gray-title">
                    next generation digital products
                  </div>
                  <div className={`value ${account.attributes.field_next_gen_product === 'included' && ' included'}`}>
                    {account.attributes.field_next_gen_product}
                  </div>
                  <div className="gray-title">
                    CHAPS, SWIFT & SEPA PAYMENTS
                  </div>
                  <div className={`value ${account.attributes.field_chaps_swift === 'included' && ' included'}`}>
                    {account.attributes.field_chaps_swift}
                  </div>
                  <div className="gray-title">
                    Foreign currency payments
                  </div>
                  <div className={`value ${account.attributes.field_foreign_currency === 'included' && ' included'}`}>
                    {account.attributes.field_foreign_currency}
                  </div>
                  <div className="add-ons">
                    <div className="add-ons-title">
                      Add Ons:
                    </div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                    <div className="add-ons-value" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(account.attributes.field_add_ons.processed) }}/>
                  </div>

                  <div className="flex flex-row justify-content-center">
                    <NavLink to={account.attributes.field_single_link.uri.replace('internal:', '')} className="btn btn-green">{account.attributes.field_single_link.title}</NavLink>
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

export default CompareAccounts;
