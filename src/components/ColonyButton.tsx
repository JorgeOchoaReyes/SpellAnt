import React from 'react'
import {Box, Input, Flex, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger} from '@chakra-ui/react'
import {FiRotateCw} from 'react-icons/fi'

interface ColonyButtonProps {
    chars: string[],
    words: string[], 
    found: string[], 
    foundUpdate: (word: string) => void,
    scoreUpdate: (addToScore: number) => void
}


export const ColonyButton: React.FC<ColonyButtonProps> = ({chars, words, foundUpdate, found, scoreUpdate}) => {
    const [input, setInput] = React.useState("")
    const [openDelete, setOpenDelete] = React.useState(false); 
    const [openEnter, setOpenEnter]  = React.useState(false); 
    const [enterError, setEnterError] = React.useState(0); 
    const [char, setChar] = React.useState(chars); 

    const handleEnter = () => {
        if(input.length == 0) {
            setEnterError(2);
            setOpenEnter(true); 
            return; 
        }
        if(input.length < 4) {
            setEnterError(3);
            setOpenEnter(true); 
            return; 
        }
        if(!input.includes(char[0])) {
            setEnterError(1);
            setOpenEnter(true); 
            return;
        }
        if(!words.includes(input)) {
            setEnterError(0);
            setOpenEnter(true); 
            return;
        } 
        else if (found.includes(input)) {
            setEnterError(4);
            setOpenEnter(true); 
            return;
        }
        else {
            foundUpdate(input); 
            setInput(""); 
            scoreUpdate(1); 
            return; 
        }//sucess
    }

    const handleDelete = () => {
        if(input.length == 0) {
            setOpenDelete(true);
            return; 
        }
        setInput(input.substring(0, input.length - 1))
    }

    const handleShuffle = () => {
        let m = char[0];

        let temp = char;  
        temp[0] = temp[6]; 
        temp[6] = m; 
        temp.pop(); 

        temp.sort(() => Math.random() - 0.5);

        temp.push(m); 
        temp[6] = temp[0];
        temp[0] = m; 

        console.log(temp); 
        setChar([...temp]); 
    }

    const handleSelect = (char: string) => {
        if(char.length == 0) return; 
        setInput(input.concat(char));
    }

    const selectError = (type: Number) => {
        switch (type){
            case 0:
                return <> 
                    <PopoverHeader textColor="black"> Word is not in list </PopoverHeader>
                    <PopoverBody textColor="black"> This word is not in the word list.  </PopoverBody>
                </>

            case 1: 
                return <>
                    <PopoverHeader textColor="black"> Word must include middle letter.  </PopoverHeader>
                    <PopoverBody textColor="black"> The word you typed does not include the middle letter. </PopoverBody>
                </>
            
            case 2: 
                return <>
                    <PopoverHeader textColor="black"> You havent typed anything!  </PopoverHeader>
                    <PopoverBody textColor="black"> Select words to check! </PopoverBody>
                </>

            case 3: 
            return <>
                <PopoverHeader textColor="black"> Word is too short!  </PopoverHeader>
                <PopoverBody textColor="black"> Word must be at least 4 characters long </PopoverBody>
            </>

            case 4: 
            return <>

                <PopoverHeader textColor="black"> Word Already found! </PopoverHeader>
                <PopoverBody textColor="black"> You already found this word! </PopoverBody>
            </>
        }
    }
    
    return (
        <Flex flexDirection='column'>
            <Box>
                <Input style={{animation: openEnter ? 'shake 0.5s' : '', animationIterationCount: openEnter ? 1 : 0}} variant='filled' bg='white' fontSize={{base:24}} isReadOnly value={input} textColor="black" />
            </Box>
            <div className="buttons">
                <Box as="button"   id="00" onClick={ () => handleSelect(char[3])}
                    transform='scale(1.1)' 
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                    }}>
                    <span className="blue"><i>{char[3]}</i></span>
                </Box>

                <Box as="button"   id="01" onClick={ () => handleSelect(char[1])}
                    transform='scale(1.1)'     
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                    }}>
                    <span className="blue"><i>{char[1]}</i></span>
                </Box>
                    <br />
                <Box as="button"   id="02" onClick={ () => handleSelect(char[2])}
                    transform='scale(1.1)' 
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                }}>
                    <span className="blue"><i>{char[2]}</i></span>
                </Box>
                <Box as="button"   id="03"  onClick={ () => handleSelect(char[0])}
                    transform='scale(1.1)' 
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                }}>
                    <span className="red"><i>{char[0]}</i></span>
                </Box>
                <Box as="button"   id="04" onClick={ () => handleSelect(char[4])}
                    transform='scale(1.1)' 
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                }}>
                    <span className="blue"><i>{char[4]}</i></span>
                </Box>

                    <br />
                <Box as="button"   id="05" onClick={ () => handleSelect(char[5])}
                    transform='scale(1.1)'     
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                }}>
                    <span className="blue"><i>{char[5]}</i></span>
                </Box>
                <Box as="button"   id="06" onClick={ () => handleSelect(char[6])}
                    transform='scale(1.1)'     
                    transition='all 0.1s cubic-bezier(.08,.52,.52,1)'
                    _active={{
                      transform: 'scale(0.8)',
                }}>
                    <span className="blue"><i>{char[6]}</i></span>
                </Box>
                    <br />
            </div>

            <ButtonGroup variant='outline' spacing='6'>
                <Popover        
                     isOpen={openDelete}
                     onClose={() => setOpenDelete(!openDelete)}
                    variant='white'
                >
                  <PopoverTrigger>
                    <Button onClick={() => handleDelete()} bg='red' > Delete </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader textColor="black">Can not delete nothing! </PopoverHeader>
                    <PopoverBody textColor="black">Type something first to delete words! </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Button onClick={() => handleShuffle()} textColor='black' bg="yellow"> <FiRotateCw /> </Button>

                <Popover        
                     isOpen={openEnter}
                     onClose={() => setOpenEnter(!openEnter)}
                >
                  <PopoverTrigger>
                    <Button bg="green" onClick={() => handleEnter()}> Enter </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    {
                        selectError(enterError)
                    }
                  </PopoverContent>
                </Popover>
            </ButtonGroup>
        </Flex>

    );
}

