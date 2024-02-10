+++
title = "Color Exercise for Interaction of Color, using CSS"
date = 2024-01-03T13:25:02+08:00
draft = false
+++

{{< ScriptCommon >}}

{{<lead>}}
 You should always doubt the color you see with your eyes. 
{{</lead>}}

# Normal `<div>` Nested Box Color Pattern

{{< TabParent height="100" direction="horizontal" contextPostfix="simpleColorPattern" >}}
    {{< TabFrame label="One Color Different" tabId="simpleColorPattern-tab1"  checked="yes"  >}}
        {{< ToggleGroup toggleGroupId="auxLine" label="Show Aux Line">}}
        {{< ColorCanvas contextPostfix="simpleColorPattern-tab1" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-1" seid="se-1">}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-2" seid="se-2">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-1-e" seid="se-1-e" right_sid="sb-r1-e">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-2-e" seid="se-2-e" left_sid="sb-l1-e">}}
            {{< ColorPalette contextPostfix="simpleColorPattern-tab1" >}}
                {{< ColorPicker id="b-picker-1" color="#A0BEDC" selectors="sb-1,sb-1-e" >}}
                {{< ColorPicker id="f-picker" color="#B9D296" selectors="se-1,se-2,se-1-e,se-2-e,sb-r1-e,sb-l1-e" >}}
                {{< ColorPicker id="b-picker-2" color="#F5E664" selectors="sb-2,sb-2-e" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
    {{< TabFrame label="Two Color Same" tabId="simpleColorPattern-tab2">}}
        {{< ToggleGroup toggleGroupId="auxLine" label="Show Aux Line">}}
        {{< ColorCanvas contextPostfix="simpleColorPattern-tab2" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-1" seid="se-1" >}}
            {{< ToggleDisable >}} {{< NestedBox sbid="sb-2" seid="se-2" >}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-1-e" seid="se-1-e" right_sid="sb-r1-e">}}
            {{< ToggleEnable >}} {{< NestedBox sbid="sb-2-e" seid="se-2-e" left_sid="sb-l1-e">}}
            {{< ColorPalette contextPostfix="simpleColorPattern-tab2" >}}
                {{< ColorPicker id="b-picker-1" color="#888888" selectors="sb-1,sb-1-e" >}}
                {{< ColorPicker id="f-picker-1" color="#BBBBBB" selectors="se-1,se-1-e,sb-r1-e" >}}
                {{< BlankFlexItem >}}
                {{< ColorPicker id="f-picker-2" color="#999999" selectors="se-2,se-2-e,sb-l1-e" >}}
                {{< ColorPicker id="b-picker-2" color="#222222" selectors="sb-2,sb-2-e" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
{{< /TabParent >}}

# SVG html Color Pattern

{{< TabParent height="100" direction="horizontal" contextPostfix="svgColorPattern" >}}
    {{< TabFrame label="One Color Difference" tabId="tab1"  checked="yes" >}}
        {{< ToggleGroup toggleGroupId="auxLine" label="Show Connected Line">}}
        {{< ColorCanvas contextPostfix="svgColorPattern-tab1" >}}
            {{< ToggleDisable >}} {{< SVGColorPattern graphicType="NestedTwoBox" leftOutId="lb-1" leftInId="le-1" rightOutId="rb-1" rightInId="re-1" >}}
            {{< ToggleEnable >}} {{< SVGColorPattern graphicType="NestedTwoBox" leftOutId="lb-2" leftInId="le-2" rightOutId="rb-2" rightInId="re-2" showAuxline="yes" leftAuxId="laux" rightAuxId="raux" >}}
            {{< ColorPalette  contextPostfix="svgColorPattern-tab1" >}}
                {{< ColorPicker id="b-picker-1" color="#A0BEDC" selectors="lb-1,lb-2" >}}
                {{< ColorPicker id="f-picker" color="#B9D296" selectors="le-1,re-1,le-2,re-2,laux,raux" >}}
                {{< ColorPicker id="b-picker-2" color="#F5E664" selectors="rb-1,rb-2" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
    {{< TabFrame label="X in Box" tabId="tab2">}}
        {{< ToggleGroup toggleGroupId="auxLine" label="Show Connected Line">}}
        {{< ColorCanvas contextPostfix="svgColorPattern-tab2" >}}
            {{< ToggleDisable >}} {{< SVGColorPattern graphicType="TwoXInBox" leftOutId="lb-1" leftInId="le-1" rightOutId="rb-1" rightInId="re-1" >}}
            {{< ToggleEnable >}} {{< SVGColorPattern graphicType="TwoXInBox" leftOutId="lb-2" leftInId="le-2" rightOutId="rb-2" rightInId="re-2" showAuxline="yes" leftAuxId="laux" rightAuxId="raux" >}}
            {{< ColorPalette contextPostfix="svgColorPattern-tab2" >}}
                {{< ColorPicker id="b-picker-1" color="#A0BEDC" selectors="lb-1,lb-2" >}}
                {{< ColorPicker id="f-picker-1" color="#B9D296" selectors="le-1,le-2,laux" >}}
                {{< BlankFlexItem >}}
                {{< ColorPicker id="f-picker-2" color="#B9D296" selectors="re-1,re-2,raux" >}}
                {{< ColorPicker id="b-picker-2" color="#F5E664" selectors="rb-1,rb-2" >}}
            {{< /ColorPalette >}}
        {{< /ColorCanvas >}}
    {{< /TabFrame >}}
{{< /TabParent >}}


Click `tab` to change the plates of the cases.