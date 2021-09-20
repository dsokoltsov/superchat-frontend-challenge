import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SketchPicker } from 'react-color';
import Picker from 'emoji-picker-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import generateId from "../../utilities/generateId";


import { fetchUserDataAction, setEmojiAction, setColorAction } from '../../app/actions';

function Main() {
  const [name, setName] = useState('');
  const [repo, setRepo] = useState('');
  const isLoading = useSelector(state => state?.userReducer?.isLoading);
  const isError = useSelector(state => state?.userReducer?.isError);
  const [color, setColor] = useState('#fff');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [colorState, setColorState] = useState(null);
  const openColorMenu = Boolean(colorState);
  const dataUser = useSelector(state => state?.userReducer?.user);

  const handleClickColorPicker = (event) => {
    setColorState(event.currentTarget);
  };
  const handleCloseColorPicker = () => {
    setColorState(null);
  };

  const [emojiState, setEmojiState] = useState(null);
  const openEmojiMenu = Boolean(emojiState);

  const handleClickEmojiPicker = (event) => {
    setEmojiState(event.currentTarget);
  };
  const handleCloseEmojiPicker = () => {
    setEmojiState(null);
  };


  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    if(Object.keys(dataUser).length)
      push(`/r/${generateId(6)}`);
  }, [dataUser, push]);

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
    dispatch(setEmojiAction(emojiObject));
  };

  function handleChangeComplete(color) {
    setColor(color.hex);
    dispatch(setColorAction(color.hex));
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
          <MenuItem><SketchPicker color={ color } onChangeComplete={ handleChangeComplete } /></MenuItem>
          <Button
            onClick={handleCloseColorPicker}
          > Close </Button>
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
          <MenuItem><Picker onEmojiClick={onEmojiClick} /></MenuItem>
          <Button
            onClick={handleCloseEmojiPicker}
          > Close </Button>
        </Menu>
      </div>
      <Button variant="contained" color="primary" onClick={ handleClick } disabled={ !name || !repo }>{ isLoading ? 'Loading' : 'Generate!' }</Button>
    </div>
  );
}

export default Main;