import React, { useState } from 'react';
import BigCardWithImage from '../BigCardWithImage';
import SmallCardWithImage from '../SmallCardWithImage';
import './styles.scss';

interface IDealListRowProps {
  item: any;
  num: number;
}

const DealListRow: React.FunctionComponent<IDealListRowProps> = (props) => {
  const [colors] = useState<string[]>(
    ['darkGreen', 'lightGreen', 'greyGreen']
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );

  return (
    <div
      className={`single-deal-row 
            ${Number(props.num) % 2 === 0 ? '' : 'flex-reverse'}`}>
      <div className="left">
        {!!props.item[0] && <BigCardWithImage dataList={props.item[0]} color={colors[0]} />}
      </div>
      <div className="right">
        {!!props.item[1] && <SmallCardWithImage dataList={props.item[1]} color={colors[1]} />}
        {!!props.item[2] && <SmallCardWithImage dataList={props.item[2]} color={colors[2]} />}
      </div>
    </div>
  );
};

export default DealListRow;
