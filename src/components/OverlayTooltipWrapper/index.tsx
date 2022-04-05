import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.tooltipText}
  </Tooltip>
);

interface IOverlayTooltipWrapperProps {
  children: any;
  tooltipText: string;
}

function OverlayTooltipWrapper({ children, tooltipText }: IOverlayTooltipWrapperProps) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={(arg) => renderTooltip({ ...arg, tooltipText })}>
      {children}
    </OverlayTrigger>
  );
}

export default OverlayTooltipWrapper;
