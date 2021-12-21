import React from 'react';
import {CartLines} from '../CartLines';
import {CART_LINE} from '../../CartLineProvider/tests/fixtures';
import {CartLineProductTitle} from '../../CartLineProductTitle';
import {CART} from '../../CartProvider/tests/fixtures';
import {CartProvider} from '../../CartProvider';
import {mountWithShopifyProvider} from '../../../utilities/tests/shopify_provider';

describe('CartLines', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(async (_url, _init) => {
      return {
        json: async () =>
          JSON.stringify({
            data: {},
          }),
      };
    });
  });

  it('renders items', () => {
    const wrapper = mountWithShopifyProvider(
      <CartProvider cart={cart}>
        <CartLines>
          <CartLineProductTitle />
        </CartLines>
      </CartProvider>
    );

    expect(wrapper).toContainReactComponent('span', {children: 'Product 1'});
    expect(wrapper).toContainReactComponent('span', {children: 'Product 2'});
  });

  it('renders items in li if ul is provided as tag', () => {
    const wrapper = mountWithShopifyProvider(
      <CartProvider cart={cart}>
        <CartLines as="ul">
          <CartLineProductTitle />
        </CartLines>
      </CartProvider>
    );

    expect(wrapper).toContainReactComponent('ul');
    expect(wrapper).toContainReactComponent('li');
  });

  it('uses render props if provided', () => {
    const wrapper = mountWithShopifyProvider(
      <CartProvider cart={cart}>
        <CartLines>
          {(line) => <p>{line.merchandise.product.title}</p>}
        </CartLines>
      </CartProvider>
    );

    expect(wrapper).toContainReactComponent('p', {children: 'Product 1'});
    expect(wrapper).toContainReactComponent('p', {children: 'Product 2'});
  });
});

const cart = {
  ...CART,
  lines: {
    edges: [
      {
        node: {
          ...CART_LINE,
          id: 'abc',
          merchandise: {
            ...CART_LINE.merchandise,
            product: {
              ...CART_LINE.merchandise.product,
              title: 'Product 1',
            },
          },
        },
      },
      {
        node: {
          ...CART_LINE,
          id: 'def',
          merchandise: {
            ...CART_LINE.merchandise,
            product: {
              ...CART_LINE.merchandise.product,
              title: 'Product 2',
            },
          },
        },
      },
    ],
  },
};
