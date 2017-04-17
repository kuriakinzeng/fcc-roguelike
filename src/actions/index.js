import { createAction } from 'redux-actions';
import * as actions from './constants';

export const startGame = createAction(actions.START_GAME);
export const playerWon = createAction(actions.PLAYER_WON);
export const playerLost = createAction(actions.PLAYER_LOST);
export const toggleDarkness = createAction(actions.TOGGLE_DARKNESS);
export const playerHpUp = createAction(actions.PLAYER_HP_UP);
export const playerHpDown = createAction(actions.PLAYER_HP_DOWN);
export const levelUp = createAction(actions.LEVEL_UP);
export const attackUp = createAction(actions.ATTACK_UP);
export const weaponUp = createAction(actions.WEAPON_UP);
export const move = createAction(actions.MOVE);
export const enemyHpDown = createAction(actions.ENEMY_HP_DOWN);
export const enemyKilled = createAction(actions.ENEMY_KILLED);
export const bossHpDown = createAction(actions.BOSS_HP_DOWN);
