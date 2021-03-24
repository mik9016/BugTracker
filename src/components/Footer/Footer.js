import React from 'react'
import classes from './Footer.module.scss';
import Bug from '../../assets/bug.png';

export default function Footer() {
    return (
        <div>
            <footer className={classes.Footer}>
                <img src={Bug}/>
            </footer>
        </div>
    )
}
