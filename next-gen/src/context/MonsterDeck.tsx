import { shuffle_list } from '../util';
import { IMonster, ICard, DECKS, DECK_DEFINITIONS, IMonsterAction } from '../data/cards';
import React from 'react';
import { AppContext } from './AppContext';
import autobind from 'autobind-decorator';

interface DeckStateJSON {
  name : string;
  class : string;
  deck : number[];
  drawn : number[];
}

interface IState {
  deck : ICard[];
  drawn : ICard[];
  shownCard : ICard | null;
  drawCard : () => void;
  deactivate : () => void;
}

interface IProps {
  monster : IMonster
}

export const DeckStateCtx = React.createContext<IState| null>(null);
export class DeckStateProvider extends React.Component<IProps, IState> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  state = {
    deck: [],
    drawn: [],
    shownCard: null,
    drawCard: this.drawCard,
    deactivate : this.deactivate
  }

  render() {
    return <DeckStateCtx.Provider value={this.state}>
      {this.props.children}
    </DeckStateCtx.Provider>
  }

  static getDerivedStateFromProps(nProps: IProps, pState: IState) {
    if (pState.deck.length == 0 && pState.drawn.length == 0) {
      let thing = DECK_DEFINITIONS.find((d) => {
        return (d.class == nProps.monster.class);
      });
      if (!thing) {
        throw new Error(`Failed to find deck for ${name}`);
      }
      let deckDef: {
        class: string;
        cards: {
          shuffle: boolean;
          initiative: number;
          actions?: string[];
          complexActions?: IMonsterAction[];
        }[];
      } = thing;

      return {
        deck: shuffle_list(thing.cards.map((card, idx) => DeckStateProvider.buildICard(
          idx, nProps.monster, card)))
      }
    }
    return null;
  }

  componentDidMount() {
    let saved = this.context!.store.Get<DeckStateJSON>(`decks:${this.props.monster.name}`);
    if (saved != null) {
      let thing = DECK_DEFINITIONS.find((d) => {
        return (d.class == this.props.monster.class);
      });
      if (!thing) {
        throw new Error(`Failed to find deck for ${name}`);
      }
      let deckDef: {
        class: string;
        cards: {
          shuffle: boolean;
          initiative: number;
          actions?: string[];
          complexActions?: IMonsterAction[];
        }[];
      } = thing;

      let drawn = saved.drawn.map(cardId => {
        return DeckStateProvider.buildICard(cardId, this.props.monster, deckDef.cards[cardId]);
      });
      this.setState({
        deck: saved.deck.map(cardId => {
          return DeckStateProvider.buildICard(cardId, this.props.monster, deckDef.cards[cardId]);
        }),
        drawn: drawn,
        shownCard: drawn[0]
      });
    }
  }

  @autobind
  drawCard() {
    this.setState(pState => {
      let deck = pState.deck.slice()

      if (pState.drawn.length > 0 && pState.drawn[pState.drawn.length - 1].shuffle) {
        /* This means we should shuffle. Put all the cards back. Shuffle them. Hide shown card */
        while (pState.drawn.length > 0) {
          let card = pState.drawn.pop();
          if (card) {
            deck.push(card);
          }
        }
        shuffle_list(deck);
        return {
          deck: deck,
          drawn: [],
          shownCard: null
        }
      }

      /* In this case, we just pop another card.  */
      let card = deck.pop();
      if (!card) {
        throw new Error("Failed to draw card???");
      }
      pState.drawn.push(card);
      return {
        shownCard: card,
        drawn: pState.drawn,
        deck: deck
      }
    }, () => { this.context!.store.Put(`decks:${this.props.monster.name}`, this.toJSON) }
    );
  }

  @autobind
  deactivate() {
    this.context!.store.Clear(`decks:${this.props.monster.name}`);
    this.context!.deactivateMonsterType(this.props.monster.name);
  }

  toJSON(): DeckStateJSON {
    return {
      name: this.props.monster.name,
      class: this.props.monster.class,
      drawn: this.state.drawn.map((card : ICard) => card.id),
      deck: this.state.deck.map((card : ICard) => card.id),
    };
  }

  static buildICard(id: number, monster : IMonster, card: {
    shuffle: boolean;
    initiative: number;
    actions?: string[];
    complexActions?: IMonsterAction[];
  }): ICard {
    let actions: IMonsterAction[] = [];

    if (card.actions) {
      card.actions.forEach(actionDef => {
        if (actionDef.startsWith("**")) {
          let currentAction = actions[actions.length - 1];
          if (currentAction.modifiers) {
            currentAction.modifiers.push(actionDef.substring(3));
          }
        }
        else {
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
      });
    }

    return {
      id: id,
      monster: monster,
      initiative: card.initiative,
      actions: actions,
      shuffle: card.shuffle
    } as ICard;
  }

}
