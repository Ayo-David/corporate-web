import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import useEventCallback from '@restart/hooks/useEventCallback';
import removeEventListener from 'dom-helpers/removeEventListener';
import addEventListener from 'dom-helpers/addEventListener';
import useWillUnmount from '@restart/hooks/useWillUnmount';
import OverlayTooltipWrapper from '../OverlayTooltipWrapper';

import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

export interface IHeaderProps {
  hasShadow?: boolean;
  activeMenu: string;
  headers: { [parentField: string]: CommonDataModel };
  dataList: CommonDataModel;
  dataAction?: any;
}
export interface LinkItem {
  url: string;
  label: string;
  field?: string;
}
export interface SidebarMenuData {
  items: LinkItem[];
  level: number;
}

const staticHeaders: LinkItem[] = [
  {
    url: '/',
    label: 'Business',
    field: 'Business',
  },
  {
    url: '/private_banking/current_account',
    label: 'Private',
    field: 'Private Banking',
  },
  {
    url: '/personal/current_account',
    label: 'Personal',
    field: 'Personal',
  },
  {
    url: '/about-us/about-cynergy-bank',
    label: 'About Us',
    field: 'About Us',
  },
  {
    url: '/customer_suppor/faqs',
    label: 'Customer Support',
    field: 'Customer Support',
  },
];

export const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { hasShadow, activeMenu, headers } = props;
  const [hoverOnBusinessCurrentAccount, setHoverOnBusinessCurrentAccount] =
    useState<boolean>(false);
  const [hoverOnBusinessFinance, setHoverOnBusinessFinance] = useState<boolean>(false);
  const [hoverOnPersonalCurrentAccount, setHoverOnPersonalCurrentAccount] =
    useState<boolean>(false);

  const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false);
  const [parentItem, setParentItem] = useState<LinkItem | undefined>();
  const [parentItemLv1, setParentItemLv1] = useState<LinkItem | undefined>();
  const [dynamiHeaders, setDynamiHeaders] = useState<LinkItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const linkItem = staticHeaders.find((item) => item.field === activeMenu);
    setParentItem(linkItem);
  }, [activeMenu]);

  useEffect(() => {
    if (parentItem && parentItem.field && props.dataAction) {
      props.dataAction.getHeaderMenuData(parentItem.field);
    }
  }, [props.dataAction, parentItem]);

  useEffect(() => {
    if (!parentItem) {
      setDynamiHeaders(staticHeaders);
    } else if (parentItem.field && headers) {
      const headerMenu = headers[parentItem.field];
      const dynamicHeader = headerMenu
        ? headerMenu.data.map((item, index) => ({
            url: item.attributes.field_url.uri.replace('internal:', ''),
            label: item.attributes.title,
            order: item.attributes.field_order !== null ? item.attributes.field_order : index,
          }))
        : [];
      const orderedDynamicHeader = dynamicHeader.length > 0
        ? dynamicHeader.sort((a, b) => a.order - b.order)
        : dynamicHeader;
      setDynamiHeaders(orderedDynamicHeader);
    }
  }, [headers, parentItem]);

  useWillUnmount(() => {
    removeEventListener(window as any, 'resize', handleWindowResize);
  });

  const handleWindowResize = useEventCallback(() => {
    if (showSidebarMenu) {
      if (document.documentElement.clientWidth > 1200) {
        doCloseModal()
      }
    }
  });


  // mouse Enter
  const mouseEnter = (hoveredItemName: string) => {
    if (activeMenu === 'Business') {
      if (hoveredItemName === 'Current Accounts') {
        setHoverOnBusinessCurrentAccount(false);
      }
      if (hoveredItemName === 'Business Finance') {
        setHoverOnBusinessFinance(true);
      }
    }

    if (activeMenu === 'Personal') {
      if (hoveredItemName === 'Current Accounts') {
        setHoverOnPersonalCurrentAccount(false);
      }
    }
  };

  // mouse Leave
  const mouseLeave = () => {
    setHoverOnBusinessCurrentAccount(false);
    setHoverOnPersonalCurrentAccount(false);
    setHoverOnBusinessFinance(false);
  };

  // is Show Current Account Popup
  const isShowCurrentAccountPopup = () => {
    let returnValue = '';

    if (activeMenu === 'Business' && hoverOnBusinessCurrentAccount) {
      returnValue = 'Business';
    }

    if (activeMenu === 'Business' && hoverOnBusinessFinance) {
      returnValue = 'Business Finance';
    }

    if (activeMenu === 'Personal' && hoverOnPersonalCurrentAccount) {
      returnValue = 'Personal';
    }

    return returnValue;
  };

  const toggleSidebarMenu = () => {
    setShowSidebarMenu(!showSidebarMenu);
  };

  const handleParentItemClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (parentItemLv1) {
      setParentItemLv1(undefined);
    } else {
      setParentItem(undefined);
    }
  }

  const handleItemClick = (event: React.SyntheticEvent, item: LinkItem) => {
    if (!parentItem) {
      event.preventDefault();
      setParentItem(item)
    } else {
      if (item.label === 'Business Finance') {
        event.preventDefault();
        setParentItemLv1(item);
      } else if (item.label === 'Current Accounts') {
        // TODO: display level 3 of menu
        event.preventDefault();
        setParentItemLv1(item);
      } else {
        doCloseModal();
      }
    }
  }

  const renderStaticMenu = () => {
    return (
      <div className="nav-bar-mini flex-grid">
        <div className="container flex-grid">
          <div className="lefts flex">
            <div className="header-nav">
              <ul className="flex">
                {staticHeaders.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={item.url}
                        className={`tab-items ${
                          activeMenu === item.field ? 'current' : ''
                        }`}>
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="rights flex">
            <div className="search-module">
              <a href="#javascript" className="icons btn-search">
                &nbsp;
              </a>
            </div>
            <a href="#javascript" className="btn btn-green login-btn">
              Log in
            </a>
          </div>
        </div>
      </div>
    );
  };

  const RenderDynamicMenu = () => {
    // Workaround to avoid overflow in header at lower screen width
    const matchCustomerSupport = useRouteMatch('/customer_support');
    const matchCustomerSuppor = useRouteMatch('/customer_suppor');
    const matchCustomerSupport2 = useRouteMatch('/customer-support');
    const isCustomerSupportPage = 
      matchCustomerSupport || matchCustomerSuppor || matchCustomerSupport2;
    return (
      <div className={`nav-bar ${hasShadow ? 'hasShadow' : ''}`}>
        <div className="container flex">
          <div className="logo-area">
            <NavLink to="/">
              <img src="/assets/logos/oddysey.svg" alt="Oddysey" />
            </NavLink>
          </div>
          <div className="header-nav">
            <ul className={`flex ${isCustomerSupportPage ? 'no-gap' : ''}`}>
              {dynamiHeaders?.map((item: any, index: number) => {
                const comingSoonUrls = ['/business/savings', '/private-banking/current-account'];
                if (comingSoonUrls.includes(item.url)) {
                  return (
                    <li key={index}>
                      <OverlayTooltipWrapper tooltipText="Coming soon">
                        <div
                          style={{cursor: 'pointer'}}
                          className="tab-items"
                          onMouseEnter={() => {
                            mouseEnter(item.label);
                          }}
                          onMouseLeave={() => {
                            mouseLeave();
                          }}
                          onClick={(event) => {}}>
                          {item.label}
                        </div>
                      </OverlayTooltipWrapper>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <NavLink
                      to={item.url}
                      className={`tab-items ${
                        item.label === 'Current Accounts' &&
                        location.pathname === '/personal/current_account_premium'
                          ? 'current'
                          : ''
                      }`}
                      activeClassName="current"
                      exact={activeMenu !== 'About Us' ? true : false}
                      onMouseEnter={() => {
                        mouseEnter(item.label);
                      }}
                      onMouseLeave={() => {
                        mouseLeave();
                      }}
                      onClick={(event) => {}}>
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="desktop-hide mobile-show">
            <a href="#javascript" className="icons icon-search">
              &nbsp;
            </a>
            <a href="#javascript" className="btn btn-green">
              Log in
            </a>
            <a
              href="#javascript"
              className="icons icon-nav"
              onClick={toggleSidebarMenu}>
              &nbsp;
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderPopupMenu = () => {
    const currentAccountPopup = isShowCurrentAccountPopup();
    if (currentAccountPopup === 'Business')
      return (
        <div
          className="two-items-popup"
          onMouseEnter={() => {
            mouseEnter('Current Accounts');
          }}
          onMouseLeave={() => {
            mouseLeave();
          }}>
          <div className="container">
            <NavLink to="/business/current_accounts_classic" className="items">
              <div className="green-point">C</div>
              <div className="right-area">
                <span className="blue-title">Classic Business Account</span>
                <p className="txt">
                  A Business Classic Account with Odyssey Bank gives you
                  everything you need to keep your business in order.
                </p>
              </div>
            </NavLink>
            <div className="border-line"></div>
            <NavLink to="#!" className="items">
              <div className="green-point">P</div>
              <div className="right-area">
                <span className="blue-title">Premium Business Account</span>
                <p className="txt">
                  A Business Premium Account with Odyssey Bank gives you
                  everything you need to keep your business in order.
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      );
    if (currentAccountPopup === 'Business Finance')
      return (
        <div
          className="two-items-popup"
          onMouseEnter={() => {
            mouseEnter('Business Finance');
          }}
          onMouseLeave={() => {
            mouseLeave();
          }}>
          <div className="container">
            <NavLink to="/business/business_finance" className="items">
              <div className="green-point">B</div>
              <div className="right-area">
                <span className="blue-title">Bridging Finance</span>
                <p className="txt">
                  Bridging Finance
                </p>
              </div>
            </NavLink>
            <div className="border-line"></div>
            <NavLink to="/business/business_finance" className="items">
              <div className="green-point">R</div>
              <div className="right-area">
                <span className="blue-title">RLS (Recovery Loan Scheme)</span>
                <p className="txt">
                  RLS (Recovery Loan Scheme)
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      );
    if (currentAccountPopup === 'Personal')
      return (
        <div
          className="two-items-popup"
          onMouseEnter={() => {
            mouseEnter('Current Accounts');
          }}
          onMouseLeave={() => {
            mouseLeave();
          }}>
          <div className="container">
            <NavLink to="/personal/current_account" className="items">
              <div className="green-point">C</div>
              <div className="right-area">
                <span className="blue-title">Classic Personal Account</span>
                <p className="txt">
                  A Personal Classic Account with Odyssey Bank gives you
                  everything you need to keep your business in order.
                </p>
              </div>
            </NavLink>
            <div className="border-line"></div>
            <NavLink to="/personal/current_account_premium" className="items">
              <div className="green-point">P</div>
              <div className="right-area">
                <span className="blue-title">Premium Personal Account</span>
                <p className="txt">
                  A Personal Premium Account with Odyssey Bank gives you
                  everything you need to keep your business in order.
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      );
    return null;
  };

  const onHideSidebar = () => {
    const linkItem = staticHeaders.find((item) => item.field === activeMenu);
    setShowSidebarMenu(false);
    setParentItem(linkItem);
    removeEventListener(window as any, 'resize', handleWindowResize);
  }

  const onShowSidebar = () => {
    addEventListener(window as any, 'resize', handleWindowResize);  
  }

  const doCloseModal = ()=> {
    onHideSidebar();
  }

  // Render Menu for  mobile/tablet mode.
  const renderSidebar = () => {
    if (!showSidebarMenu) return null;

    return (
      <Modal
        show={showSidebarMenu}
        onHide={onHideSidebar}
        onShow={onShowSidebar}
        animation={false}
        backdrop={true}
        dialogClassName="header-sidebar"
        backdropClassName="header-sidebar-backdrop"
        contentClassName="header-sidebar-content">
        <Modal.Body>
          <ul className="sidebar-menu">
            <li
              key="logo"
              className="logo-item separator menu-item-level-0 menu-item">
              <img
                className="logo"
                src="/assets/logos/oddysey.svg"
                alt="Oddysey"
              />
              <a
                href="#javascript"
                className="icons icon-close"
                onClick={doCloseModal}>
                &nbsp;
              </a>
            </li>

            {parentItem && (
              <li
                key="parentItem"
                className="parent-item separator menu-item-level-0 menu-item">
                <NavLink to="" className="link-item" onClick={handleParentItemClick}>
                  <div className="back-icon">
                    <img src="/assets/icon-chevron-left.svg" alt="back" />
                  </div>
                  <span className="label">{parentItemLv1 ? parentItemLv1.label : parentItem.label}</span>
                </NavLink>
              </li>
            )}
            {
              !parentItemLv1 && (
                <li key="level-1" className="separator">
                  <ul className="level-1-container">
                    {dynamiHeaders?.map((item, index) => {
                      return (
                        <li key={index} className="menu-item-level-1">
                          <NavLink
                            to={item.url}
                            onClick={(e) => handleItemClick(e, item)}
                            className={`link-item ${
                              activeMenu === item.field ? 'current' : ''
                            }`}>
                            <span className="label">{item.label}</span>
                            <img src="/assets/icon-chevron-right.svg" alt="next" />
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )
            }
            {
              parentItem?.label === 'Business' && parentItemLv1?.label === 'Business Finance' && (
                <li key="level-2" className="separator">
                  <ul className="level-2-container">
                    <li className="menu-item-level-2">
                      <NavLink to="/business/business_finance" className="items">
                        <span className="blue-title">Bridging Finance</span>
                        <p className="txt">
                          Bridging Finance
                        </p>
                      </NavLink>
                    </li>
                    <li className="menu-item-level-2">
                      <NavLink to="/business/business_finance" className="items">
                        <span className="blue-title">RLS (Recovery Loan Scheme)</span>
                        <p className="txt"> 
                          RLS (Recovery Loan Scheme)
                        </p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )
            }
            {
              parentItem?.label === 'Business' && parentItemLv1?.label === 'Current Accounts' && (
                <li key="level-2" className="separator">
                  <ul className="level-2-container">
                    <li className="menu-item-level-2">
                      <NavLink to="/business/current_accounts_classic" className="items">
                        <span className="blue-title">Classic Business Account</span>
                        <p className="txt">
                          A Business Classic Account with Odyssey Bank gives you
                          everything you need to keep your business in order.
                        </p>
                      </NavLink>
                    </li>
                    <li className="menu-item-level-2">
                      <NavLink to="#!" className="items">
                        <span className="blue-title">Premium Business Account</span>
                        <p className="txt">
                          A Business Premium Account with Odyssey Bank gives you
                          everything you need to keep your business in order.
                        </p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )
            }
            {
              parentItem?.label === 'Personal' && parentItemLv1?.label === 'Current Accounts' && (
                <li key="level-2" className="separator">
                  <ul className="level-2-container">
                    <li className="menu-item-level-2">
                      <NavLink to="/personal/current_account" className="items">
                        <span className="blue-title">Classic Personal Account</span>
                        <p className="txt">
                          A Personal Classic Account with Odyssey Bank gives you
                          everything you need to keep your business in order.
                        </p>
                      </NavLink>
                    </li>
                    <li className="menu-item-level-2">
                      <NavLink to="/personal/current_account_premium" className="items">
                        <span className="blue-title">Premium Personal Account</span>
                        <p className="txt">
                          A Personal Premium Account with Odyssey Bank gives you
                          everything you need to keep your business in order.
                        </p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )
            }
          </ul>
          <a href="#javascript" className="btn btn-green">
            Log in
          </a>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <header className="header ">
      {renderStaticMenu()}
      <RenderDynamicMenu />
      {renderPopupMenu()}
      {renderSidebar()}
    </header>
  );
};

export default Header;
