var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
    getInitialState: function(){
        return{
            count: 0,
            countdownStatus: 'stopped'
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(this.state.countdownStatus !== prevState.countdownStatus){
            switch(this.state.countdownStatus){
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = null;
                    break;
            }
        }
    },
    componentWillUnmount: function(){
        clearInterval(this.timer);
        this.timer = null;
    },
    startTimer: function(){
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                count: newCount >= 0? newCount : 0
            });

            if(newCount === 0){
                this.setState({ countdownStatus: 'stopped' })
            }
        }, 1000)
    },
    handleStatusChange: function(newStatus){
        this.setState({countdownStatus: newStatus});
    },
    handleSetCountdown: function(seconds){
        this.setState({
            count: seconds,
            countdownStatus: 'started'
        });
    },
    render: function(){
        var {count, countdownStatus} = this.state;
        var renderControlsArea = () => {
            if(countdownStatus === 'stopped'){
                return <CountdownForm onSetCountdown={this.handleSetCountdown} />;
            }else{
                return (<Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>)
            }
        }

        return(
            <div>
                <h1 className="page-title">Countdown app</h1>
                <Clock totalSeconds={count}/>
                {renderControlsArea()}
            </div>
        )
    }
});

module.exports = Countdown;