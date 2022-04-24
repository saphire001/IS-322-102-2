import React from 'react';

class Page extends React.Component{
    isActiveTab(tabName){
        return (tabName === this.props.currentView) ? 'nav-link active' : 'nav-link';
    }

    onTabClick(event, tabName) {
        event.preventDefault();
        this.props.onViewChange(tabName);
    }

    render(){
        return(
            <ul className='nav'>
                <li className='nav-item'>
                <a className={this.isActiveTab('grid')}onClick={(e) => this.onTabClick(e, 'grid')}>
                    Grid View
                </a>
                </li>
                <li className='nav-item'>
                <a className={this.isActiveTab('add')}onClick={(e) => this.onTabClick(e, 'add')}>
                    Add Task
                </a>
                </li>
            </ul>
        )
    }
};

export default Page;