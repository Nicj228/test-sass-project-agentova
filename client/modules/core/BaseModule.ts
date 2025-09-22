import React from 'react';

export type ModuleComponent = React.FC<any> & { moduleId: string };

export function createModule<P>(Component: React.FC<P>, moduleId: string): ModuleComponent {
  const Wrapped: React.FC<P> = (props: P) => {
    return React.createElement(Component as React.ComponentType<any>, props as any);
  };
  const Mod: ModuleComponent = Object.assign(Wrapped as React.FC<any>, { moduleId });
  return Mod;
}


