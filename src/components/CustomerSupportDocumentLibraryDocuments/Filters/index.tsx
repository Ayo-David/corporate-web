import React from 'react';
import './styles.scss';
import Dropdown from 'react-bootstrap/esm/Dropdown';

export interface IFiltersProps {
  productOptions: any;
  categoryOptions: any;
  isProductsOpen: boolean;
  setIsProductsOpen: (value: boolean) => void;
  selectedProduct: string;
  setSelectedProduct: (item: string) => void;
  isCategoryOpen: boolean;
  setIsCategoryOpen: (value: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (item: string) => void;
}
export const Filters: React.FunctionComponent<IFiltersProps> = (props) => {
  const {
    productOptions,
    categoryOptions,
    isProductsOpen,
    setIsProductsOpen,
    selectedProduct,
    setSelectedProduct,
    isCategoryOpen,
    setIsCategoryOpen,
    selectedCategory,
    setSelectedCategory,
  } = props;

  const selectProduct = function (selected: string) {
    setSelectedProduct(selected);
  };

  const selectCategory = function (selected: string) {
    setSelectedCategory(selected);
  };

  return (
    <div className="section-filters">
      <div className="product">
        <div className="label">Filter by product</div>
        <Dropdown onToggle={() => setIsProductsOpen(!isProductsOpen)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {isProductsOpen ? 'Choose your category here' : selectedProduct}{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {!!productOptions &&
              productOptions.map((item: any, index: number) => {
                return (
                  <Dropdown.Item key={index} onClick={() => selectProduct(item.name)}>
                    {item.name}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="category">
        <div className="label">Filter by category</div>
        <Dropdown onToggle={() => setIsCategoryOpen(!isCategoryOpen)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {isCategoryOpen ? 'Choose your category here' : selectedCategory}{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categoryOptions.map((item: any, index: number) => {
              return (
                <Dropdown.Item key={index} onClick={() => selectCategory(item.name)}>
                  {item.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Filters;
