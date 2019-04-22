![LAF_logo](./docs/images/logo/HQ.png)

---

Automate asset retrieval from lingoapp.com

## Install

```
npm install laf -g
```

## Usage

In order to use LAF you will need two files in your current working directory:

1. `.laf.json`

   > This is your config file.

2. `.env`

   > You might already have this file. If that's the case, you just need to add your SpaceID & API Token. Both are supplied by LingoApp.com.

```
SPACE_ID=''
API_TOKEN=''
```

#### Generate Config File

Config file is required.
Using generator to create the config file is optional.

###### 1. Generate configuration file

> Video Tutorial (1/2): [LAF - Gen](https://youtu.be/J3UH4K_Nu0g)

\$ `laf gen`

**Sample Config**

```json
{
  "name": ".laf.json",
  "value": {
    "kits": [
      {
        "name": "Capswan - Mobile App - Style Guide",
        "sections": [
          {
            "name": "Illustrations"
          },
          {
            "name": "Icons",
            "headers": ["Icons", "Components"]
          }
        ]
      },
      {
        "name": "Test Me",
        "sections": [
          {
            "name": "Illustrations",
            "headers": ["Lined"]
          }
        ]
      }
    ]
  }
}
```

**Output at this point**

- `.laf.json` with semi-filled config

  > The tutorial in "Fetch files" walks you through finalizing this config

- `.env` with empty SPACE_ID & API_TOKEN keys

###### 2. Fetch files

> Video Tutorial (2/2): [LAF - Fetch](https://youtu.be/AeN6RgTHCyQ)

\$ `laf fetch`

> You can call `laf fetch` without specifying flags. Flag defaults are listed below.

| Flag  | Alias | Description        | Defaults      |
| :---- | :---- | :----------------- | :------------ |
| --out | -o    | Download directory | "./downloads" |
| --cut | -c    | File type          | "PNG"         |

**Examples**

- \$ `laf fetch --out "./downloads" --cut "JPG"`
- \$ `laf fetch --out "./assets" --cut "PNG"`

**Output at this point**

All of your files downloaded to the output directory you've specified

---

## `Sketch` + `Lingo` + `LAF` - Workflow Comparisons

![LAF_Workflow_Comparison.png](./docs/images/LAF_Workflow_Comparison.png)

## Related

This CLI wraps `lingo-asset-fetcher-lib`

- `@github`: [lingo-asset-fetcher-lib](https://github.com/servexyz/lingo-asset-fetcher-lib)
- `@npm`: [laf-lib](https://www.npmjs.com/package/laf-lib)
