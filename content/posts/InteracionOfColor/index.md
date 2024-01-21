+++
title = "Color Exercise for Interaction of Color, using CSS"
date = 2024-01-03T13:25:02+08:00
draft = false
+++

{{< ScriptCommon >}}

{{<lead>}}
 You should always doubt the color you see with your eyes. 
{{</lead>}}

{{< TabParent height="100" direction="row">}}
    {{< TabFrame contentId="ocd" label="One Color Different" tabId="tab1" >}}
        {{< ColorCanvas canvasId="tab1" >}}
            {{< NestedBox sbid="sb-1" seid="se-1" >}}
            {{< NestedBox sbid="sb-2" seid="se-2" >}}
            {{< ColorPalette  canvasId="tab1" >}}
                {{< ColorPicker id="b-picker-1" color="#A0BEDC" selectors="sb-1" >}}
                {{< ColorPicker id="f-picker" color="#B9D296" selectors="se-1,se-2" >}}
                {{< ColorPicker id="b-picker-2" color="#F5E664" selectors="sb-2" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
    {{< TabFrame contentId="ocd" label="Two Color Same" tabId="tab2"  checked="yes" >}}
        {{< ColorCanvas canvasId="tab2" >}}
            {{< NestedBox sbid="sb-1" seid="se-1" >}}
            {{< NestedBox sbid="sb-2" seid="se-2" >}}
            {{< ColorPalette  canvasId="tab2" >}}
                {{< ColorPicker id="b-picker-1" color="#888888" selectors="sb-1" >}}
                {{< ColorPicker id="f-picker-1" color="#BBBBBB" selectors="se-1" >}}
                {{< BlankFlexItem >}}
                {{< ColorPicker id="b-picker-2" color="#222222" selectors="sb-2" >}}
                {{< ColorPicker id="f-picker-2" color="#999999" selectors="se-2" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
{{< /TabParent >}}


Click `tab` to change the plates of the cases.
