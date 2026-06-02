"use client";

import React from "react";
import { useSessionStore } from "@/store/session-store";
import { useGoogleAuthHandler } from "@/hooks/use-google-auth-handler";
import { useGoogleOAuth } from "@/providers/google-oauth-provider";

export function GoogleOneTap() {
  const { handleCredential } = useGoogleAuthHandler();
  const { clientId, scriptLoaded } = useGoogleOAuth();

  const { isAuthenticated, sessionChecked } = useSessionStore();

  React.useEffect(() => {
    if (!scriptLoaded || !window.google) return;
    if (isAuthenticated || !sessionChecked) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredential,
    });

    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log("not displayed:", notification.isNotDisplayed());

        console.log("skipped:", notification.isSkippedMoment());

        console.log("dismissed:", notification.isDismissedMoment());

        console.log("reason:", notification.getNotDisplayedReason?.());

        console.log("skip reason:", notification.getSkippedReason?.());

        console.log("dismiss reason:", notification.getDismissedReason?.());
      }
    });
  }, [scriptLoaded, isAuthenticated, sessionChecked]);

  return null;
}
