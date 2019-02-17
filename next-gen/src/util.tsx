import React from 'react'
import {ValueType} from 'react-select/lib/types'
export interface SelectionType {value : string, label : string};

export function isSelectionType(
  selection: ValueType<SelectionType>
): selection is SelectionType {
  if (selection) {
    if (selection instanceof Array) return false;
    return true;
  }
  return false;
}

export function shuffle_list(l: any[])
{
    for (let i = 0; i < l.length-1; i++)
    {
        // Based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Implementation_errors
        let switch_index = i + Math.floor(Math.random() * (l.length - i));
        let tmp = l[switch_index];
        l[switch_index] = l[i];
        l[i] = tmp;
    }
}

export function createMandatoryContext<T>(defaultValue?: T) {
  let context = React.createContext<T>((undefined as any) as T);
  // @ts-ignore
  let consumer: React.Consumer<T> = props => {
    return (
      <context.Consumer>
        {state => (state ? props.children(state)
          : <span style={{ color: "red" }}>Missing Context</span>)}
      </context.Consumer>
    );
  };
  return {
    Provider: context.Provider,
    Consumer: consumer,
  };
}