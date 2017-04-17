import {handleActions} from 'redux-actions';
import * as actions from '../actions/constants';

const MAP = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]

const WIDTH = MAP[0].length;
const HEIGHT = MAP.length;
const ENEMY_COUNT = 10;
const POTION_COUNT = Math.floor(ENEMY_COUNT/2)+2;
const WEAPON_COUNT = Math.floor(ENEMY_COUNT/2)+2;
const NEXT_LEVEL = 50;


function makeMap(){
    let map = MAP;
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
function fillMapWith(map,type){
    let x, y;
    do {
        x = Math.floor(Math.random()*(WIDTH-1)+1);
        y = Math.floor(Math.random()*(HEIGHT-1)+1);
    } while (map[y][x] !== 'path')
    map[y][x] = type;
    return {'x':x, 'y':y}
}

function generateEnemies(map){
    let enemies = [];
    for (let i=0; i<ENEMY_COUNT; i++){
        let enemy = {
            id: i,
            hp: 100,
            level: Math.floor(Math.random()*5+1),
            attack: 10,
            coordinates: fillMapWith(map,'enemy'),
            xp: 10,
        }
        enemy.attack *= enemy.level;
        enemies.push(enemy);
    }
    return enemies;
}

function generateBoss(map){
    let boss = {
        hp: 1000,
        level: 5,
        attack: 10,
        coordinate: fillMapWith(map,'boss')
    }
    boss.attack *= boss.level;
    return boss;
}

function generatePotions(map){
    let potions = [];
    for (let i=0; i<POTION_COUNT; i++){
        let potion = {
            boost: 50,
            coordinates: fillMapWith(map,'potion')
        }
        potions.push(potion);
    }
    return potions;
}

function generateWeapons(map){
    let weapons = [];
    for (let i=0; i<WEAPON_COUNT; i++){
        let weapon = {
            boost: 10,
            coordinates: fillMapWith(map,'weapon')
        }
        weapons.push(weapon);
    }
    return weapons;
}

function generatePlayer(map){
    return {
        hp: 100,
        playerLevel: 1,
        attack: 10,
        weaponLevel: 10,
        coordinates: fillMapWith(map,'player'),
        nextLevel: NEXT_LEVEL
    }
}

const INITIAL_PLAYER = generatePlayer(filledMap);
const INITIAL_ENEMIES = generateEnemies(filledMap);
const INITIAL_BOSS = generateBoss(filledMap);
const INITIAL_POTIONS = generatePotions(filledMap);
const INITIAL_WEAPONS = generateWeapons(filledMap);
const INITIAL_DARKNESS = true;
const INITIAL_MAP = filledMap;
const INITIAL_STATE = {
    isRunning: true,
    isWon: false,
    map: INITIAL_MAP,
    player: INITIAL_PLAYER,
    darkness: INITIAL_DARKNESS,
    enemies: INITIAL_ENEMIES,
    potions: INITIAL_POTIONS,
    weapons: INITIAL_WEAPONS,
    boss: INITIAL_BOSS
}

function updatePlayerPosition(map,oldPos,newPos){
    map[oldPos.y][oldPos.x] = 'path';
    map[newPos.y][newPos.x] = 'player';
    return map;
}

export default handleActions({
    [actions.TOGGLE_DARKNESS]: (state, action) => ({...state, darkness: !state.darkeness}),
    [actions.PLAYER_HP_UP]: (state, action) => ({...state, player: { ...state.player, hp: state.player.hp+action.payload } }),
    [actions.MOVE]: (state, action) => {
        return {...state, 
            player: { ...state.player, coordinates: action.payload },
            map: updatePlayerPosition(state.map,state.player.coordinates,action.payload)
        }
    },
    [actions.ENEMY_HP_DOWN]: (state, action) => {
        let newEnemies = [...state.enemies];
        let enemyMetIdx = state.enemies.findIndex((enemy)=>(enemy.id === action.payload.id))
        let enemyMet = state.enemies[enemyMetIdx];
        enemyMet.hp -= action.payload.damage;
        newEnemies.splice(enemyMetIdx,1,enemyMet)
        return {...state, enemies: newEnemies }
    },
    [actions.ENEMY_KILLED]: (state, action) => {
        let newEnemies = [...state.enemies];
        let enemyKilledIdx = state.enemies.findIndex((enemy)=>(enemy.id === action.payload.id))
        let xpGained = newEnemies[enemyKilledIdx].xp;
        newEnemies.splice(enemyKilledIdx,1);
        return {...state, 
            enemies: newEnemies,
            player: {...state.player, nextLevel: state.player.nextLevel-xpGained}
        }
    },
    [actions.PLAYER_HP_UP]: (state, action) => {
        let newPotions = [...state.potions];
        let potionPickedIdx = state.potions.findIndex((potion)=>(potion.coordinates.x === action.payload.x && potion.coordinates.y === action.payload.y))
        let potionPicked = newPotions[potionPickedIdx];
        newPotions.splice(potionPickedIdx,1);
        return {...state, 
            potions: newPotions,
            player: {...state.player, hp: state.player.hp+potionPicked.boost}
        }
    },
    [actions.PLAYER_HP_DOWN]: (state, action) => {
        return {...state, 
            player: {...state.player, hp: state.player.hp-action.payload}
        }
    },
    [actions.BOSS_HP_DOWN]: (state, action) => {
        return {...state, 
            boss: {...state.boss, hp: state.boss.hp-action.payload}
        }
    },
    [actions.PLAYER_WON]: (state, action) => {
        return {...state, isRunning: false, isWon: true}
    },
    [actions.PLAYER_LOST]: (state, action) => {
        return {...state, isRunning: false}
    },
    [actions.WEAPON_UP]: (state, action) => {
        let newWeapons = [...state.weapons];
        let weaponPickedIdx = newWeapons.findIndex((weapon)=>(weapon.coordinates.x === action.payload.x && weapon.coordinates.y === action.payload.y))
        let weaponPicked = newWeapons[weaponPickedIdx];
        newWeapons.splice(weaponPickedIdx,1);
        let newWeaponLevel = state.player.weaponLevel+weaponPicked.boost;
        return {...state, 
            weapons: newWeapons,
            player: {...state.player, weaponLevel: newWeaponLevel, attack: newWeaponLevel*state.player.playerLevel }
        }
    },
    [actions.LEVEL_UP]: (state,action) => {
        let newLevel = state.player.playerLevel+1;
        return {...state,
            player: {...state.player, nextLevel: NEXT_LEVEL, playerLevel: newLevel, attack: state.player.weaponLevel*newLevel}
        }
    },
    [actions.START_GAME]: (state,action) => {
        let newMap = makeMap();
        let enemies = generateEnemies(newMap);
        let potions = generatePotions(newMap);
        let weapons = generateWeapons(newMap);
        let player = generatePlayer(newMap);
        const boss = generateBoss(newMap);
        return {
            ...state,
            isRunning: true,
            isWon: false,
            map: newMap,
            player: player,
            darkness: true,
            enemies,
            potions,
            weapons,
            boss
        };
    },
    [actions.TOGGLE_DARKNESS]: (state,action) => {
        return { ...state, darkness: !state.darkness }
    }
}, INITIAL_STATE)


// let newMap = makeMap();
// let enemies = generateEnemies(newMap);
// let potions = generatePotions(newMap);
// let weapons = generateWeapons(newMap);
// let player = {
//     hp: 100,
//     playerLevel: 1,
//     attack: 10,
//     weaponLevel: 10,
//     coordinates: {x:1,y:1},
//     nextLevel: NEXT_LEVEL
// }
// const boss = generateBoss(newMap);
// let INITIAL_STATE = { 
//     isRunning: true,
//     isWon: false,
//     map: newMap,
//     player: player,
//     darkness: false,
//     enemies,
//     potions,
//     weapons,
//     boss
// };
// return INITIAL_STATE;