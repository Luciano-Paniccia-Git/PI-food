import { Link } from 'react-router-dom'
import styled from './Landing.module.css';
import linkedin from "../multimedia/linkedin (1).png";
import github from "../multimedia/github (1).png";

export default function Landing() {
    return (
        <div className={styled.landingContainer}>
            <Link to='/home'>
                <button className={styled.landingButton}>Let's Cook</button>
            </Link>
            
        <div className={styled.links}>
            <div className={styled.mini_box}>
                <a href="https://www.linkedin.com/in/luciano-paniccia-847868232/" target="_blank" rel="noreferrer">
                    <img src={linkedin} alt='linkedin'></img>
                        </a>
        </div>
            <div className={styled.mini_box}>
                <a href='https://github.com/Luciano-Paniccia-Git' target="_blank" rel="noreferrer">
                    <img src={github} alt='GitHub' />
                        </a>
            </div>
            </div>
            </div>
        
    )
}