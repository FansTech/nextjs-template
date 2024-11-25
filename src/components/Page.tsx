"use client";

import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TomoProvider, useTomo } from "@tomo-inc/tomo-telegram-sdk";
import "@tomo-inc/tomo-telegram-sdk/dist/styles.css";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return (
    <>
      <TomoProvider
        supportedProviders={["TON"]}
        manifestUrl={"https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json"}
      >
        <Dummy />
        <div>
          {children}
        </div>
      </TomoProvider>
    </>
  );
}

function Dummy() {
  const {openConnectModal} = useTomo()
  useEffect(() =>{
    window.openConnectModal = openConnectModal;
  }, [])
  return <></>
}