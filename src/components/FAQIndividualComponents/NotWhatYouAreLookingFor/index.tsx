import React from 'react';
import './styles.scss';

export interface INotWhatYouAreLookingForProps {
}

export const NotWhatYouAreLookingFor: React.FunctionComponent<INotWhatYouAreLookingForProps> = (props) => {
  return (
    <React.Fragment>
      <div className="section section-faq-individual-not-what-you-are-looking-for">
        <div className="title">Not what you were looking for?</div>
        <div className="search-box">
          <a href="#javascript" className="btn-search"
            onClick={(event) => event.preventDefault()}>
            &nbsp;
          </a>
          <div className="inputs">
            <input type="text" placeholder="How can we help you?" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotWhatYouAreLookingFor;
