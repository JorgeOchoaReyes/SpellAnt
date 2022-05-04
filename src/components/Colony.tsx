import React from 'react'
import { Box, Flex, SlideFade, Text, Heading, VStack, SliderFilledTrack, Slider, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import {ColonyButton} from './ColonyButton'; 
import { animationDelay } from '../Util/constants';
import {BiArrowFromTop} from 'react-icons/bi'; 


interface ColonyProps {

}

interface RightContent {
    found: string[]
}


const LeftContent = ({characters, words, foundUpdate, found, scoreUpdate}) => {

    return (
            <VStack 
                w="full" 
                h="full" 
                p="10"  
                justifyContent='space-around'
                >
                <SlideFade delay={animationDelay} in={true} offsetX='-100px'>
                    <Box textColor='white'>
                        <ColonyButton chars={characters} words={words} foundUpdate={foundUpdate} found={found} scoreUpdate={scoreUpdate} /> 
                    </Box>
                </SlideFade>
            </VStack>
    )
}

const RightContent: React.FC<RightContent> = ({found}) => {
    const [showText, setShowText] = React.useState(true); 
    const [h, setH] = React.useState('350px')
    const handleArrow = () => {
        setShowText(!showText); 
        !showText ? setH('350px') : setH('45'); 
    }

    return (
        <VStack 
            w="full" 
            h="full" 
            p="10"  
            justifyContent='space-around'
            alignItems='center' >
            <SlideFade delay={animationDelay} in={true} offsetX='100px'>
                <Flex transition="1s" border="2px" h={h} w="350px" flexDirection='column' bg="#f1f1f1" textColor="black" borderRadius="10px"  >
                    <Flex align='center' flexDirection='row' justifyContent='space-around' borderBottom='1px' >
                        <Heading fontWeight='bolder' > Words Found  </Heading>
                        <Box> 
                            <BiArrowFromTop style={{transform: showText ? "rotate(0deg)" : "rotate(180deg)"}} size={30} onClick={() => handleArrow()} />
                        </Box>
                    </Flex>

                    <VStack display={showText ? "flex" : "none"} textColor='black'>
                        {found.map((t) => {
                            return <Text key={t} > {t} </Text>
                        }) }
                    </VStack>
                
                </Flex>
            </SlideFade>
                           
        </VStack>
    )
}


export const Colony: React.FC<ColonyProps> = ({}) => {
    const [words, setWords] = React.useState(['anbc', "bcad", "cdea", "abcd", "dca"]);
    const [chars, setChars] = React.useState(['a', 'b', 'c', 'd', 'e', 'f', 'g']); 
    const [found, setFound] = React.useState(["asd"]); 
    const [score, setScore] = React.useState(0); 



    const foundUpdate = (word: string) => {
        found.push(word); 
        setFound([...found])
    }

    const scoreUpdate = (addToScore: number) => {
        setScore(((score+addToScore)/words.length) * 100); 
    }

    return (
        <>
            <Flex align="center" justifyContent='center' flexDirection='column' >
                <Box  w="50%" >
                    <Slider justifyContent='space-around' aria-label='slider-ex-6' value={score} isReadOnly >
                        <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                          25%
                        </SliderMark>
                        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                          50%
                        </SliderMark>
                        <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                          75%
                        </SliderMark>
                        <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
                          100%
                        </SliderMark>
                        <SliderMark
                          value={score}
                          textAlign='center'
                          color='white'
                          mt='-10'
                          ml='-5'
                          w='12'
                          bg="#4490C1"
                        >
                          {score}%
                        </SliderMark>
                        <SliderTrack  bg='red.100'>
                          <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb  />

                    </Slider>
                </Box>
            </Flex>

            <Flex h={{base: "auto", sm: "90vh", xl: '80vh'}} direction={{base: "column-reverse", md: "row"}}>
                <LeftContent  characters={chars} words={words} foundUpdate={foundUpdate} found={found} scoreUpdate={scoreUpdate} /> 
                <RightContent found={found} />     
            </Flex> 
        </>
    );
}