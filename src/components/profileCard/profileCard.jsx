import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from "react-redux";

function ProfileCard(props) {
  const data = useSelector(state => state?.userReducer?.user);

  return (
    <Card sx={{ minWidth: 275, backgroundColor: props.background }}>
      <CardContent>
        { props.emoji }
        <h1>Hello</h1>
        <div>{ data?.owner?.login ?? 'none' }</div>
        <div>{ data?.owner?.login ?? 'none' }</div>
        <div>{ data?.owner?.login ?? 'none' }</div>
        <div>{ data?.owner?.login ?? 'none' }</div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;