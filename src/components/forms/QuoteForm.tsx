"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { cargoTypeOptions, quoteSchema, serviceOptions, type QuoteData, type QuoteInput } from "@/lib/schemas";
import { Consent, Fieldset, Honeypot, SelectField, TextArea, TextField } from "./fields";
import { FormStatus, SuccessPanel, postForm, type SubmitState } from "./FormStatus";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const validService = serviceOptions.some((s) => s.value === defaultService) ? defaultService : "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: validService as QuoteInput["service"], consent: false, company_website: "" },
    shouldFocusError: true,
  });

  useEffect(() => setValue("startedAt", Date.now()), [setValue]);

  const onSubmit = async (data: QuoteData) => {
    setState({ status: "idle" });
    const result = await postForm("/api/quote", data);
    setState(result);
  };

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Thank you — your request is with us."
        text="Our team will review your shipment details and reply by email or phone. If it's urgent, message us on WhatsApp."
        onReset={() => {
          reset();
          setValue("startedAt", Date.now());
          setState({ status: "idle" });
          setTimeout(() => setFocus("fullName"), 0);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-10" aria-label="Quotation request">
      <Honeypot {...register("company_website")} />

      <Fieldset n="01" legend="Your details">
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" {...register("fullName")} error={errors.fullName?.message} />
          <TextField label="Company name" autoComplete="organization" {...register("companyName")} error={errors.companyName?.message} />
          <TextField label="Email address" required type="email" autoComplete="email" {...register("email")} error={errors.email?.message} />
          <TextField
            label="Phone / WhatsApp number"
            required
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
      </Fieldset>

      <Fieldset n="02" legend="Shipment">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label="Service required" required options={serviceOptions} placeholder="Choose a service" {...register("service")} error={errors.service?.message} className="md:col-span-2" />
          <TextField label="Origin country / city" required placeholder="e.g. Karachi, Pakistan" {...register("origin")} error={errors.origin?.message} />
          <TextField label="Destination country / city" required placeholder="e.g. Hamburg, Germany" {...register("destination")} error={errors.destination?.message} />
        </div>
      </Fieldset>

      <Fieldset n="03" legend="Cargo">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label="Cargo type" options={cargoTypeOptions} placeholder="Choose a cargo type" {...register("cargoType")} error={errors.cargoType?.message} />
          <TextField label="Shipment readiness date" type="date" {...register("readyDate")} error={errors.readyDate?.message} />
          <TextField label="Estimated weight" placeholder="e.g. 4,500 kg" {...register("weight")} error={errors.weight?.message} />
          <TextField label="Estimated volume" placeholder="e.g. 18 CBM or 1 × 40ft" {...register("volume")} error={errors.volume?.message} />
          <TextArea
            label="Cargo description"
            required
            placeholder="What are you shipping? Include packaging, number of pieces and any special handling."
            {...register("cargoDescription")}
            error={errors.cargoDescription?.message}
            className="md:col-span-2"
          />
          <TextArea
            label="Additional requirements"
            rows={3}
            placeholder="Door-to-door, insurance, customs support, storage…"
            {...register("additional")}
            error={errors.additional?.message}
            className="md:col-span-2"
          />
        </div>
      </Fieldset>

      <div className="space-y-6 border-t border-line pt-8" data-whatsapp-avoid>
        <Consent {...register("consent")} error={errors.consent?.message}>
          I agree that Nexpedite Freight may use these details to respond to my request, as described in the{" "}
          <Link href="/privacy-policy" className="text-blue underline">
            Privacy Policy
          </Link>
          .
        </Consent>
        <FormStatus state={state} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-lg bg-blue px-8 py-4 font-medium text-white transition-colors hover:bg-blue-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending request…
            </>
          ) : (
            <>
              Request my quotation <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
