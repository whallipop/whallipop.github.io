+++
title = "Color Exercise for Interaction of Color, using CSS"
date = 2024-01-03T13:25:02+08:00
draft = false
+++

{{< ScriptCommon >}}

{{<lead>}}
 You should always doubt the color you see with your eyes. 
{{</lead>}}

{{< TabParent height="100" direction="horizontal">}}
    {{< TabFrame contentId="nestedBox" label="One Color Different" tabId="tab1"  checked="yes"  >}}
        {{< ToggleGroup toggleGroupId="tab1-tg" label="Show Connected Line">}}
        {{< ColorCanvas canvasId="tab1" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-1" seid="se-1">}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-2" seid="se-2">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-1-e" seid="se-1-e" right_sid="sb-r1-e">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-2-e" seid="se-2-e" left_sid="sb-l1-e">}}
            {{< ColorPalette  canvasId="tab1" >}}
                {{< ColorPicker id="b-picker-1" color="#A0BEDC" selectors="sb-1,sb-1-e" >}}
                {{< ColorPicker id="f-picker" color="#B9D296" selectors="se-1,se-2,se-1-e,se-2-e,sb-r1-e,sb-l1-e" >}}
                {{< ColorPicker id="b-picker-2" color="#F5E664" selectors="sb-2,sb-2-e" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
    {{< TabFrame contentId="nestedBox" label="Two Color Same" tabId="tab2">}}
        {{< ToggleGroup toggleGroupId="tab2-tg" label="Show Connected Line">}}
        {{< ColorCanvas canvasId="tab2" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-1" seid="se-1" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-2" seid="se-2" >}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-1-e" seid="se-1-e" right_sid="sb-r1-e">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-2-e" seid="se-2-e" left_sid="sb-l1-e">}}
            {{< ColorPalette  canvasId="tab2" >}}
                {{< ColorPicker id="b-picker-1" color="#888888" selectors="sb-1,sb-1-e" >}}
                {{< ColorPicker id="f-picker-1" color="#BBBBBB" selectors="se-1,se-1-e,sb-r1-e" >}}
                {{< BlankFlexItem >}}
                {{< ColorPicker id="b-picker-2" color="#222222" selectors="sb-2,sb-2-e" >}}
                {{< ColorPicker id="f-picker-2" color="#999999" selectors="se-2,se-2-e,sb-l1-e" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
{{< /TabParent >}}


Click `tab` to change the plates of the cases.

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
