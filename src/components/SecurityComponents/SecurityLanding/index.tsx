import * as React from 'react';
import TabsBar from '../../NewsArticlesComponents/TabsBar';
import NewsArticlesList from '../../NewsArticlesComponents/NewsArticlesList';
import {
  CommonObjectDataModel,
  CommonArrayDataModel,
  DetailsDataModel,
  CommonDataModel,
} from '../../../model/common-data.model';
import { CategoryModel } from '../../../model/category.model';

export interface ISecurityLandingProps {
  securitiesContent: CommonObjectDataModel;
  securityCategories: CommonArrayDataModel;
};

const toNewsCategory = (category: DetailsDataModel) => {
  const c = new CategoryModel();
  c.name = [
    {
      value: category.attributes.name,
    }
  ];
  c.uuid = [
    {
      value: category.id,
    }
  ];

  return c;
};

const toNewsArticle = (security: DetailsDataModel) => {
  const article: DetailsDataModel = { ...security };

  article.attributes = {
    ...article.attributes,
    title: security.attributes.field_title,
    changed: security.attributes.created,
    url: security.attributes.field_url_alias,
  };
   
  return article;
};

const groupSecuritiesByCategoryId = (securities: DetailsDataModel[]) => {
  const groups: Record<string, DetailsDataModel[]> = {};

  securities.forEach((security) => {
    const securityCategoryId = security.relationships.field_security_category.data.id;

    if (!groups[String(securityCategoryId)]) {
      groups[String(securityCategoryId)] = [];
    }

    groups[String(securityCategoryId)].push(security);
  });

  return groups;
};

const isContentParagraph = (type: string) => {
  return type !== 'paragraph--banner' && type !== 'taxonomy_term--security_category';
}

const SecurityLanding: React.FunctionComponent<ISecurityLandingProps> = (props) => {
  const {
    securitiesContent,
    securityCategories,
  } = props;

  const [tabIndex, setTabIndex] = React.useState(0);

  const newsCategories = React.useMemo(() => {
    const compareByWeight = (
      c1: DetailsDataModel,
      c2: DetailsDataModel,
    ) => c1.attributes.weight - c2.attributes.weight;

    return securityCategories.data.sort(compareByWeight).map(toNewsCategory);
  }, [securityCategories]);

  const newsArticlesGroups = React.useMemo(() => {
    const securities = securitiesContent.included.filter(
      i => isContentParagraph(i.type)
    );
    const securityGroups = groupSecuritiesByCategoryId(securities);

    const result: Record<string, DetailsDataModel[]> = {};
    Object.keys(securityGroups).forEach((securityCategoryId) => {
      result[String(securityCategoryId)] = securityGroups[String(securityCategoryId)].map(toNewsArticle);
    });
   
    return result;
  }, [securitiesContent]);

  const newsArticlesList = new CommonDataModel();
  newsArticlesList.data = newsArticlesGroups[newsCategories[Number(tabIndex)].uuid[0].value];
  console.log(newsArticlesGroups[newsCategories[Number(tabIndex)].uuid[0].value])

  return (
    <div>
      <TabsBar
        tabIndex={tabIndex}
        dataList={newsCategories}
        onClickTab={(tabIndex: number) => {
          setTabIndex(tabIndex);
        }}
        title={'SECURITY INFORMATION'}
      />
      <NewsArticlesList dataList={newsArticlesList} />
    </div>
  );
};

export default SecurityLanding;
