import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Image from 'next/image';
import { motion, AnimatePresence, } from "framer-motion";

const imgWrapVariant = {
  open: { 
    height: "auto",
    transition: { 
      duration: .5,
      delay:.3
    } ,
  },
  closed: {
    height: "100px",
    transition: { 
     duration: .5,
    } 
  },
  initial: {
    height: "100px",
  },
}


const slideVariant = {
  initial: {
    // x: "150%",
    y: "-150%",
    skewY: 25,
  },
  open: { 
    // x: 0,
    y: 0,
    skewY: 0 ,
    transition: { 
      duration: .5,

    }, 

  },
  closed: {
    // x: "150%",
    y: "-150%",
    skewY: 25
   },

}

export default function AgendaElement({ item, activeExpand, expandIndex }) {
  const { title, title_zh, cover, start_date, end_date, type} = item;
  const [isexpand, setExpand] = useState(false);

  useEffect(() => {
    if ( activeExpand === expandIndex ) setExpand(true);
    else setExpand(false);
  },[activeExpand])


  return (
      <>
          <StyledImgContainer 
            isexpand={isexpand} 
            as={motion.div}
            variants={imgWrapVariant}
            animate={isexpand ? "open" : "closed"}
            initial="initial"
            >
            { cover && 
              <Image 
                alt="" 
                width="100%"
                height="100%"
                src={ cover }
                layout="responsive"
                crossOrigin="true"
                // loading="eager"
                // style={{objectFit: "cover", maxHeight: 300 }}
              />}
          </StyledImgContainer>
          
          <StyledSlide as={motion.div} variants={slideVariant} animate={isexpand ? "open" : "closed" }> </StyledSlide>

          <div>
            <StyledSm className="zh">{type} </StyledSm>
            <StyledTitle className="en">{title} </StyledTitle>
            <div className="zh">{title_zh} </div>
            <div className="zh">{start_date}-{end_date} </div>
          </div>
      </>
    )
  }


  const StyledImgContainer = styled(motion.div)`
    position: relative;  
    width: min(300px, 100%);
    // height: ${({ isexpand }) => isexpand ? '300px' : '100px'};

    background-color: #000;
    margin: 10px 0 10px 0;

    overflow: hidden;
  `;

const StyledSm = styled.div`
   color: #00000090;
`
const StyledTitle = styled.div`
   line-height: 1.4rem;
`
const StyledSlide = styled(motion.div)`
   position: absolute;
   top: 0;
   margin:10px;
   height:100%;
   width:100%;
   max-width:310px;
   background-color: rgba(250, 170, 50,1) ;
   z-index: -1;
   `
