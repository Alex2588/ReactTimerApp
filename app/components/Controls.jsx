var React = require('react');

var Controls = React.createClass({
    propTypes: {
        countdownStatus: React.PropTypes.string.isRequired
    },
    render: function(){
        var {countdownStatus} = this.props;
        var renderButtons = () => {
            if(countdownStatus === 'paused'){
                return(
                    <button className="button primary">Start</button>
                )
            }else if (countdownStatus === 'started'){
                return(
                    <button className="button secondary">Pause</button>
                )
            }
        }

        return(
            <div>
                {renderButtons()}
                <button className="button alert hollow">Clear</button>
            </div>
        )
    }
});

module.exports = Controls;