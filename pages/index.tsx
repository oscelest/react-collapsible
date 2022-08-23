import React, {useState} from "react";
import Collapsible from "../src/components/Collapsible";
import CollapsibleDirection from "../src/enums/CollapsibleDirection";
import Style from "./index.module.scss";

export default function IndexPage() {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className={Style.Page}>
      <Collapsible className={Style.Sidebar} collapsed={collapsed} direction={CollapsibleDirection.WIDTH} minWidth={20}>
        <button onClick={() => setCollapsed(!collapsed)}>+</button>
        <span>Test 1</span>
        <span>Test 2</span>
        <span>Test 3</span>
      </Collapsible>

      <div className={Style.Content}>
        <Collapsible className={Style.Collapsible} direction={CollapsibleDirection.BOTH} label={"Hello World"}>
          <h1>This is the story of the world</h1>
          <span>The end</span>
        </Collapsible>

        <Collapsible className={Style.Collapsible} direction={CollapsibleDirection.BOTH_WIDTH_FIRST} label={"Hello World"}>
          <h1>This is the story of the world</h1>
          <span>The end</span>
        </Collapsible>

        <Collapsible className={Style.Collapsible} direction={CollapsibleDirection.BOTH_HEIGHT_FIRST} label={"Hello World"}>
          <h1>This is the story of the world</h1>
          <span>The end</span>
        </Collapsible>
      </div>


    </div>
  );

}
