import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import SearchFilter from './components/search/SearchFilter';

function App() {
  return (
    <>
      <Toaster />
      <Layout>
        <SearchFilter />
      </Layout>
    </>
  );
}

export default App;
