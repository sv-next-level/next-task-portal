"use client";

import * as React from "react";

import Link from "next/link";

import { CandlestickChartIcon } from "@/nextjs/assets";
import { useScreenSize } from "@/nextjs/hooks";
import { cn, pixelTOPercentage } from "@/nextjs/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/nextjs/components/ui/resizable";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Accounts } from "@/nextjs/components/accounts";
import { Apps } from "@/nextjs/components/apps";
import { Settings } from "@/nextjs/components/settings";
import { Themes } from "@/nextjs/components/themes";

import { tasks } from "@/data/tasks";

interface ResizableProps {
  top: number;
}
export function Resizable(props: ResizableProps) {
  const { height, width } = useScreenSize();

  const top = pixelTOPercentage(props.top, height ?? 0);

  return (
    <>
      {height && width ? (
        <ResizablePanelGroup direction="vertical">
          {top ? (
            <>
              <ResizablePanel defaultSize={top}>
                <div className="flex h-full justify-between overflow-x-scroll px-2">
                  <div className="flex items-center justify-start gap-4">
                    <CandlestickChartIcon />
                  </div>
                  <div className="my-auto flex justify-end gap-1">
                    <Link href="/" className="my-auto text-primary underline">
                      Loader
                    </Link>
                    <Themes />
                    <Settings />
                    <Apps />
                    <Accounts />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle
                disabled
                className="hover:bg-secondary active:bg-secondary"
              />
            </>
          ) : null}

          <ResizablePanel defaultSize={100 - top} className="relative">
            <div className={cn("h-screen overflow-scroll p-4 pb-24")}>
              <DataTable
                data={tasks}
                columns={columns}
                DataTableToolbar={DataTableToolbar}
                pageSizes={[10, 12, 14, 16, 18, 20]}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : null}
    </>
  );
}
