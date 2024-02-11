+++
title = "Color Exercise for Interaction of Color, using CSS"
date = 2024-01-03T13:25:02+08:00
draft = false
+++

{{< ScriptCommon >}}

{{<lead>}}
 You should always doubt the color you see with your eyes. 
{{</lead>}}

Click `tab` to change the plates of the cases.

# Normal `<div>` Nested Box Color Pattern

{{< TabParent height="100" direction="horizontal" tabGroupId="simpleColorPattern" >}}
    {{< TwoSidesNestedBox label="One Color Diff" checked="yes">}}
    {{< TwoSidesNestedBox label="Two Color Same" is4Colors="yes">}}
{{< /TabParent >}}

# SVG html Color Pattern

## "One Color" looks difference and "Two Color "look the same

{{< TabParent height="100" direction="horizontal" tabGroupId="svgColorPattern" >}}
    {{< TwoSides label="One Color Diff" checked="yes">}}
    {{< TwoSides label="Two Color Same" is4Colors="yes">}}
{{< /TabParent >}}

## Color Mixing

{{< TabParent height="100" direction="horizontal" tabGroupId="svgColorMixing" >}}
    {{< TwoColorMix label="Find the mixing color" checked="yes">}}
{{< /TabParent >}}