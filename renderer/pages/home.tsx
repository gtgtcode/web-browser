import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

import { ipcMain, ipcRenderer } from "electron";
import { dragTabs } from "drag-tabs";
import WindowControls from "../components/window-controls";
import BrowserControls from "../components/browser-controls";
import TabTemplate from "../components/tab-template";
import CreateTab from "../components/create-tab";

export default function HomePage(props: any) {
  const [URLArray, setURLArray] = useState<string[]>([
    "https://google.com",
    "https://youtube.com",
  ]);
  const [activeTab, setActiveTab] = useState<number>(0);

  class PageControls {
    refreshPage() {
      webContainer.current[activeTab]?.reload();
    }
    goBack() {
      webContainer.current[activeTab]?.canGoBack() &&
        webContainer.current[activeTab]?.goBack();
    }
    goForward() {
      webContainer.current[activeTab]?.canGoForward() &&
        webContainer.current[activeTab]?.goForward();
    }
    getTitles() {
      if (webContainer.current) {
        let title = [];
        let newTitles = [];
        for (let i = 0; i < URLArray.length; i++) {
          title.push(webContainer.current[i]?.getTitle());
        }
        return title;
      }
    }
    getURL(index: number) {
      if (webContainer.current) {
        const pageURL = webContainer.current[index]?.getURL();
        return pageURL;
      }
    }
    isCurrentlyAudible(index: number): boolean {
      const audible = webContainer.current[index]?.isCurrentlyAudible();
      return audible || false; // return false if audible is undefined or null
    }
  }

  const webContainer = useRef([]);
  useEffect(() => {
    // Everything around if statement
    if (webContainer && webContainer.current) {
      let tabURLs = [];
      webContainer.current[activeTab].addEventListener("load-commit", () => {
        for (let i = 0; i < webContainer.current?.length; i++) {
          tabURLs.push(webContainer.current[i]?.getTitle());
          setURLArray(tabURLs);
        }
      });

      return () => {
        webContainer.current[activeTab].removeEventListener("load-commit");
      };
    }
  }, [webContainer]);

  useEffect(() => {
    console.log(webContainer);
  }, [URLArray]);
  useEffect(() => {
    console.log(webContainer);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Browser</title>
      </Head>
      <div className="h-screen flex flex-col">
        <div className="flex flex-row w-full">
          <div className="flex gap-1 ml-4 grow max-h-[40px]" id="tabs">
            {URLArray.map((key, index) => (
              <TabTemplate
                URLArray={URLArray}
                setURLArray={setURLArray}
                index={index}
                key={key}
                PageControls={new PageControls()}
                setActiveTab={setActiveTab}
                webContainer={webContainer}
                activeTab={activeTab}
              />
            ))}
            <CreateTab
              setURLArray={setURLArray}
              URLArray={URLArray}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="titlebar grow "></div>
          <WindowControls URLArray={URLArray} setURLArray={setURLArray} />
        </div>
        <BrowserControls
          URLArray={URLArray}
          setURLArray={setURLArray}
          PageControls={new PageControls()}
          activeTab={activeTab}
          webContainer={webContainer}
        />
        {URLArray.map((key, index) => (
          <webview
            ref={(n) => (webContainer.current[index] = n)}
            className={index === activeTab ? "grow" : "hidden"}
            src={URLArray[index]}
          ></webview>
        ))}
      </div>
    </React.Fragment>
  );
}
