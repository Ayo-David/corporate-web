import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useHistory } from 'react-router-dom';

import { DetailsDataModel } from '../../model/common-data.model';

import './styles.scss';
interface ITemplatePageSidebarProps {
  paragraphs: DetailsDataModel[];
  paragraphId?: string;
  onSelectItem: (id: string) => void;
  enableRouting?: boolean;
}

// Template page sidebar. 
// This is a responsiveness component.
export const TemplatePageSidebar: React.FunctionComponent<ITemplatePageSidebarProps> =
  ({ paragraphs, paragraphId, onSelectItem, enableRouting }) => {
    const [selectedItem, setSelectedItem] = useState<DetailsDataModel>();
    
    useEffect(() => {
      if (paragraphs) {
        let _selectedItem: DetailsDataModel | undefined;

        if (paragraphId) {
          _selectedItem = paragraphs.find((item) => item.id === paragraphId);
        }

        if (!_selectedItem) {
          _selectedItem = paragraphs[0];
        }

        setSelectedItem(_selectedItem);
      }
    }, [paragraphs, paragraphId]);

    const history = useHistory();

    return (
      <div className="template-page-sidebar">
        {!!selectedItem && (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                <div className="label-btn">
                  {selectedItem.attributes.field_title}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {paragraphs.map((item: DetailsDataModel, index: number) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      if (enableRouting) {
                        item.type !== 'paragraph--title_content'
                          ? history.push(item.attributes.field_url_alias)
                          : window.location.href = item.attributes.field_url_alias
                      } else {
                        onSelectItem(item.id);
                      }
                    }}
                    disabled={enableRouting && !item.attributes.field_url_alias}
                  >
                    {item.attributes.field_title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <ul className="sidebar-list">
              {paragraphs.map((item: DetailsDataModel, index: number) => {
                const children = enableRouting
                 ? (
                   item.type !== 'paragraph--title_content'
                    ?
                      <NavLink
                        to={item.attributes.field_url_alias || ''}
                        className={item.attributes.field_url_alias ? '' : 'disabled'}
                      >
                        {item.attributes.field_title}
                      </NavLink>
                    :
                      <a href={item.attributes.field_url_alias}>
                        {item.attributes.field_title}
                      </a>
                 ) : (
                  <a
                    href="#javascript"
                    onClick={(event) => {
                      event.preventDefault();
                      onSelectItem(item.id);
                    }}
                  >
                    {item.attributes.field_title}
                  </a>
                 );
                return (
                  <li
                    className={
                      'sidebar-list-item ' +
                      (selectedItem === item ? 'active ' : '')
                    }
                    key={index}
                  >
                    {children}
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    );
  };

export default TemplatePageSidebar;
