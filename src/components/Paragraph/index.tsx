import React, { useCallback, useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import { DetailsDataModel } from '../../model/common-data.model';
import './styles.scss';
import { FileIcon } from 'react-file-icon';
import dataSvc from '../../services/dataSvc';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { ConfigService } from '../../services/ConfigService';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IParagraphProps {
  data: DetailsDataModel;
  type?: string;
  templateData?: any;
}

const renderParagraphTitleDescription = (
  paragraph: DetailsDataModel,
  type?: string,
) => {
  // Add {CMS_IMAGE_URL} to image src path
  const imgRegex = new RegExp(/<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi);
  const replacedImgSrc = `<img$1 src=$2${CMS_IMAGE_URL}$3$2`;

  return (
    <div className={'paragraph ' + paragraph.type + ' ' + type}>
      {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
      <div
        className="field_text"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize((paragraph.attributes.field_text.value).replace(imgRegex, replacedImgSrc)),
        }}></div>
    </div>
  );
};
const renderParagraphTitleFilesList = (
  paragraph: DetailsDataModel,
  fileList: DetailsDataModel[],
) => {
  return (
    <div className={'paragraph ' + paragraph.type}>
      <div className="paragraph-title">{paragraph.attributes.field_title}</div>
      <div className="paragraph-detail">
        {!!paragraph.attributes.field_text && (
          // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
          <div
            className="paragraph-subtitle"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(paragraph.attributes.field_text.value),
            }}></div>
        )}
        <div className="paragraph-subtitle">
          {paragraph.attributes.field_title}
        </div>
        <div className="item-list">
          {!!fileList &&
            fileList.map((item: DetailsDataModel, index: number) => {
              return (
                <a
                  className={`item ${paragraph.type}`}
                  href={item.attributes.uri.url}
                  key={index}>
                  <FileIcon
                    extension={item.attributes.filename.split('.')[1]}
                  />
                  <div className="filename">
                    <div className="filemime">{item.attributes.filename}</div>
                    <div className="name">{item.attributes.filename}</div>
                  </div>
                  <img
                    src="/assets/icon-file-download.png"
                    alt="download-file"
                    className="icon-download"
                  />
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};
const renderParagraphTitleMembers = (
  paragraph: DetailsDataModel,
  memberList: DetailsDataModel[],
  imageArray: any[],
) => {
  return (
    <div className={'paragraph ' + paragraph.type}>
      <div className="paragraph-title">{paragraph.attributes.field_title}</div>
      <div className="paragraph-detail">
        {!!paragraph.attributes.field_text && (
          // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
          <div
            className="paragraph-subtitle"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(paragraph.attributes.field_text.value),
            }}></div>
        )}
        <div className="item-list">
          {!!memberList &&
            memberList.map((item: DetailsDataModel, index: number) => {
              return (
                <div className={`item ${paragraph.type}`} key={index}>
                  <img src={imageArray[Number(index)]} alt="member" />
                  <div className="right">
                    <div className="name">{item.attributes.title}</div>
                    <div className="position">
                      {item.attributes.field_position}
                    </div>
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                    <div
                      className="bio"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.attributes.field_bio.value),
                      }}></div>
                    <div className="links">
                      <a href="#javascript">
                        <img
                          src="/assets/linkedin-green.png"
                          alt="linkedin"
                          className="icon-linkedin"
                        />
                      </a>
                      <a href="#javascript">
                        <img
                          src="/assets/email-green.png"
                          alt="email"
                          className="icon-email"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
const renderParagraphDescCards = (
  paragraph: DetailsDataModel,
  cardList: any[],
  selectedCard: string,
  setSelectedCard: (a: string) => void,
) => {
  return (
    <div className={'paragraph ' + paragraph.type}>
      <div className="paragraph-title">{paragraph.attributes.field_title}</div>
      <div className="paragraph-detail">
        {!!paragraph.attributes.field_text && (
          // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
          <div
            className="paragraph-subtitle"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(paragraph.attributes.field_text.value),
            }}></div>
        )}
        <Dropdown>
          <Dropdown.Toggle variant="success" className="select-desc-cards">
            {selectedCard}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {cardList.map((item: any, index: number) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setSelectedCard(item.attributes.field_title);
                }}>
                {item.attributes.field_title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="item-list">
          {cardList.findIndex(
            (item: any) => item.attributes.field_title === selectedCard,
          ) > -1 && (
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
            <div
              className="field_text"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  DOMPurify.sanitize(
                    cardList[
                      cardList.findIndex(
                        (item: any) =>
                          item.attributes.field_title === selectedCard,
                      )
                    ].attributes.field_text.value
                  ),
              }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

const renderParagraphFaqList = (
  paragraph: string,
  faqList: any[],
  selectedFaq: string,
  setSelectedFaq: (a: string) => void,
  selectedFaqIndex: number,
  pageTitle: string,
  description?: string,
) => {
  return (
    <div className={'paragraph ' + paragraph}>
      <div className="paragraph-title">{pageTitle}</div>
      {description && (
        // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
        <div
          className="description"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      )}
      <div className="paragraph-detail">
        <Dropdown>
          <Dropdown.Toggle variant="success" className="select-desc-cards">
            {selectedFaq}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {faqList.map((item: any, index: number) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setSelectedFaq(item.attributes.field_title);
                }}>
                {item.attributes.field_title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="item-list">
          {faqList.findIndex((item: any) => item.attributes.field_title === selectedFaq) > -1 && (
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
            <div
              className="field_text"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  DOMPurify.sanitize(
                    faqList[
                      faqList.findIndex((item: any) => item.attributes.field_title === selectedFaq)
                    ].attributes.field_text.value
                  ),
              }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

const renderParagraphAwardsAccreditations = (
  paragraph: DetailsDataModel,
  awardsData: DetailsDataModel[],
  awardsDataIncluded: DetailsDataModel[][],
  logoArray: string[],
) => {
  return (
    <div className={'paragraph ' + paragraph.type}>
      <div className="paragraph-title">{paragraph.attributes.field_title}</div>
      <div className="paragraph-detail">
        {paragraph.attributes.field_text && (
          // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
          <div
            className="paragraph-subtitle"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(paragraph.attributes.field_text.value),
            }}></div>
        )}
        <div className="item-list">
          {!!awardsData &&
            !!awardsDataIncluded &&
            awardsData.map((item: DetailsDataModel, index: number) => {
              return (
                <div className={`item ${paragraph.type}`} key={index}>
                  <div className="award-year">{item.attributes.field_year}</div>
                  <div className="award-list">
                    {awardsDataIncluded[Number(index)] &&
                      !!logoArray &&
                      awardsDataIncluded[Number(index)].map(
                        (item1: any, index1: number) => {
                          return (
                            <div className="single-award-item" key={index1}>
                              <img
                                src={logoArray[index + index1]}
                                alt="award-item"
                              />
                              {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
                              <div
                                className="description"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                  __html:
                                    DOMPurify.sanitize(item1.attributes.field_description1.value),
                                }}></div>
                            </div>
                          );
                        },
                      )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

/**
 * Render Paragraph base on its type
 * @param param
 * @returns
 */
const Paragraph: React.FunctionComponent<IParagraphProps> = ({
  data,
  type,
  templateData,
}) => {
  const [fileList, setFileList] = useState<any>([]);
  const [memberList, setMemberList] = useState<any>([]);
  const [cardList, setCardList] = useState<any>([]);
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [logoArray, setLogoArray] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [awardsData, setAwardsData] = useState<any[]>([]);
  const [awardsDataIncluded, setAwardsDataIncluded] = useState<any[]>([]);
  const [faqList, setFaqList] = useState<any[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<string>('');

  /* For fetching logo images on awards page */
  const fetchLogos = useCallback(() => {
    const f = async () => {
      const logoArrayTemp: string[] = [];

      const promises: Promise<void>[] = [];
      const results: any[] = [];

      awardsDataIncluded.flat().forEach((item: any, index: number) => {
        promises.push(new Promise(resolve => {
          if (item.relationships.field_logo.data) {
            dataSvc
              .getImage(item.relationships.field_logo.data.id)
              .then((response) => {
                results[Number(index)] = response;
              })
              .finally(resolve);
          } else {
            resolve();
          }
        }));
      })

      await Promise.all(promises);

      results.forEach(response => {
        logoArrayTemp.push(CMS_IMAGE_URL + response.data.attributes.uri.url);
      });

      setLogoArray(logoArrayTemp);
    };

    f();
  }, [awardsDataIncluded]);

  /* For fetching images on members page */
  const fetchImages = useCallback(() => {
    const f = async () => {
      const imageArrayTemp: string[] = [];
      const results: any[] = [];

      await Promise.all(
        memberList.map(async (item: any, index: number) => {
          if (item.relationships.field_photo.data) {
            let response = await dataSvc.getImage(
              item.relationships.field_photo.data.id,
            );
            results[Number(index)] = response;
          }
        }),
      );

      results.forEach(response => {
        imageArrayTemp.push(
          CMS_IMAGE_URL + response.data.attributes.uri.url,
        );
      });

      setImageArray(imageArrayTemp);
    };

    f();
  }, [memberList]);

  const fetchAwards = useCallback((paragraphId: string) => {
    const f = async (paragraphId: string) => {
      const response = await dataSvc.getTemplatePageAwardAccreditationItems(paragraphId)

      const tempArrayData: any = [];
      const tempArrayIncluded: any = [];
      const results: any[] = [];

      const promises: Promise<void>[] = [];
      response.data.forEach((item: any, index: number) => {
        promises.push(new Promise(resolve => {
          dataSvc
            .getTemplatePageAwardAccreditationData(item.id)
            .then((res) => {
              results[Number(index)] = res;
            })
            .finally(resolve);
        }));
      })
      await Promise.all(promises);

      results.forEach((r) => {
        tempArrayData.push(r.data);
        tempArrayIncluded.push(r.included);
      })

      setAwardsData(tempArrayData);
      setAwardsDataIncluded(tempArrayIncluded);
    };

    f(paragraphId);
  }, []);

  const previousDataTypeRef = useRef<string|undefined>();

  useEffect(() => {
    if (previousDataTypeRef.current === data.type) {
      return;
    }

    switch (data.type) {
      case 'paragraph--title_faqs_url':
        dataSvc.getTemplatePageFAQItems(data.relationships.field_faq_set.data.id).then((res) => {
          setFaqList(res.data);
          setSelectedFaq(res.data[0].attributes.field_title);
        });
        break;
      case 'paragraph--title_files_list':
        dataSvc.getTemplatePageFileListItems(data.id).then((data) => {
          setFileList(data.data);
        });
        if (templateData.TestTemplate) {
          /* For awards page, amount of data and requests to be fired is huge,
          so all that happens on page load in this method */
          const awardsId = templateData.TestTemplate.included.findIndex(
            (item: any) => item.type === 'paragraph--awards_and_accreditations',
          );
          if (awardsId > -1) {
            const awardsIdFound = templateData.TestTemplate.included.find(
              (item: any) => item.type === 'paragraph--awards_and_accreditations',
            );
            fetchAwards(awardsIdFound.id);
          }
        }
        break;
      case 'paragraph--title_members':
        dataSvc.getTemplatePageMemberListItems(data.id).then((data) => {
          setMemberList(data.data);
        });
        break;
      case 'paragraph--title_desc_cards':
      case 'paragraph--title_desc_cards_with_url':
      case 'paragraph--title_security_cards':
        dataSvc.getTemplatePageCardListItems(data.id).then((data) => {
          setCardList(data.data);
          setSelectedCard(data.data[0].attributes.field_title);
        });
        break;
      case 'paragraph--awards_and_accreditations':
        if (templateData.TestTemplate) {
          fetchLogos();
        } else {
          fetchAwards(data.id);
        }
        break;
    }

    previousDataTypeRef.current = data.type;
  }, [data, fetchAwards, fetchLogos, templateData]);

  useEffect(() => {
    if (awardsDataIncluded.length) {
      fetchLogos();
    }
  }, [awardsDataIncluded, fetchLogos]);

  /* member list page needs an additional useeffect to fetch images */
  useEffect(() => {
    fetchImages();
  }, [memberList, fetchImages]);

  switch (data.type) {
    case 'paragraph--title_description':
    case 'paragraph--title_description_alias':
    case 'paragraph--title_description_category':
      return renderParagraphTitleDescription(data, type);
    case 'paragraph--title_files_list':
      return renderParagraphTitleFilesList(data, fileList);
    case 'paragraph--title_members':
      return renderParagraphTitleMembers(data, memberList, imageArray);
    case 'paragraph--title_desc_cards':
    case 'paragraph--title_desc_cards_with_url':
    case 'paragraph--title_security_cards':
      return renderParagraphDescCards(
        data,
        cardList,
        selectedCard,
        setSelectedCard,
      );
    case 'paragraph--awards_and_accreditations':
      return renderParagraphAwardsAccreditations(
        data,
        awardsData,
        awardsDataIncluded,
        logoArray,
      );
    case 'paragraph--title_faqs_url':
      return renderParagraphFaqList(
        'paragraph--title_faqs_url',
        faqList,
        selectedFaq,
        setSelectedFaq,
        0,
        data.attributes.field_title,
        data.attributes?.field_description1?.processed,
      );
    default:
      return null;
  }
};

export default Paragraph;
