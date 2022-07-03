import type {NextPage} from "next";
import Collapsible from "../src/components/Collapsible/Collapsible";
import Style from "./index.module.scss";
import React from "react";

const IndexPage: NextPage = () => {

  return (
    <div className={Style.Component}>
      <Collapsible label={"Hello World"}>
        <div>Test</div>
        <div>Testeren</div>
        <div>Noxy</div>
        <div>Yes</div>
        <div>Nope</div>
      </Collapsible>
    </div>
  );
};

export default IndexPage;
