import React,{useState} from 'react';
import {Container,Form} from 'react-bootstrap';
import classes from './SortDropDown.module.scss';


export default function SortDropdown(props) {
    const [ticketValue,setTicketValue] = useState('');
    return (

        <div >
            <Container>
                <Form.Group>
                    <Form.Control className={classes.SortDropdown} as="select" onChange={(e)=>{setTicketValue(e.target.value)}}>
                        <option>choose..</option>
                        <option>Pending</option>
                        <option>Open</option>
                        <option>Done</option>
                    </Form.Control>
                </Form.Group>
            </Container>

        </div>
    )
}
