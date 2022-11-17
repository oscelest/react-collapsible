import {useState} from "react";
import {Collapsible, CollapsibleDirection} from "../src";
import Style from "./index.module.scss";

export default function IndexPage() {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [list, setList] = useState<number[]>([1, 2, 3, 4, 5]);
  
  return (
    <div className={Style.Page}>
      {/*<Collapsible className={Style.Sidebar} collapsed={collapsed} direction={CollapsibleDirection.WIDTH} minWidth={20}>*/}
      {/*  <button onClick={() => setCollapsed(!collapsed)}>+</button>*/}
      {/*  <span>Test 1</span>*/}
      {/*  <span>Test 2</span>*/}
      {/*  <span>Test 3</span>*/}
      {/*</Collapsible>*/}
      
      <Collapsible id={"outer"} label={"Test"} direction={CollapsibleDirection.BOTH} minWidth={40}>
        {list.map((number, index) => <div key={index}>Value: {number}</div>)}
        <button onClick={() => setList(list.concat(Array(Math.ceil(Math.random() * 5)).fill(0)))}>Extend</button>
        <Collapsible id={"inner"} label={"Test"} direction={CollapsibleDirection.BOTH}>
          {list.map((number, index) => <div key={index}>Value: {number}</div>)}
          <button onClick={() => setList(list.concat(Array(Math.ceil(Math.random() * 5)).fill(0)))}>Extend</button>
        </Collapsible>
      </Collapsible>
      
      
      {/*<div className={Style.Content}>*/}
      {/*  <div>*/}
      {/*    <Collapsible2 id={"outer"} className={Style.Collapsible} direction={CollapsibleDirection.HEIGHT} label={"Hello World"}>*/}
      {/*      <h1>This is the story of the world</h1>*/}
      {/*      <span>The end</span>*/}
      {/*      <div>*/}
      {/*        <Collapsible2 id={"inner"} className={Style.Collapsible} direction={CollapsibleDirection.HEIGHT} label={"Hello World"}>*/}
      {/*          <h1>This is the story of the world</h1>*/}
      {/*          <span>The end</span>*/}
      {/*        </Collapsible2>*/}
      {/*      </div>*/}
      {/*    */}
      {/*    </Collapsible2>*/}
      {/*  </div>*/}
      
      {/*  <Collapsible className={Style.Collapsible} direction={CollapsibleDirection.BOTH_WIDTH_FIRST} label={"Hello World"}>*/}
      {/*    <h1>This is the story of the world</h1>*/}
      {/*    <span>The end</span>*/}
      {/*  </Collapsible>*/}
      {/*  */}
      {/*  <Collapsible className={Style.Collapsible} direction={CollapsibleDirection.BOTH_HEIGHT_FIRST} label={"Hello World"}>*/}
      {/*    <h1>This is the story of the world</h1>*/}
      {/*    <span>The end</span>*/}
      {/*  </Collapsible>*/}
      {/*</div>*/}
    
    
    </div>
  );
  
}
