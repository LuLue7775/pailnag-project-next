import { useEffect, useState } from 'react'
import { containerRightMotion, BGMotion, containerTextMotion } from '../utils/framerVariants'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LineSVGFull } from './Svgs'

export default function AboutRightElement({ credits, createMarkup }) {
  const [isHovered, setHovered] = useState(false)

  // calculate scroll height
  const [scrollHeight, setScrollHeight] = useState()
  useEffect(() => {
    setScrollHeight(document.getElementById('mid').scrollHeight)
  }, [])

  return (
    <StyledRightColContainer
      className="leftcol-container"
      id="right"
      as={motion.div}
      variants={containerRightMotion}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $isHovered={isHovered}
    >
      <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />

      {credits?.map((elem, i) => (
        <StyledElementContainer
          className="element-container"
          key={i}
          as={motion.div}
          variants={containerTextMotion}
        >
          <LineSVGFull />
          <StyledTitle> {elem?.title} </StyledTitle>
          <StyledElement dangerouslySetInnerHTML={ elem?.content && createMarkup(elem?.content)} /> 

        </StyledElementContainer>
      )) || ''}
    </StyledRightColContainer>
  )
}
const MotionBG = styled(motion.div)`
  position: absolute;
  // height: ${({ scrollHeight }) => scrollHeight && `${scrollHeight}px`};
  height: auto;
  z-index: -1;
  width: 100%;
`

const StyledRightColContainer = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: 30%;
  overflow-y: scroll;
  padding-bottom: 100px;
  ${({ $isHovered }) => $isHovered && "background-image: url('/about.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledElementContainer = styled(motion.div)``

const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px 0;
`
const StyledElement = styled.div`
  padding: 20px 10px;
  
`
