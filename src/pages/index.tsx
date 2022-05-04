import {
  Text, Box, Center
} from '@chakra-ui/react';
import { Colony } from '../components/Colony';
import {Layout} from '../components/Layout';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from '../Util/createUrql';


const Index = ({name}) => {

  // const [{data, fetching}] = useGetDogsQuery(); 

  // if(!fetching && !data) {
  //   return <Center h="100vh" textColor='black' fontSize='xl'> 404 Error: Query did not return anything after loading. Refersh to try again.  </Center>
  // }
  
  return (
    <Layout>
      <Colony /> 
    </Layout>

  ) 
}

export default withUrqlClient(createUrqlClient)(Index); 