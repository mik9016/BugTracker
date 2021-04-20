import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import classes from "./SetTeamUserRole.module.scss";
import useGetTeamData from "../../Hooks/useGetTeamData";
import { DbContext } from "../../contexts/DbContext";
import { TeamContext } from "../../contexts/TeamContext";
import { useHistory } from "react-router-dom";




export default function SetTeamUserRole(props) {
  const history = useHistory();
  const [showMembers, setShowMembers] = useState(false);
  const [flag, setFlag] = useState(false);
  const teamMembers = useGetTeamData(flag);


  const dbContextContent = useContext(DbContext);
  // console.log(teamMembers);
  const teamContextContent = useContext(TeamContext);
  

  return (
    <div className={classes.SetTeamUserRole}>
      <Container>
        <Card className={classes.Card}>
          <Card.Title
            className={classes.Title}
            onClick={() => {
              !showMembers ? setShowMembers(true) : setShowMembers(false);
            }}
          >
            Team Members:
          </Card.Title>
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              {teamMembers.map((member, index) => {
                if (member.project === dbContextContent.currentProject)
                  return (
                    <tbody key={index}>
                      <tr >
                        <td
                          onClick={() => {
                            history.push("/memberDetails");
                            teamContextContent.setMemberMail(
                              member.memberEmail
                            );
                            teamContextContent.setMemberId(member.id);
                            teamContextContent.setMembersRole(
                              member.memberRole
                            );
                          }}
                          className={classes.MemberName}
                        >
                          {member.memberEmail}
                        </td>
                        <td>{member.memberRole}</td>

                        <td>
                          <Button
                            variant="danger"
                           
                            disabled={!teamContextContent.loggedUserisManager}
                            onClick={() => {
                              teamContextContent.deleteTeamMember(member.id);

                              setFlag(!flag);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
              })}
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
