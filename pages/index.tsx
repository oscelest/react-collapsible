import React from "react";
import Collapsible from "../src/components/Collapsible";
import CollapsibleDirection from "../src/enums/CollapsibleDirection";

export default function IndexPage() {

  return (
    <div>
      <Collapsible direction={CollapsibleDirection.BOTH} label={"Hello World"}>
        <h1>This is the story of the world</h1>
        <span>The end</span>
      </Collapsible>
    </div>
  );

}
