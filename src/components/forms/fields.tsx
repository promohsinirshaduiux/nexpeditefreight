"use client";

import { Check, ChevronDown, Package, Route, UserRound, type LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { createElement, forwardRef, useId } from "react";

const control =
  "w-full rounded-lg border bg-white px-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 focus:ring-blue/10 focus:border-blue aria-[invalid=true]:border-[#c4320a] aria-[invalid=true]:ring-[#c4320a]/10";

type FieldShell = { label: string; error?: string; hint?: string; required?: boolean; className?: string };

function Shell({ id, label, error, hint, required, className = "", children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.875rem] font-medium text-ink">
        {label}
        {required ? (
          <span className="text-blue" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] font-medium text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export const TextField = forwardRef<HTMLInputElement, FieldShell & InputHTMLAttributes<HTMLInputElement>>(function TextField(
  { label, error, hint, required, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} h-11 ${error ? "border-[#c4320a]" : "border-line"}`}
        {...props}
      />
    </Shell>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea(
  { label, error, hint, required, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        ref={ref}
        id={id}
        rows={3}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} min-h-20 resize-y py-3 ${error ? "border-[#c4320a]" : "border-line"}`}
        {...props}
      />
    </Shell>
  );
});

/** Native select restyled — keeps full keyboard, screen-reader and mobile picker support. */
export const SelectField = forwardRef<
  HTMLSelectElement,
  FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly (string | { value: string; label: string })[]; placeholder?: string }
>(function SelectField({ label, error, hint, required, className, options, placeholder = "Select an option", ...props }, ref) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={describedBy(id, error, hint)}
          className={`${control} h-11 cursor-pointer appearance-none pr-11 ${error ? "border-[#c4320a]" : "border-line"}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return (
              <option key={v} value={v}>
                {l}
              </option>
            );
          })}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
    </Shell>
  );
});

export const Consent = forwardRef<HTMLInputElement, { error?: string; children: ReactNode } & InputHTMLAttributes<HTMLInputElement>>(function Consent(
  { error, children, ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 flex size-5 shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer size-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white transition-colors duration-200 checked:border-blue checked:bg-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/15 aria-[invalid=true]:border-[#c4320a]"
            {...props}
          />
          <Check
            aria-hidden
            strokeWidth={3}
            className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="text-[0.875rem] leading-relaxed text-muted">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-8 text-[0.8125rem] font-medium text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
});

/** Hidden from people and assistive tech; bots tend to fill it. */
export function Honeypot(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

const fieldsetIcons: Record<string, LucideIcon> = { "01": UserRound, "02": Route, "03": Package };

/** Form section with an icon heading; `n` picks the icon for that step. */
export function Fieldset({ legend, n, children }: { legend: string; n: string; children: ReactNode }) {
  return (
    // The divider sits on a wrapper, above the section: a fieldset's own border is drawn through its legend.
    <div className={n === "01" ? "" : "border-t border-gray-200 pt-6"}>
      <fieldset>
        <legend className="mb-4 flex items-center gap-3">
          {createElement(fieldsetIcons[n] ?? Package, { "aria-hidden": true, className: "size-6 shrink-0 text-blue", strokeWidth: 1.75 })}
          <span className="font-display text-xl font-semibold tracking-tight text-ink">{legend}</span>
        </legend>
        {children}
      </fieldset>
    </div>
  );
}
