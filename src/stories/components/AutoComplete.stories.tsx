import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { AutoComplete } from 'primereact/autocomplete';

interface Country {
  name: string;
  code: string;
}

const allCountries: Country[] = [
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

function filterCountries(query: string): Country[] {
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
    <div style={{ width: '20rem' }}>
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
    <div style={{ width: '20rem' }}>
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
    <div style={{ width: '20rem' }}>
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
    <div style={{ width: '20rem' }}>
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
    <div style={{ width: '20rem' }}>
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

// ── Storybook meta ─────────────────────────────────────────────────────────

type AutoCompleteStoryArgs = {
  placeholder?: string;
  dropdown?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  forceSelection?: boolean;
};

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AutoComplete is an input field that provides real-time suggestions as the user types, supporting single and multiple selection.'
      }
    }
  },
  args: {
    placeholder: 'Search country',
    dropdown: false,
    multiple: false,
    disabled: false,
    forceSelection: false
  },
  argTypes: {
    placeholder: { control: 'text' },
    dropdown: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceSelection: { control: 'boolean' }
  },
  includeStories: ['Default']
} satisfies Meta<AutoCompleteStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

// ── Playground ─────────────────────────────────────────────────────────────

const AutoCompletePlayground = (args: AutoCompleteStoryArgs) => {
  const [singleValue, setSingleValue] = useState<Country | undefined>(undefined);
  const [multiValue, setMultiValue] = useState<Country[]>([]);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const completeMethod = (e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query));
  const { multiple, placeholder, dropdown, disabled, forceSelection } = args;

  return (
    <div style={{ width: '20rem' }}>
      {multiple ? (
        <AutoComplete<Country, true>
          multiple
          placeholder={placeholder}
          dropdown={dropdown}
          disabled={disabled}
          forceSelection={forceSelection}
          value={multiValue}
          field="name"
          suggestions={suggestions}
          completeMethod={completeMethod}
          onChange={(e) => setMultiValue(e.value ?? [])}
          className="w-full"
        />
      ) : (
        <AutoComplete<Country, false>
          placeholder={placeholder}
          dropdown={dropdown}
          disabled={disabled}
          forceSelection={forceSelection}
          value={singleValue}
          field="name"
          suggestions={suggestions}
          completeMethod={completeMethod}
          onChange={(e) => setSingleValue(e.value)}
          className="w-full"
        />
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <AutoCompletePlayground {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState(null);
const [suggestions, setSuggestions] = useState([]);

const search = (e) => {
  const q = e.query.toLowerCase();
  setSuggestions(countries.filter((c) => c.name.toLowerCase().startsWith(q)));
};

<AutoComplete
  value={value}
  field="name"
  suggestions={suggestions}
  completeMethod={search}
  onChange={(e) => setValue(e.value)}
  placeholder="Search country"
/>`
      }
    }
  }
};
