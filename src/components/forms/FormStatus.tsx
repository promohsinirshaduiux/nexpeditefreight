"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { mailtoUrl, site, whatsappUrl } from "@/data/site";

export type SubmitState = { status: "idle" } | { status: "success" } | { status: "error"; message: string };

/** Announces the backend's actual response to screen readers and sighted users. */
export function FormStatus({ state }: { state: SubmitState }) {
  return (
    <div role="status" aria-live="polite">
      {state.status === "error" && (
        <div className="flex gap-3 rounded-lg border border-[#f4c7c1] bg-[#fef3f2] p-4 text-[0.9375rem] text-[#7a271a]">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-medium">{state.message}</p>
            <p className="mt-1">
              You can also reach us at{" "}
              <a href={mailtoUrl} className="underline">
                {site.contact.email}
              </a>{" "}
              or on{" "}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function SuccessPanel({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-start rounded-xl border border-line bg-off p-8 md:p-12">
      <span className="flex size-12 items-center justify-center rounded-full bg-blue/10 text-blue">
        <CheckCircle2 aria-hidden className="size-6" />
      </span>
      <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-md text-muted">{text}</p>
      <button type="button" onClick={onReset} className="link-underline mt-8 font-medium text-blue">
        Send another request
      </button>
    </div>
  );
}

export async function postForm(url: string, body: unknown): Promise<SubmitState> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => null)) as { ok: boolean; message?: string } | null;
    if (res.ok && data?.ok) return { status: "success" };
    return { status: "error", message: data?.message ?? "Something went wrong. Please try again." };
  } catch {
    return { status: "error", message: "We couldn't reach the server. Please check your connection and try again." };
  }
}
