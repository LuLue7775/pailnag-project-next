
export const containerLeftMotion = {
    rest: { x:"0", zIndex:0,  },
    hover: {
        x:"10%", 
        scale:1.1, 
        transition: { duration: 1 }, 
        zIndex:10,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }
    },
    
}

export const containerTextMotion = {
    rest: { color: '#000'  },
    hover: {
        color: '#FFF',
        backgroundColor:'#00000040',
        padding: '100px 10px',

        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }
    },
}

export const containerMidMotion = {
    rest: { x:"0", zIndex:0,  },
    hover: {
        scale:1.1, 
        transition: { duration: 1 }, zIndex:10,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }
    },
}
export const containerRightMotion = {
    rest: { x:"0", zIndex:0,  },
    hover: {
        // right:0,
        scale:1.1, 
        // width:"50%",
        transition: { duration: 1 }, zIndex:10,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }
    },
}

export const BGMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
      opacity: 1,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeIn"
      }
    }
  };
  