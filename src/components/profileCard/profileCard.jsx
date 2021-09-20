import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from "react-redux";
import GitHubButton from 'react-github-btn'

import { requestUserDataSuccess, setEmojiAction, setColorAction } from '../../app/actions';

import './profileCard.css';

function ProfileCard(props) {
  let dataUser = useSelector(state => state?.userReducer?.user);
  let dataCard = useSelector(state => state?.cardReducer?.card);
  
  const [menuState, setMenuState] = useState(null);
  const openColorMenu = Boolean(menuState);

  const handleClickColorPicker = (event) => {
    setMenuState(event.currentTarget);
  };
  const handleCloseColorPicker = () => {
    setMenuState(null);
  };
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(dataUser && Object.keys(dataUser).length) localStorage.setItem('card', JSON.stringify(dataCard));
    const localDataUser = JSON.parse(localStorage.getItem('user'));
    const localDataCard = JSON.parse(localStorage.getItem('card'));

    if(!dataUser || !Object.keys(dataUser).length) {
      if(!localDataUser || !Object.keys(localDataUser).length)
        push('/')
      else {
        if(localDataCard && Object.keys(localDataCard).length) {
          dispatch(setEmojiAction(localDataCard.emoji));
          dispatch(setColorAction(localDataCard.color));
        }
        dispatch(requestUserDataSuccess(localDataUser));
      }
    }
  }, [push, dataUser, dataCard, dispatch]);

  const contributors = dataUser?.contributors
    ? dataUser?.contributors.slice(0, 10).map((item) => {return {login: item.login, id: item.id};})
    : [];

  return (
    <Card sx={{ minWidth: 275, backgroundColor: dataCard.color, margin: '120px auto 0', maxWidth: 512, position: 'relative' }}>
      <CardContent>
        <span className="card__line">{ dataCard?.emoji?.emoji }</span><br/>
        <span className="card__line">Login: { dataUser?.owner?.login ?? 'none' }</span><br/>
        <span className="card__line">Repo: { dataUser?.name ?? 'none' }</span><br/>
        <span className="card__line">Description: { dataUser?.description ?? 'none' }</span><br/>
        <span className="card__line">Stars: { dataUser?.stargazers_count ?? 'none' }</span><br/>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={openColorMenu ? 'true' : undefined}
          onClick={handleClickColorPicker}
        >
          TOP 10 Contributors
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={menuState}
          open={openColorMenu}
          onClose={handleCloseColorPicker}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          { contributors.map((item) => 
            <MenuItem key={ item.id }>{ item.login }</MenuItem>
          ) }
        </Menu>
        <div className="card__star-button">
          <GitHubButton href={`https://github.com/${dataUser?.full_name}`} data-icon="octicon-star" aria-label={`Star ${dataUser?.full_name} on GitHub`}>Star</GitHubButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;