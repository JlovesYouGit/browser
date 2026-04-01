import { InjectionKey, provide, inject, type Ref } from 'vue'

// Type definitions
export type ChartConfig = {
  [k in string]: {
    label?: string
    icon?: any
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
}

// Chart context interface
export interface ChartContext {
  config: ChartConfig
}

// Create injection key
export const ChartContextKey: InjectionKey<ChartContext> = Symbol('ChartContext')

// Provider component
export function ChartContextProvider(props: ChartContext & { children: any }) {
  provide(ChartContextKey, {
    config: props.config,
  })
  
  return props.children
}

// Hook for using chart context
export function useChart(): ChartContext {
  const context = inject(ChartContextKey)
  
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  
  return context
}

// Helper to extract item config from a payload
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof (payload as any)[key] === 'string'
  ) {
    configLabelKey = (payload as any)[key] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof (payloadPayload as any)[key] === 'string'
  ) {
    configLabelKey = (payloadPayload as any)[key] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}
