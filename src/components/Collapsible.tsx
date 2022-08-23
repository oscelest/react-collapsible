import React, {useRef, useState, useEffect, HTMLAttributes, CSSProperties} from "react";
import Style from "./Collapsible.module.css";
import CollapsibleDirection from "../enums/CollapsibleDirection";

function Collapsible(props: CollapsibleProps) {
  const {label, collapsed, direction = CollapsibleDirection.HEIGHT, speed = 200, minWidth = 0, minHeight = 0, ...component_method_props} = props;
  const {onClick, onChange, ...component_props} = component_method_props;

  const [internal_collapsed, setInternalCollapsed] = useState<boolean>(true);
  const [max_width, setMaxWidth] = useState<number>(0);
  const [max_height, setMaxHeight] = useState<number>(0);
  const ref_element = useRef<HTMLInputElement>(null);

  useEffect(
    () => { if (collapsed !== undefined) setInternalCollapsed(collapsed); },
    [collapsed]
  );
  useEffect(
    () => {
      const element = ref_element.current?.querySelector(".collapsible-content");
      if (!element) throw new Error("Ellipsis text 'ref_element' is not being rendered.");
      updateElementSize(element);

      const observer = new ResizeObserver(() => updateElementSize(element));
      observer.observe(element, {box: "content-box"});
      return () => observer.disconnect();
    },
    [ref_element.current]
  );

  const classes = [Style.Component, "collapsible"];
  if (props.className) classes.push(props.className);

  const content_style: CSSProperties = {
    maxWidth: `${internal_collapsed && direction !== CollapsibleDirection.HEIGHT ? minWidth : max_width}px`,
    maxHeight: `${internal_collapsed && direction !== CollapsibleDirection.WIDTH ? minHeight : max_height}px`
  };
  if (direction === CollapsibleDirection.BOTH_WIDTH_FIRST && !internal_collapsed || direction === CollapsibleDirection.BOTH_HEIGHT_FIRST && internal_collapsed) {
    content_style.transition = `max-width ${speed}ms ease-out 0ms, max-height ${speed}ms ease-out ${speed}ms`;
  }
  else if (direction === CollapsibleDirection.BOTH_WIDTH_FIRST && internal_collapsed || direction === CollapsibleDirection.BOTH_HEIGHT_FIRST && !internal_collapsed) {
    content_style.transition = `max-width ${speed}ms ease-out ${speed}ms, max-height ${speed}ms ease-out 0ms`;
  }
  else {
    content_style.transition = `max-width ${speed}ms ease-out 0ms, max-height ${speed}ms ease-out 0ms`;
  }

  return (
    <div {...component_props} ref={ref_element} className={classes.join(" ")} data-collapsed={internal_collapsed} data-direction={direction}>
      {!!label && <div className={"collapsible-label"} onClick={onComponentClick}>{label}</div>}
      <div className={"collapsible-content"} style={content_style}>
        {props.children}
      </div>
    </div>
  );

  function onComponentClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    onChange?.(!internal_collapsed);
    setInternalCollapsed(!internal_collapsed);
  }

  function updateElementSize(element: Element) {
    setMaxWidth(element.scrollWidth + element.clientLeft * 2);
    setMaxHeight(element.scrollHeight + element.clientTop * 2);
  }
}

interface CollapsibleStyleProps extends CSSProperties {
  "--react-collapsible-internal-speed"?: `${number}ms`;
  "--react-collapsible-internal-max-width"?: `${number}px`;
  "--react-collapsible-internal-max-height"?: `${number}px`;
}

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, "style" | "onChange"> {
  collapsed?: boolean;
  direction?: CollapsibleDirection;
  label?: React.ReactNode;
  style?: CollapsibleStyleProps;
  speed?: number;
  minWidth?: number;
  minHeight?: number;

  onChange?(value: boolean): void;
}

export default Collapsible;
