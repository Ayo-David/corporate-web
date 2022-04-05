import * as React from 'react';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import Breadcrumb from '../../components/Breadcrumb';
import TopBanner from '../../components/TopBanner';
import { connect } from 'react-redux';
import {
  CommonDataModel,
  CommonArrayDataModel,
  CommonObjectDataModel,
} from '../../model/common-data.model';
import { bindActionCreators, Dispatch } from 'redux';
import SecurityLanding from '../../components/SecurityComponents/SecurityLanding';

const parentField = 'About Us';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Security',
    url: '#',
  },
];

export interface ISecurityProps {
  headerMenus: { [parentField: string]: CommonDataModel };
  securitiesContent: CommonObjectDataModel;
  securityCategories: CommonArrayDataModel;
  footer: CommonDataModel;
  dataAction: any;
}

const Security: React.FunctionComponent<ISecurityProps> = (props) => {
  const {
    headerMenus,
    securitiesContent,
    securityCategories,
    footer,
    dataAction,
  } = props;

  const headerMenu = headerMenus[String(parentField)];
  const banner = React.useMemo(() => {
    if (securitiesContent) {
      const included = securitiesContent.included.find(i => i.type === 'paragraph--banner');
      return {
        data: included,
      } as CommonObjectDataModel;
    }
  }, [securitiesContent]);

  React.useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    dataAction.getHeaderMenuData(parentField);
    dataAction.getFooterData();
    dataAction.getSecuritiesContentData();
    dataAction.getSecurityCategoriesData();
  }, [dataAction]);

  nprogress.done();

  return (
    <>
      {headerMenu && (
        <Header
          activeMenu={parentField}
          dataList={headerMenu}
          headers={headerMenus}
          dataAction={dataAction}
        />
      )}
      {banner && (
        <TopBanner
          dataList={banner}
          type="page-template-banner"
          titlePage={securitiesContent.data.attributes.title}
          bgImageSizeOverride="auto 100%"
        />
      )}
      <Breadcrumb itemArray={breadcrumbs} />
      {securitiesContent && securityCategories && (
        <SecurityLanding
          securitiesContent={securitiesContent}
          securityCategories={securityCategories}
        />
      )}
      <div className="footer">
        {footer && (<Footer dataList={footer} />)}
        {footer && (<LowestFooter dataList={footer} />)}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ...state.dataReducer,
});

const matchDispatchToProps = (dispatch: Dispatch) => ({
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Security);
