import { ITabPanels } from "@/types";

export default function TabPanel({ currentTab, index, content }:ITabPanels) {
    return <div hidden={currentTab === index ? false : true}>{content}</div>;
  }
  