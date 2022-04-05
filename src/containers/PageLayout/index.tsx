import React, { useEffect, useState } from 'react';
import nprogress from 'accessible-nprogress';

import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import {
  CommonDataModel,
  DetailsDataModel,
} from '../../model/common-data.model';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import Breadcrumb from '../../components/Breadcrumb';
import TopBannerPureLabel from '../../components/TopBannerPureLabel';

interface IPageLayoutProps {
  parentField: string;
  breadcrumb: BreadcrumbItemModel[];
  banner?: DetailsDataModel;
  title?: string;

  headerMenus: { [parentField: string]: CommonDataModel };
  footer?: CommonDataModel;
  dataAction?: any;

  bannerBgImageSizeOverride?: CSSStyleDeclaration['backgroundSize'];
  bannerBgImagePositionOverride?: CSSStyleDeclaration['backgroundPosition'];
  bannerMaskSizeOverride?: CSSStyleDeclaration['webkitMaskSize'];
}
// Layout for Page Template
const PageLayout: React.FunctionComponent<IPageLayoutProps> = (props) => {
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();
  const [banner, setBanner] = useState<CommonDataModel>();

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getHeaderMenuData(props.parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction, props.parentField]);

  useEffect(() => {
    if (props.headerMenus && props.headerMenus[props.parentField]) {
      setHeaderMenu(props.headerMenus[props.parentField]);
    }
  }, [props.headerMenus, props.parentField]);

  useEffect(() => {
    if (props.footer) {
      setFooter(props.footer);
    }
  }, [props.footer]);

  useEffect(() => {
    if (props.banner) {
      setBanner({
        data: props.banner as any,
        included: [],
        links: {
          self: null,
        },
        jsonapi: { version: '', meta: {} },
      });
    }
  }, [props.banner]);

  nprogress.done();

  return (
    <React.Fragment>
      {!!headerMenu && (
        <Header
          activeMenu={props.parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction}
        />
      )}
      {!!banner && (
        <TopBanner
          titlePage={props.title}
          dataList={banner}
          type="page-template-banner"
          bgImageSizeOverride={props.bannerBgImageSizeOverride}
          bgImagePositionOverride={props.bannerBgImagePositionOverride}
          bannerMaskSizeOverride={props.bannerMaskSizeOverride}
        />
      )}

      {!banner && props.title && <TopBannerPureLabel title={props.title} />}

      <Breadcrumb itemArray={props.breadcrumb} className="page-template" />

      {props.children}

      <div className="footer">
        {!!footer && <Footer dataList={footer} />}

        {!!footer && <LowestFooter dataList={footer} />}
      </div>
    </React.Fragment>
  );
};

export default PageLayout;
