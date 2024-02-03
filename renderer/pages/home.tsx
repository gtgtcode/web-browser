import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

import { ipcMain, ipcRenderer } from "electron";
import { dragTabs } from "drag-tabs";
import WindowControls from "../components/window-controls";
import BrowserControls from "../components/browser-controls";
import TabTemplate from "../components/tab-template";

export default function HomePage(props: any) {
  const [URLArray, setURLArray] = useState<string[]>([
    "https://google.com",
    "https://facebook.com",
    "https://google.com",
  ]);

  return (
    <React.Fragment>
      <Head>
        <title>Browser</title>
      </Head>
      <div className="h-screen flex flex-col">
        <div className="flex flex-row w-full">
          <div className="flex gap-1 ml-4 grow max-h-[40px]" id="tabs">
            {URLArray.map((index) => (
              <TabTemplate
                URLArray={URLArray}
                setURLArray={setURLArray}
                index={index}
              />
            ))}
          </div>
          <div className="titlebar grow "></div>
          <WindowControls URLArray={URLArray} setURLArray={setURLArray} />
        </div>
        <BrowserControls URLArray={URLArray} setURLArray={setURLArray} />
        <webview
          id="foo"
          className="grow"
          src="https://www.github.com/"
        ></webview>
      </div>
    </React.Fragment>
  );
}
