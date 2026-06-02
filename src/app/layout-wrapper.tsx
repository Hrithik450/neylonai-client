"use client";

import React, { useEffect } from "react";
import { useErrorStore } from "@/store/error-store";
import { useSessionStore } from "@/store/session-store";

import { SuccessAlert } from "@/components/success-alert";
import { FailureAlert } from "@/components/failure-alert";
import { UserResponse } from "@/lib/types/types";

import { BASE_URL } from "@/lib/services/google-auth";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { status, message, setStatus, setMessage } = useErrorStore();
  const { setSessionChecked, clearSession, setLoading, setUser } =
    useSessionStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/api/v1/me/`, {
          credentials: "include",
        });
        if (!response.ok) {
          clearSession();
          return;
        }

        const responseData: UserResponse = await response.json();

        if (responseData.success && responseData.user) {
          setUser(responseData.user);
        } else {
          clearSession();
        }
      } catch (err) {
        clearSession();
        console.error("session error: ", err);
      } finally {
        setLoading(false);
        setSessionChecked(true);
      }
    };

    fetchSession();
  }, []);

  return (
    <main>
      {children}
      {status === "saved" && message && (
        <SuccessAlert
          message={message}
          duration={4000}
          setStatus={setStatus}
          setMessage={setMessage}
        />
      )}
      {status === "error" && message && (
        <FailureAlert
          message={message}
          duration={4000}
          setStatus={setStatus}
          setMessage={setMessage}
        />
      )}
    </main>
  );
}
