import nprogress from 'accessible-nprogress';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import dataAction from '../../actions/dataAction';
import Paragraph from '../../components/Paragraph';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import {
  CommonDataModel,
  DetailsDataModel,
} from '../../model/common-data.model';
import PageLayout from '../PageLayout';
import moment from 'moment';

import './styles.scss';
import { ConfigService } from '../../services/ConfigService';

const { DATE_FORMAT  }  = ConfigService.getConfig()

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface IPageWithSidebarProps {
  pageId: PageTemplateId;
  parentBreadcrumb: BreadcrumbItemModel[];
  parentField: string;
  dataAction?: any;
  drupalPageTemplate?: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  bannerBgImageSizeOverride?: CSSStyleDeclaration['backgroundSize'];
  bannerBgImagePositionOverride?: CSSStyleDeclaration['backgroundPosition'];
  bannerMaskSizeOverride?: CSSStyleDeclaration['webkitMaskSize'];
}

const PageWithoutSidebar: React.FunctionComponent<IPageWithSidebarProps> = (
  props,
) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemModel[]>([]);
  const [banner, setBanner] = useState<DetailsDataModel | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [templateData, setTemplateData] = useState<CommonDataModel>();
  const [displayParagraph, setDisplayParagraph] = useState<DetailsDataModel>();
  let query = useQuery();

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getDupalPageTemplateData(props.pageId);
  }, [props.dataAction, props.pageId]);

  useEffect(() => {
    if (props.drupalPageTemplate && props.drupalPageTemplate[props.pageId]) {
      const _templateData = props.drupalPageTemplate[props.pageId];
      setBreadcrumb([
        ...props.parentBreadcrumb,
        {
          label: _templateData.data.attributes?.title,
          url: '#',
        },
      ]);
      setBanner(
        _templateData.included.find(
          (item: { type: string }) => item.type === 'paragraph--banner',
        ),
      );

      const _selectedItem = _templateData.included.filter(
        (item: any) => item.type !== 'paragraph--banner',
      )[0];

      setDisplayParagraph(_selectedItem);

      setTitle(_templateData.data.attributes?.title);
      setTemplateData(_templateData);
    }
  }, [props.drupalPageTemplate, props.pageId, props.parentBreadcrumb, query]);

  nprogress.done();

  const formatDate = (value: string) => {
    return moment(value).format(DATE_FORMAT);
  };
  return (
    <PageLayout
      {...props}
      breadcrumb={breadcrumb}
      banner={banner}
      title={title}
      bannerBgImageSizeOverride={props.bannerBgImageSizeOverride}
      bannerBgImagePositionOverride={props.bannerBgImagePositionOverride}
      bannerMaskSizeOverride={props.bannerMaskSizeOverride}
    >
      {templateData && (
        <div className="container container-page-without-sidebar">
          {displayParagraph && (
            <>
              {!banner && displayParagraph.attributes.created && (
                <div className="modified-date">
                  {formatDate(displayParagraph.attributes.created)}
                </div>
              )}
              <Paragraph data={displayParagraph} type="full-page" />
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: any) => ({ ...state.dataReducer });

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(PageWithoutSidebar);
