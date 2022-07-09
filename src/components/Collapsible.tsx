import React, {useRef, useState, useEffect} from "react";
import "./Collapsible.css";

function Collapsible(props: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [max_height, setMaxHeight] = useState<number>(0);
  const ref_element = useRef<HTMLInputElement>(null);
  const style_content = {maxHeight: collapsed ? 0 : `${max_height}px`};
  const label = props.label?.trim() ? props.label : "\u00A0";

  useEffect(() => {
    if (!ref_element.current) throw new Error("Ellipsis text 'ref_element' is not being rendered.");
    setMaxHeight(getElementHeight(ref_element.current));

    const observer = new ResizeObserver(() => setMaxHeight(getElementHeight(ref_element.current)));
    observer.observe(ref_element.current, {box: "content-box"});
    return () => observer.disconnect();
  }, [ref_element.current]);

  const classes = ["collapsible"];
  if (props.className) classes.push(props.className);

  return (
    <div className={classes.join(" ")} data-collapsed={collapsed}>
      <div className={"collapsible-label"} onClick={onClick}>{label}</div>
      <div ref={ref_element} className={"collapsible-content"} style={style_content}>
        {props.children}
      </div>
    </div>
  );

  function onClick() {
    setCollapsed(!collapsed);
  }
}

function getElementHeight(element?: Element | null) {
  return element?.scrollHeight ?? 0;
}

export interface CollapsibleProps extends React.PropsWithChildren {
  label?: string;
  className?: string;
}

export default Collapsible;
