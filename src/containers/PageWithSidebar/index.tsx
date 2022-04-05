import nprogress from 'accessible-nprogress';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import dataAction from '../../actions/dataAction';
import Paragraph from '../../components/Paragraph';
import TemplatePageSidebar from '../../components/TemplatePageSidebar';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import {
  CommonDataModel,
  DetailsDataModel,
} from '../../model/common-data.model';
import dataSvc from '../../services/dataSvc';
import PageLayout from '../PageLayout';

import './styles.scss';

interface IPageWithSidebarProps {
  pageId: PageTemplateId;
  parentBreadcrumb: BreadcrumbItemModel[];
  parentField: string;
  dataAction?: any;
  drupalPageTemplate?: any;
  headerMenus: { [parentField: string]: CommonDataModel };
  paragraphsBaseUrl?: string;
  pathAsBaseURL?: boolean;
  bannerBgImageSizeOverride?: CSSStyleDeclaration['backgroundSize'];
  bannerBgImagePositionOverride?: CSSStyleDeclaration['backgroundPosition'];
  bannerMaskSizeOverride?: CSSStyleDeclaration['webkitMaskSize'];
}

const PageWithSidebar: React.FunctionComponent<IPageWithSidebarProps> = (
  props,
) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemModel[]>([]);
  const [banner, setBanner] = useState<DetailsDataModel | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [templateData, setTemplateData] = useState<CommonDataModel>();
  const [displayParagraph, setDisplayParagraph] = useState<DetailsDataModel>();
  const [paragraphId, setParagraphId] = useState<string>();
  const [paragraphs, setParagraphs] = useState<DetailsDataModel[]>([]);

  const location = useLocation();
  const history = useHistory();
  const enableRouting = !!props.paragraphsBaseUrl
    && paragraphs.some(p => p.attributes.field_url_alias);
  const defaultParagraph = paragraphs.find(p => p.attributes.field_url_alias);

  if (enableRouting
    && !defaultParagraph!.attributes.field_url_alias.startsWith(props.paragraphsBaseUrl)
  ) {
    console.error(`Invalid base path ${props.paragraphsBaseUrl} configured for ${title}`);
  }

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getDupalPageTemplateData(props.pageId);
  }, [props.dataAction, props.pageId]);

  useEffect(() => {
    if (props.drupalPageTemplate && props.drupalPageTemplate[props.pageId]) {      
      const _templateData = props.drupalPageTemplate[props.pageId];
      const banner = _templateData.included.find(
        (item: { type: string }) => item.type === 'paragraph--banner',
      );

      // banner
      setBanner(banner);

      // selected paragraph
      let _selectedItem: DetailsDataModel | undefined;

      if (paragraphId) {
        _selectedItem = _templateData.included.find(
          (item: any) => item.id === paragraphId,
        );
      }

      if (!_selectedItem) {
        _selectedItem = _templateData.included.filter(
          (item: any) => item.type !== 'paragraph--banner',
        )[0];
      }

      // breadcrumbs
      const breadcrumbs: BreadcrumbItemModel[] = [...props.parentBreadcrumb];
      if (_templateData.data.attributes.title !== 'Test Tepmlates') {
        breadcrumbs.push(
          {
            label: enableRouting && props.pageId !== 'AboutCynergyBank'
              ? _selectedItem?.attributes?.field_title
              : _templateData.data.attributes?.title,
            url: '#',
          }
        );

        if (props.pageId === 'AboutCynergyBank') {
          const selectedParagraph = paragraphs.filter((paragraph) => paragraph.id === paragraphId)[0]
          if (selectedParagraph) {
            breadcrumbs.push(
              {
                label: selectedParagraph.attributes.field_title,
                url: '#',
              }
            );
          }
        }
      }
      setBreadcrumb(breadcrumbs);

      setDisplayParagraph(_selectedItem);

      // title
      setTitle(_templateData.data.attributes?.title);

      setTemplateData(_templateData);
    }
  }, [
    props.drupalPageTemplate,
    props.pageId,
    props.parentBreadcrumb,
    paragraphs,
    defaultParagraph,
    paragraphId,
    props.paragraphsBaseUrl,
    enableRouting
  ]);

  useEffect(() => {
    let paragraphs = templateData ? templateData.included.filter(
      (item) => item.type !== 'paragraph--banner',
    ) : [];

    if (templateData) {
      if (props.pathAsBaseURL) {
        paragraphs.forEach(p => {
          if (p.type === 'paragraph--title_content') { 
            let referencedPage = p.relationships.field_content.data;
            dataSvc.getReferencedPageData(referencedPage)
              .then((data) => {
                p.attributes.field_url_alias = data.data.attributes.path.alias;
              })
          } else {
            p.attributes.field_url_alias = props.paragraphsBaseUrl + p.attributes.field_url_alias;
          }
        });
      }
      setParagraphs(paragraphs);
    }
  }, [templateData, props.pathAsBaseURL, props.paragraphsBaseUrl]);

  useEffect(() => {
    const p = paragraphs.find(
      p => p.attributes.field_url_alias === location.pathname
        || p.attributes.field_url_alias === location.pathname + '/'
    );
    if (p) setParagraphId(p.id);
  }, [location.pathname, paragraphs]);

  useEffect(() => {
    if (!paragraphId && location.pathname === props.paragraphsBaseUrl) {
      setTimeout(() => {
        history.push(defaultParagraph?.attributes?.field_url_alias);
      }, 1000);
    } else {
      setTimeout(() => {
        if (window.location.pathname === location.pathname) {
          history.push(location.pathname);
        }
      }, 1000);
    }
  }, [paragraphId, defaultParagraph, history, location.pathname, props.paragraphsBaseUrl]);
  
   
  // get Type
  const getType = () => {
   if (props.pageId === 'AboutUsOurHistoryPage') {
     return 'our-history';
   }
   
   if (props.pageId === 'AboutUsCeoMessagePage') {
     return 'ceo-message';
   }
   
   if (props.pageId === 'AboutUsMeetTheBoardPage') {
     return 'meet-the-board';
   }
     
   return undefined
  }

  nprogress.done();

  const dynamicRoutes = (
    <Switch>
      {defaultParagraph
        ? (
          <Redirect
            exact
            from={props.paragraphsBaseUrl}
            to={defaultParagraph.attributes.field_url_alias}
          />
        ) : null
      }
      {paragraphs.map(p => p.attributes.field_url_alias
        ? (
          <Route
            exact
            key={p.attributes.field_url_alias}
            path={p.attributes.field_url_alias}
            render={() => (
              <Paragraph
                data={p}
                type={getType()}
                templateData={props.drupalPageTemplate}
              />
            )}
          />
        ) : null
      )}
      <Redirect to="/error404" />
    </Switch>
  );

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
        <div className="container container-page-with-sidebar">
          {enableRouting
            ? dynamicRoutes
            : displayParagraph && (
              <Paragraph
                data={displayParagraph}
                templateData={props.drupalPageTemplate}
              />
            )
          }
          <TemplatePageSidebar
            paragraphs={paragraphs}
            paragraphId={displayParagraph?.id}
            onSelectItem={(id: string) => {
              setParagraphId(id);
            }}
            enableRouting={enableRouting}
          />
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

export default connect(mapStateToProps, matchDispatchToProps)(PageWithSidebar);
