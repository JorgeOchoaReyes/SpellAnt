import {
  Text, Box
} from '@chakra-ui/react';
import { useGetDogsQuery } from '../../server/generated/graphql';
import { Colony } from '../components/Colony';
import {Layout} from '../components/Layout';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from '../Util/createUrql';


const Index = ({name}) => {

  const [{data, fetching}] = useGetDogsQuery(); 

  if(!fetching && !data) {
    return <div> Query did not return anything after loading </div>
  }
  
  return (
    <Layout>
      <Colony /> 
    </Layout>

  ) 
}

export default withUrqlClient(createUrqlClient)(Index); 