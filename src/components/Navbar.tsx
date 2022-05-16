import { Box, Text, Button, Image, Stack, Link, Flex, Menu, MenuButton, MenuList} from '@chakra-ui/react';
import React, {useState} from 'react';
import { lightThemeGrad } from '../Util/constants';
import {GiHamburgerMenu, GiAnt} from 'react-icons/gi';
import {GrClose, GrFormNextLink} from 'react-icons/gr';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Calendar from 'react-calendar';

interface NavbarProps {

}



const Logo = (props) => {
    return(
        <Box {...props} flexDirection='row' display='flex' align="center" justifyContent='center' >
            <Flex align='center' >
                <GiAnt color='black' size={25}/>
            </Flex>
            <Flex align='center' >
                <Text fontSize='xl' textColor="white" fontWeight='bold'>
                    SpellAnt
                </Text>
            </Flex>

        </Box>
    )
}

const MenuToggle = ({toggle, isOpen}) => {
    return (
        <Box display={{base: 'block', md: 'none'}} onClick={toggle}>
            {isOpen ? <GrClose color='white' /> : <GiHamburgerMenu /> }
        </Box>
    )
}

const MenuItem = ({children, isLast, to='/', ...rest}) => {
    return (
        <Link href={to}>
            <Text display='block' {...rest}> 
                {children}
            </Text>
        </Link>
    )
}

const MenuLinks = ({isOpen}) => {
    const [date, setdate] = React.useState(new Date());
    const createId = (date: Date) => {
        let strings = [`${date.getUTCDate()}`, `${date.getUTCMonth()}`, `${date.getUTCFullYear()}`]
        let udate =   strings[0] + strings[1] + strings[2][strings[2].length - 1];  
        
        let globalSet = Math.floor(5000*Math.sin(parseInt(udate)) + 5001); 
        return globalSet; 
    }
    return (
        <Box 
            display={{base: isOpen ? 'block' : 'none', md: "block"}}
            flexBasis={{base: "100%", md: "auto"}}

    >   
            <Stack 
                spacing={8} 
                align='center' 
                justify={["center", "space-between", "flex-end", 'flex-end']}
                direction={isOpen ?  "column" : "row"}
                pt={[4, 4, 0, 0]}
            >
                <Menu>
                  {({ isOpen }) => (
                    <>
                        <MenuButton as={Button} colorScheme="whiteAlpha" textColor="black" rightIcon={<ChevronDownIcon />}>
                          Choose Set
                        </MenuButton>
                        <MenuList bg='white'>
                           
                            <MenuItem as={Button} 
                                isLast={undefined} 
                                textColor='black'> 
                                <NextLink href="/select/[id]"  as={`/select/${Math.floor(Math.random() * 10000)}`} >
                                    <Button textColor='white' colorScheme='green' bg='teal'> Im feeling random! </Button> 
                                </NextLink>
                            </MenuItem>

                            <Flex align={'center'} justifyContent='space-around'>
                                <Text fontSize={20} fontWeight={'bold'} textColor={'black'}> or </Text>
                            </Flex>


                            <MenuItem 
                                as={Button}
                                isLast={undefined} 
                                h="100%"
                                textColor='black'
                                onClick={(e) => e.preventDefault()}
                                > 
                                <Flex align={'center'} justifyContent='space-around'>
                                    <Text fontSize={20} fontWeight={'bold'} textColor={'black'}> Choose a date </Text>
                                </Flex>
                                <div>
                                    <Calendar maxDate={new Date()} onChange={setdate} value={date} />
                                </div>
                            </MenuItem>

                            <MenuItem as={Button} 
                                isLast={true} 
                                textColor='black'> 
                                <NextLink href="/select/[id]"  as={`/select/${createId(date)}`} >
                                    <Button textColor='white' colorScheme='green' bg='teal'> Selected Date: {createId(date)} </Button> 
                                </NextLink>
                            </MenuItem>

                        </MenuList>

                    </>
                  )}
                </Menu>
                <a  href="https://www.buymeacoffee.com/jorgeochoareyes" target="_blank" rel="noopener noreferrer"> <Button colorScheme="green"> ❤️ Donate  </Button> </a>

            </Stack>
        </Box>
    )
}


const NavbarContainer = ({children, ...props}) => {
    return (
        <Flex 
            as="nav"
            align="center"
            justify="space-around" 
            position="sticky" 
            top={0}
            zIndex={1}
            wrap='wrap'
            w="100%"
            mb={5}
            p={3}
            px={1}
            bg={lightThemeGrad}
            opacity={.95}
            color={["white"]}
            {...props}
        >
            {children}
        </Flex>
    )
}


export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false); 
    const toggle = () => setIsOpen(!isOpen); 
    return (
        <NavbarContainer>
            <Logo
                w="100px"
                color={["white", "white", "primary.500", "primary.500"]}
            />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />

        </NavbarContainer>
    );
}