import React from 'react';

export default function Hello({ name = 'World' }: { name?: string }) {
  return <h1>Hello, {name}!</h1>;
}
