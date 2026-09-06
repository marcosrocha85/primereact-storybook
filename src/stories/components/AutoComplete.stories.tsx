import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { AutoComplete, type AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { filterCountries } from './AutoComplete.examples';

interface Country { name: string; code: string; }

// ── Storybook meta ─────────────────────────────────────────────────────────

type AutoCompleteStoryArgs = {
  placeholder?: string;
  dropdown?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  forceSelection?: boolean;
  value?: Country | Country[] | string | null;
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
    forceSelection: false,
    value: null
  },
  argTypes: {
    placeholder: { control: 'text' },
    dropdown: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceSelection: { control: 'boolean' },
    value: { control: 'object' }
  },
  includeStories: ['Default']
} satisfies Meta<AutoCompleteStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

// ── Playground ─────────────────────────────────────────────────────────────

const AutoCompletePlayground = ({ args, updateArgs }: { args: AutoCompleteStoryArgs; updateArgs: (changes: Partial<AutoCompleteStoryArgs>) => void }) => {
  const singleValue = Array.isArray(args.value) ? null : args.value;
  const multiValue = Array.isArray(args.value) ? args.value : [];
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const completeMethod = (e: AutoCompleteCompleteEvent) => setSuggestions(filterCountries(e.query));
  const { multiple, placeholder, dropdown, disabled, forceSelection } = args;

  return (
    <div style={{ width: '20rem', maxWidth: '100%' }}>
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
          onChange={(e) => updateArgs({ value: e.value ?? [] })}
          className="w-full"
        />
      ) : (
        <AutoComplete<Country | string | null, false>
          placeholder={placeholder}
          dropdown={dropdown}
          disabled={disabled}
          forceSelection={forceSelection}
          value={singleValue}
          field="name"
          suggestions={suggestions}
          completeMethod={completeMethod}
          onChange={(e) => updateArgs({ value: e.value })}
          className="w-full"
        />
      )}
    </div>
  );
};

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<AutoCompleteStoryArgs>();
    return <AutoCompletePlayground args={args} updateArgs={updateArgs} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState(null);
const [suggestions, setSuggestions] = useState([]);

const search = (e) => {
  const q = e.query.toLowerCase();
  setSuggestions(allCountries.filter((c) => c.name.toLowerCase().startsWith(q)));
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
