import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import Picker from 'emoji-picker-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import ProfileCard from '../profileCard/profileCard';

import { fetchUserDataAction } from '../../app/actions';

function Main() {
  const [name, setName] = useState('');
  const [repo, setRepo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [color, setColor] = useState('#fff');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [colorState, setColorState] = React.useState(null);
  const openColorMenu = Boolean(colorState);

  const handleClickColorPicker = (event) => {
    setColorState(event.currentTarget);
  };
  const handleCloseColorPicker = () => {
    setColorState(null);
  };

  const [emojiState, setEmojiState] = React.useState(null);
  const openEmojiMenu = Boolean(emojiState);

  const handleClickEmojiPicker = (event) => {
    setEmojiState(event.currentTarget);
  };
  const handleCloseEmojiPicker = () => {
    setEmojiState(null);
  };


  const dispatch = useDispatch();


  function handleChangeName(value) {
    setName(value);
  }

  function handleChangeRepo(value) {
    setRepo(value);
  }

  function handleClick() {
    dispatch(fetchUserDataAction({name, repo}));
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  function handleChangeComplete(color) {
    setColor(color.hex);
    console.log(color.hex);
  }

  const ErrorMessage = isError 
    ? ( <p style={{'color': 'red'}}>Error!!!</p> )
    : null;

  return (
    <div className="main">
      <div className="main-wrapper">
        <TextField id="outlined-basic" label="Enter github nickname" variant="outlined" value={ name } onChange={ (e) => handleChangeName(e.target.value) } />
        <TextField id="outlined-basic" label="Enter name of repo" variant="outlined" value={ repo } onChange={ (e) => handleChangeRepo(e.target.value) } />
        { ErrorMessage }
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={openColorMenu ? 'true' : undefined}
          onClick={handleClickColorPicker}
        >
          {color}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={colorState}
          open={openColorMenu}
          onClose={handleCloseColorPicker}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseColorPicker}><SketchPicker color={ color } onChangeComplete={ handleChangeComplete } /></MenuItem>
        </Menu>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={openEmojiMenu ? 'true' : undefined}
          onClick={handleClickEmojiPicker}
        >
          {chosenEmoji ? chosenEmoji.emoji : 'Icon'}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={emojiState}
          open={openEmojiMenu}
          onClose={handleCloseEmojiPicker}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseEmojiPicker}><Picker onEmojiClick={onEmojiClick} /></MenuItem>
        </Menu>
      </div>
      <Button variant="contained" color="primary" onClick={ handleClick } disabled={ !name || !repo }>{ isLoading ? 'Loading' : 'Generate!' }</Button>
      <ProfileCard background={color} emoji={chosenEmoji ? chosenEmoji.emoji : null} />
    </div>
  );
}

export default Main;