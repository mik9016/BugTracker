import React from "react";
import classes from "./Issue.module.scss";

export default function Issue(props) {
  const hardcodedIssue = {
    date: "22.01.2021",
    title: "Fixing Issue scss responsiveness",
    status: "open",
    openSince: "22h",
    author: "Mik Gru",
    responsible: "Mikolaj",
  };
  return (
    <tr>
      <td>{props.key}</td>
      <td>{hardcodedIssue.date}</td>
      <td>{hardcodedIssue.title}</td>
      <td>{hardcodedIssue.status}</td>
      <td>{hardcodedIssue.openSince}</td>
      <td>{hardcodedIssue.author}</td>
      <td>{hardcodedIssue.responsible}</td>
    </tr>
  );
}
