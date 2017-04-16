import {handleActions} from 'redux-actions';
import * as actions from '../actions/constants';
import _ from 'lodash';

const WIDTH = 24;
const HEIGHT = 16;
const MAX_NUM_WALLS = 3;
const MIN_NUM_WALLS = 2;
const ENEMY_COUNT = 2;
const POTION_COUNT = Math.floor(ENEMY_COUNT/2);

function makeMap(){
    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    return map.map(function(row){
        return row.map(function(cell){
            if(cell===1)
                return 'wall';
            else
                return 'path';
        })
    });
}
let filledMap = makeMap();
console.log(filledMap);
function fillMapWith(type){
    let x, y;
    do {
        x = Math.floor(Math.random()*(WIDTH-1)+1);
        y = Math.floor(Math.random()*(HEIGHT-1)+1);
    } while (filledMap[y][x] !== 'path')
    filledMap[y][x] = type;
    return {'x':x, 'y':y}
}

function generateEnemies(){
    let enemies = [];
    for (let i=0; i<ENEMY_COUNT; i++){
        let enemy = {
            id: i,
            hp: 100,
            level: Math.floor(Math.random()*5+1),
            attack: 10,
            coordinate: fillMapWith('enemy')
        }
        enemy.attack *= enemy.level;
        enemies.push(enemy);
    }
    return enemies;
}

function generatePotions(){
    let potions = [];
    for (let i=0; i<POTION_COUNT; i++){
        let potion = {
            boost: 50,
            coordinate: fillMapWith('potion')
        }
        potions.push(potion);
    }
    return potions;
}

const INITIAL_PLAYER = {
    hp: 100,
	playerLevel: 1,
	attack: 10,
	weaponLevel: 10,
	xp: 0
};

const INITIAL_ENEMIES = generateEnemies();

const INITIAL_POTIONS = generatePotions();

const INITIAL_DARKNESS = false;

const INITIAL_MAP = filledMap;

const INITIAL_STATE = {
    map: INITIAL_MAP,
    player: INITIAL_PLAYER,
    darkness: INITIAL_DARKNESS,
    enemies: INITIAL_ENEMIES,
    potions: INITIAL_POTIONS
}

export default handleActions({
    [actions.TOGGLE_DARKNESS]: (state, action) => ({...state, darkness: !state.darkeness}),
    [actions.PLAYER_HP_UP]: (state, action) => ({...state, player: { ...state.player, hp: state.player.hp+action.payload } })
}, INITIAL_STATE)