import React, {useRef, useCallback, useState} from "react";
import "./Collapsible.css";

function Collapsible(props: InputFieldProps) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const ref_content = useRef<HTMLInputElement>(null);
  const style_content = {maxHeight: `${!collapsed && ref_content.current ? ref_content.current?.scrollHeight : 0}px`};

  const onClick = useCallback(() => setCollapsed(!collapsed), [collapsed]);

  const classes = ["react-collapsible"];
  if (props.className) classes.push(props.className);

  return (
    <div className={classes.join(" ")} data-collapsed={collapsed}>
      <div className={"react-collapsible-label"} onClick={onClick}>{props.label}</div>
      <div ref={ref_content} className={"react-collapsible-content"} style={style_content}>
        {props.children}
      </div>
    </div>
  );
}

export interface InputFieldProps extends React.PropsWithChildren {
  label?: string;
  className?: string;
}

export default Collapsible;
