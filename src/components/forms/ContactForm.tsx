"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { contactMethodOptions, contactSchema, referralOptions, type ContactData, type ContactInput } from "@/lib/schemas";
import { Consent, Honeypot, SelectField, TextArea, TextField } from "./fields";
import { FormStatus, SuccessPanel, postForm, type SubmitState } from "./FormStatus";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false, referral: "", contactMethod: "", company_website: "" },
  });

  useEffect(() => setValue("startedAt", Date.now()), [setValue]);
  const referral = useWatch({ control, name: "referral" });

  const onSubmit = async (data: ContactData) => {
    setState({ status: "idle" });
    setState(await postForm("/api/contact", data));
  };

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Message received."
        text="Thank you for getting in touch. A member of our team will reply using your preferred contact method."
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5" aria-label="Contact form">
      <Honeypot {...register("company_website")} />
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" {...register("fullName")} error={errors.fullName?.message} />
        <TextField label="Email" required type="email" autoComplete="email" {...register("email")} error={errors.email?.message} />
        <TextField label="Phone number" type="tel" autoComplete="tel" placeholder="+92 300 1234567" {...register("phone")} error={errors.phone?.message} />
        <TextField label="Company name" autoComplete="organization" {...register("companyName")} error={errors.companyName?.message} />
      </div>
      <TextField label="Subject" required {...register("subject")} error={errors.subject?.message} />
      <TextArea label="Message" required placeholder="How can we help?" {...register("message")} error={errors.message?.message} />

      <div className="grid gap-5 md:grid-cols-2">
        <SelectField label="How did you hear about us?" options={referralOptions} placeholder="Select one" {...register("referral")} error={errors.referral?.message} />
        <SelectField
          label="How would you prefer us to contact you?"
          options={contactMethodOptions}
          placeholder="No preference"
          {...register("contactMethod")}
          error={errors.contactMethod?.message}
        />
      </div>
      <AnimatePresence initial={false}>
        {referral === "Other" && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <TextField label="Please specify" {...register("referralOther")} error={errors.referralOther?.message} className="pt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 pt-3" data-whatsapp-avoid>
        <Consent {...register("consent")} error={errors.consent?.message}>
          I agree that Nexpedite Freight may use these details to reply to my enquiry, as described in the{" "}
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
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
