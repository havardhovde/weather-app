import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai'
import './InfoModal.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function InfoModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper} id='modal'>
      <h2 id="modal-title">Simple React weather app</h2>
      <p className='modal-info-1'>
        Weather app that uses either geolocation or the searched location to display the current weather.
      </p>
      <p className='modal-info-1'>
        In some cases, adding a country code to the search can give better results, for example "Bø, NO".
      </p>
      <div className='modal-info-2'>
        Weather data provided by the  <a target='#' href="https://openweathermap.org/api">OpenWeatherMap API.</a> Icons provided by <a target='#' href="https://hjelp.yr.no/hc/en-us/articles/203786121-Weather-symbols-on-Yr">Yr.no (NRK).</a> Check out the source code on  <a target='#' href="https://github.com/havardhovde/weather-app">Github.</a> 
      </div>
      <button id='close-modal-button' type="button" onClick={handleClose}>
        <AiOutlineClose size={24} />
      </button>
    </div>
  );

  return (
    <div>
      <button id='open-modal-button' type="button" onClick={handleOpen}>
        <AiOutlineInfoCircle size={24}/>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}