import React from 'react';
import '../Css/style.css';

const onCardAction = (taskId, column, callbackFn) => {
    return () => {
        callbackFn(taskId, column);
    };
}

const renderButton = (taskId, column, btnText, callbackFn) => {
    if (btnText && callbackFn) {
        return (
            <div className="m-2">
                <button
                    className="btn btn-outline-primary"
                    onClick={onCardAction(taskId, column, callbackFn)}>
                    { btnText }
                </button>
            </div>
        );
    } 
    else {
        return <span />;
    }
}

const Card = props => {
    return (
        <div className="behind">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        { props.title }
                    </h4>
                    <div className="card-text">
                        <div>ID: { props.id }</div>
                        <div>Type: { props.type }</div>
                        { renderButton(props.id, props.column, props.prevTxt, props.onPrevClick) }
                        { renderButton(props.id, props.column, props.nextTxt, props.onNextClick) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;