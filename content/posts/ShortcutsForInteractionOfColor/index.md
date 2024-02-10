+++
title = 'Shorcuts for Color Exercise for Interaction of Color, using CSS'
date = 2024-02-10T11:10:04+08:00
draft = false
+++

{{< ScriptCommon >}}

{{<lead>}}
Encapsulate and get smart. 
{{</lead>}}

# Code notes

The interaction of color comparision is used for practice how to leverage CSS to achieve some interesting effects. The current tool shortcuts can be concluded as the following notes:

## `TabParent` -> `TabFrame` -> `ColorCanvas`

`TabParent` is used for show out a tabs group which contain serveral tabs with different color visual comparision effect. And each tab is wrapped by `TabFrame` to be switched by the tab label which is clicked. And inside it we should leverage `ColorCanvas` as a "canvas" wrapping the real content. Its CSS class is `interaction-of-color` which will be used everywhere to achive complex effects.

## Setup `ColorCanvas` properties

`ColorCanvas` is a block element to seperate the layout shortcuts (such as `TabParent` and `TabFrame`) and the color pattern shortcuts (such as `NestedBox`). And before the `ColorCanvas` we can setup its properties by apply the properties shortcuts to able to change the CSS inside the `ColorCanvas`. Take `ToggleGroup` as an example, we place it before our `ColorCanvas`:

```Hugo
{{</* ToggleGroup toggleGroupId="tab1-tg" label="Show Connected Line" */>}}
{{</*  ColorCanvas canvasId="tab1" */>}}
    <!-- The Actual Inner Content -->
{{</*  /ColorCanvas */>}}
```

The toggle group claim an input of checkbox to switch the status inside `ColorCanvas` combined with other two shortcuts, `ToggleEnable` and `ToggleDisable` to control the visible of an `<div>` element:

```Hugo
{{</* ToggleGroup toggleGroupId="tab1-tg" label="Show Connected Line" */>}}
{{</*  ColorCanvas canvasId="tab1" */>}}
    {{</*  ToggleEnable */>}}  {{</*  Single Div ShortCut */>}}
    {{</*  ToggleDisable */>}} {{</*  Single Div ShortCut */>}}
{{</*  /ColorCanvas */>}}
```

And we should use this following CSS selector to achieve the `ToggleGroup` effect:
```Hugo
.simple-toggle[type=checkbox]:checked + .interaction-of-color .toggle-enable + div
```
The `simple-toggle`(with checked states or not) "plus" `.interaction-of-color` to select the control canvas of our target `ColorCanvas`. Then check its children which contains our helper shortcuts (`ToggleEnable` and `ToggleDisable`) and leverage "plus" again to find out the `<div>` color pattern element that we want to control.

## Elements inside `ColorCanvas`

There are two types of elements inside `ColorCanvas`:
- Color pattern: `NestedBox` and so on. They should be **only** one single div inside it;
- Color palette: `ColorPalette` which contains a series of `ColorPicker` passed the ids of those specific graphics inside Color pattern for controlling their colors.

## Other shortcuts

- `BlankFlexItem`: Add a blank item to a flex layout.