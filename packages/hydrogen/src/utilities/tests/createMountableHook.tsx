import React from 'react';

import {mountWithShopifyProvider} from './shopify_provider';

// This exported function allows you to test the results of a hook directly
// instead of testing the presence of strings in a mounted component.
//
// const mountUseYourHook = createMountableHook(useYourHook);
//
// it('does something', async () => {
//   const value = await mountUseYourHook(...args);
//   expect(value).toEqual('foo');
// })
export function createMountableHook<T>(hook: (args: T) => any) {
  return async function (hookArgs: T) {
    const value = {};

    function TestComponent() {
      Object.assign(value, hook(hookArgs));
      return null;
    }

    await mountWithShopifyProvider(<TestComponent />);

    return value;
  };
}
