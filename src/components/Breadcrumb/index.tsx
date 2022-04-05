import React from 'react';
import { NavLink } from 'react-router-dom';
import { BreadcrumbItemModel } from '../../model/breadcrumb.model';
import './styles.scss';

export interface IBreadcrumbProps {
  itemArray: BreadcrumbItemModel[];
  className?: string;
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = (props) => {
  const { itemArray, className } = props;
  
  return (
    <div className={`breadcrumb-dark flex ${className}`}>
      <div className="container">
        <ul>
          {
            !!itemArray && itemArray.map((item, index) => (
              <React.Fragment key={index}>
                {(index !== itemArray.length - 1) && (
                  <li className="mobile-hide">
                    <NavLink to={item.url} className="nav-items"
                      exact={true}>
                      {item.label}
                    </NavLink>
                    <span className="right-arrow">&gt;</span>
                  </li>
                )}
                
                {(index === itemArray.length - 1) && (
                  <li>
                    <span className="right-arrow desktop-hide mobile-show">&gt;</span>
                    <NavLink to={item.url} className="nav-items current">
                      {item.label}
                    </NavLink>
                  </li>
                )}
              </React.Fragment>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
