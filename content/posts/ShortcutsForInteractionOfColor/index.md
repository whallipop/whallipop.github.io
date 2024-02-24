+++
title = 'Shorcuts for Color Exercise for Interaction of Color, using CSS'
date = 2024-02-10T11:10:04+08:00
draft = false
+++

{{<lead>}}
Encapsulate and get smart. 
{{</lead>}}

# Code notes

The interaction of color comparision is used for practice how to leverage CSS to achieve some interesting effects. Check the post below to enjoy it!

{{< article link="/posts/interacionofcolor/" >}}

The current tool shortcuts can be concluded as the following notes. I try to implement most of the effect by combining CSS, Hugo shortcuts and partials, although there are still some javascript code inside it. If you are interesting, you can check out the `custom.css` to know more about the implementation details.

## `TabParent` -> TabFrame-Type Shortcut

`TabParent` is used for show out a tabs group which contain serveral tabs with different color visual comparision effect. And each tab uses a TabFrame-Type shortcut to show different comparision pattern. So far there are four pattern:

```
TwoSides
TwoColorMix
SameColorMix
TwoColorMixInThreeWay
```

Its CSS class is `pattern-tabs` which will be used to define the style of the special classes inside the `TabParent`.

## The Structure of a TabFrame-Type Shortcut

After re-arrange of my shortcut style, I decided to setup a consistent framework for each TabFrame-Type shortcut, which includes three part implemented in partial way:
- `TabHeader`: organize the params information. The most inmport variable is `contextPostfix`. This postfix will be attached to the element inside the TabFrame to ensure each element to be unique in this page.
- `TabFrame`: the tab label of current tab frame. The layout and style of the tab label is all controlled by CSS class `pattern-label`.
- content.

I also seperate the "content" part into a consistent structure to simplify my workflow. But before I explain it to you, some of you might be confused that if the structure is so similar, why didn't I just extract the common part of them into something like shortcuts? I want to clarify this question first.

First of all, there is no way to nest shortcut. Using partial can do it but pass param into partial are not so convenient. You can only construct a dictionary to store the necessary variable. And if you just want to wrap a `TabFrame` outside, there is no efficient way to place an `{{ .Inner }}` to simple nested your content.

So keep our tabframe-type shortcut's structure clean and follow it each time may help us and so far I don't expect to increase the total count of tabframe so just keep it simple. If you have a better way to do this, please contact me and I will glad to discuss this topic with you :).

## Elements inside "content"

As we mentioned before inside "content" we will also follow a consistent structure. There are three part inside "content":

##  `DropdownSelector`
change the pattern of the current comparison. I use the following CSS selectors to change the pattern when users select the pattern:
```CSS
.svg-select-xinbox-option {
  display: none;
}
select[data-chosen="XInBox"].svg-select ~ .interaction-of-color .svg-select-xinbox-option {
  display: block;
}
```
## Control Palette & Color Palette

Here I simply introduce some optional features of these palette.

Control Palette:
- Scale the color pattern canvas;
- random part of the elements' color;

Color Palette:
- change each elements' color with label groups.

## Color Visual Comparison Result

At first I try to do this by hand-maded code to build the pattern but I quickly find out that it is easier to leverage some vector drawing tool to export the SVG. I use the software **Curve** and export my work to SVG files. Then I modify them and add CSS class for coding my layout.

In this part I simple use the partial with SVG prefix. They satisfy many interesting features including:
- switch patterns;
- visualize connected line to remove the color illusion;
- allow the control palette to change its size