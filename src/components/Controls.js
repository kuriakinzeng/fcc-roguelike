import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleDarkness } from '../actions';

class Controls extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col">
                        HP: {this.props.player.hp}
                    </div>
                    <div className="col">
                        Level: {this.props.player.playerLevel}
                    </div>
                    <div className="col">
                        Weapon: {this.props.player.weaponLevel}
                    </div>
                    <div className="col">
                        Attack: {this.props.player.weaponLevel * this.props.player.playerLevel}
                    </div>
                    <div className="col">
                        XP: {this.props.player.xp}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-secondary" 
                                onClick={()=>this.props.toggleDarkness()}>Toggle Darkness
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({player: state.player});

export default connect(mapStateToProps,{ toggleDarkness })(Controls);