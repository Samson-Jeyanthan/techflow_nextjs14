import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { formatAndDivideNumber } from "@/lib/utils";
import React from "react";

type ITab = {
  tabName: string;
  value: string;
  totalNumbers: number;
  href: string;
  dontShow?: boolean;
};

interface Props {
  tabs: ITab[];
}

const TabLinks = ({ tabs }: Props) => {
  return (
    <Tabs
      defaultValue=""
      className="bg-light-800_dark-250 mb-4 min-h-[42px] w-max rounded-lg p-1 text-light-500"
    >
      <TabsList>
        {tabs.map((tab, index) => {
          return (
            <React.Fragment key={index}>
              {!tab.dontShow && (
                <TabsTrigger value={tab.value} className="active-tab">
                  <Link
                    href={tab.href}
                    className="flex size-full items-center justify-center gap-1 px-5 py-1.5"
                  >
                    {tab.totalNumbers !== 0 &&
                      formatAndDivideNumber(tab.totalNumbers)}
                    <p>{tab.tabName}</p>
                  </Link>
                </TabsTrigger>
              )}
            </React.Fragment>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default TabLinks;
