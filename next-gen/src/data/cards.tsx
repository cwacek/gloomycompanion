import {shuffle_list} from '../util'

import aoe_4_with_black from '../images/aoe-4-with-black.svg'
import aoe_circle_with_side_black from '../images/aoe-circle-with-side-black.svg'

export interface ICard {
    monster : IMonster;
    shuffle : boolean;
    initiative : number;
    actions : IMonsterAction[];
}

export interface IMonster {
    name : string;
    class : string;
}

export interface IMonsterAction {
    action : IActionType
    modifiers?: IActionType[]
}

export type  IActionType = string | AoEAttack | ComplexAction | StyledAction

export class AoEAttack {
    bonus: number;
    aoe : string;

    constructor(bonus : number, aoe : string) {
        this.bonus = bonus
        this.aoe = aoe
    }
}

export interface ComplexAction {
    cause: string
    effect: AoEAttack | string
}

export class StyledAction {
    action : string
    style: string

    constructor(action : string, style : string) {
        this.action = action;
        this.style = style;
    }
}



export const DECKS : {[key :string] : IMonster} =
    {   "Ancient Artillery":  {name: "Ancient Artillery", class: "Ancient Artillery"}
    ,   "Bandit Archer":      {name: "Bandit Archer", class: "Archer"}
    ,   "Bandit Guard":       {name: "Bandit Guard", class: "Guard"}
    ,   "Black Imp":          {name: "Black Imp", class: "Imp"}
    ,   "Boss":               {name: "Boss", class: "Boss"}
    ,   "Cave Bear":          {name: "Cave Bear", class: "Cave Bear"}
    ,   "City Archer":        {name: "City Archer", class: "Archer"}
    ,   "City Guard":         {name: "City Guard", class: "Guard"}
    ,   "Cultist":            {name: "Cultist", class: "Cultist"}
    ,   "Deep Terror":        {name: "Deep Terror", class: "Deep Terror"}
    ,   "Earth Demon":        {name: "Earth Demon", class: "Earth Demon"}
    ,   "Flame Demon":        {name: "Flame Demon", class: "Flame Demon"}
    ,   "Forest Imp":         {name: "Forest Imp", class: "Imp"}
    ,   "Frost Demon":        {name: "Frost Demon", class: "Frost Demon"}
    ,   "Giant Viper":        {name: "Giant Viper", class: "Giant Viper"}
    ,   "Harrower Infester":  {name: "Harrower Infester", class: "Harrower Infester"}
    ,   "Hound":              {name: "Hound", class: "Hound"}
    ,   "Inox Archer":        {name: "Inox Archer", class: "Archer"}
    ,   "Inox Guard":         {name: "Inox Guard", class: "Guard"}
    ,   "Inox Shaman":        {name: "Inox Shaman", class: "Shaman"}
    ,   "Living Bones":       {name: "Living Bones", class: "Living Bones"}
    ,   "Living Corpse":      {name: "Living Corpse", class: "Living Corpse"}
    ,   "Living Spirit":      {name: "Living Spirit", class: "Living Spirit"}
    ,   "Lurker":             {name: "Lurker", class: "Lurker"}
    ,   "Night Demon":        {name: "Night Demon", class: "Night Demon"}
    ,   "Ooze":               {name: "Ooze", class: "Ooze"}
    ,   "Rending Drake":      {name: "Rending Drake", class: "Rending Drake"}
    ,   "Savvas Icestorm":    {name: "Savvas Icestorm", class: "Savvas Icestorm"}
    ,   "Savvas Lavaflow":    {name: "Savvas Lavaflow", class: "Savvas Lavaflow"}
    ,   "Spitting Drake":     {name: "Spitting Drake", class: "Spitting Drake"}
    ,   "Stone Golem":        {name: "Stone Golem", class: "Stone Golem"}
    ,   "Sun Demon":          {name: "Sun Demon", class: "Sun Demon"}
    ,   "Vermling Scout":   {name: "Vermling Scout", class: "Scout"}
    ,   "Vermling Shaman":    {name: "Vermling Shaman", class: "Shaman"}
    ,   "Wind Demon":         {name: "Wind Demon", class: "Wind Demon"}
};


const DECK_DEFINITIONS: {
  class: string;
  cards: {
    shuffle: boolean;
    initiative: number;
    actions?: string[];
    complexActions?: IMonsterAction[];
  }[];
}[] = [
  {
    class: "Ancient Artillery",
    cards: [
      {
        shuffle: false,
        initiative: 46,
        actions: ["* %attack% -1", "** %range% +2"]
      },
      {
        shuffle: true,
        initiative: 71,
        actions: [
          "* %attack% +0",
          "** %range% +0",
          "** All adjacent enemies suffer 2 damage"
        ]
      },
      {
        shuffle: true,
        initiative: 71,
        actions: [
          "* %attack% +0",
          "** %range% +0",
          "** All adjacent enemies suffer 2 damage"
        ]
      },
      {
        shuffle: false,
        initiative: 37,
        actions: [
          "* %push% 1",
          "** Target all adjacent enemies",
          "* %attack% -1 %aoe-triangle-2-side%",
          "** %range% -1"
        ]
      },
      {
        shuffle: false,
        initiative: 37,
        actions: [
          "* %push% 1",
          "** Target all adjacent enemies",
          "* %attack% -1 %aoe-circle%",
          "** %range% -1"
        ]
      },
      {
        shuffle: false,
        initiative: 17,
        actions: [
          "* %push% 2",
          "** Target all adjacent enemies",
          "* %shield% 2",
          "* %attack% -2",
          "** %range% +0"
        ]
      },
      {
        shuffle: false,
        initiative: 95,
        actions: ["* %attack% +1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 46,
        actions: [
          "* %attack% -1 %aoe-triangle-2-side%",
          "** %range% +0",
          "** %immobilize%"
        ]
      }
    ]
  },
  {
    class: "Archer",
    cards: [
      {
        shuffle: false,
        initiative: 16,
        actions: ["* %move% +1", "* %attack% -1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 31,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 32,
        actions: ["* %move% +0", "* %attack% +1", "** %range% -1"]
      },
      {
        shuffle: false,
        initiative: 44,
        actions: ["* %move% -1", "* %attack% +1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 56,
        actions: ["* %attack% -1", "** %range% +0", "** %target% 2"]
      },
      {
        shuffle: true,
        initiative: 68,
        actions: ["* %attack% +1", "** %range% +1"]
      },
      {
        shuffle: false,
        initiative: 14,
        complexActions: [
            {action: "%move% -1"},
            {action: "%attack% -1", modifiers: ["%range% +0"]},
            {action: new StyledAction("Create a 3 damage trap in an adjacent empty hex closest to an enemy", "small")}
        ]
      },
      {
        shuffle: true,
        initiative: 29,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +1",
          "** %immobilize%"
        ]
      }
    ]
  },
  {
    class: "Boss",
    cards: [
      { shuffle: false, initiative: 11, actions: ["* Special 2"] },
      { shuffle: false, initiative: 14, actions: ["* Special 2"] },
      { shuffle: true, initiative: 17, actions: ["* Special 2"] },
      { shuffle: true, initiative: 85, actions: ["* Special 1"] },
      { shuffle: false, initiative: 79, actions: ["* Special 1"] },
      { shuffle: false, initiative: 73, actions: ["* Special 1"] },
      {
        shuffle: false,
        initiative: 36,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 52,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** %range% 3",
          "** %target% 2"
        ]
      }
    ]
  },
  {
    class: "Cave Bear",
    cards: [
      {
        shuffle: false,
        initiative: 13,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 14,
        actions: ["* %move% -1", "* %attack% -1", "** %immobilize%"]
      },
      {
        shuffle: true,
        initiative: 34,
        actions: ["* %attack% +1", "** %wound%"]
      },
      {
        shuffle: false,
        initiative: 41,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 60,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: true,
        initiative: 80,
        actions: ["* %attack% -1", "* %move% -2", "* %attack% -1", "** %wound%"]
      },
      {
        shuffle: false,
        initiative: 61,
        actions: ["* %move% +0", "* %attack% -1", "** %target% 2"]
      },
      {
        shuffle: false,
        initiative: 3,
        actions: ["* %shield% 1", "* %retaliate% 2", "* %heal% 2", "** Self"]
      }
    ]
  },
  {
    class: "Cultist",
    cards: [
      {
        shuffle: false,
        initiative: 10,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "* On Death:",
          "** %attack% +2 %aoe-circle-with-middle-black%"
        ]
      },
      {
        shuffle: false,
        initiative: 10,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "* On Death:",
          "** %attack% +2 %aoe-circle-with-middle-black%"
        ]
      },
      {
        shuffle: false,
        initiative: 27,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 27,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 39,
        actions: ["* %move% -1", "* %attack% +0", "* %heal% 1", "** Self"]
      },
      {
        shuffle: true,
        initiative: 63,
        actions: ["* Summon normal Living Bones", "* Cultist suffers 2 damage."]
      },
      {
        shuffle: true,
        initiative: 63,
        actions: ["* Summon normal Living Bones", "* Cultist suffers 2 damage."]
      },
      {
        shuffle: false,
        initiative: 31,
        actions: ["* %move% -1", "* %heal% 3", "** %range% 3"]
      }
    ]
  },
  {
    class: "Deep Terror",
    cards: [
      {
        shuffle: false,
        initiative: 65,
        actions: [
          "* %attack% +0",
          "** %range% 3",
          "** %target% 3",
          "** %curse%"
        ]
      },
      {
        shuffle: true,
        initiative: 60,
        actions: ["* %attack% +0 %aoe-line-6-with-black%", "** %pierce% 3"]
      },
      {
        shuffle: true,
        initiative: 60,
        actions: ["* %attack% +0 %aoe-line-6-with-black%", "** %pierce% 3"]
      },
      {
        shuffle: false,
        initiative: 84,
        actions: [
          "* %attack% -1",
          "** Target all adjacent enemies",
          "* %attack% +0",
          "** %range% 4",
          "** %wound%"
        ]
      },
      {
        shuffle: false,
        initiative: 75,
        actions: [
          "* %attack% +0",
          "** %poison%",
          "* %attack% -1",
          "** %range% 5",
          "** %immobilize%"
        ]
      },
      {
        shuffle: false,
        initiative: 75,
        actions: [
          "* %attack% -2",
          "** Target all adjacent enemies",
          "** %disarm%",
          "* %attack% +0",
          "** %range% 3",
          "** %target% 2"
        ]
      },
      {
        shuffle: false,
        initiative: 96,
        actions: [
          "* %attack% -2",
          "** %range% 6",
          "** Summon normal Deep Terror in a hex adjacent to the target"
        ]
      },
      {
        shuffle: false,
        initiative: 54,
        actions: [
          "* %wound% and %poison%",
          "** Target all adjacent enemies",
          "* %attack% +0",
          "** %range% 4"
        ]
      }
    ]
  },
  {
    class: "Earth Demon",
    cards: [
      {
        shuffle: true,
        initiative: 40,
        actions: [
          "* %heal% 3",
          "** Self",
          "* %earth%%use_element%: <span class='small'>%immobilize% Target all enemies within %range% 3</span>"
        ]
      },
      {
        shuffle: true,
        initiative: 42,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 62,
        actions: ["* %move% +0", "* %attack% +0", "* %earth%"]
      },
      {
        shuffle: false,
        initiative: 71,
        actions: [
          "* %attack% +0",
          "** %range% 4",
          "** %earth%%use_element%: %target% 2"
        ]
      },
      {
        shuffle: false,
        initiative: 83,
        actions: ["* %move% -1", "* %attack% +1", "* %earth%"]
      },
      {
        shuffle: false,
        initiative: 93,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** Target all adjacent enemies",
          "* %earth%%use_element%: %push% 1"
        ]
      },
      {
        shuffle: false,
        initiative: 79,
        actions: [
          "* %move% +1",
          "* %attack% +0",
          "** %air%%use_element%: -2 %attack%"
        ]
      },
      {
        shuffle: false,
        initiative: 87,
        actions: [
          "* %move% +0",
          "* %attack% -1 <div class='collapse'>%aoe-4-with-black%</div>",
          "* %any%%use_element%: %earth%"
        ]
      }
    ]
  },
  {
    class: "Flame Demon",
    cards: [
      {
        shuffle: false,
        initiative: 3,
        actions: ["* %move% +1", "* %attack% -1", "** %range% +0", "* %fire%"]
      },
      {
        shuffle: false,
        initiative: 24,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0", "* %fire%"]
      },
      {
        shuffle: true,
        initiative: 46,
        actions: [
          "* %attack% +0",
          "** %range% +0",
          "** %fire%%use_element%:  %aoe-circle%"
        ]
      },
      {
        shuffle: false,
        initiative: 49,
        actions: [
          "* %attack% +0 %aoe-line-3-with-black%",
          "** <table align='center'><tr><td>%fire%%use_element%:</td> <td> +1 %attack% <br> %wound% </td> </tr> </table>"
        ]
      },
      {
        shuffle: false,
        initiative: 67,
        actions: ["* %move% -1", "* %attack% +1", "** %range% -1", "* %fire%"]
      },
      {
        shuffle: false,
        initiative: 77,
        actions: [
          "* %attack% +0",
          "** Target all adjacent enemies",
          "** %ice%%use_element%:Flame Demon suffers 1 damage."
        ]
      },
      {
        shuffle: true,
        initiative: 30,
        complexActions: [
            {action: {cause: "%fire%%use_element%:", effect: "All adjacent enemies suffer 2 damage"}}
        ],
        actions: [
          "* %move% +0",
          "* %attack% -2",
          "** %range% +0",
          "** %wound%",
          "** %target% 2"
        ]
      },
      {
        shuffle: false,
        initiative: 8,
        actions: [
          "* %move% -1",
          "* <span class='small'> Create a 4 damage trap in an adjacent empty hex closest to an enemy </span>",
          "* %any%%use_element%: %fire%"
        ]
      }
    ]
  },
  {
    class: "Frost Demon",
    cards: [
      {
        shuffle: false,
        initiative: 18,
        actions: [
          "* %immobilize%",
          "** Target all enemies within %range% 2",
          "* %ice%%use_element%: <span class='small'>%heal% 3<br/>Self</span>"
        ]
      },
      {
        shuffle: false,
        initiative: 38,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 58,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 58,
        actions: [
          "* %move% -1",
          "* %attack% +0",
          "** %range% 2",
          "** %ice%%use_element%: +2 %attack%, +1 %range%"
        ]
      },
      {
        shuffle: true,
        initiative: 78,
        actions: [
          "* %move% -1",
          "* %attack% +0 %aoe-triangle-2-side-with-black%",
          "* %ice%"
        ]
      },
      {
        shuffle: true,
        initiative: 78,
        actions: [
          "* %move% -1",
          "* %attack% +0 %aoe-triangle-2-side-with-black%",
          "* %ice%"
        ]
      },
      {
        shuffle: false,
        initiative: 58,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** %pierce% 3",
          "* %any%%use_element%: %ice%"
        ]
      },
      {
        shuffle: false,
        initiative: 18,
        actions: [
          "* %shield% 2",
          "* %move% +1",
          "* %fire%%use_element%: <span class='small'>Frost Demon suffers 1 damage</span>"
        ]
      }
    ]
  },
  {
    class: "Giant Viper",
    cards: [
      {
        shuffle: true,
        initiative: 32,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Add +2 Attack if the target is adjacent to any of the Giant Viper's allies."
        ]
      },
      {
        shuffle: true,
        initiative: 32,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Add +2 Attack if the target is adjacent to any of the Giant Viper's allies."
        ]
      },
      {
        shuffle: false,
        initiative: 11,
        actions: ["* %shield% 1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 43,
        actions: [
          "* %move% +1",
          "** %jump%",
          "* %attack% -1",
          "** Target all adjacent enemies."
        ]
      },
      {
        shuffle: false,
        initiative: 58,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 58,
        actions: [
          "* %move% +1",
          "** %jump%",
          "* %attack% -1",
          "** All attacks targeting Giant Viper this round gain Disadvantage."
        ]
      },
      {
        shuffle: false,
        initiative: 43,
        actions: ["* %move% -1", "** %jump%", "* %attack% +0", "** %target% 2"]
      },
      {
        shuffle: false,
        initiative: 23,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** %immobilize%",
          "* %attack% -1"
        ]
      }
    ]
  },
  {
    class: "Guard",
    cards: [
      {
        shuffle: true,
        initiative: 15,
        actions: ["* %shield% 1", "* %retaliate% 2"]
      },
      {
        shuffle: false,
        initiative: 30,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 35,
        actions: ["* %move% -1", "* %attack% +0", "** %range% 2"]
      },
      {
        shuffle: false,
        initiative: 50,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 50,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 70,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 55,
        actions: ["* %move% -1", "* %attack% +0", "* %strengthen%", "** Self"]
      },
      {
        shuffle: true,
        initiative: 15,
        actions: ["* %shield% 1", "* %attack% +0", "** %poison%"]
      }
    ]
  },
  {
    class: "Harrower Infester",
    cards: [
      {
        shuffle: false,
        initiative: 38,
        actions: ["* %move% -1", "* %attack% +1", "** %target% 2"]
      },
      {
        shuffle: false,
        initiative: 7,
        actions: ["* %move% +0", "* %attack% -1", "** %poison%", "* %dark%"]
      },
      {
        shuffle: false,
        initiative: 16,
        actions: ["* %move% -1", "* %attack% -1", "* %heal% 5", "** Self"]
      },
      {
        shuffle: false,
        initiative: 16,
        actions: ["* %attack% +2", "** %immobilize%", "* %retaliate% 2"]
      },
      {
        shuffle: true,
        initiative: 2,
        actions: ["* %shield% 2", "* %retaliate% 2", "** %range% 3"]
      },
      {
        shuffle: false,
        initiative: 30,
        actions: [
          "* %move% -1",
          "* %attack% +0 %aoe-line-4-with-black%",
          '** %dark%%use_element%: Perform "%heal% 2, Self" </br>for each target damaged'
        ]
      },
      {
        shuffle: false,
        initiative: 38,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %target% 2",
          "** %dark%%use_element%: +2 %attack%, %disarm%"
        ]
      },
      {
        shuffle: true,
        initiative: 7,
        actions: [
          "* %attack% -1",
          "** %range% 3",
          "** %muddle%",
          "* %heal% 4",
          "** Self"
        ]
      }
    ]
  },
  {
    class: "Hound",
    cards: [
      {
        shuffle: false,
        initiative: 6,
        actions: ["* %move% -1", "* %attack% +0", "** %immobilize%"]
      },
      {
        shuffle: false,
        initiative: 7,
        actions: ["* %move% +0", "* %muddle%", "** Target all adjacent enemies"]
      },
      {
        shuffle: true,
        initiative: 19,
        actions: [
          "* %move% +1",
          "* %attack% +0",
          "** Add +2 Attack if the target is adjacent to any of the Hound's allies"
        ]
      },
      {
        shuffle: true,
        initiative: 19,
        actions: [
          "* %move% +1",
          "* %attack% +0",
          "** Add +2 Attack if the target is adjacent to any of the Hound's allies"
        ]
      },
      {
        shuffle: false,
        initiative: 26,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 26,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 83,
        actions: ["* %move% -2", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 72,
        actions: [
          "* %attack% -1",
          "** %pierce% 2",
          "* %move% -2",
          "* %attack% -1",
          "** %pierce% 2"
        ]
      }
    ]
  },
  {
    class: "Imp",
    cards: [
      {
        shuffle: false,
        initiative: 5,
        actions: ["* %shield% 5", "* %heal% 1", "** Self"]
      },
      {
        shuffle: false,
        initiative: 37,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 37,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 42,
        actions: ["* %move% +1", "* %heal% 2", "** %range% 3"]
      },
      {
        shuffle: true,
        initiative: 43,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0, %target% 2, %poison%"
        ]
      },
      {
        shuffle: false,
        initiative: 76,
        actions: ["* %move% -1", "* %attack% +1", "** %range% +0"]
      },
      {
        shuffle: true,
        initiative: 43,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0, %target% 2, %curse%"
        ]
      },
      {
        shuffle: false,
        initiative: 24,
        actions: [
          "* %strengthen%",
          "** Affect all allies within %range% 2",
          "* %muddle%",
          "** Target all enemies within %range% 2"
        ]
      }
    ]
  },
  {
    class: "Living Bones",
    cards: [
      {
        shuffle: false,
        initiative: 64,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: true,
        initiative: 20,
        actions: ["* %move% -2", "* %attack% +0", "* %heal% 2", "** Self"]
      },
      {
        shuffle: false,
        initiative: 25,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 45,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 45,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      { shuffle: false, initiative: 81, actions: ["* %attack% +2"] },
      {
        shuffle: false,
        initiative: 74,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Target one enemy with all attacks"
        ]
      },
      {
        shuffle: true,
        initiative: 12,
        actions: ["* %shield% 1", "* %heal% 2", "** Self"]
      }
    ]
  },
  {
    class: "Living Corpse",
    cards: [
      {
        shuffle: false,
        initiative: 21,
        actions: [
          "* %move% +1",
          "* %muddle% and %immobilize%",
          "** Target one adjacent enemy"
        ]
      },
      {
        shuffle: false,
        initiative: 47,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: true,
        initiative: 66,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: true,
        initiative: 66,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 82,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 91,
        actions: ["* %move% +1", "* Living Corpse suffers 1 damage."]
      },
      {
        shuffle: false,
        initiative: 71,
        actions: [
          "* %move% +0",
          "* %attack% +1",
          "* %poison%",
          "** Target all adjacent enemies"
        ]
      },
      {
        shuffle: false,
        initiative: 32,
        actions: [
          "* %attack% +2",
          "** %push% 1",
          "* Living Corpse suffers 1 damage."
        ]
      }
    ]
  },
  {
    class: "Living Spirit",
    cards: [
      {
        shuffle: true,
        initiative: 22,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** %range% +0",
          "** %muddle%"
        ]
      },
      {
        shuffle: true,
        initiative: 33,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0",
          "** Target all enemies within range"
        ]
      },
      {
        shuffle: false,
        initiative: 48,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 48,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 61,
        actions: ["* %attack% +0", "** %range% -1", "** %target% 2"]
      },
      {
        shuffle: false,
        initiative: 75,
        actions: [
          "* %move% -1",
          "* %attack% +1",
          "** %range% -1",
          "* %heal% 1",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 55,
        actions: [
          "* %move% +0",
          "* %curse%",
          "** %range% +0",
          "** Target all enemies within range",
          "* %ice%"
        ]
      },
      {
        shuffle: false,
        initiative: 67,
        actions: [
          "* %move% -1",
          "* %attack% +1",
          "** %range% +0",
          "** %ice%%use_element%: %stun%"
        ]
      }
    ]
  },
  {
    class: "Lurker",
    cards: [
      {
        shuffle: true,
        initiative: 11,
        actions: [
          "* %shield% 1",
          "** %ice%%use_element%: %shield% 2 instead",
          "* %wound%",
          "** Target all adjacent enemies"
        ]
      },
      {
        shuffle: false,
        initiative: 28,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 38,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 38,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Target one enemy with all attacks"
        ]
      },
      {
        shuffle: false,
        initiative: 61,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 64,
        actions: ["* %attack% +1", "** Target all adjacent enemies"]
      },
      {
        shuffle: false,
        initiative: 41,
        actions: [
          "* %ice%%use_element%: %strengthen%",
          "** Self",
          "* %move% +0",
          "* %attack% -1",
          "** %wound%"
        ]
      },
      {
        shuffle: true,
        initiative: 23,
        actions: ["* %shield% 1", "* %move% +0", "* %attack% -1", "* %ice%"]
      }
    ]
  },
  {
    class: "Night Demon",
    cards: [
      {
        shuffle: false,
        initiative: 4,
        actions: ["* %move% +1", "* %attack% -1", "* %dark%"]
      },
      {
        shuffle: false,
        initiative: 7,
        actions: [
          "* %move% +1",
          "* %attack% -1",
          "* %dark%%use_element%: %invisible%",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 22,
        actions: ["* %move% +0", "* %attack% +0", "* %dark%"]
      },
      {
        shuffle: false,
        initiative: 26,
        actions: [
          "* %attack% -2",
          "** %range% 3",
          "** %target% 3",
          "** %dark%%use_element%: %muddle%"
        ]
      },
      {
        shuffle: true,
        initiative: 46,
        actions: [
          "* %move% -1",
          "* %attack% +1",
          "** %dark%%use_element%: +2 %attack%"
        ]
      },
      {
        shuffle: true,
        initiative: 41,
        actions: ["* %move% -1", "* %attack% +1", "* %dark%"]
      },
      {
        shuffle: false,
        initiative: 35,
        actions: [
          "* %attack% -1",
          "* %attack% -1",
          "** %pierce% 2",
          "* %light%%use_element%: %curse%",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 15,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "* <span class='small'>All adjacent enemies and allies suffer 1 damage.</span>",
          "* <span class='small'>%any%%use_element%: %dark%</span>"
        ]
      }
    ]
  },
  {
    class: "Ooze",
    cards: [
      {
        shuffle: false,
        initiative: 36,
        actions: ["* %move% +1", "* %attack% -1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 57,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 59,
        actions: [
          "* %attack% +0",
          "** %range% +0",
          "** %target% 2",
          "** %poison%"
        ]
      },
      {
        shuffle: false,
        initiative: 66,
        actions: ["* %move% -1", "* %attack% +1", "** %range% +1"]
      },
      {
        shuffle: true,
        initiative: 94,
        actions: [
          "* Ooze suffers 2 damage ",
          "** <span class='small'>Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)</span>"
        ]
      },
      {
        shuffle: true,
        initiative: 94,
        actions: [
          "* Ooze suffers 2 damage ",
          "** <span class='small'>Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)</span>"
        ]
      },
      {
        shuffle: false,
        initiative: 85,
        actions: [
          "* %push% 1 and",
          "* %poison%",
          "** Target all adjacent enemies",
          "* %attack% +1",
          "** %range% -1"
        ]
      },
      {
        shuffle: false,
        initiative: 66,
        actions: ["* %move% -1", "* %loot% 1", "* %heal% 2", "** Self"]
      }
    ]
  },
  {
    class: "Rending Drake",
    cards: [
      {
        shuffle: false,
        initiative: 12,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: true,
        initiative: 13,
        actions: ["* %attack% -1", "* %move% -1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 25,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 39,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 54,
        actions: [
          "* %move% -2",
          "* %attack% -1",
          "** %range% 3",
          "** %target% 2",
          "** %poison%"
        ]
      },
      {
        shuffle: false,
        initiative: 59,
        actions: ["* %move% -2", "* %attack% +1", "** %target% 2"]
      },
      {
        shuffle: false,
        initiative: 6,
        actions: [
          "* %shield% 2",
          "* %heal% 2",
          "** Self",
          "* %strengthen%",
          "** Self"
        ]
      },
      {
        shuffle: true,
        initiative: 72,
        actions: ["* %attack% -1", "* %attack% -1", "* %attack% -2"]
      }
    ]
  },
  {
    class: "Savvas Icestorm",
    cards: [
      {
        shuffle: false,
        initiative: 70,
        actions: [
          "* %push% 2",
          "** Target all adjacent enemies",
          "** %air%%use_element%: %push% 4 instead",
          "* %attack% +1",
          "** %range% +1"
        ]
      },
      {
        shuffle: false,
        initiative: 98,
        actions: ["* Summon normal Wind Demon", "* %air%"]
      },
      {
        shuffle: false,
        initiative: 98,
        actions: ["* Summon normal Frost Demon", "* %ice%"]
      },
      {
        shuffle: false,
        initiative: 19,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% -1",
          "* %shield% 1",
          "** Affect self and all allies within %range% 2",
          "* %ice%"
        ]
      },
      {
        shuffle: false,
        initiative: 14,
        actions: [
          "* %attack% +0",
          "** %range% +0",
          "** %ice%%use_element%: +2 %attack%, %immobilize%",
          "* %retaliate% 2",
          "* %air%"
        ]
      },
      {
        shuffle: false,
        initiative: 14,
        actions: [
          "* %shield% 4",
          "* %heal% 2",
          "** %range% 3",
          "** %ice%%use_element%: +3 %heal%",
          "* %air%%use_element%: %attack% +0"
        ]
      },
      {
        shuffle: true,
        initiative: 47,
        actions: [
          "* %disarm%",
          "** Target all adjacent enemies",
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0",
          "* %air%"
        ]
      },
      {
        shuffle: true,
        initiative: 35,
        actions: [
          "* %move% -1",
          "* %attack% -1 %aoe-triangle-3-side-with-corner-black% ",
          "* %ice%"
        ]
      }
    ]
  },
  {
    class: "Savvas Lavaflow",
    cards: [
      {
        shuffle: false,
        initiative: 97,
        actions: ["* Summon normal Flame Demon", "* %fire%"]
      },
      {
        shuffle: false,
        initiative: 97,
        actions: ["* Summon normal Earth Demon", "* %earth%"]
      },
      {
        shuffle: false,
        initiative: 22,
        actions: [
          "* %move% +1",
          "* %attack% -1",
          "** Target all adjacent enemies",
          "* %fire%%use_element%: %retaliate% 3"
        ]
      },
      {
        shuffle: true,
        initiative: 68,
        actions: [
          "* %move% -1",
          "* %attack% +1",
          "** %range% 3",
          "** All allies and enemies adjacent to the target suffer 2 damage.",
          "* %earth%"
        ]
      },
      {
        shuffle: false,
        initiative: 41,
        actions: [
          "* %move% +0",
          "* %attack% -1 %aoe-line-4-with-black% ",
          "** %earth%%use_element%: +2 %attack%, %immobilize%"
        ]
      },
      {
        shuffle: false,
        initiative: 51,
        actions: [
          "* All enemies suffer 2 damage.",
          "* %fire%%use_element%: %wound% all enemies",
          "* %earth%%use_element%: %disarm% all enemies"
        ]
      },
      {
        shuffle: false,
        initiative: 31,
        actions: [
          "* %heal% 4",
          "** %range% 3",
          "** %earth%%use_element%: %target% 3"
        ]
      },
      {
        shuffle: true,
        initiative: 68,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** %range% 3",
          "** %target% 2",
          "* %fire%"
        ]
      }
    ]
  },
  {
    class: "Scout",
    cards: [
      {
        shuffle: false,
        initiative: 29,
        actions: ["* %move% -1", "* %attack% -1", "** %range% 3"]
      },
      {
        shuffle: false,
        initiative: 40,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 53,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 54,
        actions: ["* %move% -2", "* %attack% +0", "** %range% 3", "** %poison%"]
      },
      {
        shuffle: false,
        initiative: 69,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: true,
        initiative: 92,
        actions: ["* %attack% +2", "** %poison% "]
      },
      {
        shuffle: true,
        initiative: 35,
        actions: ["* %move% +1", "** %jump%", "* %loot% 1"]
      },
      {
        shuffle: false,
        initiative: 79,
        actions: ["* %attack% -1", "** %range% 4", "** %target% 2"]
      }
    ]
  },
  {
    class: "Shaman",
    cards: [
      {
        shuffle: false,
        initiative: 8,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0",
          "** %disarm%"
        ]
      },
      {
        shuffle: false,
        initiative: 8,
        actions: [
          "* %move% -1",
          "* %attack% +0",
          "** %range% +0",
          "** %immobilize%"
        ]
      },
      {
        shuffle: true,
        initiative: 23,
        actions: ["* %move% +0", "* %heal% 3", "** %range% 3"]
      },
      {
        shuffle: true,
        initiative: 23,
        actions: ["* %move% +0", "* %heal% 3", "** %range% 3"]
      },
      {
        shuffle: false,
        initiative: 62,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 74,
        actions: ["* %move% -1", "* %attack% +1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 89,
        actions: [
          "* %move% -1",
          "* %heal% 1",
          "** Affect all adjacent allies",
          "* %bless%",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 9,
        actions: [
          "* %move% +1",
          "* %attack% -1",
          "** %range% +0, %curse%, %target% 2"
        ]
      }
    ]
  },
  {
    class: "Spitting Drake",
    cards: [
      {
        shuffle: false,
        initiative: 32,
        actions: ["* %move% +1", "* %attack% -1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 52,
        actions: ["* %move% +0", "* %attack% +0", "** %range% +0"]
      },
      {
        shuffle: true,
        initiative: 57,
        actions: [
          "* %move% +0",
          "* %attack% -1 %aoe-triangle-2-side%",
          "** %range% +0"
        ]
      },
      {
        shuffle: false,
        initiative: 27,
        actions: ["* %attack% +0", "** %range% +0,  %target% 2, %poison%"]
      },
      {
        shuffle: false,
        initiative: 87,
        actions: ["* %move% -1", "* %attack% +1", "** %range% +0"]
      },
      {
        shuffle: false,
        initiative: 89,
        actions: ["* %attack% -2", "** %range% +0", "** %stun%"]
      },
      {
        shuffle: false,
        initiative: 6,
        actions: [
          "* %shield% 2",
          "* %heal% 2",
          "** Self",
          "* %strengthen%",
          "** Self"
        ]
      },
      {
        shuffle: true,
        initiative: 89,
        actions: [
          "* %move% -1",
          "* %attack% -2 %aoe-circle%",
          "** %range% +0",
          "** %poison%"
        ]
      }
    ]
  },
  {
    class: "Stone Golem",
    cards: [
      {
        shuffle: false,
        initiative: 11,
        actions: ["* %retaliate% 3", "** %range% 3"]
      },
      {
        shuffle: false,
        initiative: 28,
        actions: [
          "* %move% +1",
          "* %attack% +0",
          "* Stone Golem suffers 1 damage."
        ]
      },
      {
        shuffle: true,
        initiative: 51,
        actions: ["* %move% +1", "* %attack% -1"]
      },
      {
        shuffle: false,
        initiative: 65,
        actions: ["* %move% +0", "* %attack% +0"]
      },
      {
        shuffle: false,
        initiative: 72,
        actions: [
          "* %attack% +1",
          "** %range% 3",
          "* Stone Golem suffers 2 damage"
        ]
      },
      {
        shuffle: true,
        initiative: 90,
        actions: ["* %move% -1", "* %attack% +1"]
      },
      {
        shuffle: false,
        initiative: 28,
        actions: [
          "* %move% +1",
          "* %attack% -2",
          "** %range% 3",
          "** %pull% 2",
          "** %immobilize%"
        ]
      },
      {
        shuffle: false,
        initiative: 83,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** Target all adjacent enemies"
        ]
      }
    ]
  },
  {
    class: "Sun Demon",
    cards: [
      {
        shuffle: true,
        initiative: 17,
        actions: [
          "* %heal% 3",
          "** %range% 3",
          "** %light%%use_element%: Target all allies within range instead"
        ]
      },
      {
        shuffle: false,
        initiative: 36,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Target all adjacent enemies",
          "* %light%"
        ]
      },
      {
        shuffle: false,
        initiative: 36,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** Target all adjacent enemies",
          "* %light%"
        ]
      },
      {
        shuffle: false,
        initiative: 68,
        actions: ["* %move% +0", "* %attack% +1", "* %light%"]
      },
      {
        shuffle: true,
        initiative: 73,
        actions: [
          "* %move% +0",
          "* %attack% +1",
          "* %light%%use_element%: %heal% 3",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 95,
        actions: [
          "* %move% -1",
          "* %attack% +0",
          "** %range% 4",
          "** %light%%use_element%: Target all enemies within range"
        ]
      },
      {
        shuffle: false,
        initiative: 88,
        actions: [
          "* %move% -1",
          "* %attack% -1",
          "** Target all adjacent enemies",
          "* %dark%%use_element%: %muddle%",
          "** Self"
        ]
      },
      {
        shuffle: false,
        initiative: 50,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** %range% 3",
          "* %any%%use_element%: %light%"
        ]
      }
    ]
  },
  {
    class: "Wind Demon",
    cards: [
      {
        shuffle: false,
        initiative: 9,
        actions: [
          "* %attack% -1",
          "** %range% +0",
          "* %heal% 1",
          "** Self",
          "* %air%%use_element%: %invisible%",
          "** Self"
        ]
      },
      {
        shuffle: true,
        initiative: 21,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** %range% +0, %pull% 1",
          "* %air%"
        ]
      },
      {
        shuffle: true,
        initiative: 21,
        actions: [
          "* %move% +0",
          "* %attack% +0",
          "** %range% +0, %pull% 1",
          "* %air%"
        ]
      },
      {
        shuffle: false,
        initiative: 29,
        actions: [
          "* %move% +0",
          "* %attack% -1",
          "** %range% +0, %target% 2",
          "** %air%%use_element%: %push% 2"
        ]
      },
      {
        shuffle: false,
        initiative: 37,
        complexActions: [
          { action: "%move% +0" },
          {
            action: new AoEAttack(0, aoe_4_with_black),
            modifiers: [
              {
                cause: "%air%%use_element%",
                effect: new AoEAttack(1, aoe_circle_with_side_black)
              }
            ]
          }
        ]
      },
      {
        shuffle: false,
        initiative: 43,
        actions: [
          "* %move% -1",
          "* %attack% +1",
          "** %range% +0",
          "** %air%%use_element%: %target% 2"
        ]
      },
      {
        shuffle: false,
        initiative: 43,
        actions: [
          "* %push% 1",
          "** Target all adjacent enemies",
          "* %attack% +0",
          "** %range% +0",
          "** %earth%%use_element%: -2 %range%"
        ]
      },
      {
        shuffle: false,
        initiative: 2,
        actions: [
          "* %shield% 1",
          "* %move% -1",
          "* %attack% -1",
          "** %range% +0",
          "* %any%%use_element%: %air%"
        ]
      }
    ]
  }
];


export class MonsterDeck {
    readonly monster : IMonster;
    readonly deck : ICard[];
    readonly drawn : ICard[] = [];

    constructor(name : string) {
        this.monster = DECKS[name];

        let thing = DECK_DEFINITIONS.find((d) => {
            return (d.class == this.monster!.class)
        });
        if (!thing) {
            throw new Error(`Failed to find deck for ${name}`);
        }
        this.deck = thing.cards.map(card => {
            let actions : IMonsterAction[] = [];
            if (card.actions) {
              card.actions.forEach(actionDef => {
                if (actionDef.startsWith("**")) {
                  let currentAction = actions[actions.length - 1];
                  if (currentAction.modifiers){
                  currentAction.modifiers.push(
                    actionDef.substring(3)
                  );
                }
                } else {
                  actions.push({
                    action: actionDef.substring(1),
                    modifiers: []
                  });
                }
              });
            }

            if (card.complexActions) {
                card.complexActions.forEach(actionDef => {
                    actions.push(actionDef);
                })
            }

            return {
              monster: this.monster,
              initiative: card.initiative,
              actions: actions,
              shuffle: card.shuffle
            } as ICard;
        })
        shuffle_list(this.deck);
    }

    get drawnCard() : ICard {
        return this.drawn[this.drawn.length-1]; 
    }

    drawCard() : ICard | null {
        if (this.drawn.length > 0 && this.drawn[this.drawn.length-1].shuffle) {
            while (this.drawn.length > 0) {
                let card = this.drawn.pop()
                if (card) {this.deck.push(card)};
            }

            shuffle_list(this.deck);
            return null;
        }

        let card = this.deck.pop();
        if (!card) {
            throw new Error("Failed to draw card???");
        }
        this.drawn.push(card);
        return card;
    }

}