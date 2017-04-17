import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVector, getMoveVector } from '../lib/utils'
import { move, enemyHpDown, bossHpDown, playerHpDown, enemyKilled, playerHpUp, weaponUp, playerLost, playerWon, levelUp } from '../actions';

class World extends Component {
    constructor(props){
        super(props);
        this.handleMove = this.handleMove.bind(this);
    }
    componentDidMount() {
        // window.addEventListener('keydown', this.handleMove.bind(this); <-- this cannot be removed later for some reason
        window.addEventListener('keydown', this.handleMove);
    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleMove);
    }
    handleMove(e) {
        const { map, player, enemies, boss, bossHpDown, enemyHpDown, move,
            enemyKilled, playerHpUp, playerHpDown, weaponUp, playerLost, playerWon, levelUp } = this.props;
        const vector = getMoveVector(e);
        const oldPos = player.coordinates;
        const newPos = addVector({ x: oldPos.x, y: oldPos.y }, vector);

        if (newPos.y > 0 && newPos.x > 0 && newPos.y < map.length && newPos.x < map[0].length && map[newPos.y][newPos.x] !== 'wall') {
            if (map[newPos.y][newPos.x] === 'potion') {
                playerHpUp(newPos);
            }
            if (map[newPos.y][newPos.x] === 'weapon') {
                weaponUp(newPos);
            }
            if (map[newPos.y][newPos.x] === 'boss') {
                const hitTakenByBoss = Math.floor((Math.random() * 0.5 + 0.5) * player.attack);
                const hitTakenByPlayer = Math.floor((Math.random() * 0.5 + 0.5) * boss.attack);
                if (boss.hp <= hitTakenByBoss) {
                    playerWon();
                } else {
                    if (player.hp <= hitTakenByPlayer) {
                        playerLost();
                    } else {
                        playerHpDown(hitTakenByPlayer);
                        bossHpDown(hitTakenByBoss);
                    }
                    return;
                }
            }
            if (map[newPos.y][newPos.x] === 'enemy') {
                const enemyMet = enemies.find((enemy) => (enemy.coordinates.x === newPos.x && enemy.coordinates.y === newPos.y))
                const hitTakenByEnemy = Math.floor((Math.random() * 0.5 + 0.5) * player.attack);
                const hitTakenByPlayer = Math.floor((Math.random() * 0.5 + 0.5) * enemyMet.attack);

                if (enemyMet.hp <= hitTakenByEnemy) {
                    enemyKilled({ id: enemyMet.id });
                    if(player.nextLevel <= enemyMet.xp){
                        levelUp()
                    }
                } else {
                    if (player.hp <= hitTakenByPlayer) {
                        playerLost();
                    } else {
                        playerHpDown(hitTakenByPlayer);
                        enemyHpDown({ id: enemyMet.id, damage: hitTakenByEnemy });
                    }
                    return;
                }
            }

            move(newPos);
        }
    }

    renderTiles(row) {
        return row.map((tileClass, idx) => {
            return <td className={`tile ${tileClass}`} key={idx}> </td>
        });
    }

    renderRows() {
        return this.props.map.map((row, idx) => {
            return <tr key={idx} className="tileRow">{this.renderTiles(row)}</tr>
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <table style={{tableLayout: 'auto'}}>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ map: state.map, player: state.player, enemies: state.enemies, 
    isRunning: state.isRunning, isWon: state.isWon, boss: state.boss });

export default connect(mapStateToProps, {
    move, enemyHpDown, bossHpDown, playerHpDown,
    enemyKilled, playerHpUp, weaponUp, playerLost, 
    playerWon, levelUp
})(World);