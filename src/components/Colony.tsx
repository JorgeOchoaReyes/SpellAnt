import React, { useEffect } from 'react'
import { 
    Box, 
    Flex, 
    SlideFade, 
    Text, Heading,
    VStack, SliderFilledTrack, 
    Slider, SliderMark, SliderThumb, 
    SliderTrack, Center, CircularProgress, 
    Button, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import {ColonyButton} from './ColonyButton'; 
import { animationDelay } from '../Util/constants';
import {BiArrowFromTop} from 'react-icons/bi'; 
import { useGetDailyQuery } from '../../server/generated/graphql';


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
        !showText ? setH('350px') : setH('35'); 
    }

    return (
        <VStack 
            w="full" 
            h="full" 
            p="10"  
            justifyContent='space-around'
            alignItems='center' >
            <SlideFade delay={animationDelay} in={true} offsetX='100px'>
                <Flex transition=".5s" border={"2px"} h={h} w="350px" flexDirection='column' bg="#f1f1f1" textColor="black" borderRadius="10px"  >
                    <Flex align='center' flexDirection='row' justifyContent='space-around' borderBottom={showText ? "1px" : '0px'} >
                        <Heading fontWeight='bolder' > {showText ? "Words Found" : (found.length == 0 ? <Text fontSize={20}> find words.... </Text> : <Text fontSize={20}> {found[found.length - 1]} {found[found.length - 2]} {found[found.length - 3]} </Text> ) }   </Heading>
                        <Box> 
                            <BiArrowFromTop style={{transform: showText ? "rotate(0deg)" : "rotate(180deg)"}} size={30} onClick={() => handleArrow()} />
                        </Box>
                    </Flex>

                    <VStack display={showText ? "flex" : "none"} textColor='black'>
                        <div style={{alignContent: 'center'}}>
                        {found.map((t) => {
                            return <>
                                {" "} <a style={{textDecoration: 'underline'}} target="_blank" rel="noopener noreferrer" href={`https://www.dictionary.com/browse/${t}` } key={t} >{t}</a> {" "}
                            </>
                        }) }
                        </div>
                    </VStack>
                
                </Flex>
            </SlideFade>
                           
        </VStack>
    )
}

const FinishModal = ({onClose, isOpen}) => {
    return <Box>

        <Modal variant='black' blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay textColor="black" />
          <ModalContent textColor="black">
            <ModalHeader textColor="black">Nice</ModalHeader>
            <ModalCloseButton />
            <ModalBody textColor="black">
              <Text textColor="black"> You found all the words for today! Come back tomorrow for more word finding. </Text>
              <br />
              <Text textColor="black"> If you enjoy the game consider donating :{')'}. It would be greatly appreciated!</Text>
              <br />
              <Text textColor="black" > For now you can reset the game or wait till tomorrow for new words. </Text>
            </ModalBody>

            <ModalFooter>
              <Button textColor="black" colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  </Box>
}


export const Colony: React.FC<ColonyProps> = ({}) => {
    const [{data, fetching}] = useGetDailyQuery();
    const [found, setFound] = React.useState([]); 
    const [score, setScore] = React.useState(0); 
    const {isOpen, onOpen, onClose } = useDisclosure();


    const resetSet = () => {
        setScore(0);
        setFound([]); 
    }

    const foundUpdate = (word: string) => {
        found.push(word); 
        setFound([...found])
    }

    const scoreUpdate = (addToScore: number) => {
        let newScore = Math.round(((found.length+1)/data.daily.wordPool.length) * 100);
        setScore(newScore); 
        if(newScore > 95) {
            onOpen(); 
        }
    }

    if(fetching) {
        return <Center h="100vh" textColor='black' fontSize='xl'> <CircularProgress m='auto' isIndeterminate color='green.300' />  </Center>
    }

    if(!fetching && !data) {
        return <Center h="100vh" textColor='black' fontSize='xl'> Error 404: No Data Was Fetched. :{'('} Try again. </Center>
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
                        
            {
                score >= 95 ? <> <Button bg='red' onClick={() => resetSet()}> Reset </Button> </>: null
            }

            <Flex h={{base: "fit", sm: "90vh", xl: '80vh'}} paddingBottom={20} align='center'  direction={{base: "column-reverse", md: "row"}}>
                    <LeftContent  characters={data.daily.hexChars} words={data.daily.wordPool} foundUpdate={foundUpdate} found={found} scoreUpdate={scoreUpdate} /> 
                    <RightContent found={found} /> 
            </Flex> 
            <FinishModal isOpen={isOpen} onClose={onClose}  /> 

            {/* <Button onClick={() => scoreUpdate(99)} />
            <Button onClick={() => setScore(0)} />
            <Button onClick={() => onOpen()}>open modal </Button>  */}
        </>
    );
}