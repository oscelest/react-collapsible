import {useState} from "react";
import {Collapsible, CollapsibleDirection} from "../src";
import Style from "./index.module.scss";

export default function IndexPage() {
  const [list, setList] = useState<number[]>([1, 2, 3, 4, 5]);
  
  return (
    <div className={Style.Page}>
      <Collapsible id={"outer"} label={"Test 1234567890"} direction={CollapsibleDirection.WIDTH}>
        {list.map((number, index) => <div key={index}>Value for this is the thing and very long thingy majik: {number}</div>)}
        <button onClick={() => setList(list.concat(Array(Math.ceil(Math.random() * 5)).fill(0)))}>Extend</button>
        <Collapsible id={"inner"} label={"Test"} direction={CollapsibleDirection.BOTH}>
          {list.map((number, index) => <div key={index}>Value: {number}</div>)}
          <button onClick={() => setList(list.concat(Array(Math.ceil(Math.random() * 5)).fill(0)))}>Extend</button>
        </Collapsible>
      </Collapsible>
    </div>
  );
  
}
