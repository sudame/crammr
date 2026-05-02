import type { Plan } from "../types";

type Props = {
  plans: Plan[];
  activePlanId: string | null;
  onChange: (planId: string) => void;
};

export function PlanSwitcher({ plans, activePlanId, onChange }: Props) {
  if (plans.length === 0) return null;
  return (
    <select
      data-testid="plan-switcher"
      value={activePlanId ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {plans.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
