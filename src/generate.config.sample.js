const lafLibTesterConfig = {
  testMe: {
    targetOne: {
      sections: [
        {
          name: "Illustrations"
        }
      ]
    },
    targetTwo: {
      sections: [
        {
          name: "Illustrations",
          headers: ["Lined"]
        }
      ]
    }
  },
  capswan: {
    targetOne: {
      sections: [
        {
          name: "Illustrations"
        },
        {
          name: "Icons",
          headers: ["Icons", "Components"]
        }
      ]
    },
    targetTwo: {
      sections: [
        {
          name: "Icons"
        }
      ]
    }
  }
};

const lafCliGeneratedConfig = {
  name: ".laf.json",
  value: {
    kits: [
      {
        name: "abc",
        sections: [
          {
            name: "",
            headers: [""]
          }
        ]
      },
      {
        name: "def",
        sections: [
          {
            name: "",
            headers: [""]
          }
        ]
      },
      {
        name: "ghi",
        sections: [
          {
            name: "",
            headers: [""]
          }
        ]
      }
    ]
  }
};
const lafCliCraftedConfig = {
  name: ".laf.json",
  value: {
    kits: [
      {
        name: "Capswan UI",
        sections: [
          {
            name: "Illustrations"
          },
          {
            name: "Icons",
            headers: ["Icons", "Components"]
          }
        ]
      },
      {
        name: "Test Me",
        sections: [
          {
            name: "Illustrations",
            headers: ["Lined"]
          }
        ]
      }
    ]
  }
};

module.exports.libConfig = lafLibTesterConfig;
module.exports.cliConfig = lafCliCraftedConfig;
