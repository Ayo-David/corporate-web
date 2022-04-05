import React from 'react';
import DOMPurify from 'dompurify';
import './styles.scss';

export interface IHighlightedSectionProps {
  info: any,
  cards: any,
}

export const HighlightedSection: React.FunctionComponent<IHighlightedSectionProps> = (props) => {

  return (
    <div className="business-highlighted-section flex">
      <div className="container">
        <div className='flex flex-md-row flex-column align-items-stretch'>
          <div className='left-section'>
            <div className="title">{props?.info?.data.attributes.field_title}</div>
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
            <div className="desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props?.info?.data.attributes.field_text.processed)}}/>
          </div>
          <div className='right-section flex flex-row flex-wrap'>
            {props?.cards?.data.map((card: any, i: number) =>
              <div className="section-card" key={i}>
                <i className={`icons ${card.attributes.field_icon_class}`}/>
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
                <div className="txt" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.attributes.field_text.processed)}}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightedSection;
