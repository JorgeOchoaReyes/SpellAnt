import { Colonies } from '../../components/Colonies';
import {Layout} from '../../components/Layout';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from '../../Util/createUrql';
import { useRouter } from 'next/router';


const Index = ({name}) => {
  const router = useRouter(); 
  const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

    return (
      <Layout>
        <Colonies selectedNumber={intId} /> 
      </Layout>
    ) 
}

export default withUrqlClient(createUrqlClient)(Index); 