"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import SubmitButton, { type SubmitStatus } from "@/components/SubmitButton";
import { profile } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject is too short"),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-neon-cyan/50 focus:bg-white/[0.05]";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactFormValues) => {
    setStatus("loading");
    window.setTimeout(() => {
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      window.setTimeout(() => {
        setStatus("idle");
        reset();
      }, 2600);
    }, 900);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="glass shimmer-border relative flex flex-col gap-5 rounded-[24px] p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">
            Your Name
          </label>
          <input
            {...register("name")}
            suppressHydrationWarning
            data-cursor-hover
            className={fieldClass}
            placeholder="Vedant Charde"
          />
          {errors.name && <p className="mt-1.5 text-xs text-neon-pink">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">
            Your Email
          </label>
          <input
            {...register("email")}
            suppressHydrationWarning
            data-cursor-hover
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-neon-pink">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">
          Subject
        </label>
        <input
          {...register("subject")}
          suppressHydrationWarning
          data-cursor-hover
          className={fieldClass}
          placeholder="Let's work together"
        />
        {errors.subject && <p className="mt-1.5 text-xs text-neon-pink">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">
          Message
        </label>
        <textarea
          {...register("message")}
          suppressHydrationWarning
          data-cursor-hover
          rows={7}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me about your project…"
        />
        {errors.message && <p className="mt-1.5 text-xs text-neon-pink">{errors.message.message}</p>}
      </div>

      <div className="mt-2 flex justify-center sm:justify-start">
        <SubmitButton status={status} />
      </div>
    </motion.form>
  );
}
