import { Colony } from '../components/Colony';
import {Layout} from '../components/Layout';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from '../Util/createUrql';


const Index = ({name}) => {

  return (
    <Layout>
      <Colony /> 
    </Layout>

  ) 
}

export default withUrqlClient(createUrqlClient)(Index); 