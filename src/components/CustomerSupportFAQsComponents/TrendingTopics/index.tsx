import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export interface ITrendingTopicsProps {
  	dataList?: any;
}

export const TrendingTopics: React.FunctionComponent<ITrendingTopicsProps> = (props) => {
	// const { dataList } = props;

	return (
		<React.Fragment>
			<div className="section section-trending-topics">
				<div className="container">
					<div className="content">
						<div className="lefts">
							<i className="icon icon-trending"></i>
							<div className="title">Trending Topics</div>
						</div>
						<div className="rights">
							<ul>
								<li>
									<NavLink to="#javascript" className='trending-items'>Bill Payment</NavLink>
								</li>
								<li>
									<NavLink to="#javascript" className='trending-items'>Lending</NavLink>
								</li>
								<li>
									<NavLink to="#javascript" className='trending-items'>Switching Accounts</NavLink>
								</li>
								<li>
									<NavLink to="#javascript" className='trending-items'>Ethics & Values</NavLink>
								</li>
								<li>
									<NavLink to="#javascript" className='trending-items'>ISA Transfers</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default TrendingTopics;