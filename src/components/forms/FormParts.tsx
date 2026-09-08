"use client";

/** Shared primitives for the lead funnels. */

export function StepIndicator({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between">
        <p className="label-mono text-accent">
          Step {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="label-mono text-ink-faint">{label}</p>
      </div>
      <div
        className="mt-3 flex gap-1"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${step} of ${total}: ${label}`}
      >
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-0.5 flex-1 transition-colors ${
              index < step ? "bg-accent" : "bg-line-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ChoiceGroup({
  legend,
  options,
  value,
  onSelect,
}: {
  legend: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="display mb-6 text-[26px] text-ink sm:text-[30px]">{legend}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onSelect(option)}
            className="choice-tile"
          >
            <span>{option}</span>
            <span
              aria-hidden="true"
              className={`h-2 w-2 shrink-0 rounded-full border transition-colors ${
                value === option ? "border-accent bg-accent" : "border-line-strong"
              }`}
            />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
  placeholder,
  error,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="form-input"
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[12px] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="form-input"
      >
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Off-screen field that only automated submissions will fill in. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-url">Website</label>
      <input
        id="website-url"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-2 border-accent py-2 pl-4 text-[14px] text-ink">
      {message}
    </p>
  );
}

export function SuccessPanel({
  title,
  body,
  footnote,
}: {
  title: string;
  body: string;
  footnote?: string;
}) {
  return (
    <div className="border border-line bg-paper-raised p-8 sm:p-10" role="status">
      <p className="label-mono text-signal">Request received</p>
      <h2 className="display mt-4 text-[28px] text-ink sm:text-[32px]">{title}</h2>
      <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">{body}</p>
      {footnote && <p className="mt-6 text-[13px] leading-relaxed text-ink-faint">{footnote}</p>}
    </div>
  );
}
