# react-collapsible

## Introduction

`react-collapsible` is a minimalist [React](https://reactjs.org/) functional component which renders a collapsible (also known as Accordion) element.
It is minimalist in the way that it only includes the most basic features and styling, allowing for higher customizability.
No need for having to sort through a load of CSS classes to figure out how to style the HTML elements.

## Installation

To install run the following command:

```shell
npm install @noxy/react-collapsible@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import React, {HTMLProps, useState} from "react";
import {Collapsible} from "@noxy/react-collapsible";
import CollapsibleDirection from "./CollapsibleDirection";

function TestComponent(props: HTMLProps<HTMLDivElement>) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  
  return (
    <Collapsible collapsed={collapsed} direction={CollapsibleDirection.BOTH} label={"Hello World"} speed={300} minWidth={100} minHeight={100} onChange={setCollapsed}>
      <div {...props}>
        Hello World
      </div>
    </Collapsible>
  );
}
```

The `Collapsible` component can be nested inside another `Collapsible` component and should work out of the box as long as mandatory [styling](#Styling) is maintained.

## Properties

The `Collapsible` component inherits all HTMLDivElement properties and applies them directly to the outermost element.
This includes the className property for those using CSS modules.

### collapsed: boolean

Determines if the collapsible should be collapsed or not. The component listens for changes on this property and will open or close depending on what the value it is set to.

**Default value**: `true`

### direction: CollapsibleDirection (string enum)

Enum determining the direction which the collapsible should open and close.

Can be set to the following values:

- `CollapsibleDirection.HEIGHT` or `"height"`
- `CollapsibleDirection.WIDTH` or `"width"`
- `CollapsibleDirection.BOTH` or `"both"`

Height for vertical, width for horizontal, both for a mix of the two.

**Default value**: `CollapsibleDirection.HEIGHT` or `"height"`

### label: React.ReactElement

The label which will appear at the top of the collapsible and not as content inside of it. This will also be the clickable area to open and close the collapsible.

**Default value**: `undefined`

### speed: number

The speed which the collapsible will open and close with. The speed is a relative value.

**Default value**: `200`

### minWidth: number

The minimum width of the collapsible. It should be set here rather than through CSS as it would change the animation timing if manually adjusted through CSS.

**Default value**: `0`

### minHeight: number

The minimum height of the collapsible. It should be set here rather than through CSS as it would change the animation timing if manually adjusted through CSS.

**Default value**: `0`

### onChange: callback(value: boolean): void

A callback function which returns whether the collapsible should be collapsed or not. Triggered when a label is clicked on.

If you want to avoid this callback, intercept the onClick event of the `.collapsible` or `.collapsible-label` element and call `event.preventDefault()`.

**Default value**: `undefined`

## Styling

The following is a list of elements inside this component and which properties should not be changed under any circumstance.

```css
.collapsible {
  overflow: hidden;
}

.collapsible-content-container {
  min-width: max-content;
}
```

## Notice

This is currently not in a v1.0.0 release. Undocumented breaking changes might happen between versions.
