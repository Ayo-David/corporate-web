import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import { ConfigService } from '../../../services/ConfigService';
import dataSvc from '../../../services/dataSvc';
import './styles.scss';

const { CMS_IMAGE_URL } = ConfigService.getConfig()
export interface IAdsAwarenessProps {
  dataList: any[];
}

export const AdsAwareness: React.FunctionComponent<IAdsAwarenessProps> = (props) => {
  	const { dataList } = props;
  
  	const [imageArray, setImageArray] = useState<string[]>([]);
  
  	useEffect(() => {
		if (props.dataList) {
			const fetchImages = async () => {
				const imageArrayTemp: string[] = [];
				await Promise.all(
					props.dataList.map(async (item: any) => {
						let response = await dataSvc.getImage(item.relationships.field_image_video.data.id)
						imageArrayTemp.push(CMS_IMAGE_URL + response.data.attributes.uri.url)
					})
				)
				setImageArray(imageArrayTemp);
			}
			fetchImages().then(r => {});
		}
    // eslint-disable-next-line
  	}, [props.dataList]);

  	return (
		<div className="section section-faqs-ads-awareness">
			<div className="container">
				<div className="card-three">
					<div className="row">
						{
							dataList.map((item, index) => (
							<div className="col col-md-6 flex-spacing" key={index}>
								<div className="gray-panel">
									<div className="left-img">
										<img src={imageArray[Number(index)]} alt="img" />
									</div>
									<div className="right-txt">
										<div className="top-area">
											<div className="top-title">{item.attributes.title}</div>
											<div className="content">
													{/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */} {/* eslint-disable-next-line react/no-danger */}
													<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_snippet.value) }} />
											</div>
										</div>
										<div className="bottom-more flex-grid">
											{/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml */}
											<a href={item.attributes.field_download_or_read_more_link.uri} className="blue-link"
												// eslint-disable-next-line react/no-danger
												dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.attributes.field_download_or_read_more_link.title) }}
											/>
											<a href="#javascript" className="icons icon-circle-arrow-right-dark">&nbsp;</a>
										</div>
									</div>
								</div>
							</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
  	);
};

export default AdsAwareness;
