import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

import { ipcRenderer } from "electron";
import WindowControls from "../components/window-controls";
import BrowserControls from "../components/browser-controls";

export default function HomePage(props: any) {
  return (
    <React.Fragment>
      <Head>
        <title>Browser</title>
      </Head>
      <div className="flex flex-row w-full">
        <div className="flex gap-1" id="tabs"></div>
        <div className="titlebar grow"></div>
        <WindowControls />
      </div>
      <BrowserControls />
    </React.Fragment>
  );
}
