import { useState } from 'react';
import type { AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { AutoComplete } from 'primereact/autocomplete';

interface Country {
  name: string;
  code: string;
}

export const allCountries: Country[] = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Egypt', code: 'EG' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Greece', code: 'GR' },
  { name: 'Hungary', code: 'HU' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Norway', code: 'NO' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'Venezuela', code: 'VE' },
];

export function filterCountries(query: string): Country[] {
  const q = query.toLowerCase();
  return q
    ? allCountries.filter((c) => c.name.toLowerCase().startsWith(q))
    : [...allCountries];
}

// ── Demo components used in Summary MDX ───────────────────────────────────

export function BasicDemo() {
  const [value, setValue] = useState<Country | null>(null);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
      <AutoComplete
        value={value}
        field="name"
        suggestions={suggestions}
        completeMethod={(e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query))}
        onChange={(e) => setValue(e.value)}
        placeholder="Search country"
        className="w-full"
      />
    </div>
  );
}

export function DropdownDemo() {
  const [value, setValue] = useState<Country | null>(null);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
      <AutoComplete
        value={value}
        field="name"
        suggestions={suggestions}
        completeMethod={(e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query))}
        onChange={(e) => setValue(e.value)}
        dropdown
        placeholder="Search country"
        className="w-full"
      />
    </div>
  );
}

export function MultipleDemo() {
  const [value, setValue] = useState<Country[]>([]);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
      <AutoComplete
        value={value}
        field="name"
        suggestions={suggestions}
        completeMethod={(e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query))}
        onChange={(e) => setValue(e.value)}
        multiple
        dropdown
        placeholder="Add countries"
        className="w-full"
      />
    </div>
  );
}

export function FloatLabelDemo() {
  const [value, setValue] = useState<Country | null>(null);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
      <span className="p-float-label">
        <AutoComplete
          inputId="float-autocomplete"
          value={value}
          field="name"
          suggestions={suggestions}
          completeMethod={(e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query))}
          onChange={(e) => setValue(e.value)}
          className="w-full"
        />
        <label htmlFor="float-autocomplete">Country</label>
      </span>
    </div>
  );
}

export function InvalidStateDemo() {
  const [value, setValue] = useState<Country | null>(null);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
      <AutoComplete
        value={value}
        field="name"
        suggestions={suggestions}
        completeMethod={(e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query))}
        onChange={(e) => setValue(e.value)}
        className="p-invalid w-full"
        placeholder="Search country"
      />
    </div>
  );
}

