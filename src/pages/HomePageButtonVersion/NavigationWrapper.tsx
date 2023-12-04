import { useState } from "react";
import {
  TabsNavBotom,
  TabsNavTop,
  TabsNavDrawer,
} from "./HomeScreenButtonVersion";

export const NavigationWrapperButtonV = () => {
  const [navigationType, setNavigationType] = useState("bottom");

  return navigationType === "bottom" ? (
    <TabsNavBotom
      navigationType={navigationType}
      setNavigationType={setNavigationType}
    />
  ) : navigationType === "top" ? (
    <TabsNavTop
      navigationType={navigationType}
      setNavigationType={setNavigationType}
    />
  ) : (
    <TabsNavDrawer
      navigationType={navigationType}
      setNavigationType={setNavigationType}
    />
  );
};
