import React from 'react'
import './errorImages.css'
import errorImage from '../../pages/Images/errorImageExample.jpg'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

export default function ErrorImage() {
    return (
        <div>
            <div className='slideShowContainer'>
                <Fade>
                    <div className="each-fade">
                        <img src={errorImage} />
                    </div>
                    <div className="each-fade">
                        <img src={errorImage} />
                    </div>
                    <div className="each-fade">
                        <img src={errorImage} />
                    </div>
                </Fade>
            </div>
            <h3>Errors</h3>
          
        </div>
      );
    }
