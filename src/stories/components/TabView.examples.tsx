import { useState, type ComponentProps } from 'react';
import { TabView } from 'primereact/tabview';
import { TabPanel } from 'primereact/tabview';

export type ExampleArgs = ComponentProps<typeof TabView> & {
  firstHeader?: string;
  secondHeader?: string;
  thirdHeader?: string;
  firstContent?: string;
  secondContent?: string;
  thirdContent?: string;
};
export const defaultArgs: ExampleArgs = { activeIndex: 0, renderActiveOnly: true, scrollable: false, firstHeader: 'Overview', secondHeader: 'Details', thirdHeader: 'Activity', firstContent: 'Keep the primary summary in the first panel.', secondContent: 'Place supporting information in a separate panel.', thirdContent: 'Use the final panel for recent activity or updates.' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { firstHeader, secondHeader, thirdHeader, firstContent, secondContent, thirdContent, children, ...tabViewProps } = args;
  return (<TabView {...tabViewProps} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); }}>{children !== undefined ? children : [<TabPanel key="first" header={firstHeader}>{firstContent}</TabPanel>, <TabPanel key="second" header={secondHeader}>{secondContent}</TabPanel>, <TabPanel key="third" header={thirdHeader}>{thirdContent}</TabPanel>]}</TabView>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
