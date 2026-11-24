"use client";

import { Field, SelectField } from "@/components/forms/FormParts";

/**
 * Optional qualifying fields shared by the buyer-side forms.
 *
 * They capture what otherwise only surfaces in follow-up messages — who is
 * asking, whether a yard is firm, and the real budget ceiling — without
 * making any of it required, so the short forms stay short.
 */

export const BUYER_ROLE = ["Principal", "Broker", "Family office", "Adviser / captain"];

export interface BuyerContext {
  role: string;
  brokerage: string;
  builders: string;
  budgetCeiling: string;
}

export const EMPTY_BUYER_CONTEXT: BuyerContext = {
  role: "",
  brokerage: "",
  builders: "",
  budgetCeiling: "",
};

/** True when the person says they are acting for someone else as a broker. */
export function isBrokerRole(role: string): boolean {
  return role === "Broker" || role === "Representing a client";
}

export function buyerContextAnswers(context: BuyerContext): Record<string, string> {
  return {
    ...(context.role ? { "Your role": context.role } : {}),
    ...(context.brokerage ? { Brokerage: context.brokerage } : {}),
    "Preferred builders": context.builders,
    "Budget ceiling": context.budgetCeiling,
  };
}

export default function BuyerContextFields({
  idPrefix,
  value,
  onChange,
  showRole = true,
  brokerRole = false,
}: {
  idPrefix: string;
  value: BuyerContext;
  onChange: (next: BuyerContext) => void;
  /** Hide when the host form already asks who the buyer is. */
  showRole?: boolean;
  /** Set by a host form whose own question identifies a broker. */
  brokerRole?: boolean;
}) {
  const set = (field: keyof BuyerContext) => (v: string) => onChange({ ...value, [field]: v });
  const askBrokerage = brokerRole || isBrokerRole(value.role);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {showRole && (
        <SelectField
          id={`${idPrefix}-role`}
          label="Your Role"
          value={value.role}
          onChange={set("role")}
          options={BUYER_ROLE}
        />
      )}
      {askBrokerage && (
        <Field
          id={`${idPrefix}-brokerage`}
          label="Brokerage"
          value={value.brokerage}
          onChange={set("brokerage")}
          autoComplete="organization"
          hint="Your client is not contacted directly."
        />
      )}
      <Field
        id={`${idPrefix}-builders`}
        label="Preferred Builders"
        value={value.builders}
        onChange={set("builders")}
        placeholder="e.g. Lürssen, Feadship"
        hint="Optional"
      />
      <Field
        id={`${idPrefix}-budget-ceiling`}
        label="Budget Ceiling"
        value={value.budgetCeiling}
        onChange={set("budgetCeiling")}
        placeholder="e.g. under $30M"
        hint="Optional — the real upper limit."
      />
    </div>
  );
}
