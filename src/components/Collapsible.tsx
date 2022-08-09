import React, {useRef, useState, useEffect, HTMLAttributes, CSSProperties} from "react";
import Style from "./Collapsible.module.css";
import CollapsibleDirection from "../enums/CollapsibleDimension";

function Collapsible(props: CollapsibleProps) {
  const {style = {}, label = "\u00A0", direction = CollapsibleDirection.HEIGHT, speed = 200, ...component_method_props} = props;
  const {onClick, ...component_props} = component_method_props;

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [max_width, setMaxWidth] = useState<number>(0);
  const [max_height, setMaxHeight] = useState<number>(0);
  const ref_element = useRef<HTMLInputElement>(null);

  style["--collapsible-speed"] = `${speed}ms`;
  style["--collapsible-max-width"] = `${collapsed && direction !== CollapsibleDirection.HEIGHT ? 0 : max_width}px`;
  style["--collapsible-max-height"] = `${collapsed && direction !== CollapsibleDirection.WIDTH ? 0 : max_height}px`;

  useEffect(() => {
    const element = ref_element.current?.querySelector(".collapsible-content");
    if (!element) throw new Error("Ellipsis text 'ref_element' is not being rendered.");
    updateElementSize(element);

    const observer = new ResizeObserver(() => updateElementSize(element));
    observer.observe(element, {box: "content-box"});
    return () => observer.disconnect();
  }, [ref_element.current]);

  const classes = [Style.Component, "collapsible"];
  if (props.className) classes.push(props.className);

  return (
    <div {...component_props} ref={ref_element} className={classes.join(" ")} style={style} data-collapsed={collapsed} data-direction={direction}>
      <div className={"collapsible-label"} onClick={onComponentClick}>{label}</div>
      <div className={"collapsible-content"}>
        {props.children}
      </div>
    </div>
  );

  function onComponentClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) setCollapsed(!collapsed);
  }

  function updateElementSize(element: Element) {
    setMaxWidth(element.scrollWidth + element.clientLeft * 2);
    setMaxHeight(element.scrollHeight + element.clientTop * 2);
  }
}

interface CollapsibleStyleProps extends CSSProperties {
  "--collapsible-speed"?: `${number}ms`;
  "--collapsible-max-width"?: `${number}px`;
  "--collapsible-max-height"?: `${number}px`;
}

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  speed?: number;
  direction: CollapsibleDirection;

  label?: React.ReactNode;
  style?: CollapsibleStyleProps;
}

export default Collapsible;
