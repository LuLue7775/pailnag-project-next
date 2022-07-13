import React, { useRef } from 'react'
import NodeBoxAndSVG from './NodeBoxAndSVG';
import { motion } from "framer-motion";
import styled from "styled-components";

export default function NodesContainer({ data }) {

    const nodeRefs = useRef([]);
    const pathRefs = useRef([]);
    const nodePosRefs = useRef([]);

  return (
    <StyledNodeContainer id="section2" as={motion.div} element_amount={data?.nodes?.length}>
    {
        data?.nodes?.map((elementData, node_i) =>  
            <NodeBoxAndSVG
                key={`box${elementData?.id}` }
                allElementsData={data?.nodes} 
                elementData={elementData} 
                node_i={node_i}
                nodeRefs={nodeRefs} 
                pathRefs={pathRefs} 
                nodePosRefs={nodePosRefs}
            />
        )
    }
    </StyledNodeContainer>
  )
}


const StyledNodeContainer = styled(motion.div)`
    position: relative;
    width:100%;
    height:100vh;
    overflow-y:scroll;
`;
