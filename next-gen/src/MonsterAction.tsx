import React, { Component } from 'react';
import {IActionType, AoEAttack, ComplexAction, StyledAction} from './data/cards';

import styles from './styles/Card.module.css';

import earth from './images/earth.svg';
import target from './images/target.svg';
import heal from './images/heal.svg';
import aoe_circle_with_side_black from './images/aoe-circle-with-side-black.svg';
import aoe_triangle_3_side_with_corner_black from './images/aoe-triangle-3-side-with-corner-black.svg';
import curse from './images/curse.svg';
import move from './images/move.svg';
import stun from './images/stun.svg';
import aoe_triangle_2_side_with_black from './images/aoe-triangle-2-side-with-black.svg';
import fire from './images/fire.svg';
import disarm from './images/disarm.svg';
import fly from './images/fly.svg';
import elderDrake from './images/elderDrake.special1Area.svg';
import shield from './images/shield.svg';
import dark from './images/dark.svg';
import air from './images/air.svg';
import jump from './images/jump.svg';
import bless from './images/bless.svg';
import aoe_line_6_with_black from './images/aoe-line-6-with-black.svg';
import muddle from './images/muddle.svg';
import aoe_4_with_black from './images/aoe-4-with-black.svg';
import sightlessEye1 from './images/sightlessEye.special1Area.svg';
import immobilize from './images/immobilize.svg';
import use_element from './images/use_element.svg';
import loot from './images/loot.svg';
import aoe_circle_with_middle_black from './images/aoe-circle-with-middle-black.svg';
import aoe_triangle_2_side from './images/aoe-triangle-2-side.svg';
import aoe_circle from './images/aoe-circle.svg';
import retaliate from './images/retaliate.svg';
import range from './images/range.svg';
import invisibility from './images/invisibility.svg';
import inoxBodyguard from './images/inoxBodyguard.special1Area.svg';
import strengthen from './images/strengthen.svg';
import wound from './images/wound.svg';
import attack from './images/attack.svg';
import sightlessEye2 from './images/sightlessEye.special2Area.svg';
import push from './images/push.svg';
import pierce from './images/pierce.svg';
import ice from './images/ice.svg';
import aoe_line_3_with_black from './images/aoe-line-3-with-black.svg';
import any_element from './images/any_element.svg';
import aoe_line_4_with_black from './images/aoe-line-4-with-black.svg';
import light from './images/light.svg';
import poison from './images/poison.svg';


export default class MonsterAction extends Component<{ definition: IActionType }> {
  MACROS : {[key :string] : JSX.Element} = {
    "%air%": <img alt="" className={styles.element} src={air}/>,
    "%any%": <img alt="" className={ styles.element } src={any_element}/>,
    "%aoe-4-with-black%":
      <img alt="" className='aoe h2' src={aoe_4_with_black}/>,
    "%aoe-circle%":
      <div className='small'><img alt="" className='aoe h3' src={aoe_circle}/></div>,
    "%aoe-circle-with-middle-black%":
      <div className='small'><img alt="" className='aoe h3' src={ aoe_circle_with_middle_black }/></div>,
    "%aoe-circle-with-side-black%":
      <img alt="" className='aoe h3' src={ aoe_circle_with_side_black }/>,
    "%aoe-line-3-with-black%":
      <div className=''><img alt="" className='aoe h1 rotated' src={ aoe_line_3_with_black }/></div>,
    "%aoe-line-4-with-black%":
      <div className=''><img alt="" className='aoe h1 rotated' src={ aoe_line_4_with_black }/></div>,
    "%aoe-line-6-with-black%":
      <img alt="" className='aoe h6 right_aligned' src={ aoe_line_6_with_black }/>,
    "%aoe-triangle-2-side%":
      <div className=''><img alt="" className='aoe h2' src={ aoe_triangle_2_side }/></div>,
    "%aoe-triangle-2-side-with-black%":
      <div className=''><img alt="" className='aoe h2' src={ aoe_triangle_2_side_with_black }/></div>,
    "%aoe-triangle-3-side-with-corner-black%":
      <div className=''><img alt="" className='aoe h3' src={ aoe_triangle_3_side_with_corner_black }/></div>,
    "%attack%":
      <span className='nobr'>Attack <img alt="" className='icon' src={ attack }/></span>,
    "%bless%":
      <span className='nobr'>BLESS <img alt="" className='icon' src={ bless }/></span>,
    "%boss-aoe-elder-drake-sp1%":
      <div className=''><img alt="" className='aoe h3' src={ elderDrake }/></div>,
    "%boss-aoe-inox-bodyguard-sp1%":
      <div className=''><img alt="" className='aoe h3' src={ inoxBodyguard }/></div>,
    "%boss-aoe-sightless-eye-sp1%":
      <div className=''><img alt="" className='aoe h3' src={ sightlessEye1 }/></div>,
    "%boss-aoe-sightless-eye-sp2%":
      <div className=''><img alt="" className='aoe h3' src={ sightlessEye2 }/></div>,
    "%curse%":
      <span className='nobr'>CURSE <img alt="" className='icon' src={ curse }/></span>,
    "%dark%": <img alt="" className={styles.element} src={ dark }/>,
    "%disarm%":
      <span className='nobr'>DISARM <img alt="" className='icon' src={ disarm }/></span>,
    "%earth%": <img alt="" className={styles.element} src={ earth }/>,
    "%fire%": <img alt="" className={styles.element}src={ fire }/>,
    "%heal%":
      <span className='nobr'>Heal <img alt="" className='icon' src={ heal }/></span>,
    "%ice%": <img alt="" className={styles.element} src={ ice }/>,
    "%immobilize%":
      <span className='nobr'>IMMOBILIZE <img alt="" className='icon' src={ immobilize }/></span>,
    "%invisible%":
      <span className='nobr'>INVISIBLE <img alt="" className='icon' src={ invisibility }/></span>,
    "%jump%":
      <span className='nobr'>Jump <img alt="" className='icon' src={ jump }/></span>,
    "%light%": <img alt="" className={styles.element} src={ light }/>,
    "%loot%":
      <span className='nobr'>Loot <img alt="" className='icon' src={ loot }/></span>,
    "%move%":
      <span className='nobr'>Move <img alt="" className='icon' src={ move }/></span>,
    "%muddle%":
      <span className='nobr'>MUDDLE <img alt="" className='icon' src={ muddle }/></span>,
    "%pierce%":
      <span className='nobr'>PIERCE <img alt="" className='icon' src={ pierce }/></span>,
    "%poison%":
      <span className='nobr'>POISON <img alt="" className='icon' src={ poison }/></span>,
    "%pull%":
      <span className='nobr'>PULL <img alt="" className='mirrored icon' src={ push }/></span>,
    "%push%":
      <span className='nobr'>PUSH <img alt="" className='icon' src={ push }/></span>,
    "%range%":
      <span className='nobr'>Range <img alt="" className='icon' src={ range }/></span>,
    "%retaliate%":
      <span className='nobr'>Retaliate <img alt="" className='icon' src={ retaliate }/></span>,
    "%shield%":
      <span className='nobr'>Shield <img alt="" className='icon' src={ shield }/></span>,
    "%flying%":
      <span className='nobr'><img alt="" className='icon' src={ fly }/></span>,
    "%strengthen%":
      <span className='nobr'>STRENGTHEN <img alt="" className='icon' src={ strengthen }/></span>,
    "%stun%":
      <span className='nobr'><img alt="" className='icon' src={ stun }/></span>,
    "%target%":
      <span className='nobr'>Target <img alt="" className='icon' src={ target }/></span>,
    "%use_element%":
      <img alt="" className={[styles.element, styles.overlay].join(' ')} src={ use_element }/>,
    "%wound%":
      <span className='nobr'><img alt="" className='icon' src={ wound }/></span>
  };

  static MACRO_REGEX = /(%[^%]*%)/gi;

  renderString(definition : string) {
      let actionElems : JSX.Element[] = []
      let searchString = definition
      let match = MonsterAction.MACRO_REGEX.exec(searchString)
      let previousMatchIndex = 0;
      let elemCounter = 0
      while (match != null) {
          actionElems.push(<span className={styles.textwrapper} key={elemCounter++}>{definition.slice(previousMatchIndex, match.index)}</span>) 
          previousMatchIndex = match.index + match[0].length;
          actionElems.push(<span className={styles.textwrapper} key={elemCounter++}>{this.MACROS[match[0]]}</span>);
          match = MonsterAction.MACRO_REGEX.exec(searchString);
      }
      if (previousMatchIndex < definition.length) {
          actionElems.push(<span className={styles.textwrapper} key={elemCounter++}>{definition.slice(previousMatchIndex)}</span>)
      }
    return <span className={styles.textwrapper} >{actionElems}</span>;
  }

  renderAoEAttack(definition : AoEAttack) {
      let attack = this.renderString(`%attack% ${definition.bonus < 0 ? '' : '+'}${definition.bonus}`)
      let img = <div className={styles.aoe_container}><img alt="" src={definition.aoe}/></div>

      return <div className={styles.aoe_attack}>{attack}{img}</div>
  }

  renderComplexAction(definition : ComplexAction) {
      return (
        <div className={styles.complex_action}>
          <div className={styles.cause}>
            {this.renderString(definition.cause)}:
          </div>
          <div className={styles.effect}>
            {this.renderAny(definition.effect)}
          </div>
        </div>
      );

  }

  isComplexAction(object: any): object is ComplexAction {
      return 'cause' in object &&'effect' in object;
  }

  render() {
      return this.renderAny(this.props.definition);
  }

  renderAny(definition : IActionType) {
      if (typeof definition === "string") {
        return this.renderString(definition);
      } else if (definition instanceof AoEAttack) {
          return this.renderAoEAttack(definition);
      } else if (this.isComplexAction(definition)) {
          return this.renderComplexAction(definition)
      } else if (definition instanceof StyledAction) {
        return <span className={styles[definition.style]}>{this.renderString(definition.action)}</span>
      }
  }  
}