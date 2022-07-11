import { useState, useLayoutEffect, useEffect, useRef, useContext } from 'react'
import { fetchData, slideTo } from '../utils/functions'
import styled from "styled-components";
import { motion, useSpring } from "framer-motion";
import ModalStart from '../components/ModalStart';

import Image from 'next/image';
import ArticlesHeader from '../components/ArticlesHeader';
import JournalContent from '../components/JournalContent';
import Cursor from '../components/Cursor';
import { getRelativeCoordinates } from '../utils/functions';
import { CursorContext } from '../context/cursorContext';

const coverVariant = {
  initial: {
    x: 0,
  },
  open: { 
    x: 0,
    transition: { 
      duration: .5
    }, 
  },
  closed: {
    x:"-100%",
    transition: { 
      duration: 1.8,
      delay: 1,
      ease: [0.8, 0.01, -0.05, 0.95],
    }, 
   }
}

const modalVariant = {
  initial: {
    opacity: 1,
  },
  open: { 
    opacity: 1,
    transition: { 
      duration: .5,
    }, 
  },
  closed: {
    opacity: 0,
    transition: { 
      duration: 1,
    }, 
   }
}

export default function Home({ modalData,  randomArticleData}) {

  // Cursor efffect
  const cursorAreaRef = useRef()
  const [mousePosition, setMousePosition] = useState({})
  const { hoverEvent, setHoverEvent } =  useContext(CursorContext)

  const handleMouseMove = e => {
    setMousePosition(getRelativeCoordinates(e, cursorAreaRef.current));
  };

  // Modal effect
  const [modalShow, setModalShow] = useState(true); 

  // Chevron effect
  const spring = useSpring(0, { damping: 100, stiffness: 1000 });
  useLayoutEffect(() => {
    spring.onChange(latest => {
      window.scrollTo(0, latest);
    });
  }, [spring]);

  // Scroll to top on refresh 
  useEffect(() => {
    function handleRefresh() {
      window.scrollTo( 0, 0 )
    }
    window.addEventListener("beforeunload", handleRefresh);
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, [])

  

  return (
    <StyledContainer 
      className='home-container'
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}
      onMouseMove={e => handleMouseMove(e)}
      animate={{
        rotateX: mousePosition.centerX * 20,
        rotateY: mousePosition.centerY * 20
      }}
    >
        <Cursor mousePosition={mousePosition} hoverEvent={hoverEvent} />

        <StyledCover 
          as={motion.div}
          variants={coverVariant}
          animate={modalShow ? "open" : "closed"}
          initial="initial"
        >
            <Image 
              src="/homeBG.jpg" 
              alt="gradient" 
              height="100vh"
              width="100vw"
              layout="responsive"
            />

            <motion.div
                variants={modalVariant}
                animate={modalShow ? "open" : "closed"}
            >
              {modalData && <ModalStart setModalShow={setModalShow} modalData={modalData}/>}
            </motion.div>
        </StyledCover>

        <ArticlesHeader data={randomArticleData} slideTo={slideTo} spring={spring} />
        <JournalContent data={randomArticleData} spring={spring} />
        
    </StyledContainer>

  )
}


export async function getStaticProps() {  
  const modalData = await fetchData('/modal').catch((e) => console.log(e))
  const randomArticleData = await fetchData('/random-article?type=journal').catch((e) => console.log(e))

  return {
    props: {
      modalData: modalData?.data || {},
      randomArticleData: randomArticleData?.data || {}
    }, 
    revalidate: 60    
  }
}

const StyledContainer = styled(motion.div)`
  height: 200vh;
  width: 100%;
  overflow: hidden;

  perspective: 600; 
`
const StyledCover = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  
`