```es6
import { Catalog } from 'react-planner'

let catalog = new Catalog()

import * as Areas from './areas/**/planner-element.jsx'
import * as Lines from './lines/**/planner-element.jsx'
import * as Holes from './holes/**/planner-element.jsx'
import * as Items from './items/**/planner-element.jsx'

for (let x in Areas) catalog.registerElement(Areas[x])
for (let x in Lines) catalog.registerElement(Lines[x])
for (let x in Holes) catalog.registerElement(Holes[x])
for (let x in Items) catalog.registerElement(Items[x])

catalog.registerCategory('windows', 'Windows', [
  Holes.window,
  Holes.sashWindow,
  Holes.venetianBlindWindow,
  Holes.windowCurtain,
])
catalog.registerCategory('doors', 'Doors', [
  Holes.door,
  Holes.doorDouble,
  Holes.panicDoor,
  Holes.panicDoorDouble,
  Holes.slidingDoor,
])

export default catalog
```

We conventionally use [_babel-plugin-import-glob_](https://github.com/novemberborn/babel-plugin-import-glob) to import multiple Elements at the same time,although you could keep importing them individually.

For add an Element to the Catalog you should call the _catalog.registerElement_ function passing the Element as parameter.

You could also register a category with the function _catalog.registerCategory_ passing as parameteres the category name, label and the childs Elements.

If an Element is being added without pushing it into any category, it will be shown in the Catalog's main page

> See how to [_Create a Catalog's Element_](HOW_TO_CREATE_AN_ELEMENT.md)
