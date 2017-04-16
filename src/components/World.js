import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

class World extends Component {

    renderTiles(row){
        return row.map((tileClass, idx) => {
            return <td className={`tile ${tileClass}`} key={idx}> </td>
        });
    }

    renderRows() {
        return this.props.map.map((row, idx) => {
            return <tr key={idx} className="tileRow">{this.renderTiles(row)}</tr>
        });
    }
    
    render(){
        return (
            <table>
                <tbody>
                  {this.renderRows()}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => ({map: state.map, player: state.player, enemies: state.enemies});

export default connect(mapStateToProps)(World);