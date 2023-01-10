import React, {CSSProperties, HTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import CollapsibleDirection from "../enums/CollapsibleDirection";
import Style from "./Collapsible.module.css";

export function Collapsible(props: CollapsibleProps) {
  const {label, id, collapsed = true, direction = CollapsibleDirection.HEIGHT, speed = 200, minWidth = 0, minHeight = 0, ...component_method_props} = props;
  const {onClick, onChange, ...component_props} = component_method_props;
  
  const [content_width, setContentWidth] = useState<number>(-1);
  const [content_height, setContentHeight] = useState<number>(-1);
  
  const [last_frame, setLastFrame] = useState<DOMHighResTimeStamp>(0);
  
  const ref_label = useRef<HTMLDivElement>(null);
  const ref_container = useRef<HTMLDivElement>(null);
  const dynamic = useRef<DynamicVariables>({collapsed, max_height: 0, max_width: 0});
  
  useEffect(onCollapsedChange, [collapsed]);
  useEffect(onRefContainerChange, [ref_container.current]);
  useEffect(onFrameChange, [last_frame]);
  
  const classes = [Style.Component, "collapsible"];
  if (props.className) classes.push(props.className);
  
  const content_style: CSSProperties = {
    minWidth, minHeight,
    maxWidth: direction !== CollapsibleDirection.HEIGHT ? `${dynamic.current.max_width}px` : undefined,
    maxHeight: direction !== CollapsibleDirection.WIDTH ? `${dynamic.current.max_height}px` : undefined
  };
  
  return (
    <div {...component_props} className={classes.join(" ")} data-collapsed={dynamic.current.collapsed} data-direction={direction}>
      {renderLabel(label)}
      <div className={"collapsible-content"} style={content_style}>
        <div ref={ref_container} id={id} className={"collapsible-content-container"}>
          {props.children}
        </div>
      </div>
    </div>
  );
  
  function renderLabel(label?: ReactNode) {
    if (!label) return null;
    
    return (
      <div ref={ref_label} className={"collapsible-label"} onClick={onComponentClick}>{label}</div>
    );
  }
  
  function onFrameChange() {
    if (!last_frame) return;
    requestAnimationFrame(animate);
  }
  
  function animate(timestamp: DOMHighResTimeStamp) {
    if (!last_frame) return;
    let repeat = false;
    
    const difference = Math.max(0, timestamp - last_frame);
    if (dynamic.current.collapsed) {
      if (dynamic.current.max_height > minHeight) {
        dynamic.current.max_height = Math.max(minHeight, dynamic.current.max_height - (content_height / speed) * difference);
        repeat = true;
      }
      if (dynamic.current.max_width > minWidth) {
        dynamic.current.max_width = Math.max(minWidth, dynamic.current.max_width - (content_width / speed) * difference);
        repeat = true;
      }
    }
    else {
      if (dynamic.current.max_height < content_height) {
        dynamic.current.max_height = Math.min(content_height, dynamic.current.max_height + (content_height / speed) * difference);
        repeat = true;
      }
      if (dynamic.current.max_width < content_width) {
        dynamic.current.max_width = Math.min(content_width, dynamic.current.max_width + (content_width / speed) * difference);
        repeat = true;
      }
    }
    
    if (repeat) {
      setLastFrame(timestamp);
    }
  }
  
  function collapse(flag: boolean) {
    dynamic.current.collapsed = flag;
    
    setLastFrame(performance.now());
    onChange?.(flag);
  }
  
  function onComponentClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    collapse(!dynamic.current.collapsed);
  }
  
  function onCollapsedChange() {
    collapse(collapsed);
  }
  
  function onRefContainerChange() {
    if (!ref_container.current) return;
    const observer = new ResizeObserver(onContainerResize);
    observer.observe(ref_container.current, {box: "border-box"});
    return () => observer.disconnect();
  }
  
  function onContainerResize([{target}]: ResizeObserverEntry[]) {
    setContentWidth(target.scrollWidth);
    setContentHeight(target.scrollHeight);
    if (!dynamic.current.collapsed) {
      dynamic.current.max_width = target.scrollWidth;
      dynamic.current.max_height = target.scrollHeight;
    }
  }
}

interface DynamicVariables {
  collapsed: boolean;
  max_width: number;
  max_height: number;
}

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, "style" | "onChange"> {
  collapsed?: boolean;
  direction?: CollapsibleDirection;
  label?: React.ReactNode;
  speed?: number;
  minWidth?: number;
  minHeight?: number;
  
  onChange?(value: boolean): void;
}

export default Collapsible;
