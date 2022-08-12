import React, {useRef, useState, useEffect, HTMLAttributes, CSSProperties} from "react";
import Style from "./Collapsible.module.css";
import CollapsibleDirection from "../enums/CollapsibleDirection";

function Collapsible(props: CollapsibleProps) {
  const {style = {}, label = "\u00A0", collapsed, direction = CollapsibleDirection.HEIGHT, speed = 200, ...component_method_props} = props;
  const {onClick, onChange, ...component_props} = component_method_props;

  const [internal_collapsed, setInternalCollapsed] = useState<boolean>(true);
  const [max_width, setMaxWidth] = useState<number>(0);
  const [max_height, setMaxHeight] = useState<number>(0);
  const ref_element = useRef<HTMLInputElement>(null);

  style["--react-collapsible-internal-speed"] = `${speed}ms`;
  style["--react-collapsible-internal-max-width"] = `${internal_collapsed && direction !== CollapsibleDirection.HEIGHT ? 0 : max_width}px`;
  style["--react-collapsible-internal-max-height"] = `${internal_collapsed && direction !== CollapsibleDirection.WIDTH ? 0 : max_height}px`;

  useEffect(() => { collapsed !== undefined && setInternalCollapsed(collapsed);}, [collapsed]);
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

  return (
    <div {...component_props} ref={ref_element} className={classes.join(" ")} style={style} data-collapsed={internal_collapsed} data-direction={direction}>
      <div className={"collapsible-label"} onClick={onComponentClick}>{label}</div>
      <div className={"collapsible-content"}>
        {props.children}
      </div>
    </div>
  );

  function onComponentClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    onChange?.(!internal_collapsed)
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

  onChange?(value: boolean): void;
}

export default Collapsible;
